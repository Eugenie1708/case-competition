import { Publication } from '../data/publications';

export const SDG_INFO: Record<number, { name: string; color: string }> = {
  1: { name: 'No Poverty', color: '#E5243B' },
  2: { name: 'Zero Hunger', color: '#DDA63A' },
  3: { name: 'Good Health and Well-being', color: '#4C9F38' },
  4: { name: 'Quality Education', color: '#C5192D' },
  5: { name: 'Gender Equality', color: '#FF3A21' },
  6: { name: 'Clean Water and Sanitation', color: '#26BDE2' },
  7: { name: 'Affordable and Clean Energy', color: '#FCC30B' },
  8: { name: 'Decent Work and Economic Growth', color: '#A21942' },
  9: { name: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
  10: { name: 'Reduced Inequalities', color: '#DD1367' },
  11: { name: 'Sustainable Cities and Communities', color: '#FD9D24' },
  12: { name: 'Responsible Consumption and Production', color: '#BF8B2E' },
  13: { name: 'Climate Action', color: '#3F7E44' },
  14: { name: 'Life Below Water', color: '#0A97D9' },
  15: { name: 'Life on Land', color: '#56C02B' },
  16: { name: 'Peace, Justice and Strong Institutions', color: '#00689D' },
  17: { name: 'Partnerships for the Goals', color: '#19486A' },
};

export function getContrastTextClass(hex: string): string {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? 'text-gray-900' : 'text-white';
}

export function getPublicationSdgs(pub: Publication): number[] {
  if (pub.sdgs && pub.sdgs.length > 0) {
    return Array.from(new Set(pub.sdgs.filter((id) => id >= 1 && id <= 17)));
  }

  return Array.from(
    new Set(
      [pub.top_1, pub.top_2, pub.top_3]
        .map((value) => Math.trunc(Number.parseFloat(String(value))))
        .filter((id) => Number.isFinite(id) && id >= 1 && id <= 17),
    ),
  );
}
