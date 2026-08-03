export interface ThemePalette {
  id: string;
  name: string;
  background: string;
  text: string;
  textMuted: string;
  levels: [string, string, string, string, string]; // 0 to 4
}

export const THEMES: Record<string, ThemePalette> = {
  github: {
    id: 'github',
    name: 'GitHub',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  },
  githubClassic: {
    id: 'githubClassic',
    name: 'GitHub Classic',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#eee', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  },
  githubDark: {
    id: 'githubDark',
    name: 'GitHub Dark',
    background: '#0d1117',
    text: '#c9d1d9',
    textMuted: '#8b949e',
    levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  },
  halloween: {
    id: 'halloween',
    name: 'Halloween',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#ebedf0', '#fdf156', '#ffc722', '#ff9711', '#04001c'],
  },
  teal: {
    id: 'teal',
    name: 'Teal',
    background: '#040d16',
    text: '#eceff1',
    textMuted: '#78909c',
    levels: ['#040d16', '#1de9b6', '#00bfa5', '#00897b', '#004d40'],
  },
  leftPad: {
    id: 'leftPad',
    name: '@left_pad',
    background: '#000000',
    text: '#ffffff',
    textMuted: '#888888',
    levels: ['#111111', '#333333', '#666666', '#999999', '#ffffff'],
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    background: '#282a36',
    text: '#f8f8f2',
    textMuted: '#6272a4',
    levels: ['#343746', '#6272a4', '#8be9fd', '#bd93f9', '#ff79c6'],
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#ebedf0', '#bbdefb', '#64b5f6', '#2196f3', '#0d47a1'],
  },
  panda: {
    id: 'panda',
    name: 'Panda 🐼',
    background: '#292a2b',
    text: '#e6e6e6',
    textMuted: '#888888',
    levels: ['#292a2b', '#ff75b5', '#ff9ac1', '#19f9d8', '#6fc1ff'],
  },
  sunny: {
    id: 'sunny',
    name: 'Sunny',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#fffde7', '#fff59d', '#ffee58', '#fdd835', '#f57f17'],
  },
  pink: {
    id: 'pink',
    name: 'Pink',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ad1457'],
  },
  ylGnBu: {
    id: 'ylGnBu',
    name: 'YlGnBu',
    background: '#ffffff',
    text: '#24292e',
    textMuted: '#586069',
    levels: ['#ffffd9', '#c7e9b4', '#41b6c4', '#225ea8', '#081d58'],
  },
  solarizedDark: {
    id: 'solarizedDark',
    name: 'Solarized Dark',
    background: '#002b36',
    text: '#839496',
    textMuted: '#586e75',
    levels: ['#073642', '#2aa198', '#859900', '#b58900', '#d33682'],
  },
  solarizedLight: {
    id: 'solarizedLight',
    name: 'Solarized Light',
    background: '#fdf6e3',
    text: '#586e75',
    textMuted: '#93a1a1',
    levels: ['#fdf6e3', '#2aa198', '#859900', '#b58900', '#d33682'],
  },
};

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface YearContributionData {
  year: number;
  total: number;
  isSoFar?: boolean;
  days: ContributionDay[];
}

export interface MultiYearData {
  username: string;
  totalContributionsAllTime: number;
  years: YearContributionData[];
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formats raw API data from jogruber / GitHub endpoint into structured MultiYearData
 */
export function formatRawContributionsToMultiYear(username: string, apiData: any): MultiYearData {
  if (!apiData || !apiData.contributions || !Array.isArray(apiData.contributions)) {
    return generateMultiYearSampleData(username);
  }

  const rawList: { date: string; count: number; level: number }[] = apiData.contributions;
  const totalsByYear: Record<string, number> = apiData.total || {};

  const daysByYear: Record<number, ContributionDay[]> = {};

  rawList.forEach((c) => {
    const yr = new Date(c.date).getFullYear();
    if (!daysByYear[yr]) {
      daysByYear[yr] = [];
    }
    daysByYear[yr].push({
      date: c.date,
      count: c.count || 0,
      level: c.level || 0,
    });
  });

  const availableYears = Object.keys(daysByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const currentYear = new Date().getFullYear();
  let grandTotal = 0;

  const years: YearContributionData[] = availableYears.map((yr) => {
    const days = daysByYear[yr];
    const yearTotal = totalsByYear[yr] !== undefined
      ? totalsByYear[yr]
      : days.reduce((acc, d) => acc + d.count, 0);

    grandTotal += yearTotal;

    return {
      year: yr,
      total: yearTotal,
      isSoFar: yr === currentYear,
      days,
    };
  });

  return {
    username,
    totalContributionsAllTime: grandTotal,
    years: years.length > 0 ? years : generateMultiYearSampleData(username).years,
  };
}

/**
 * Generates realistic multi-year contribution data for 4 years (e.g. 2026, 2025, 2024, 2023)
 */
export function generateMultiYearSampleData(username: string): MultiYearData {
  const currentYear = new Date().getFullYear(); // e.g. 2026
  const yearsList = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = (hash << 5) - hash + username.charCodeAt(i);
    hash |= 0;
  }

  let grandTotal = 0;
  const yearDataArray: YearContributionData[] = [];

  yearsList.forEach((yr, yrIndex) => {
    const isCurrent = yr === currentYear;
    const totalDays = isCurrent ? 240 : 365; // partial year for current year
    const days: ContributionDay[] = [];
    let yearTotal = 0;

    const startDate = new Date(yr, 0, 1);

    for (let i = 0; i < 364; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);

      if (d.getFullYear() > yr) break;

      let count = 0;
      // Make most recent year active, older years sparser or active based on seed
      const randSeed = Math.abs(Math.sin(i * 0.3 + hash + yrIndex) * 10);
      if (yrIndex === 0) {
        count = randSeed > 3 ? Math.floor(randSeed * 1.5) : 0;
      } else if (yrIndex === 3 && i === 300) {
        count = 5; // e.g. small commits in past
      }

      let level = 0;
      if (count > 0) level = 1;
      if (count > 3) level = 2;
      if (count > 6) level = 3;
      if (count > 10) level = 4;

      yearTotal += count;
      days.push({
        date: d.toISOString().split('T')[0],
        count,
        level,
      });
    }

    grandTotal += yearTotal;
    yearDataArray.push({
      year: yr,
      total: yearTotal,
      isSoFar: isCurrent,
      days,
    });
  });

  return {
    username,
    totalContributionsAllTime: grandTotal || 442,
    years: yearDataArray,
  };
}

/**
 * Draws the complete multi-year poster canvas matching github-contributions.vercel.app
 */
export function drawMultiYearPoster(
  canvas: HTMLCanvasElement,
  data: MultiYearData,
  themeKey: string
) {
  const theme = THEMES[themeKey] || THEMES.githubClassic;

  const canvasWidth = 1000;
  const padding = 40;
  const headerHeight = 90;
  const yearHeaderHeight = 35;
  const gridHeight = 110;
  const yearSectionHeight = yearHeaderHeight + gridHeight + 20;
  const footerHeight = 40;

  const totalHeight = padding * 2 + headerHeight + data.years.length * yearSectionHeight + footerHeight;

  canvas.width = canvasWidth;
  canvas.height = totalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, canvasWidth, totalHeight);

  // Top Header: "@username on GitHub"
  ctx.fillStyle = theme.text;
  ctx.font = 'bold 26px "Courier New", Courier, monospace, system-ui';
  ctx.fillText(`@${data.username} on GitHub`, padding, padding + 30);

  ctx.font = '14px "Courier New", Courier, monospace, system-ui';
  ctx.fillStyle = theme.textMuted;
  ctx.fillText(`Total Contributions: ${data.totalContributionsAllTime.toLocaleString()}`, padding, padding + 60);

  // Less / More Legend (top right)
  const legendRightX = canvasWidth - padding;
  ctx.fillStyle = theme.textMuted;
  ctx.font = '12px "Courier New", Courier, monospace, system-ui';
  ctx.textAlign = 'right';
  ctx.fillText('More', legendRightX, padding + 30);

  const squareSize = 13;
  const gap = 3;

  const legendX = legendRightX - 35;
  for (let i = 4; i >= 0; i--) {
    ctx.fillStyle = theme.levels[i];
    ctx.fillRect(legendX - (4 - i) * (squareSize + gap), padding + 18, squareSize, squareSize);
  }
  ctx.fillText('Less', legendX - 5 * (squareSize + gap) - 5, padding + 30);
  ctx.textAlign = 'left';

  // Render each year's grid
  let currentY = padding + headerHeight;

  data.years.forEach((yData) => {
    // Year Header Line
    ctx.fillStyle = theme.text;
    ctx.font = 'bold 14px "Courier New", Courier, monospace, system-ui';
    const yearTitle = `${yData.year}: ${yData.total} Contributions ${yData.isSoFar ? '(so far)' : ''}`;
    ctx.fillText(yearTitle, padding, currentY + 15);

    const gridStartY = currentY + yearHeaderHeight;

    // Month headers
    ctx.fillStyle = theme.textMuted;
    ctx.font = '11px "Courier New", Courier, monospace, system-ui';

    const numWeeks = 53;
    const startX = padding;

    let lastMonth = -1;
    for (let w = 0; w < numWeeks; w++) {
      const dayIndex = w * 7;
      const dayObj = yData.days[dayIndex];
      if (dayObj && dayObj.date) {
        const m = new Date(dayObj.date).getMonth();
        if (m !== lastMonth) {
          lastMonth = m;
          const monthX = startX + w * (squareSize + gap);
          ctx.fillText(MONTH_NAMES[m], monthX, gridStartY - 6);
        }
      }
    }

    // Grid squares
    for (let w = 0; w < numWeeks; w++) {
      const x = startX + w * (squareSize + gap);
      for (let d = 0; d < 7; d++) {
        const idx = w * 7 + d;
        const day = yData.days[idx];
        const y = gridStartY + d * (squareSize + gap);

        ctx.fillStyle = day ? theme.levels[day.level] : theme.levels[0];
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }

    currentY += yearSectionHeight;
  });

  // Footer
  ctx.fillStyle = theme.textMuted;
  ctx.font = '12px "Courier New", Courier, monospace, system-ui';
  ctx.fillText(`Made by GitLegacy.co ⚡ - inspired by github-contributions.vercel.app`, padding, totalHeight - padding + 15);
}
