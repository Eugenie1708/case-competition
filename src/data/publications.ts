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
      continue;
    }

    if (ch === ',' && !inQuotes) {
      fields.push(field);
      field = '';
      continue;
    }

    field += ch;
  }

  fields.push(field);
  return fields;
}

function parsePublicationsCSV(raw: string): Publication[] {
  const lines = raw
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0);

  const [, ...dataLines] = lines;

  return dataLines.map((line) => {
    const f = parseCSVLine(line);

    return {
      article_uuid: f[0],
      title: f[1],
      publication_year: parseInt(f[2], 10),
      data_source_date: f[3],
      doi: f[4],
      abstract: f[5],
      journal_title: f[6],
      journal_issn: f[7],
      is_sustain: f[8] === 'true',
      top_1: f[9],
      top_2: f[10],
      top_3: f[11],
      keywords: f[12].split('|').filter(Boolean),
      person_uuid: f[13],
      author_name: f[14],
      author_email: f[15],
      department: f[16],
      active: f[17] === 'true',
      pinecone_complete: f[18] === 'true',
      source: f[19] as Publication['source'],
      sdgs: f[20] ? f[20].split('|').map(Number).filter(Boolean) : [],
    };
  });
}

export const MOCK_PUBLICATIONS: Publication[] = parsePublicationsCSV(csvRaw);
