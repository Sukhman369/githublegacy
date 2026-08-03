export interface ThemePalette {
  name: string;
  background: string;
  text: string;
  textMuted: string;
  border: string;
  levels: [string, string, string, string, string]; // 0 to 4
}

export const CANVAS_THEMES: Record<string, ThemePalette> = {
  'github-dark': {
    name: 'GitHub Dark',
    background: '#0d1117',
    text: '#f0f6fc',
    textMuted: '#8b949e',
    border: '#30363d',
    levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  },
  'github-light': {
    name: 'GitHub Light',
    background: '#ffffff',
    text: '#24292f',
    textMuted: '#57606a',
    border: '#d0d7de',
    levels: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  },
  'cyberpunk': {
    name: 'Cyberpunk Neon',
    background: '#090d16',
    text: '#00f0ff',
    textMuted: '#7088a0',
    border: '#1e293b',
    levels: ['#121b2d', '#00475b', '#008ba8', '#00f0ff', '#ff0055'],
  },
  'dracula': {
    name: 'Dracula Vamp',
    background: '#282a36',
    text: '#f8f8f2',
    textMuted: '#6272a4',
    border: '#44475a',
    levels: ['#343746', '#6272a4', '#8be9fd', '#bd93f9', '#ff79c6'],
  },
  'solarized': {
    name: 'Solarized Warm',
    background: '#fdf6e3',
    text: '#073642',
    textMuted: '#657b83',
    border: '#eee8d5',
    levels: ['#eee8d5', '#b58900', '#cb4b16', '#dc322f', '#d33682'],
  },
  'emerald-matrix': {
    name: 'Emerald Matrix',
    background: '#040d08',
    text: '#34d399',
    textMuted: '#059669',
    border: '#064e3b',
    levels: ['#0a2014', '#064e3b', '#047857', '#10b981', '#34d399'],
  },
};

export type PosterFormat = 'twitter' | 'linkedin' | 'instagram' | 'wallpaper' | 'card';

export interface FormatSpec {
  name: string;
  width: number;
  height: number;
  label: string;
}

export const POSTER_FORMATS: Record<PosterFormat, FormatSpec> = {
  twitter: { name: 'Twitter Header', width: 1500, height: 500, label: '1500 x 500 px' },
  linkedin: { name: 'LinkedIn Banner', width: 1584, height: 396, label: '1584 x 396 px' },
  instagram: { name: 'Instagram Square', width: 1080, height: 1080, label: '1080 x 1080 px' },
  wallpaper: { name: '4K Wallpaper', width: 3840, height: 2160, label: '3840 x 2160 px' },
  card: { name: 'Profile Card', width: 1200, height: 630, label: '1200 x 630 px' },
};

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0..4
}

export interface DrawOptions {
  username: string;
  title?: string;
  subtitle?: string;
  format: PosterFormat;
  themeKey: string;
  daysData?: ContributionDay[];
  totalCommits?: number;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Mon', 'Wed', 'Fri'];

/**
 * Generates sample contribution data (53 weeks * 7 days) if none provided
 */
export function generateSampleData(seedUsername: string): { days: ContributionDay[]; total: number } {
  const days: ContributionDay[] = [];
  let total = 0;

  // Simple hash for consistent random-looking values per username
  let hash = 0;
  for (let i = 0; i < seedUsername.length; i++) {
    hash = (hash << 5) - hash + seedUsername.charCodeAt(i);
    hash |= 0;
  }

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 370);

  for (let i = 0; i < 371; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    const val = Math.abs(Math.sin(i * 0.4 + hash) * 10) + Math.abs(Math.cos(i * 0.1) * 5);
    const count = Math.floor(val);
    let level = 0;
    if (count > 0) level = 1;
    if (count > 3) level = 2;
    if (count > 6) level = 3;
    if (count > 10) level = 4;

    total += count;
    days.push({
      date: d.toISOString().split('T')[0],
      count,
      level,
    });
  }

  return { days, total };
}

/**
 * Draws the high-res Retina contribution chart onto an HTML5 canvas
 */
export function drawContributionPoster(canvas: HTMLCanvasElement, options: DrawOptions) {
  const spec = POSTER_FORMATS[options.format] || POSTER_FORMATS.card;
  const theme = CANVAS_THEMES[options.themeKey] || CANVAS_THEMES['github-dark'];

  const width = spec.width;
  const height = spec.height;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear background
  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, width, height);

  // Decorative subtle border gradient
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = Math.max(2, Math.floor(width / 600));
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Sample data fallback
  const { days, total } = options.daysData && options.daysData.length > 0
    ? { days: options.daysData, total: options.totalCommits || options.daysData.reduce((acc, d) => acc + d.count, 0) }
    : generateSampleData(options.username || 'developer');

  // Header Title & Subtitle
  const titleText = options.title || `@${options.username || 'developer'}'s Code Journey`;
  const subtitleText = options.subtitle || `${total.toLocaleString()} contributions in the last year • Generated with GitLegacy`;

  const scale = width / 1200; // Scaling multiplier based on reference width of 1200px

  // Title
  ctx.fillStyle = theme.text;
  ctx.font = `900 ${Math.round(28 * scale)}px system-ui, -apple-system, sans-serif`;
  ctx.fillText(titleText, 40 * scale, 65 * scale);

  // Subtitle
  ctx.fillStyle = theme.textMuted;
  ctx.font = `600 ${Math.round(15 * scale)}px system-ui, -apple-system, sans-serif`;
  ctx.fillText(subtitleText, 40 * scale, 95 * scale);

  // Calculate Grid Coordinates
  const numWeeks = 53;
  const numDaysPerWeek = 7;

  // Size calculations
  const availableWidth = width - 100 * scale;
  const availableHeight = height - 180 * scale;

  const maxSquareW = Math.floor((availableWidth - (numWeeks - 1) * (3 * scale)) / numWeeks);
  const maxSquareH = Math.floor((availableHeight - (numDaysPerWeek - 1) * (3 * scale)) / numDaysPerWeek);

  const squareSize = Math.max(4, Math.min(maxSquareW, maxSquareH, 30 * scale));
  const gap = Math.max(1, Math.floor(squareSize * 0.22));

  const totalGridWidth = numWeeks * squareSize + (numWeeks - 1) * gap;
  const totalGridHeight = numDaysPerWeek * squareSize + (numDaysPerWeek - 1) * gap;

  const startX = (width - totalGridWidth) / 2;
  const startY = (height - totalGridHeight) / 2 + 20 * scale;

  // Draw Day Labels (Mon, Wed, Fri)
  ctx.fillStyle = theme.textMuted;
  ctx.font = `600 ${Math.round(Math.max(9, squareSize * 0.7))}px system-ui, -apple-system, sans-serif`;
  const dayIndices = [1, 3, 5]; // Mon, Wed, Fri
  dayIndices.forEach((dIdx, i) => {
    const labelY = startY + dIdx * (squareSize + gap) + squareSize * 0.85;
    ctx.fillText(DAY_LABELS[i], startX - 35 * scale, labelY);
  });

  // Draw Grid Cells & Month Headers
  let currentMonth = -1;

  for (let w = 0; w < numWeeks; w++) {
    const x = startX + w * (squareSize + gap);

    for (let d = 0; d < numDaysPerWeek; d++) {
      const idx = w * 7 + d;
      const dayData = days[idx] || { level: 0, count: 0, date: '' };
      const y = startY + d * (squareSize + gap);

      // Check month transition for month label rendering
      if (dayData.date && d === 0) {
        const dateObj = new Date(dayData.date);
        const m = dateObj.getMonth();
        if (m !== currentMonth) {
          currentMonth = m;
          ctx.fillStyle = theme.textMuted;
          ctx.font = `700 ${Math.round(Math.max(9, squareSize * 0.75))}px system-ui, -apple-system, sans-serif`;
          ctx.fillText(MONTH_NAMES[m], x, startY - 10 * scale);
        }
      }

      // Draw contribution square
      ctx.fillStyle = theme.levels[dayData.level] || theme.levels[0];

      // Rounded rectangle
      const radius = Math.max(1, Math.floor(squareSize * 0.2));
      ctx.beginPath();
      ctx.roundRect(x, y, squareSize, squareSize, radius);
      ctx.fill();
    }
  }

  // Draw Footer Watermark & Legend
  const footerY = height - 30 * scale;

  // Legend
  ctx.fillStyle = theme.textMuted;
  ctx.font = `600 ${Math.round(12 * scale)}px system-ui, -apple-system, sans-serif`;
  ctx.fillText('Less', startX, footerY);

  const legendX = startX + 35 * scale;
  const legendSquareSize = Math.max(8, 12 * scale);
  const legendGap = Math.max(2, 3 * scale);

  theme.levels.forEach((lvlColor, idx) => {
    ctx.fillStyle = lvlColor;
    const lx = legendX + idx * (legendSquareSize + legendGap);
    const ly = footerY - legendSquareSize * 0.8;
    ctx.beginPath();
    ctx.roundRect(lx, ly, legendSquareSize, legendSquareSize, 2);
    ctx.fill();
  });

  ctx.fillStyle = theme.textMuted;
  ctx.fillText('More', legendX + 5 * (legendSquareSize + legendGap) + 5 * scale, footerY);

  // Watermark
  ctx.fillStyle = theme.text;
  ctx.font = `900 ${Math.round(13 * scale)}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillText('GitLegacy.dev ⚡', width - 40 * scale, footerY);
  ctx.textAlign = 'left';
}
