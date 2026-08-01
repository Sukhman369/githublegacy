import { NextRequest, NextResponse } from 'next/server';
import { createYearlyCalendarGrid, applyPatternToCalendar } from '../../../lib/calendar-engine';
import { getThemeById } from '../../../lib/theme-config';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = (searchParams.get('text') || 'LORD').toUpperCase();
  const year = parseInt(searchParams.get('year') || `${new Date().getFullYear()}`, 10);
  const themeId = searchParams.get('theme') || 'github-dark';
  const intensityMaxCommits = parseInt(searchParams.get('intensity') || '5', 10);
  const style = searchParams.get('style') || 'card'; // 'card' | 'compact'

  const theme = getThemeById(themeId);
  const rawGrid = createYearlyCalendarGrid(year);
  const grid = applyPatternToCalendar(rawGrid, {
    text,
    year,
    intensityMaxCommits,
    letterSpacing: 1,
    wordSpacing: 4,
    alignment: 'center',
    columnOffset: 0,
    themeId,
    drawingMode: 'select',
    drawIntensityLevel: 4,
  });

  const cellWidth = 10;
  const cellHeight = 10;
  const gap = 2;
  const gridLeft = 40;
  const gridTop = style === 'compact' ? 35 : 55;
  const svgWidth = gridLeft + 53 * (cellWidth + gap) + 20; // ~696px
  const svgHeight = gridTop + 7 * (cellHeight + gap) + (style === 'compact' ? 15 : 30);

  let cellsSvg = '';
  grid.weeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = gridLeft + wIdx * (cellWidth + gap);
      const y = gridTop + dIdx * (cellHeight + gap);
      const color = theme.levels[day.level];
      const isYearDay = day.year === year;
      const opacity = isYearDay ? (day.level > 0 ? 1 : 0.4) : 0.15;

      cellsSvg += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" rx="2" fill="${color}" opacity="${opacity}" />`;
    });
  });

  const bgColor = theme.isDark ? '#0d1117' : '#ffffff';
  const borderColor = theme.isDark ? '#30363d' : '#e1e4e8';
  const textColor = theme.isDark ? '#c9d1d9' : '#24292e';
  const accentColor = '#10b981'; // emerald-500

  const headerSvg =
    style === 'compact'
      ? `<text x="15" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="${textColor}">Git<tspan fill="${accentColor}">Legacy</tspan> • '${text}' (${year})</text>`
      : `<text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="${textColor}">Git<tspan fill="${accentColor}">Legacy</tspan> Contribution Canvas</text>
         <text x="20" y="46" font-family="SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace" font-size="11" fill="${textColor}" opacity="0.7">Pattern: "${text}" • Target Year: ${year}</text>`;

  const footerSvg =
    style === 'compact'
      ? ''
      : `<text x="${svgWidth - 20}" y="${svgHeight - 12}" font-family="SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace" font-size="10" fill="${textColor}" opacity="0.5" text-anchor="end">gitlegacy.dev</text>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="${svgWidth}" height="${svgHeight}" rx="12" fill="${bgColor}" stroke="${borderColor}" stroke-width="1"/>
  ${headerSvg}
  ${cellsSvg}
  ${footerSvg}
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
