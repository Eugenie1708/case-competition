import { MOCK_PUBLICATIONS, Publication } from '../data/publications';

export interface Faculty {
  uuid: string;
  name: string;
  email: string;
  department: string;
  totalPublications: number;
  sustainabilityPublications: number;
  topThemes: string[];
  topSdgs: number[];
  active: boolean;
}

export interface ThemeMetric {
  name: string;
  count: number;
  publications: Publication[];
}

export interface DepartmentMetric {
  name: string;
  count: number;
}

export interface LeadershipMetric {
  totalPublications: number;
  activeFaculty: number;
  topDepartments: DepartmentMetric[];
  publicationsByYear: { year: number; count: number }[];
}

export const THEMES = [
  "Climate & Carbon",
  "Supply Chain",
  "Governance & Policy",
  "Social Impact",
  "Sustainable Innovation",
  "Responsible Finance"
];

export interface SDGMetric {
  id: number;
  name: string;
  shortName: string;
  color: string;
  image: string;
  count: number;
  publications: Publication[];
}

export const SDGS = [
  { id: 1, name: "No Poverty", shortName: "No Poverty", color: "#E5243B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg" },
  { id: 2, name: "Zero Hunger", shortName: "Zero Hunger", color: "#DDA63A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg" },
  { id: 3, name: "Good Health and Well-being", shortName: "Good Health", color: "#4C9F38", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg" },
  { id: 4, name: "Quality Education", shortName: "Quality Edu", color: "#C5192D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg" },
  { id: 5, name: "Gender Equality", shortName: "Gender Eq", color: "#FF3A21", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg" },
  { id: 6, name: "Clean Water and Sanitation", shortName: "Clean Water", color: "#26BDE2", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg" },
  { id: 7, name: "Affordable and Clean Energy", shortName: "Clean Energy", color: "#FCC30B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg" },
  { id: 8, name: "Decent Work and Economic Growth", shortName: "Decent Work", color: "#A21942", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg" },
  { id: 9, name: "Industry, Innovation and Infrastructure", shortName: "Industry", color: "#FD6925", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg" },
  { id: 10, name: "Reduced Inequalities", shortName: "Inequalities", color: "#DD1367", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg" },
  { id: 11, name: "Sustainable Cities and Communities", shortName: "Sust. Cities", color: "#FD9D24", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg" },
  { id: 12, name: "Responsible Consumption and Production", shortName: "Consumption", color: "#BF8B2E", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg" },
  { id: 13, name: "Climate Action", shortName: "Climate", color: "#3F7E44", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg" },
  { id: 14, name: "Life Below Water", shortName: "Life Water", color: "#0A97D9", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg" },
  { id: 15, name: "Life on Land", shortName: "Life Land", color: "#56C02B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg" },
  { id: 16, name: "Peace, Justice and Strong Institutions", shortName: "Peace", color: "#00689D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg" },
  { id: 17, name: "Partnerships for the Goals", shortName: "Partnerships", color: "#19486A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg" }
];

export const getSDGMetrics = (): SDGMetric[] => {
  const metrics = SDGS.map(sdg => ({
    ...sdg,
    count: 0,
    publications: [] as Publication[]
  }));

  MOCK_PUBLICATIONS.forEach(pub => {
    if (pub.sdgs && pub.sdgs.length > 0) {
      pub.sdgs.forEach(sdgId => {
        const metric = metrics.find(m => m.id === sdgId);
        if (metric) {
          metric.count += 1;
          if (!metric.publications.find(p => p.article_uuid === pub.article_uuid)) {
            metric.publications.push(pub);
          }
        }
      });
    }
  });

  return metrics.sort((a, b) => b.count - a.count);
};

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  url: string;
}

export const getSDGNews = (sdgId: number): NewsItem[] => {
  const sdgName = SDGS.find(s => s.id === sdgId)?.name || "Sustainability";
  return [
    {
      id: '1',
      title: `Global progress on ${sdgName} shows mixed results in 2024`,
      date: '2024-03-15',
      source: 'UN News',
      url: '#'
    },
    {
      id: '2',
      title: `New partnership announced to tackle ${sdgName} challenges`,
      date: '2024-02-28',
      source: 'Sustainability Weekly',
      url: '#'
    },
    {
      id: '3',
      title: `Gies College of Business launches new initiative for Goal ${sdgId}`,
      date: '2024-01-10',
      source: 'Gies News',
      url: '#'
    }
  ];
};

export const getFacultyData = (): Faculty[] => {
  const facultyMap = new Map<string, Faculty>();
  const facultySdgCounts = new Map<string, Map<number, number>>();

  MOCK_PUBLICATIONS.forEach(pub => {
    if (!facultyMap.has(pub.person_uuid)) {
      facultyMap.set(pub.person_uuid, {
        uuid: pub.person_uuid,
        name: pub.author_name,
        email: pub.author_email,
        department: pub.department,
        totalPublications: 0,
        sustainabilityPublications: 0,
        topThemes: [],
        topSdgs: [],
        active: pub.active
      });
      facultySdgCounts.set(pub.person_uuid, new Map());
    }

    const faculty = facultyMap.get(pub.person_uuid)!;
    faculty.totalPublications += 1;
    if (pub.is_sustain) {
      faculty.sustainabilityPublications += 1;
    }

    const themes = [pub.top_1, pub.top_2, pub.top_3].filter(t => THEMES.includes(t));
    faculty.topThemes = [...new Set([...faculty.topThemes, ...themes])].slice(0, 3);

    const sdgMap = facultySdgCounts.get(pub.person_uuid)!;
    (pub.sdgs ?? []).forEach(sdgId => {
      sdgMap.set(sdgId, (sdgMap.get(sdgId) ?? 0) + 1);
    });
  });

  facultyMap.forEach((faculty, uuid) => {
    const sdgMap = facultySdgCounts.get(uuid)!;
    faculty.topSdgs = Array.from(sdgMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([sdgId]) => sdgId);
  });

  return Array.from(facultyMap.values());
};

export const getThemeMetrics = (): ThemeMetric[] => {
  const metrics = THEMES.map(theme => ({
    name: theme,
    count: 0,
    publications: [] as Publication[]
  }));

  MOCK_PUBLICATIONS.forEach(pub => {
    if (pub.is_sustain) {
      [pub.top_1, pub.top_2, pub.top_3].forEach(themeName => {
        const theme = metrics.find(m => m.name === themeName);
        if (theme) {
          theme.count += 1;
          if (!theme.publications.find(p => p.article_uuid === pub.article_uuid)) {
            theme.publications.push(pub);
          }
        }
      });
    }
  });

  return metrics.sort((a, b) => b.count - a.count);
};

export const getLeadershipMetrics = (): LeadershipMetric => {
  const faculty = getFacultyData();
  const activeFaculty = faculty.filter(f => f.active && f.sustainabilityPublications > 0).length;
  
  const deptCounts = new Map<string, number>();
  MOCK_PUBLICATIONS.forEach(pub => {
    const current = deptCounts.get(pub.department) || 0;
    deptCounts.set(pub.department, current + 1);
  });

  const topDepartments = Array.from(deptCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const yearCounts = new Map<number, number>();
  MOCK_PUBLICATIONS.forEach(pub => {
    const current = yearCounts.get(pub.publication_year) || 0;
    yearCounts.set(pub.publication_year, current + 1);
  });

  const publicationsByYear = Array.from(yearCounts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  return {
    totalPublications: MOCK_PUBLICATIONS.filter(p => p.is_sustain).length,
    activeFaculty,
    topDepartments,
    publicationsByYear
  };
};

export const getConfidenceLevel = (pub: Publication): 'High' | 'Medium' | 'Low' => {
  let score = 0;
  if (pub.source) score++;
  if (pub.abstract) score++;
  if (pub.doi) score++;
  if (pub.pinecone_complete) score++;
  if (pub.top_1) score++;

  if (score >= 5) return 'High';
  if (score >= 4) return 'Medium';
  return 'Low';
};
