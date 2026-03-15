import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Network, BookOpen, Users, Building2, Check, Dot } from 'lucide-react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { SDGS } from '../utils/transformData';

export const MarketingLanding: React.FC = () => {
  const demoPublication =
    MOCK_PUBLICATIONS.find(
      (pub) =>
        pub.is_sustain &&
        pub.sdgs &&
        pub.sdgs.length > 0 &&
        pub.author_name &&
        pub.title &&
        pub.title.toLowerCase() !== 'untitled publication',
    ) ?? MOCK_PUBLICATIONS[0];

  const demoAuthor = demoPublication?.author_name ?? 'Faculty Expert';
  const demoDepartment = demoPublication?.department ?? 'Gies Business';
  const demoTitle = demoPublication?.title ?? 'Research publication';
  const demoYear = demoPublication?.publication_year || 0;
  const demoSdgs = (demoPublication?.sdgs ?? [])
    .map((id) => SDGS.find((sdg) => sdg.id === id))
    .filter((sdg): sdg is (typeof SDGS)[number] => Boolean(sdg))
    .slice(0, 3);

  const relatedPublications = MOCK_PUBLICATIONS.filter(
    (pub) => pub.author_name === demoAuthor && pub.article_uuid !== demoPublication?.article_uuid && pub.title,
  )
    .slice(0, 2)
    .map((pub) => ({
      title: pub.title,
      year: pub.publication_year,
    }));

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-gray-900">
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16 space-y-24">
        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-5">Gies Sustainability Intelligence Platform</p>
            <h1 className="text-4xl font-serif font-medium leading-[1.12] text-gray-900 md:text-6xl">
              Where Sustainability Research Meets Real-World Impact
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg max-w-3xl">
              This platform brings Gies sustainability research together in one place, mapped to the UN Sustainable Development Goals (SDGs), allowing students, faculty, and industry partners to discover insights, identify experts, and translate research into real-world solutions.
            </p>
            <div className="mt-8">
              <Link to="/" className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl">
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">Why Sustainability Knowledge Is Hard to Use</h2>
          <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
            <p>Sustainability research is fragmented across journals and departments.</p>
            <p>Industry struggles to identify relevant academic experts.</p>
            <p>Students lack visibility into research opportunities.</p>
            <p>Valuable insights remain buried in academic publications.</p>
          </div>
          <p className="mt-8 text-xl font-serif text-gray-900">
            The knowledge exists.<br />
            But connecting research to real-world impact remains difficult.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl mb-6">What the Platform Enables</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Research Intelligence</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Explore sustainability research organized by SDGs and discover insights across faculty publications.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Expert Discovery</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Identify the most relevant faculty experts based on research topics and academic publications.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Industry Insights</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Translate academic sustainability research into actionable business frameworks.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Highlight - Try Our New Feature
          </div>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">AI Faculty Matcher</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Paste a research topic, keyword, or article abstract to instantly discover the most relevant Gies faculty experts.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-700">
            <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-orange-600" />keyword search</div>
            <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-orange-600" />abstract-based matching</div>
            <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-orange-600" />AI semantic similarity</div>
            <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-orange-600" />faculty profiles with publications and SDG relevance</div>
          </div>
          <div className="mt-7">
            <a href="https://faculty-match-agent-908501096695.us-central1.run.app" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">
              Try the AI Faculty Matcher
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">See the Platform in Action</h2>
          <p className="mt-4 text-base text-gray-600 max-w-3xl">
            Example preview from current dashboard data: a real publication in the dataset, matched to a faculty expert and SDG-aligned topics.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Matched Expert</p>
              <h3 className="mt-2 text-2xl font-serif font-medium text-gray-900">{demoAuthor}</h3>
              <p className="mt-1 text-sm text-gray-600">{demoDepartment}</p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Related Publication</p>
                <h4 className="mt-2 text-lg font-medium text-gray-900 leading-snug">{demoTitle}</h4>
                {demoYear > 0 ? <p className="mt-1 text-sm text-gray-500">{demoYear}</p> : null}
              </div>

              {relatedPublications.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-2">More From This Faculty</p>
                  <ul className="space-y-2">
                    {relatedPublications.map((pub) => (
                      <li key={`${pub.title}-${pub.year}`} className="flex items-start text-sm text-gray-700">
                        <Dot className="h-4 w-4 mt-0.5 mr-1 text-gray-500" />
                        <span>{pub.title}{pub.year ? ` (${pub.year})` : ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">SDG Alignment</p>
              <div className="mt-3 space-y-2">
                {demoSdgs.length > 0 ? (
                  demoSdgs.map((sdg) => (
                    <div key={sdg.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                      SDG {sdg.id}: {sdg.name}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    SDG alignment available in dashboard views
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">From Research to Real-World Impact</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 1</p>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Explore Sustainability Topics</h3>
              <p className="mt-2 text-sm text-gray-600">Browse research insights organized by SDGs.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 2</p>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Discover Faculty Experts</h3>
              <p className="mt-2 text-sm text-gray-600">Identify researchers working on specific sustainability challenges.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Step 3</p>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Connect Research With Industry</h3>
              <p className="mt-2 text-sm text-gray-600">Translate academic research into actionable sustainability insights.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">Why This Platform Is Different</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-medium text-gray-900">Traditional Research Directories</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="inline-flex items-center"><Dot className="h-4 w-4 mr-1 text-gray-500" />publication listings</li>
                <li className="inline-flex items-center"><Dot className="h-4 w-4 mr-1 text-gray-500" />faculty profiles</li>
                <li className="inline-flex items-center"><Dot className="h-4 w-4 mr-1 text-gray-500" />limited search capabilities</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-6">
              <h3 className="text-lg font-medium text-gray-900">This Platform</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-orange-700" />SDG-based research mapping</li>
                <li className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-orange-700" />AI-powered expert discovery</li>
                <li className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-orange-700" />industry-oriented sustainability insights</li>
                <li className="inline-flex items-center"><Check className="h-4 w-4 mr-2 text-orange-700" />research-to-strategy translation</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-xl font-serif text-gray-900">
            This is not just a research directory.<br />
            It is a sustainability intelligence platform.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-medium text-gray-900 md:text-4xl">Who Benefits</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Students</h3>
              <p className="mt-2 text-sm text-gray-600">Discover research opportunities and connect with faculty mentors.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Faculty</h3>
              <p className="mt-2 text-sm text-gray-600">Increase research visibility and discover collaboration opportunities.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Industry</h3>
              <p className="mt-2 text-sm text-gray-600">Access academic expertise and sustainability insights.</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Leadership</h3>
              <p className="mt-2 text-sm text-gray-600">Gain strategic visibility into sustainability research impact.</p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-900 bg-gray-900 p-8 text-white shadow-sm md:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-gray-300 mb-4">
              <Building2 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">Platform Access</span>
            </div>
            <h2 className="text-3xl font-serif font-medium md:text-4xl">Explore the Gies Sustainability Intelligence Platform</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">
              Discover research, experts, and insights that connect sustainability knowledge with real-world action.
            </p>
            <div className="mt-7">
              <Link to="/" className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700">
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
