export type IntensityLevel = 0 | 1 | 2 | 3 | 4;

export interface PixelCoord {
  char: string;
  charIndex: number;
  col: number; // 0 to 4 in 5x7 matrix
  row: number; // 0 to 6 in 5x7 matrix
}

export interface ContributionCell {
  date: string; // YYYY-MM-DD
  year: number;
  month: number; // 0-11
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  weekIndex: number; // 0 to 52
  commitCount: number;
  level: IntensityLevel;
  char?: string;
  pixelCoord?: PixelCoord;
  isCustomDrawn?: boolean;
}

export interface ContributionWeek {
  weekIndex: number;
  days: ContributionCell[];
}

export interface CalendarGrid {
  year: number;
  weeks: ContributionWeek[];
  startDate: string;
  endDate: string;
  totalDays: number;
}

export type AlignmentMode = 'left' | 'center' | 'right';

export interface PlannerSettings {
  text: string;
  year: number;
  intensityMaxCommits: number; // Max commits for level 4 (e.g. 5, 10, 20)
  letterSpacing: number; // 1 to 3 columns gap
  alignment: AlignmentMode;
  columnOffset: number; // Column shift nudge (-10 to +10)
  themeId: string;
  drawingMode: 'select' | 'draw' | 'erase';
  drawIntensityLevel: IntensityLevel;
}

export interface CalendarTheme {
  id: string;
  name: string;
  isDark: boolean;
  levels: [string, string, string, string, string]; // level 0 (empty) to level 4
  bgCard: string;
  borderCard: string;
  textColor: string;
  subtextColor: string;
  gridBorder: string;
}

export interface StrategyStats {
  totalCommits: number;
  activeDays: number;
  totalYearDays: number;
  avgCommitsPerActiveDay: number;
  peakCommits: number;
  peakDate: string;
  completionRate: number; // Percentage of days with >0 commits
  longestStreak: number;
  currentStreak: number;
  monthlyDistribution: { monthName: string; commits: number }[];
}

export interface PresetPattern {
  id: string;
  name: string;
  text: string;
  description: string;
}
