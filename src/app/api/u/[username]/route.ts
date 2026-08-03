import { NextRequest, NextResponse } from 'next/server';
import { fetchRealGithubContributions } from '../../../../lib/github-fetcher';
import { getThemeById } from '../../../../lib/theme-config';

export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  const cleanUsername = (username || 'developer').replace(/\.svg$/i, '').trim();

  const { searchParams } = new URL(req.url);
  const themeId = searchParams.get('theme') || 'github-dark';
  const yearParam = searchParams.get('year') || 'last';
  const year = yearParam === 'last' ? 'last' : parseInt(yearParam, 10);

  const theme = getThemeById(themeId);

  // Fetch real GitHub contribution history
  const realData = await fetchRealGithubContributions(cleanUsername, year);

  // Organize days into 53 weeks
  const weeks: { date: string; level: number; count: number }[][] = [];
  let currentWeek: { date: string; level: number; count: number }[] = [];

  realData.contributions.forEach((day, idx) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || idx === realData.contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const cellWidth = 10;
  const cellHeight = 10;
  const gap = 2.5;
  const gridLeft = 20;
  const gridTop = 50;
  const maxWeeks = Math.max(weeks.length, 52);
  const svgWidth = gridLeft + maxWeeks * (cellWidth + gap) + 20;
  const svgHeight = gridTop + 7 * (cellHeight + gap) + 30;

  let cellsSvg = '';
  weeks.forEach((w, wIdx) => {
    w.forEach((day, dIdx) => {
      const x = gridLeft + wIdx * (cellWidth + gap);
      const y = gridTop + dIdx * (cellHeight + gap);
      const color = theme.levels[Math.min(day.level, 4)];
      const opacity = day.level > 0 ? 1 : 0.4;

      cellsSvg += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" rx="2" fill="${color}" opacity="${opacity}" />`;
    });
  });

  const bgColor = theme.isDark ? '#0d1117' : '#ffffff';
  const borderColor = theme.isDark ? '#30363d' : '#e1e4e8';
  const textColor = theme.isDark ? '#c9d1d9' : '#24292e';
  const subtextColor = theme.isDark ? '#8b949e' : '#57606a';
  const accentColor = '#10b981';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="${svgWidth}" height="${svgHeight}" rx="12" fill="${bgColor}" stroke="${borderColor}" stroke-width="1"/>
  
  {/* Header Title */}
  <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="${textColor}">
    @${cleanUsername}'s Real Contribution History
  </text>
  
  <text x="20" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="${subtextColor}">
    <tspan fill="${accentColor}" font-weight="700">${realData.totalContributions.toLocaleString()}</tspan> contributions in ${year === 'last' ? 'the last year' : year}
  </text>
  
  {/* Contributions Grid */}
  ${cellsSvg}
  
  {/* Footer Branding */}
  <text x="${svgWidth - 20}" y="${svgHeight - 10}" font-family="SFMono-Regular, Consolas, monospace" font-size="9" fill="${subtextColor}" opacity="0.6" text-anchor="end">gitlegacy.co</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
