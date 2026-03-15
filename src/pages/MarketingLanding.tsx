import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  Bot,
  Search,
  Network,
  Check,
} from 'lucide-react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { SDGS } from '../utils/transformData';

export const MarketingLanding: React.FC = () => {
  const realPublications = MOCK_PUBLICATIONS.filter(
    (pub) => pub.title && pub.title.toLowerCase() !== 'untitled publication' && pub.author_name,
  );

  const featuredPublication = realPublications[0] ?? MOCK_PUBLICATIONS[0];
  const secondPublication = realPublications[1] ?? realPublications[0];
  const thirdPublication = realPublications[2] ?? realPublications[0];

  const featuredFaculty = featuredPublication?.author_name ?? 'Faculty Expert';
  const featuredDepartment = featuredPublication?.department ?? 'Gies Business';
  const featuredTitle = featuredPublication?.title ?? 'Research publication';

  const relatedFaculty = Array.from(
    new Set(realPublications.map((pub) => pub.author_name).filter(Boolean)),
  ).slice(0, 3);

  const mappedSdgs = (featuredPublication?.sdgs ?? [])
    .map((id) => SDGS.find((sdg) => sdg.id === id))
    .filter((sdg): sdg is (typeof SDGS)[number] => Boolean(sdg))
    .slice(0, 3);

  const heroSdgs = SDGS.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-gray-900">
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 space-y-24">
        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[#FFF8EF] via-white to-[#EEF7FF] p-8 shadow-sm md:p-12">
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">Gies Sustainability Intelligence Platform</p>
              <h1 className="text-4xl font-serif font-medium leading-[1.08] text-gray-900 md:text-6xl">
                Discover the Intelligence Behind Sustainability Research
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-xl">
                The Gies Sustainability Intelligence Platform transforms academic sustainability research into actionable insights for students, faculty, and industry partners.
              </p>
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-xl bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-gray-200 bg-white/80 p-6 backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-orange-50/70 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-4">Research Network</p>
                <div className="relative h-64">
                  <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-orange-700 font-medium animate-pulse">
                    SDGs
                  </div>
                  <div className="absolute right-10 top-4 h-16 w-16 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center text-blue-700 text-xs font-medium animate-pulse">
                    Faculty
                  </div>
                  <div className="absolute right-4 bottom-10 h-18 w-18 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-700 text-xs font-medium p-2 text-center animate-pulse">
                    Industry
                  </div>
                  <div className="absolute left-1/3 bottom-3 h-14 w-14 rounded-full border border-purple-200 bg-purple-50 flex items-center justify-center text-purple-700 text-xs font-medium animate-pulse">
                    AI
                  </div>

                  <div className="absolute left-[84px] top-[92px] h-px w-40 bg-gradient-to-r from-orange-300 to-blue-300" />
                  <div className="absolute left-[84px] top-[98px] h-px w-44 bg-gradient-to-r from-orange-300 to-emerald-300" />
                  <div className="absolute left-[120px] top-[132px] h-px w-24 bg-gradient-to-r from-orange-300 to-purple-300" />

                  <div className="absolute left-0 bottom-0 right-0 grid grid-cols-3 gap-2">
                    {heroSdgs.map((sdg) => (
                      <div key={sdg.id} className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-600">
                        SDG {sdg.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div>
            <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-5xl">
              Sustainability Knowledge Is Everywhere - But Hard to Use
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-gray-600">
              The volume of sustainability research is growing quickly, but the path from publications to practical action remains fragmented.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.14em] text-gray-500">Research</h3>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Sustainability research is fragmented across journals and departments.
              </p>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Valuable insights remain buried in academic publications.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.14em] text-gray-500">Faculty Expertise</h3>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Industry struggles to identify the right academic experts.
              </p>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Expert knowledge is hard to discover when data is disconnected.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.14em] text-gray-500">Industry Needs</h3>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Students have limited visibility into research opportunities.
              </p>
              <p className="mt-3 text-base text-gray-700 leading-relaxed">
                Organizations need faster paths from research to implementation.
              </p>
            </article>
          </div>

          <p className="text-2xl font-serif text-gray-900">
            The knowledge exists, but connecting research to real-world action remains difficult.
          </p>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-gradient-to-br from-[#F1F8FF] via-white to-[#F4FFF7] p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-5xl">
            Explore Sustainability Research Like Never Before
          </h2>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
            The platform maps research outputs to SDGs, faculty expertise, and applied insights, creating a connected sustainability intelligence layer.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-4">SDG Mapping Graph</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SDGS.slice(0, 9).map((sdg) => (
                  <div key={sdg.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                    <p className="text-[11px] text-gray-500">SDG {sdg.id}</p>
                    <p className="text-sm text-gray-700 truncate">{sdg.shortName}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-4">Connected Intelligence</p>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 inline-flex items-center w-full">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  Research Publications
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 inline-flex items-center w-full">
                  <Users className="h-4 w-4 mr-2 text-purple-600" />
                  Faculty Expertise Profiles
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 inline-flex items-center w-full">
                  <Building2 className="h-4 w-4 mr-2 text-emerald-600" />
                  Industry-Oriented Insights
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 shadow-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-medium text-orange-700">
            <Sparkles className="h-3.5 w-3.5" />
            New Feature
          </div>
          <h2 className="mt-4 text-3xl font-serif font-medium text-gray-900 md:text-5xl">AI Faculty Matcher</h2>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
            Paste a research topic, keyword, or article abstract and instantly discover the most relevant Gies faculty experts.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Input</p>
              <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                "{featuredTitle.slice(0, 180)}{featuredTitle.length > 180 ? '...' : ''}"
              </div>
              <div className="mt-4 inline-flex items-center text-sm text-orange-700">
                <Search className="h-4 w-4 mr-2" />
                AI semantic matching in progress
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Result Preview</p>
              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-base font-medium text-gray-900">{featuredFaculty}</p>
                <p className="text-sm text-gray-600 mt-1">{featuredDepartment}</p>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-700" />keyword search</div>
                  <div className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-700" />abstract-based matching</div>
                  <div className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-700" />AI semantic similarity</div>
                  <div className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-700" />faculty profiles with publications and SDG alignment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://faculty-match-agent-908501096695.us-central1.run.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              Try the AI Faculty Matcher
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-5xl">From Research to Real-World Impact</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 1</p>
              <h3 className="mt-2 text-xl font-medium text-gray-900">Explore Sustainability Topics</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Browse research insights organized by SDGs.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 2</p>
              <h3 className="mt-2 text-xl font-medium text-gray-900">Discover Faculty Experts</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Identify researchers working on specific sustainability challenges.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 3</p>
              <h3 className="mt-2 text-xl font-medium text-gray-900">Apply Insights</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Translate academic research into real-world sustainability strategies.</p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-5xl">Who Benefits</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-lg font-medium text-gray-900">Students</h3>
              <p className="mt-2 text-sm text-gray-600">Discover research opportunities and connect with faculty mentors.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <Users className="h-6 w-6 text-purple-600" />
              <h3 className="mt-3 text-lg font-medium text-gray-900">Faculty</h3>
              <p className="mt-2 text-sm text-gray-600">Increase research visibility and discover collaboration opportunities.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <Briefcase className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-3 text-lg font-medium text-gray-900">Industry</h3>
              <p className="mt-2 text-sm text-gray-600">Access academic expertise and sustainability insights.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <Landmark className="h-6 w-6 text-orange-600" />
              <h3 className="mt-3 text-lg font-medium text-gray-900">Leadership</h3>
              <p className="mt-2 text-sm text-gray-600">Gain strategic visibility into sustainability research impact.</p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-[#F6F8FF] p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-5xl">Inside the Platform</h2>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-600">
            Real previews from current platform data, presented as product highlights.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Sustainability Dashboard</p>
              <p className="mt-3 text-sm text-gray-700">Highlighted SDGs</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(mappedSdgs.length > 0 ? mappedSdgs : SDGS.slice(0, 3)).map((sdg) => (
                  <span key={sdg.id} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
                    SDG {sdg.id}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Faculty Profiles</p>
              <p className="mt-3 text-base font-medium text-gray-900">{featuredFaculty}</p>
              <p className="mt-1 text-sm text-gray-600">{featuredDepartment}</p>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                {relatedFaculty.map((name) => (
                  <div key={name} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{name}</div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Research Explorer</p>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{featuredTitle}</div>
                {secondPublication?.title ? (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{secondPublication.title}</div>
                ) : null}
                {thirdPublication?.title ? (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{thirdPublication.title}</div>
                ) : null}
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-900 bg-gray-900 p-8 text-white shadow-sm md:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-gray-300 mb-4">
              <Bot className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">Sustainability Intelligence</span>
            </div>
            <h2 className="text-3xl font-serif font-medium md:text-5xl">Start Exploring Sustainability Intelligence</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">
              Discover research, experts, and insights that connect sustainability knowledge with real-world action.
            </p>
            <div className="mt-7">
              <Link
                to="/"
                className="inline-flex items-center rounded-xl bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
              >
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
