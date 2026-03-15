import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
  Brain,
  LineChart,
  Database,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { SDGS } from '../utils/transformData';

type GraphNode = {
  id: string;
  label: string;
  type: 'sdg' | 'faculty' | 'topic' | 'industry';
  x: number;
  y: number;
  links: string[];
  details: string[];
};

export const MarketingLanding: React.FC = () => {
  const publications = useMemo(
    () =>
      MOCK_PUBLICATIONS.filter(
        (pub) => pub.title && pub.title.toLowerCase() !== 'untitled publication' && pub.author_name,
      ),
    [],
  );

  const exampleA =
    publications.find((p) => p.title.includes('CEO risk preference and investing in R and D')) ??
    publications[0];
  const exampleB =
    publications.find((p) => p.title.includes('Fair Value Accounting and Stewardship')) ??
    publications[1] ??
    publications[0];
  const exampleC =
    publications.find((p) => p.title.includes('Prospect Theory predictions in the field')) ??
    publications[2] ??
    publications[0];

  const featuredFaculty = exampleA?.author_name ?? 'Abdel-Khalik, A. Rashad';
  const featuredDepartment = exampleA?.department ?? 'Accountancy';

  const [activeNodeId, setActiveNodeId] = useState<string>('sdg-13');
  const [selectedSdgId, setSelectedSdgId] = useState<number>(13);
  const [hoveredIntelligenceCard, setHoveredIntelligenceCard] = useState<string>('research');
  const [typedText, setTypedText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const typingSource = 'CEO risk preference and investing in R and D';

  useEffect(() => {
    let index = 0;
    let deleting = false;

    const timer = setInterval(() => {
      if (!deleting) {
        index += 1;
        setTypedText(typingSource.slice(0, index));
        if (index >= typingSource.length) {
          deleting = true;
        }
      } else {
        index -= 1;
        setTypedText(typingSource.slice(0, Math.max(index, 0)));
        if (index <= 0) {
          deleting = false;
        }
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(progress, 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const graphNodes: GraphNode[] = useMemo(
    () => [
      {
        id: 'sdg-13',
        label: 'SDG 13',
        type: 'sdg',
        x: 20,
        y: 20,
        links: ['topic-1', 'faculty-1'],
        details: ['Climate Action', 'Mapped research themes'],
      },
      {
        id: 'sdg-8',
        label: 'SDG 8',
        type: 'sdg',
        x: 15,
        y: 68,
        links: ['topic-2', 'faculty-2'],
        details: ['Decent Work', 'Industry-linked outputs'],
      },
      {
        id: 'topic-1',
        label: 'Research Topic',
        type: 'topic',
        x: 48,
        y: 26,
        links: ['faculty-1', 'industry-1'],
        details: ['Carbon and governance', 'Publication clusters'],
      },
      {
        id: 'topic-2',
        label: 'Insights',
        type: 'topic',
        x: 52,
        y: 66,
        links: ['faculty-2', 'industry-1'],
        details: ['Decision frameworks', 'Applied sustainability'],
      },
      {
        id: 'faculty-1',
        label: 'Faculty',
        type: 'faculty',
        x: 78,
        y: 24,
        links: ['industry-1'],
        details: [featuredFaculty, featuredDepartment],
      },
      {
        id: 'faculty-2',
        label: 'Experts',
        type: 'faculty',
        x: 82,
        y: 60,
        links: ['industry-1'],
        details: ['Cross-department expertise', 'Profile intelligence'],
      },
      {
        id: 'industry-1',
        label: 'Industry',
        type: 'industry',
        x: 72,
        y: 82,
        links: [],
        details: ['Real-world application', 'Strategy translation'],
      },
    ],
    [featuredDepartment, featuredFaculty],
  );

  const nodeById = useMemo(
    () => Object.fromEntries(graphNodes.map((node) => [node.id, node])),
    [graphNodes],
  );

  const activeNode = nodeById[activeNodeId] ?? graphNodes[0];

  const allLines = useMemo(() => {
    const lines: Array<{ from: GraphNode; to: GraphNode; key: string }> = [];

    graphNodes.forEach((from) => {
      from.links.forEach((toId) => {
        const to = nodeById[toId];
        if (to) {
          const key = [from.id, to.id].sort().join('--');
          if (!lines.find((line) => line.key === key)) {
            lines.push({ from, to, key });
          }
        }
      });
    });

    return lines;
  }, [graphNodes, nodeById]);

  const selectedSdgPublications = useMemo(
    () =>
      publications.filter((pub) => (pub.sdgs ?? []).includes(selectedSdgId)).slice(0, 4),
    [publications, selectedSdgId],
  );

  const selectedSdgFaculty = useMemo(
    () =>
      Array.from(new Set(selectedSdgPublications.map((pub) => pub.author_name))).slice(0, 3),
    [selectedSdgPublications],
  );

  const sdg3Pubs = useMemo(
    () => publications.filter((pub) => (pub.sdgs ?? []).includes(3)).slice(0, 3),
    [publications],
  );

  const sdg3Faculty = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<{ name: string; uuid: string }> = [];
    publications
      .filter((pub) => (pub.sdgs ?? []).includes(3))
      .forEach((pub) => {
        if (!seen.has(pub.person_uuid)) {
          seen.add(pub.person_uuid);
          result.push({ name: pub.author_name, uuid: pub.person_uuid });
        }
      });
    return result.slice(0, 3);
  }, [publications]);

  const topSdgBars = useMemo(() => {
    const counts = new Map<number, number>();

    publications.forEach((pub) => {
      (pub.sdgs ?? []).forEach((id) => {
        counts.set(id, (counts.get(id) ?? 0) + 1);
      });
    });

    const list = Array.from(counts.entries())
      .map(([id, count]) => ({
        id,
        label: SDGS.find((sdg) => sdg.id === id)?.shortName ?? `SDG ${id}`,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const max = Math.max(...list.map((item) => item.count), 1);

    return list.map((item) => ({
      ...item,
      widthPct: Math.round((item.count / max) * 100),
    }));
  }, [publications]);

  const departmentClusters = useMemo(() => {
    const counts = new Map<string, number>();

    publications.forEach((pub) => {
      const dept = pub.department || 'Other';
      counts.set(dept, (counts.get(dept) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [publications]);

  const themeWords = useMemo(() => {
    const stopWords = new Set([
      'the',
      'and',
      'for',
      'with',
      'from',
      'into',
      'risk',
      'using',
      'analysis',
      'based',
      'study',
      'data',
      'of',
      'in',
      'to',
      'on',
      'a',
      'an',
    ]);

    const wordCounts = new Map<string, number>();

    publications.slice(0, 150).forEach((pub) => {
      pub.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3 && !stopWords.has(w))
        .forEach((word) => {
          wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);
        });
    });

    return Array.from(wordCounts.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [publications]);

  const mappedSdgs = (exampleA?.sdgs ?? [])
    .map((id) => SDGS.find((sdg) => sdg.id === id))
    .filter((sdg): sdg is (typeof SDGS)[number] => Boolean(sdg))
    .slice(0, 3);

  const uniqueFacultyCount = useMemo(
    () => new Set(publications.map((pub) => pub.author_name)).size,
    [publications],
  );

  const activeSdgCount = useMemo(() => {
    const ids = new Set<number>();
    publications.forEach((pub) => {
      (pub.sdgs ?? []).forEach((id) => ids.add(id));
    });
    return ids.size;
  }, [publications]);

  return (
    <div className="min-h-screen bg-[#050B1A] text-slate-100">
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 via-cyan-300 to-blue-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050B1A]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-medium text-white">Gies Sustainability Intelligence Platform</span>
          </div>

          <nav className="hidden items-center gap-4 md:flex">
            <a href="#problem" className="text-xs uppercase tracking-[0.12em] text-slate-300 hover:text-white">Problem</a>
            <a href="#intelligence" className="text-xs uppercase tracking-[0.12em] text-slate-300 hover:text-white">Intelligence</a>
            <a href="#matcher" className="text-xs uppercase tracking-[0.12em] text-slate-300 hover:text-white">AI Matcher</a>
          </nav>

          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      <div className="fixed inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-20 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 space-y-28">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0B1630]/90 to-[#09101F]/90 p-8 shadow-2xl md:p-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90 mb-5">AI Sustainability Intelligence System</p>
              <h1 className="text-4xl font-semibold leading-[1.04] text-white md:text-6xl">
                Discover the Intelligence Behind Sustainability Research
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-xl">
                The Gies Sustainability Intelligence Platform transforms academic sustainability research into actionable insights for students, faculty, and industry partners.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all hover:bg-orange-400"
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/sdg/1"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 backdrop-blur transition-colors hover:bg-white/10"
                >
                  Explore Research
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Live Intelligence Network</p>
                <Network className="h-4 w-4 text-orange-300" />
              </div>

              <div className="relative h-[22rem] rounded-xl border border-white/10 bg-[#050A16]/80">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {allLines.map((line, i) => {
                    const isActive =
                      line.from.id === activeNodeId ||
                      line.to.id === activeNodeId ||
                      activeNode.links.includes(line.from.id) ||
                      activeNode.links.includes(line.to.id);

                    return (
                      <motion.line
                        key={line.key}
                        x1={line.from.x}
                        y1={line.from.y}
                        x2={line.to.x}
                        y2={line.to.y}
                        stroke={isActive ? '#FB923C' : '#334155'}
                        strokeWidth={isActive ? 0.7 : 0.35}
                        initial={{ pathLength: 0, opacity: 0.2 }}
                        whileInView={{ pathLength: 1, opacity: isActive ? 0.9 : 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      />
                    );
                  })}
                </svg>

                {graphNodes.map((node, index) => {
                  const active = node.id === activeNodeId;
                  const typeColor = {
                    sdg: 'bg-emerald-400/25 border-emerald-300 text-emerald-100',
                    faculty: 'bg-blue-400/25 border-blue-300 text-blue-100',
                    topic: 'bg-purple-400/25 border-purple-300 text-purple-100',
                    industry: 'bg-orange-400/25 border-orange-300 text-orange-100',
                  }[node.type];

                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveNodeId(node.id)}
                      onFocus={() => setActiveNodeId(node.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur transition-all ${typeColor} ${active ? 'scale-110 shadow-[0_0_20px_rgba(251,146,60,0.35)]' : ''}`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.2 + index * 0.05 }}
                    >
                      {node.label}
                    </motion.button>
                  );
                })}

                <motion.div key={activeNode.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-3 right-3 bottom-3 rounded-lg border border-white/15 bg-slate-950/75 p-3">
                  <p className="text-sm font-medium text-white">{activeNode.label}</p>
                  <div className="mt-1 space-y-1">
                    {activeNode.details.map((detail) => (
                      <p key={detail} className="text-xs text-slate-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-300">Live Publications Indexed</p>
              <p className="mt-1 text-xl font-semibold text-white">{publications.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-300">Faculty Experts Connected</p>
              <p className="mt-1 text-xl font-semibold text-white">{uniqueFacultyCount}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-300">Active SDG Mappings</p>
              <p className="mt-1 text-xl font-semibold text-white">{activeSdgCount}</p>
            </div>
          </div>
        </section>

        <section id="problem">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold text-white md:text-5xl">
            Sustainability Knowledge Is Everywhere - But Hard to Use
          </motion.h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Research Fragmentation',
                desc: 'Sustainability research is scattered across journals and departments.',
                icon: BookOpen,
              },
              {
                title: 'Expert Discovery',
                desc: 'Organizations struggle to identify the right academic experts.',
                icon: Users,
              },
              {
                title: 'Implementation Gap',
                desc: 'Turning research insights into real-world solutions remains difficult.',
                icon: Building2,
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"
              >
                <item.icon className="h-5 w-5 text-orange-300" />
                <h3 className="mt-4 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">{item.desc}</p>
              </motion.article>
            ))}
          </div>

          <p className="mt-7 text-lg text-slate-200">
            The knowledge exists, but connecting research to real-world action remains difficult.
          </p>
        </section>

        <section id="intelligence" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1E3E] to-[#101A2E] p-7">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Explore Sustainability Research Like Never Before</h2>
            <p className="mt-3 text-slate-300">
              The platform connects research outputs, SDGs, faculty expertise, and applied insights into one intelligence layer.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs font-medium text-green-300">SDG 3 — Good Health and Well-being</span>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-400">Research Topics</p>
                {sdg3Pubs.map((pub) => (
                  <p key={pub.article_uuid} className="mt-2 text-sm leading-snug text-white">
                    {pub.title}
                  </p>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-400">Faculty Working On This</p>
                {sdg3Faculty.map((f) => (
                  <div key={f.uuid} className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-white">{f.name}</p>
                    <Link
                      to={`/faculty/${f.uuid}`}
                      className="ml-3 shrink-0 rounded-full border border-orange-400/40 bg-orange-400/10 px-2.5 py-0.5 text-xs text-orange-300 transition-colors hover:bg-orange-400/20"
                    >
                      Explore Faculty →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#15102A] to-[#0B1429] p-7">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Connected Intelligence</p>
            <div className="mt-4 space-y-3">
              {[
                { id: 'research', title: 'Research Publications', icon: BookOpen },
                { id: 'faculty', title: 'Faculty Expertise Profiles', icon: Users },
                { id: 'industry', title: 'Industry-Oriented Insights', icon: Building2 },
              ].map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left"
                >
                  <div className="inline-flex items-center text-white">
                    <card.icon className="mr-2 h-4 w-4 text-orange-300" />
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    {card.id === 'research' && 'Live publication data mapped to SDGs and themes.'}
                    {card.id === 'faculty' && 'Expert profiles connected to publication evidence.'}
                    {card.id === 'industry' && 'Applied insights designed for strategic decisions.'}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="matcher" className="rounded-3xl border border-orange-300/30 bg-gradient-to-br from-[#2B1208] via-[#1E1324] to-[#121A2B] p-8 md:p-10">
          <h2 className="text-3xl font-semibold text-white md:text-5xl">AI Faculty Matcher</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Paste a research topic, keyword, or article abstract and instantly discover relevant faculty experts.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Input</p>
              <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-4 font-mono text-sm text-orange-200 min-h-16">
                {typedText}
                <span className="ml-0.5 animate-pulse">|</span>
              </div>
              <p className="mt-3 inline-flex items-center text-xs text-slate-300">
                <Search className="mr-2 h-4 w-4 text-orange-300" />
                semantic parsing + topic extraction + expert ranking
              </p>
            </div>

            <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-emerald-100">Result</p>
              <h3 className="mt-3 text-xl font-medium text-white">{featuredFaculty}</h3>
              <p className="text-sm text-emerald-100/90">{featuredDepartment}</p>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-100">
                <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-emerald-300" />keyword search</div>
                <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-emerald-300" />abstract-based matching</div>
                <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-emerald-300" />AI semantic similarity</div>
                <div className="inline-flex items-center"><Check className="mr-2 h-4 w-4 text-emerald-300" />faculty profiles aligned with SDGs</div>
              </div>
            </motion.div>
          </div>

          <div className="mt-7">
            <a
              href="https://faculty-match-agent-908501096695.us-central1.run.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all hover:bg-orange-400"
            >
              Try the AI Faculty Matcher
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-white md:text-5xl">From Research to Real-World Impact</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                step: 'Step 1',
                title: 'Explore Sustainability Topics',
                desc: 'Browse research insights organized by SDGs.',
                icon: Brain,
              },
              {
                step: 'Step 2',
                title: 'Discover Faculty Experts',
                desc: 'Identify researchers working on sustainability challenges.',
                icon: Users,
              },
              {
                step: 'Step 3',
                title: 'Apply Insights',
                desc: 'Translate research findings into real-world sustainability strategies.',
                icon: LineChart,
              },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <item.icon className="h-5 w-5 text-orange-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-slate-300">{item.step}</p>
                <h3 className="mt-2 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-slate-300">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-semibold text-white md:text-5xl">Live Sustainability Intelligence</h2>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Research Topics by SDG</p>
              <div className="mt-4 space-y-2">
                {topSdgBars.map((bar) => (
                  <div key={bar.id}>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                      <span>{bar.label}</span>
                      <span>{bar.count}</span>
                    </div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.widthPct}%` }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Faculty Expertise Clusters</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {departmentClusters.map((dept) => (
                  <motion.span key={dept.name} whileHover={{ scale: 1.06 }} className="rounded-full border border-purple-300/40 bg-purple-400/15 px-3 py-1 text-xs text-purple-100">
                    {dept.name} ({dept.count})
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Emerging Sustainability Themes</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {themeWords.map((theme) => (
                  <motion.div key={theme.word} whileHover={{ y: -2 }} className="rounded-lg border border-orange-300/30 bg-orange-400/10 px-2 py-2 text-xs text-orange-100 text-center">
                    {theme.word}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">System Signals</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="inline-flex items-center text-slate-200">
                  <Database className="mr-2 h-4 w-4 text-cyan-300" />
                  Data ingestion active from publication index
                </div>
                <div className="inline-flex items-center text-slate-200">
                  <Zap className="mr-2 h-4 w-4 text-orange-300" />
                  AI ranking pipeline updates in real time
                </div>
                <div className="inline-flex items-center text-slate-200">
                  <ShieldCheck className="mr-2 h-4 w-4 text-emerald-300" />
                  Evidence-backed expert matching
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-white md:text-5xl">Who Benefits</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Students',
                desc: 'Discover research opportunities and connect with faculty mentors.',
                icon: GraduationCap,
              },
              {
                name: 'Faculty',
                desc: 'Increase research visibility and discover collaboration opportunities.',
                icon: Users,
              },
              {
                name: 'Industry',
                desc: 'Access academic expertise and sustainability insights.',
                icon: Briefcase,
              },
              {
                name: 'Leadership',
                desc: 'Gain strategic visibility into sustainability research impact.',
                icon: Landmark,
              },
            ].map((item) => (
              <motion.article key={item.name} whileHover={{ y: -8, scale: 1.01 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <item.icon className="h-6 w-6 text-orange-300" />
                <h3 className="mt-3 text-xl font-medium text-white">{item.name}</h3>
                <p className="mt-2 text-slate-300">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-[#0E1528] to-[#1F130B] p-8 md:p-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <Bot className="h-4 w-4 text-orange-300" />
              AI-Powered Sustainability Intelligence
            </div>
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-6xl leading-[1.06]">
              Start Exploring Sustainability Intelligence
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Discover research, experts, and insights that connect sustainability knowledge with real-world action.
            </p>
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center rounded-xl bg-orange-500 px-7 py-3 text-sm font-medium text-white shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-400"
              >
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-4 right-4 z-40 hidden md:block">
        <a
          href="https://faculty-match-agent-908501096695.us-central1.run.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-orange-300/40 bg-orange-500/20 px-4 py-2 text-xs font-medium text-orange-100 backdrop-blur shadow-[0_0_24px_rgba(249,115,22,0.25)] transition-colors hover:bg-orange-500/35"
        >
          Try AI Matcher
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
