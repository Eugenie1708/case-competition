import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFacultyData } from '../utils/transformData';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { findUIUCProfileUrl } from '../data/facultyProfiles';
import { ArticleTable } from '../components/ArticleTable';
import { ArrowLeft, Mail, Building2, Award, BookOpen, ExternalLink } from 'lucide-react';
import { SDG_INFO, getContrastTextClass, getPublicationSdgs } from '../utils/sdgUtils';

const TOPIC_STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'into', 'using', 'used', 'use', 'new', 'based', 'study', 'studies', 'analysis',
  'role', 'impact', 'effects', 'effect', 'through', 'across', 'within', 'among', 'their', 'this', 'that', 'into',
  'over', 'under', 'between', 'journal', 'review', 'international', 'management', 'research', 'business', 'policy',
  'financial', 'finance', 'production', 'operations', 'accounting', 'approach', 'approaches', 'model', 'models',
]);

const DOMAIN_KEYWORDS: Array<{ domain: string; keywords: string[] }> = [
  { domain: 'Machine Learning & Data Analytics', keywords: ['machine learning', 'algorithm', 'ai', 'analytics', 'classification', 'prediction', 'model', 'data'] },
  { domain: 'Healthcare & Biomedical Research', keywords: ['health', 'cancer', 'clinical', 'biomedical', 'medical', 'diagnosis', 'mammography'] },
  { domain: 'Sustainable Finance', keywords: ['finance', 'financial', 'investment', 'bank', 'bond', 'pricing', 'risk'] },
  { domain: 'Supply Chain & Operations', keywords: ['supply chain', 'operations', 'production', 'logistics', 'manufacturing'] },
  { domain: 'Governance & Policy', keywords: ['governance', 'policy', 'institution', 'regulation', 'leadership'] },
  { domain: 'Innovation & Technology Strategy', keywords: ['innovation', 'technology', 'digital', 'blockchain', 'infrastructure'] },
  { domain: 'Climate, Energy & Sustainability', keywords: ['climate', 'energy', 'sustainable', 'sustainability', 'environment', 'carbon'] },
];

function toTitleCase(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferResearchDomains(text: string): string[] {
  const normalized = text.toLowerCase();
  return DOMAIN_KEYWORDS.filter(({ keywords }) => keywords.some((keyword) => normalized.includes(keyword))).map((item) => item.domain);
}

export const FacultyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const facultyData = useMemo(() => getFacultyData(), []);
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  
  const faculty = facultyData.find(f => f.uuid === id);
  const publications = MOCK_PUBLICATIONS.filter(p => p.person_uuid === id);
  const uiucProfileUrl = useMemo(() => {
    if (!faculty) return null;
    return findUIUCProfileUrl(faculty.name, faculty.department);
  }, [faculty]);

  const researchProfileSummary = useMemo(() => {
    const topicCounts = new Map<string, number>();
    const journalCounts = new Map<string, number>();
    const sdgCounts = new Map<number, number>();

    publications.forEach((pub) => {
      const combinedText = `${pub.title} ${pub.journal_title}`.toLowerCase();
      const tokens = combinedText.match(/[a-z][a-z-]{3,}/g) ?? [];

      const inferredDomains = inferResearchDomains(`${pub.title} ${pub.journal_title} ${pub.abstract}`);
      inferredDomains.forEach((domain) => {
        topicCounts.set(domain, (topicCounts.get(domain) || 0) + 2);
      });

      tokens.forEach((token) => {
        if (TOPIC_STOP_WORDS.has(token)) return;
        topicCounts.set(token, (topicCounts.get(token) || 0) + 1);
      });

      if (pub.journal_title) {
        journalCounts.set(pub.journal_title, (journalCounts.get(pub.journal_title) || 0) + 1);
      }

      getPublicationSdgs(pub).forEach((goal) => {
        sdgCounts.set(goal, (sdgCounts.get(goal) || 0) + 1);
      });
    });

    const primaryResearchAreas = Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([topic]) => (DOMAIN_KEYWORDS.some((item) => item.domain === topic) ? topic : toTitleCase(topic)));

    const topJournals = Array.from(journalCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([journal]) => journal);

    const sdgFocus = Array.from(sdgCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([goal, count]) => ({ goal, count }));

    const mostRecentPublication = [...publications]
      .sort((a, b) => b.publication_year - a.publication_year)[0] ?? null;

    return {
      primaryResearchAreas,
      topJournals,
      sdgFocus,
      mostRecentPublication,
      sdgCounts,
    };
  }, [publications]);

  const publicationActivity = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const recentCount = publications.filter((pub) => pub.publication_year >= currentYear - 4).length;
    return { total: filteredPublications.length, recentCount };
  }, [filteredPublications, publications]);

  const potentialCollaborators = useMemo(() => {
    if (!faculty) return [] as Array<{ uuid: string; name: string; department: string; sharedSdgs: number[]; score: number }>;

    const currentCounts = researchProfileSummary.sdgCounts;
    const facultyById = new Map(facultyData.map((item) => [item.uuid, item]));

    const publicationsByFaculty = new Map<string, typeof publications>();
    MOCK_PUBLICATIONS.forEach((pub) => {
      const arr = publicationsByFaculty.get(pub.person_uuid) ?? [];
      arr.push(pub);
      publicationsByFaculty.set(pub.person_uuid, arr);
    });

    return Array.from(publicationsByFaculty.entries())
      .filter(([uuid]) => uuid !== faculty.uuid)
      .map(([uuid, pubs]) => {
        const otherCounts = new Map<number, number>();
        pubs.forEach((pub) => {
          getPublicationSdgs(pub).forEach((goal) => {
            otherCounts.set(goal, (otherCounts.get(goal) || 0) + 1);
          });
        });

        const sharedSdgs = Array.from(currentCounts.keys()).filter((goal) => otherCounts.has(goal));
        const score = sharedSdgs.reduce((sum, goal) => {
          return sum + Math.min(currentCounts.get(goal) || 0, otherCounts.get(goal) || 0);
        }, 0);

        const otherFaculty = facultyById.get(uuid);
        return {
          uuid,
          name: otherFaculty?.name ?? pubs[0]?.author_name ?? 'Unknown Faculty',
          department: otherFaculty?.department ?? pubs[0]?.department ?? 'Unknown Department',
          sharedSdgs,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [faculty, facultyData, researchProfileSummary.sdgCounts, publications]);

  const sdgDistribution = useMemo(() => {
    const counts = new Map<number, number>();

    publications.forEach((pub) => {
      getPublicationSdgs(pub).forEach((goal) => {
        counts.set(goal, (counts.get(goal) || 0) + 1);
      });
    });

    const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);

    return Array.from(counts.entries())
      .map(([goal, count]) => ({
        goal,
        count,
        percent: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [publications]);

  const filteredPublications = useMemo(() => {
    if (selectedSdgs.length === 0) return publications;

    return publications.filter((pub) => {
      const pubSdgs = getPublicationSdgs(pub);
      return selectedSdgs.some((goal) => pubSdgs.includes(goal));
    });
  }, [publications, selectedSdgs]);

  const toggleSdg = (goal: number) => {
    setSelectedSdgs((prev) =>
      prev.includes(goal) ? prev.filter((id) => id !== goal) : [...prev, goal],
    );
  };

  if (!faculty) {
    return <div>Faculty member not found</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link to="/faculty" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Faculty Dashboard
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-400 border-4 border-white shadow-lg shrink-0">
          {faculty.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">{faculty.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {faculty.department}
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {faculty.email}
                </div>
              </div>

              {uiucProfileUrl ? (
                <a
                  href={uiucProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 mb-4"
                >
                  View UIUC Faculty Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Total Impact</div>
              <div className="text-3xl font-semibold text-gray-900">{faculty.totalPublications}</div>
              <div className="text-xs text-emerald-600 font-medium">Publications</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" />
              Research Profile Summary
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>
                <span className="font-medium text-gray-900">Primary Research Areas:</span>{' '}
                {researchProfileSummary.primaryResearchAreas.join(', ') || 'Not enough publication data'}
              </li>
              <li>
                <span className="font-medium text-gray-900">SDG Focus:</span>{' '}
                <span className="inline-flex flex-wrap gap-1 align-middle">
                  {researchProfileSummary.sdgFocus.map(({ goal, count }) => (
                    <span
                      key={goal}
                      className="inline-flex items-center gap-1"
                      title={`SDG ${goal} - ${SDG_INFO[goal].name}`}
                    >
                      <span
                        className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full ${getContrastTextClass(SDG_INFO[goal].color)}`}
                        style={{ backgroundColor: SDG_INFO[goal].color }}
                      >
                        {goal}
                      </span>
                      <span className="text-xs text-gray-600">{SDG_INFO[goal].name} - {count} publications</span>
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-900">Top Journals:</span>{' '}
                {researchProfileSummary.topJournals.join(', ') || 'Not enough journal data'}
              </li>
              <li>
                <span className="font-medium text-gray-900">Most Recent Publication:</span>{' '}
                {researchProfileSummary.mostRecentPublication
                  ? `${researchProfileSummary.mostRecentPublication.title} (${researchProfileSummary.mostRecentPublication.publication_year})`
                  : 'No publication available'}
              </li>
            </ul>
          </div>

          <div className="flex gap-2">
            {faculty.topThemes.map((theme, idx) => (
              <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">Potential Collaborators</h3>
          <p className="text-sm text-gray-500 mt-1">Researchers with overlapping SDG interests</p>
        </div>
        <div className="p-6 space-y-4">
          {potentialCollaborators.length === 0 ? (
            <p className="text-sm text-gray-500">No collaborator overlap found yet.</p>
          ) : (
            potentialCollaborators.map((person) => (
              <div key={person.uuid} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm font-medium text-gray-900">{person.name}</div>
                  <div className="text-xs text-gray-500">{person.department}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {person.sharedSdgs.map((goal) => (
                      <span
                        key={goal}
                        className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full ${getContrastTextClass(SDG_INFO[goal].color)}`}
                        style={{ backgroundColor: SDG_INFO[goal].color }}
                        title={`SDG ${goal} - ${SDG_INFO[goal].name}`}
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={`/faculty/${person.uuid}`} className="text-sm font-medium text-orange-600 hover:text-orange-700">
                  View Profile {'->'}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Publications Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-400" />
            Publications
          </h3>
          <span className="text-sm text-gray-500 text-right">
            {publicationActivity.total} publications
            <br />
            {publicationActivity.recentCount} in the last 5 years
          </span>
        </div>

        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">SDG Research Distribution</p>
          <div className="h-[22px] w-full overflow-hidden rounded-full bg-gray-100">
            <div className="flex h-full w-full gap-[2px]">
              {sdgDistribution.map((item) => (
                <div key={item.goal} className="group/segment relative h-full" style={{ width: `${item.percent}%` }}>
                  <button
                    type="button"
                    onClick={() => toggleSdg(item.goal)}
                    className="h-full w-full cursor-pointer"
                    style={{ backgroundColor: SDG_INFO[item.goal].color }}
                    aria-label={`SDG ${item.goal} - ${SDG_INFO[item.goal].name}`}
                  />
                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] font-medium text-gray-700 shadow-md ring-1 ring-gray-200 group-hover/segment:visible">
                    <div>SDG {item.goal} - {SDG_INFO[item.goal].name}</div>
                    <div>{item.percent.toFixed(0)}% of publications</div>
                    <div>{item.count} papers</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {sdgDistribution[0] ? (
            <p className="mt-2 text-[11px] text-gray-600">
              Most Active SDG: SDG {sdgDistribution[0].goal} - {SDG_INFO[sdgDistribution[0].goal].name}
            </p>
          ) : null}
          <p className="mt-2 text-[11px] text-gray-500">(based on {publications.length} publications)</p>
          <div className="mt-2 flex flex-col gap-1">
            {sdgDistribution.slice(0, 5).map((item) => (
              <span key={item.goal} className="text-[11px] text-gray-600">
                ● SDG {item.goal} - {SDG_INFO[item.goal].name} ({item.percent.toFixed(0)}%)
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 17 }, (_, i) => i + 1).map((goal) => {
              const isActive = selectedSdgs.includes(goal);
              const color = SDG_INFO[goal].color;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleSdg(goal)}
                  className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full transition-transform duration-150 hover:scale-105 hover:shadow-sm ${getContrastTextClass(color)} ${isActive ? 'scale-110 shadow-sm ring-2 ring-gray-400 ring-offset-1' : ''}`}
                  style={{ backgroundColor: color }}
                  title={`SDG ${goal} - ${SDG_INFO[goal].name}`}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {selectedSdgs.length > 0 ? (
          <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-600">
              Filtering by: {selectedSdgs.map((goal) => `SDG ${goal} - ${SDG_INFO[goal].name}`).join(', ')}
            </p>
            <button
              type="button"
              onClick={() => setSelectedSdgs([])}
              className="text-xs font-medium text-orange-600 hover:text-orange-700"
            >
              Clear Filter
            </button>
          </div>
        ) : null}

        <ArticleTable publications={filteredPublications} />
      </div>
    </div>
  );
};
