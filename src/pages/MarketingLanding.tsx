import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Network, BookOpen, Users } from 'lucide-react';

export const MarketingLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-gray-900">
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16 space-y-12">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10 relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Gies Sustainability Intelligence Platform
            </span>
            <h1 className="text-4xl font-serif font-medium leading-tight text-gray-900 md:text-5xl">
              Explore Sustainability Research That Connects Academia and Industry
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Our platform brings Gies faculty research together in one place, mapped to the UN Sustainable Development Goals (SDGs), so students, faculty, and partners can discover actionable insights.
            </p>
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
              >
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-2xl font-serif font-medium text-gray-900">Why This Platform Exists</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 max-w-4xl">
            Sustainability work spans finance, operations, policy, and technology. This platform helps users move from broad sustainability themes to specific faculty experts, publications, and strategic perspectives that can inform real-world business decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-medium text-gray-900 mb-5">Key Features</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">SDG Insights</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Explore publication trends and sustainability impact through SDG-focused perspectives.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Faculty Discovery</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Identify faculty researchers by topic, department, and sustainability expertise.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">AI Faculty Matcher</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Match research topics, keywords, or abstracts to relevant Gies faculty experts faster.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-2xl border border-orange-100 bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-xl font-serif font-medium text-gray-900">Ready to explore the data workspace?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the dashboard to access student, faculty, industry, and strategic sustainability views.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
