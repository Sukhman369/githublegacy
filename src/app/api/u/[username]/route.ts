import { NextRequest, NextResponse } from 'next/server';
import { createYearlyCalendarGrid, applyPatternToCalendar } from '../../../../lib/calendar-engine';
import { getThemeById } from '../../../../lib/theme-config';

export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  const cleanUsername = (username || 'developer').replace(/\.svg$/i, '').toUpperCase();
  
  const { searchParams } = new URL(req.url);
  const themeId = searchParams.get('theme') || 'github-dark';
  const year = parseInt(searchParams.get('year') || `${new Date().getFullYear()}`, 10);
  const theme = getThemeById(themeId);

  const rawGrid = createYearlyCalendarGrid(year);
  const grid = applyPatternToCalendar(rawGrid, {
    text: cleanUsername,
    year,
    intensityMaxCommits: 5,
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
  const gridLeft = 35;
  const gridTop = 45;
  const svgWidth = gridLeft + 53 * (cellWidth + gap) + 15;
  const svgHeight = gridTop + 7 * (cellHeight + gap) + 25;

  let cellsSvg = '';
  grid.weeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = gridLeft + wIdx * (cellWidth + gap);
      const y = gridTop + dIdx * (cellHeight + gap);
      const color = theme.levels[day.level];
      const isYearDay = day.year === year;
      const opacity = isYearDay ? (day.level > 0 ? 1 : 0.35) : 0.15;

      cellsSvg += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" rx="2" fill="${color}" opacity="${opacity}" />`;
    });
  });

  const bgColor = theme.isDark ? '#0d1117' : '#ffffff';
  const borderColor = theme.isDark ? '#30363d' : '#e1e4e8';
  const textColor = theme.isDark ? '#c9d1d9' : '#24292e';
  const accentColor = '#10b981';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="${svgWidth}" height="${svgHeight}" rx="12" fill="${bgColor}" stroke="${borderColor}" stroke-width="1"/>
  <text x="20" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="${textColor}">
    @${cleanUsername}'s <tspan fill="${accentColor}">GitLegacy</tspan> Canvas
  </text>
  ${cellsSvg}
  <text x="${svgWidth - 20}" y="${svgHeight - 10}" font-family="SFMono-Regular, Consolas, monospace" font-size="9" fill="${textColor}" opacity="0.45" text-anchor="end">gitlegacy.dev</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
