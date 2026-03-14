import React, { useMemo, useRef, useEffect, useState } from 'react';
import { MessageSquare, X, Send, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PUBLICATIONS, Publication } from '../data/publications';
import { getFacultyData } from '../utils/transformData';
import { SDG_INFO, getPublicationSdgs } from '../utils/sdgUtils';

type Persona = 'student' | 'industry' | 'faculty';
type EntityType = 'Person' | 'Document' | 'Concept';

interface SourceLink {
  label: string;
  url: string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
  sourceLinks?: SourceLink[];
  followUps?: string[];
}

const FALLBACK_TEXT = "I couldn't find that in the Gies Sustainability Database. Would you like me to explore related sustainability topics instead?";

const PERSONA_SUGGESTIONS: Record<Persona, string[]> = {
  student: [
    'What sustainability research is happening at UIUC right now?',
    'Which SDGs have the most research articles at UIUC?',
    'How can I get involved in sustainability research as a student?',
  ],
  industry: [
    'What research at Gies can help my company with ESG reporting?',
    'Which faculty experts at Gies can help with Net-Zero strategy?',
    'Are there case studies on companies reducing carbon footprints?',
  ],
  faculty: [
    'Which other faculty are working on SDG 13?',
    'How many publications from my department relate to sustainability?',
    'Show sustainability research trends over the last five years.',
  ],
};

const PERSONA_LABELS: Record<Persona, string> = {
  student: '🎓 STUDENT',
  industry: '🏢 INDUSTRY',
  faculty: '👩‍🏫 FACULTY',
};

const PERSONA_FOLLOW_UPS: Record<Persona, string[]> = {
  student: [
    'Which SDG topics are most active this year?',
    'Who are faculty experts I can reach out to?',
    'Show recent publications I can start reading.',
  ],
  industry: [
    'Which SDGs are most relevant for corporate ESG strategy?',
    'Who are the top Gies experts in climate and carbon?',
    'Show publications related to net-zero implementation.',
  ],
  faculty: [
    'Which departments collaborate most on sustainability?',
    'Which SDGs have the fastest publication growth?',
    'Show active faculty publishing in SDG 13.',
  ],
};

const STOP_WORDS = new Set([
  'what', 'which', 'how', 'who', 'show', 'me', 'the', 'a', 'an', 'is', 'are', 'at', 'in', 'on', 'of', 'for', 'to', 'my', 'can', 'with', 'right', 'now', 'from', 'this', 'that', 'help'
]);

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function getSourceLink(pub: Publication): SourceLink {
  if (pub.doi) {
    return {
      label: `${pub.title} (${pub.publication_year || 'n.d.'})`,
      url: `https://doi.org/${pub.doi}`,
    };
  }

  const sourceCandidate = pub.source?.trim() ?? '';
  const hasHttpSource = sourceCandidate.startsWith('http://') || sourceCandidate.startsWith('https://');

  return {
    label: `${pub.title} (${pub.publication_year || 'n.d.'})`,
    url: hasHttpSource ? sourceCandidate : '#',
  };
}

function extractKeywords(query: string): string[] {
  return normalize(query)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function extractSdgId(query: string): number | null {
  const match = query.match(/\bsdg\s*([0-9]{1,2})\b/i);
  if (!match) return null;
  const sdgId = Number.parseInt(match[1], 10);
  if (!Number.isFinite(sdgId) || sdgId < 1 || sdgId > 17) return null;
  return sdgId;
}

function classifyEntity(query: string, facultyNames: string[]): EntityType {
  const q = normalize(query);
  const hasKnownFaculty = facultyNames.some((name) => q.includes(name));
  const personSignals = hasKnownFaculty || /\b(who|faculty|expert|professor|researches|researcher)\b/i.test(q);
  const documentSignals = /\b(paper|papers|publication|publications|article|articles|case studies|show me papers|show papers|by )\b/i.test(q);
  const conceptSignals = /\b(sdg|net-zero|esg|sustainability|what is|explain|goal)\b/i.test(q);

  if (personSignals) return 'Person';
  if (documentSignals) return 'Document';
  if (conceptSignals) return 'Concept';
  return 'Concept';
}

function inferPersona(query: string, selectedPersona: Persona | null): Persona {
  if (selectedPersona) return selectedPersona;
  const q = normalize(query);
  if (/\b(student|learn|involved|class)\b/.test(q)) return 'student';
  if (/\b(industry|company|business|esg|net-zero|corporate)\b/.test(q)) return 'industry';
  if (/\b(faculty|department|professor|collaborat)\b/.test(q)) return 'faculty';
  return 'student';
}

type ChatState = 'closed' | 'minimized' | 'open';

export const ChatbotPanel: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>('closed');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const facultyData = useMemo(() => getFacultyData(), []);
  const facultyNames = useMemo(() => facultyData.map((f) => normalize(f.name)), [facultyData]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatState === 'open' && hasInteracted) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatState, hasInteracted]);

  const latestBotFollowUps = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i];
      if (!msg.isUser && msg.followUps && msg.followUps.length > 0) {
        return msg.followUps.slice(0, 3);
      }
    }
    return [] as string[];
  }, [messages]);

  const initialSuggestions = useMemo(() => {
    if (selectedPersona) {
      return PERSONA_SUGGESTIONS[selectedPersona].slice(0, 3);
    }
    return [
      PERSONA_SUGGESTIONS.student[0],
      PERSONA_SUGGESTIONS.industry[0],
      PERSONA_SUGGESTIONS.faculty[0],
    ];
  }, [selectedPersona]);

  const respond = (rawQuery: string): ChatMessage => {
    const query = rawQuery.trim();
    const q = normalize(query);
    const persona = inferPersona(query, selectedPersona);
    const entity = classifyEntity(query, facultyNames);
    const followUps = PERSONA_FOLLOW_UPS[persona].slice(0, 3);

    if (!query) {
      return { text: FALLBACK_TEXT, isUser: false, followUps };
    }

    if (entity === 'Document') {
      const authorMatch = query.match(/\bby\s+([a-zA-Z\s.'-]+)$/i);
      if (authorMatch) {
        const authorText = normalize(authorMatch[1]);
        const authorPubs = MOCK_PUBLICATIONS
          .filter((pub) => normalize(pub.author_name).includes(authorText))
          .sort((a, b) => b.publication_year - a.publication_year);

        if (authorPubs.length > 0) {
          const top = authorPubs.slice(0, 3);
          return {
            isUser: false,
            text: `${authorPubs.length} publication(s) in the Gies Sustainability Database match ${authorMatch[1].trim()}. Here are the most recent entries.`,
            sourceLinks: top.map(getSourceLink),
            followUps,
          };
        }
      }

      const docKeywords = extractKeywords(query);
      const matchingPubs = MOCK_PUBLICATIONS
        .filter((pub) => {
          const haystack = normalize(`${pub.title} ${pub.abstract} ${pub.summary} ${pub.keywords.join(' ')}`);
          return docKeywords.some((kw) => haystack.includes(kw));
        })
        .sort((a, b) => b.publication_year - a.publication_year);

      if (matchingPubs.length > 0) {
        const top = matchingPubs.slice(0, 3);
        return {
          isUser: false,
          text: `I found ${matchingPubs.length} relevant publication(s) in the Gies Sustainability Database for this topic.`,
          sourceLinks: top.map(getSourceLink),
          followUps,
        };
      }

      return { text: FALLBACK_TEXT, isUser: false, followUps };
    }

    if (entity === 'Person') {
      const sdgId = extractSdgId(query);
      if (sdgId) {
        const byFaculty = new Map<string, { name: string; department: string; count: number; sample?: Publication }>();
        MOCK_PUBLICATIONS.forEach((pub) => {
          if (getPublicationSdgs(pub).includes(sdgId)) {
            const current = byFaculty.get(pub.person_uuid);
            if (current) {
              current.count += 1;
            } else {
              byFaculty.set(pub.person_uuid, {
                name: pub.author_name,
                department: pub.department,
                count: 1,
                sample: pub,
              });
            }
          }
        });

        const ranked = Array.from(byFaculty.values()).sort((a, b) => b.count - a.count);
        if (ranked.length > 0) {
          const topExperts = ranked.slice(0, 3);
          const expertSummary = topExperts.map((e) => `${e.name} (${e.department}, ${e.count} publication${e.count === 1 ? '' : 's'})`).join('; ');
          const links = topExperts
            .map((e) => e.sample)
            .filter((item): item is Publication => Boolean(item))
            .map(getSourceLink);

          return {
            isUser: false,
            text: `For SDG ${sdgId}, top faculty contributors in the Gies Sustainability Database include ${expertSummary}.`,
            sourceLinks: links,
            followUps,
          };
        }
        return { text: FALLBACK_TEXT, isUser: false, followUps };
      }

      const personKeywords = extractKeywords(query);
      const matchedPubs = MOCK_PUBLICATIONS.filter((pub) => {
        const haystack = normalize(`${pub.title} ${pub.abstract} ${pub.summary} ${pub.keywords.join(' ')} ${pub.top_1} ${pub.top_2} ${pub.top_3}`);
        return personKeywords.some((kw) => haystack.includes(kw));
      });

      if (matchedPubs.length > 0) {
        const counts = new Map<string, { name: string; department: string; count: number; sample: Publication }>();
        matchedPubs.forEach((pub) => {
          const current = counts.get(pub.person_uuid);
          if (current) {
            current.count += 1;
          } else {
            counts.set(pub.person_uuid, {
              name: pub.author_name,
              department: pub.department,
              count: 1,
              sample: pub,
            });
          }
        });

        const rankedExperts = Array.from(counts.values()).sort((a, b) => b.count - a.count).slice(0, 3);
        const summary = rankedExperts.map((e) => `${e.name} (${e.department})`).join('; ');

        return {
          isUser: false,
          text: `Based on this topic, the Gies Sustainability Database suggests these faculty experts: ${summary}.`,
          sourceLinks: rankedExperts.map((e) => getSourceLink(e.sample)),
          followUps,
        };
      }

      return { text: FALLBACK_TEXT, isUser: false, followUps };
    }

    const sdgId = extractSdgId(query);
    if (sdgId) {
      const sdg = SDG_INFO[sdgId];
      const sdgPubs = MOCK_PUBLICATIONS
        .filter((pub) => getPublicationSdgs(pub).includes(sdgId))
        .sort((a, b) => b.publication_year - a.publication_year);

      if (sdg && sdgPubs.length > 0) {
        return {
          isUser: false,
          text: `SDG ${sdgId} is ${sdg.name}. In the Gies Sustainability Database, I found ${sdgPubs.length} related publication(s).`,
          sourceLinks: sdgPubs.slice(0, 3).map(getSourceLink),
          followUps,
        };
      }
      return { text: FALLBACK_TEXT, isUser: false, followUps };
    }

    const conceptKeywords = extractKeywords(query);
    const conceptPubs = MOCK_PUBLICATIONS
      .filter((pub) => {
        const haystack = normalize(`${pub.title} ${pub.abstract} ${pub.summary} ${pub.keywords.join(' ')} ${pub.top_1} ${pub.top_2} ${pub.top_3}`);
        return conceptKeywords.some((kw) => haystack.includes(kw));
      })
      .sort((a, b) => b.publication_year - a.publication_year);

    if (conceptPubs.length > 0) {
      const topPub = conceptPubs[0];
      return {
        isUser: false,
        text: `A relevant concept insight from the Gies Sustainability Database: ${topPub.summary}`,
        sourceLinks: conceptPubs.slice(0, 3).map(getSourceLink),
        followUps,
      };
    }

    return { text: FALLBACK_TEXT, isUser: false, followUps };
  };

  const handleSend = (queryOverride?: string) => {
    const query = (queryOverride ?? inputValue).trim();
    if (!query) return;

    if (!expanded) {
      setExpanded(true);
    }
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    setMessages((prev) => [...prev, { text: query, isUser: true }]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = respond(query);
      setMessages((prev) => [...prev, botResponse]);
    }, 350);
  };

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
  };

  const handleMinimize = () => {
    setChatState('minimized');
  };

  const handleClose = () => {
    setChatState('closed');
  };

  return (
    <>
      <AnimatePresence>
        {chatState === 'open' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 flex flex-col"
            style={{
              width: expanded ? '420px' : '360px',
              height: expanded ? '70vh' : '420px',
              transition: 'all 0.25s ease',
            }}
          >
            <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-medium">Gies Assistant</h3>
              <div className="flex items-center gap-1">
                <button onClick={handleMinimize} className="hover:bg-orange-700 p-1 rounded" title="Minimize">
                  <Minus className="w-4 h-4" />
                </button>
                <button onClick={handleClose} className="hover:bg-orange-700 p-1 rounded" title="Close">  
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {!hasInteracted && (
                <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {'Hello! 👋 Welcome to the Illini Sustainability Dashboard.\n\nHow can I help you today? Please select your role to get started:'}
                  </p>
                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {(['student', 'industry', 'faculty'] as Persona[]).map((persona) => (
                      <button
                        key={persona}
                        onClick={() => handleSelectPersona(persona)}
                        className={cn(
                          'text-left text-sm border rounded-xl px-3 py-2 transition-colors',
                          selectedPersona === persona
                            ? 'border-orange-500 bg-orange-50 text-orange-900'
                            : 'border-gray-200 bg-white hover:border-orange-300'
                        )}
                      >
                        {PERSONA_LABELS[persona]}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Or type any question directly — I can help regardless of your role.
                  </p>
                  <p className="text-xs font-medium text-gray-700 mt-3 mb-2">Suggested questions</p>
                  <div className="flex flex-wrap gap-2">
                    {initialSuggestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => handleSend(question)}
                        className="text-left text-xs px-3 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasInteracted && messages.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.isUser ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.isUser 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                  )}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    {!msg.isUser && msg.sourceLinks && msg.sourceLinks.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500">Sources</p>
                        {msg.sourceLinks.map((source) => (
                          <a
                            key={`${source.label}-${source.url}`}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              'block text-xs hover:underline break-words',
                              source.url === '#' ? 'text-gray-500 pointer-events-none' : 'text-blue-700'
                            )}
                          >
                            {source.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100">
              {hasInteracted && latestBotFollowUps.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {latestBotFollowUps.map((followUp) => (
                    <button
                      key={followUp}
                      onClick={() => handleSend(followUp)}
                      className="text-left text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                    >
                      {followUp}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about students, faculty..."
                className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <button 
                onClick={handleSend}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {chatState !== 'open' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setChatState('open'); if (hasInteracted) setExpanded(true); }}
          className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-50"
        >
          <MessageSquare className="w-6 h-6" />
          {chatState === 'minimized' && hasInteracted && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-orange-600" />
          )}
        </motion.button>
      )}
    </>
  );
};
