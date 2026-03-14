import Papa from 'papaparse';
import csvRaw from './faculty_with_uiuc_links_corrected.csv?raw';

export interface FacultyProfileLinkRow {
  name: string;
  department: string;
  uiuc_profile_url: string;
}

type CsvRow = Record<string, string | undefined>;

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(dr|prof|professor)\.?\s+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFacultyProfileLinks(raw: string): FacultyProfileLinkRow[] {
  const parsed = Papa.parse<CsvRow>(raw, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .map((row) => ({
      name: (row.name ?? '').trim(),
      department: (row.department ?? '').trim(),
      uiuc_profile_url: (row.uiuc_profile_url ?? '').trim(),
    }))
    .filter((row) => row.name && row.uiuc_profile_url);
}

export const FACULTY_PROFILE_LINKS: FacultyProfileLinkRow[] = parseFacultyProfileLinks(csvRaw);

export function findUIUCProfileUrl(name: string, department?: string): string | null {
  const normalizedName = normalizeText(name);
  const normalizedDepartment = department ? normalizeText(department) : '';

  const exactMatch = FACULTY_PROFILE_LINKS.find((row) => {
    const sameName = normalizeText(row.name) === normalizedName;
    if (!sameName) return false;

    if (!normalizedDepartment) return true;
    return normalizeText(row.department) === normalizedDepartment;
  });

  if (exactMatch) {
    return exactMatch.uiuc_profile_url;
  }

  const looseMatch = FACULTY_PROFILE_LINKS.find((row) => {
    const rowName = normalizeText(row.name);
    return rowName.includes(normalizedName) || normalizedName.includes(rowName);
  });

  return looseMatch?.uiuc_profile_url ?? null;
}
