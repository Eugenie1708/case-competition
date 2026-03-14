import Papa from 'papaparse';
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
  source: string;
  sdgs?: number[];
}

type CsvRow = Record<string, string | undefined>;

function cell(row: CsvRow, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
}

function parseBoolean(value: string): boolean {
  const v = value.trim().toLowerCase();
  return v === 'true' || v === '1' || v === '1.0' || v === 'yes';
}

function parseYear(value: string): number {
  const year = Number.parseInt(value, 10);
  return Number.isFinite(year) ? year : 0;
}

function parseSdgs(...values: string[]): number[] {
  return Array.from(
    new Set(
      values
        .map((v) => Number.parseInt(v, 10))
        .filter((n) => Number.isFinite(n) && n > 0 && n <= 17),
    ),
  );
}

function parseKeywords(value: string): string[] {
  if (!value) return [];
  const delimiter = value.includes('|') ? '|' : ';';
  return value
    .split(delimiter)
    .map((k) => k.trim())
    .filter(Boolean);
}

function parsePublicationsCSV(raw: string): Publication[] {
  const parsed = Papa.parse<CsvRow>(raw, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .filter((row) => Object.values(row).some((v) => String(v ?? '').trim() !== ''))
    .map((row, idx) => {
      const top1 = cell(row, 'top_1', 'top 1');
      const top2 = cell(row, 'top_2', 'top 2');
      const top3 = cell(row, 'top_3', 'top 3');
      const sdgs = parseSdgs(top1, top2, top3);

      return {
        article_uuid: cell(row, 'article_uuid') || `pub-${idx + 1}`,
        title: cell(row, 'title') || 'Untitled Publication',
        publication_year: parseYear(cell(row, 'publication_year')),
        data_source_date: cell(row, 'data_source_date'),
        doi: cell(row, 'doi'),
        abstract: cell(row, 'abstract'),
        journal_title: cell(row, 'journal_title'),
        journal_issn: cell(row, 'journal_issn'),
        is_sustain: parseBoolean(cell(row, 'is_sustain')),
        top_1: top1,
        top_2: top2,
        top_3: top3,
        keywords: parseKeywords(cell(row, 'keywords')),
        person_uuid: cell(row, 'person_uuid'),
        author_name: cell(row, 'author_name', 'name'),
        author_email: cell(row, 'author_email', 'email'),
        department: cell(row, 'department'),
        active: parseBoolean(cell(row, 'active')),
        pinecone_complete: parseBoolean(cell(row, 'pinecone_complete')),
        source: cell(row, 'source') || 'Unknown',
        sdgs,
      };
    });
}

export const MOCK_PUBLICATIONS: Publication[] = parsePublicationsCSV(csvRaw);
