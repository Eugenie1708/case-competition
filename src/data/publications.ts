import csvRaw from './filtered_publications.csv?raw';

export interface Publication {
  article_uuid: string;
  title: string;
  publication_year: number;
  data_source_date: string;
  doi: string;
  abstract: string;
  journal_title: string;
  journal_issn: string;
  is_sustain: boolean;
  top_1: string;
  top_2: string;
  top_3: string;
  keywords: string[];
  person_uuid: string;
  author_name: string;
  author_email: string;
  department: string;
  active: boolean;
  pinecone_complete: boolean;
  source: 'Financial Times' | 'UT Dallas' | 'General Business';
  sdgs?: number[];
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(field);
      field = '';
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

function parsePublicationsCSV(raw: string): Publication[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n').filter(l => l.trim());
  const [, ...dataLines] = lines; // skip header row

  return dataLines.map(line => {
    const f = parseCSVLine(line);
    return {
      article_uuid:         f[0],
      title:                f[1],
      publication_year:     parseInt(f[2], 10),
      data_source_date:     f[3],
      doi:                  f[4],
      abstract:             f[5],
      journal_title:        f[6],
      journal_issn:         f[7],
      is_sustain:           f[8] === 'true',
      top_1:                f[9],
      top_2:                f[10],
      top_3:                f[11],
      keywords:             f[12].split('|').filter(Boolean),
      person_uuid:          f[13],
      author_name:          f[14],
      author_email:         f[15],
      department:           f[16],
      active:               f[17] === 'true',
      pinecone_complete:    f[18] === 'true',
      source:               f[19] as Publication['source'],
      sdgs:                 f[20] ? f[20].split('|').map(Number).filter(Boolean) : [],
    };
  });
}

export const MOCK_PUBLICATIONS: Publication[] = parsePublicationsCSV(csvRaw);

    title: "Sustainable Supply Chain Management in Emerging Markets",
    publication_year: 2023,
    data_source_date: "2026-01-12",
    doi: "10.1016/j.ijpe.2023.1023",
    abstract: "This study explores the challenges and opportunities of implementing sustainable supply chain practices in emerging economies, focusing on environmental compliance and social responsibility.",
    journal_title: "International Journal of Production Economics",
    journal_issn: "0925-5273",
    is_sustain: true,
    top_1: "Supply Chain",
    top_2: "Governance & Policy",
    top_3: "Social Impact",
    keywords: ["supply chain", "sustainability", "emerging markets", "ESG"],
    person_uuid: "fac-001",
    author_name: "Dr. Elena Rodriguez",
    author_email: "elena.r@gies.illinois.edu",
    department: "Business Administration",
    active: true,
    pinecone_complete: true,
    source: "Financial Times",
    sdgs: [12, 9, 8]
  },
  {
    article_uuid: "pub-002",
    title: "Carbon Pricing Mechanisms and Corporate Financial Performance",
    publication_year: 2024,
    data_source_date: "2026-01-18",
    doi: "10.1111/jofi.12345",
    abstract: "An empirical analysis of how internal carbon pricing mechanisms influence long-term financial performance in Fortune 500 companies.",
    journal_title: "Journal of Finance",
    journal_issn: "0022-1082",
    is_sustain: true,
    top_1: "Climate & Carbon",
    top_2: "Responsible Finance",
    top_3: "Governance & Policy",
    keywords: ["carbon pricing", "finance", "corporate strategy", "climate change"],
    person_uuid: "fac-002",
    author_name: "Prof. James Chen",
    author_email: "j.chen@gies.illinois.edu",
    department: "Finance",
    active: true,
    pinecone_complete: true,
    source: "UT Dallas",
    sdgs: [13, 7, 8]
  },
  {
    article_uuid: "pub-003",
    title: "Consumer Perception of Green Washing in the Fashion Industry",
    publication_year: 2022,
    data_source_date: "2026-01-24",
    doi: "10.1080/0267257X.2022.2034567",
    abstract: "Investigating the impact of perceived greenwashing on brand loyalty and consumer trust within the fast fashion sector.",
    journal_title: "Journal of Marketing Management",
    journal_issn: "0267-257X",
    is_sustain: true,
    top_1: "Social Impact",
    top_2: "Governance & Policy",
    top_3: "Sustainable Innovation",
    keywords: ["greenwashing", "marketing", "consumer behavior", "fashion"],
    person_uuid: "fac-003",
    author_name: "Dr. Sarah Miller",
    author_email: "s.miller@gies.illinois.edu",
    department: "Business Administration",
    active: true,
    pinecone_complete: false,
    source: "General Business",
    sdgs: [12, 10]
  },
  {
    article_uuid: "pub-004",
    title: "AI-Driven Optimization for Energy Efficient Data Centers",
    publication_year: 2024,
    data_source_date: "2026-02-02",
    doi: "10.1109/TKDE.2024.3123456",
    abstract: "Proposing a novel machine learning algorithm to optimize cooling systems in large-scale data centers, significantly reducing energy consumption.",
    journal_title: "IEEE Transactions on Knowledge and Data Engineering",
    journal_issn: "1041-4347",
    is_sustain: true,
    top_1: "Sustainable Innovation",
    top_2: "Climate & Carbon",
    top_3: "Supply Chain",
    keywords: ["AI", "energy efficiency", "data centers", "technology"],
    person_uuid: "fac-004",
    author_name: "Prof. David Kumar",
    author_email: "d.kumar@gies.illinois.edu",
    department: "Information Systems",
    active: true,
    pinecone_complete: true,
    source: "UT Dallas",
    sdgs: [9, 7, 13]
  },
  {
    article_uuid: "pub-005",
    title: "The Role of Microfinance in Rural Development",
    publication_year: 2021,
    data_source_date: "2026-02-08",
    doi: "10.1016/j.worlddev.2021.105432",
    abstract: "A longitudinal study on the effectiveness of microfinance institutions in alleviating poverty and promoting sustainable development in rural areas.",
    journal_title: "World Development",
    journal_issn: "0305-750X",
    is_sustain: true,
    top_1: "Responsible Finance",
    top_2: "Social Impact",
    top_3: "Governance & Policy",
    keywords: ["microfinance", "poverty alleviation", "rural development", "economics"],
    person_uuid: "fac-002",
    author_name: "Prof. James Chen",
    author_email: "j.chen@gies.illinois.edu",
    department: "Finance",
    active: true,
    pinecone_complete: true,
    source: "Financial Times",
    sdgs: [1, 8, 10]
  },
  {
    article_uuid: "pub-006",
    title: "Corporate Governance and Environmental Disclosures",
    publication_year: 2023,
    data_source_date: "2026-02-11",
    doi: "10.1007/s10551-023-05432-1",
    abstract: "Analyzing the relationship between board diversity and the quality of environmental disclosures in annual reports.",
    journal_title: "Journal of Business Ethics",
    journal_issn: "0167-4544",
    is_sustain: true,
    top_1: "Governance & Policy",
    top_2: "Climate & Carbon",
    top_3: "Social Impact",
    keywords: ["corporate governance", "environmental disclosure", "ethics", "board diversity"],
    person_uuid: "fac-005",
    author_name: "Dr. Linda Wu",
    author_email: "l.wu@gies.illinois.edu",
    department: "Accountancy",
    active: true,
    pinecone_complete: true,
    source: "Financial Times",
    sdgs: [16, 13, 5]
  },
  {
    article_uuid: "pub-007",
    title: "Circular Economy Models in the Automotive Industry",
    publication_year: 2024,
    data_source_date: "2026-02-17",
    doi: "10.1016/j.jclepro.2024.123456",
    abstract: "Case studies of major automotive manufacturers transitioning to circular economy models to reduce waste and resource dependency.",
    journal_title: "Journal of Cleaner Production",
    journal_issn: "0959-6526",
    is_sustain: true,
    top_1: "Supply Chain",
    top_2: "Sustainable Innovation",
    top_3: "Climate & Carbon",
    keywords: ["circular economy", "automotive", "waste reduction", "manufacturing"],
    person_uuid: "fac-001",
    author_name: "Dr. Elena Rodriguez",
    author_email: "elena.r@gies.illinois.edu",
    department: "Business Administration",
    active: true,
    pinecone_complete: true,
    source: "General Business",
    sdgs: [12, 9, 13]
  },
  {
    article_uuid: "pub-008",
    title: "Impact Investing: Trends and Future Directions",
    publication_year: 2022,
    data_source_date: "2026-02-21",
    doi: "10.1093/rfs/hhac001",
    abstract: "A comprehensive review of the impact investing landscape, identifying key trends and predicting future growth areas.",
    journal_title: "Review of Financial Studies",
    journal_issn: "0893-9454",
    is_sustain: true,
    top_1: "Responsible Finance",
    top_2: "Social Impact",
    top_3: "Sustainable Innovation",
    keywords: ["impact investing", "finance", "social responsibility", "trends"],
    person_uuid: "fac-002",
    author_name: "Prof. James Chen",
    author_email: "j.chen@gies.illinois.edu",
    department: "Finance",
    active: true,
    pinecone_complete: true,
    source: "UT Dallas",
    sdgs: [8, 17]
  },
  {
    article_uuid: "pub-009",
    title: "Ethical Leadership in the Digital Age",
    publication_year: 2023,
    data_source_date: "2026-02-26",
    doi: "10.1177/01492063231154321",
    abstract: "Examining how digital transformation challenges traditional notions of ethical leadership and proposes new frameworks for the digital era.",
    journal_title: "Journal of Management",
    journal_issn: "0149-2063",
    is_sustain: true,
    top_1: "Governance & Policy",
    top_2: "Social Impact",
    top_3: "Sustainable Innovation",
    keywords: ["ethical leadership", "digital transformation", "management", "ethics"],
    person_uuid: "fac-003",
    author_name: "Dr. Sarah Miller",
    author_email: "s.miller@gies.illinois.edu",
    department: "Business Administration",
    active: true,
    pinecone_complete: false,
    source: "Financial Times",
    sdgs: [16, 9]
  },
  {
    article_uuid: "pub-010",
    title: "Blockchain for Transparent Supply Chains",
    publication_year: 2024,
    data_source_date: "2026-03-02",
    doi: "10.1111/poms.13456",
    abstract: "Investigating the potential of blockchain technology to enhance transparency and traceability in global supply chains.",
    journal_title: "Production and Operations Management",
    journal_issn: "1059-1478",
    is_sustain: true,
    top_1: "Sustainable Innovation",
    top_2: "Supply Chain",
    top_3: "Governance & Policy",
    keywords: ["blockchain", "supply chain", "transparency", "technology"],
    person_uuid: "fac-004",
    author_name: "Prof. David Kumar",
    author_email: "d.kumar@gies.illinois.edu",
    department: "Information Systems",
    active: true,
    pinecone_complete: true,
    source: "UT Dallas",
    sdgs: [9, 12, 16]
  },
  {
    article_uuid: "pub-011",
    title: "Social Entrepreneurship and Community Resilience",
    publication_year: 2021,
    data_source_date: "2026-03-05",
    doi: "10.1002/sej.1345",
    abstract: "How social entrepreneurs contribute to building community resilience in the face of economic and environmental shocks.",
    journal_title: "Strategic Entrepreneurship Journal",
    journal_issn: "1932-4391",
    is_sustain: true,
    top_1: "Social Impact",
    top_2: "Sustainable Innovation",
    top_3: "Governance & Policy",
    keywords: ["social entrepreneurship", "resilience", "community", "strategy"],
    person_uuid: "fac-006",
    author_name: "Dr. Michael O'Connor",
    author_email: "m.oconnor@gies.illinois.edu",
    department: "Business Administration",
    active: true,
    pinecone_complete: true,
    source: "Financial Times",
    sdgs: [8, 11]
  },
  {
    article_uuid: "pub-012",
    title: "Green Bonds: A Critical Assessment",
    publication_year: 2023,
    data_source_date: "2026-03-09",
    doi: "10.1016/j.jbankfin.2023.106789",
    abstract: "A critical assessment of the green bond market, evaluating its effectiveness in funding environmentally friendly projects.",
    journal_title: "Journal of Banking & Finance",
    journal_issn: "0378-4266",
    is_sustain: true,
    top_1: "Responsible Finance",
    top_2: "Climate & Carbon",
    top_3: "Governance & Policy",
    keywords: ["green bonds", "finance", "sustainability", "investment"],
    person_uuid: "fac-005",
    author_name: "Dr. Linda Wu",
    author_email: "l.wu@gies.illinois.edu",
    department: "Accountancy",
    active: true,
    pinecone_complete: true,
    source: "General Business",
    sdgs: [13, 8]
  }
];
