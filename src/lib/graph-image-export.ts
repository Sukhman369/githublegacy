import { CalendarGrid, PlannerSettings } from '../types/calendar';
import { getThemeById } from './theme-config';

/**
 * 1-Click High-Res PNG Image Exporter
 */
export function downloadGraphAsPNG(
  grid: CalendarGrid,
  settings: PlannerSettings,
  filename?: string
): void {
  if (typeof window === 'undefined') return;

  const theme = getThemeById(settings.themeId);
  const width = 1200;
  const height = 460;
  const scale = 2; // 2x DPI Retina Crispness

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(scale, scale);

  // Background Fill
  ctx.fillStyle = theme.isDark ? '#090d16' : '#f8fafc';
  ctx.fillRect(0, 0, width, height);

  // Outer Border / Container Glow
  ctx.strokeStyle = theme.isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(203, 213, 225, 0.8)';
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(16, 16, width - 32, height - 32, 20);
    ctx.stroke();
  } else {
    ctx.strokeRect(16, 16, width - 32, height - 32);
  }

  // Header Title
  ctx.fillStyle = theme.isDark ? '#f8fafc' : '#0f172a';
  ctx.font = '900 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  const patternText = settings.text ? `"${settings.text.toUpperCase()}"` : 'CONTRIBUTION ART';
  ctx.fillText(`GitLegacy • ${patternText}`, 45, 60);

  // Header Subtitle & Attribution Badge
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 13px SFMono-Regular, Consolas, monospace';
  const userHandle = settings.username ? `@${settings.username}` : '@githublegacy';
  ctx.fillText(`${grid.year} Calendar Canvas • ${grid.totalDays} Days • ${userHandle}`, 45, 84);

  // Calculate Grid Coordinates
  const startX = 65;
  const startY = 130;
  const cellW = 16;
  const cellH = 16;
  const gap = 4;

  // Render Month Labels
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;
  ctx.font = '11px SFMono-Regular, Consolas, monospace';
  ctx.fillStyle = theme.isDark ? '#94a3b8' : '#64748b';
  ctx.textAlign = 'left';

  grid.weeks.forEach((week, weekIdx) => {
    const firstDayInYear = week.days.find((d) => d.year === grid.year);
    if (firstDayInYear && firstDayInYear.month !== lastMonth) {
      const monthX = startX + weekIdx * (cellW + gap);
      ctx.fillText(MONTH_NAMES[firstDayInYear.month], monthX, startY - 12);
      lastMonth = firstDayInYear.month;
    }
  });

  // Render Day Labels (Mon, Wed, Fri)
  const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  ctx.textAlign = 'right';
  DAY_LABELS.forEach((label, dIdx) => {
    if (label) {
      const labelY = startY + dIdx * (cellH + gap) + 12;
      ctx.fillText(label, startX - 10, labelY);
    }
  });

  // Render 53-Week Matrix Cells
  grid.weeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = startX + wIdx * (cellW + gap);
      const y = startY + dIdx * (cellH + gap);
      const isYearCell = day.year === grid.year;

      ctx.fillStyle = isYearCell ? theme.levels[day.level] : (theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)');

      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, cellW, cellH, 3.5);
      } else {
        ctx.rect(x, y, cellW, cellH);
      }
      ctx.fill();

      // Subtle border for active level cells
      if (isYearCell && day.level > 0) {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  });

  // Footer Legend
  const legendY = startY + 7 * (cellH + gap) + 30;
  ctx.textAlign = 'left';
  ctx.font = '12px SFMono-Regular, Consolas, monospace';
  ctx.fillStyle = theme.isDark ? '#64748b' : '#94a3b8';
  ctx.fillText('Less', startX, legendY);

  theme.levels.forEach((color, lvlIdx) => {
    const lx = startX + 40 + lvlIdx * 18;
    ctx.fillStyle = color;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(lx, legendY - 11, 13, 13, 2.5);
    } else {
      ctx.rect(lx, legendY - 11, 13, 13);
    }
    ctx.fill();
  });

  ctx.fillText('More', startX + 40 + 5 * 18 + 5, legendY);

  // Footer Brand Badge
  ctx.textAlign = 'right';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#10b981';
  ctx.fillText('Generated with GitLegacy.dev', width - 45, legendY);

  // Trigger File Download
  const downloadName = filename || `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.png`;
  const link = document.createElement('a');
  link.download = downloadName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * 1-Click SVG Vector Exporter
 */
export function downloadGraphAsSVG(
  grid: CalendarGrid,
  settings: PlannerSettings,
  filename?: string
): void {
  if (typeof window === 'undefined') return;

  const theme = getThemeById(settings.themeId);
  const width = 1200;
  const height = 460;
  const startX = 65;
  const startY = 130;
  const cellW = 16;
  const cellH = 16;
  const gap = 4;
  const userHandle = settings.username ? `@${settings.username}` : '@githublegacy';
  const patternText = settings.text ? settings.text.toUpperCase() : 'CONTRIBUTION ART';

  const svgRects: string[] = [];

  grid.weeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = startX + wIdx * (cellW + gap);
      const y = startY + dIdx * (cellH + gap);
      const isYearCell = day.year === grid.year;
      const color = isYearCell ? theme.levels[day.level] : (theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)');

      svgRects.push(
        `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="3.5" fill="${color}" />`
      );
    });
  });

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" rx="20" fill="${theme.isDark ? '#090d16' : '#f8fafc'}" />
  <rect x="16" y="16" width="${width - 32}" height="${height - 32}" rx="16" stroke="${theme.isDark ? '#334155' : '#cbd5e1'}" stroke-width="2" />
  
  <!-- Header Text -->
  <text x="45" y="60" fill="${theme.isDark ? '#f8fafc' : '#0f172a'}" font-family="-apple-system, sans-serif" font-size="26" font-weight="900">GitLegacy • "${patternText}"</text>
  <text x="45" y="84" fill="#10b981" font-family="monospace" font-size="13" font-weight="bold">${grid.year} Calendar Canvas • ${grid.totalDays} Days • ${userHandle}</text>

  <!-- 53-Week Cells -->
  ${svgRects.join('\n  ')}

  <!-- Footer Brand -->
  <text x="${width - 45}" y="380" fill="#10b981" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold" text-anchor="end">Generated with GitLegacy.dev</text>
</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadName = filename || `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.svg`;

  const link = document.createElement('a');
  link.download = downloadName;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
