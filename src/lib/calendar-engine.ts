import {
  CalendarGrid,
  ContributionCell,
  ContributionWeek,
  IntensityLevel,
  PlannerSettings,
} from '../types/calendar';
import { textToMatrix } from './font-matrix';

/**
 * Generate 53-week calendar structure for specified year (Jan 1 to Dec 31).
 */
export function createYearlyCalendarGrid(year: number): CalendarGrid {
  const startDate = new Date(Date.UTC(year, 0, 1)); // Jan 1
  const endDate = new Date(Date.UTC(year, 11, 31)); // Dec 31

  // Determine starting day of week for Jan 1 (0 = Sun, 6 = Sat)
  const startDayOfWeek = startDate.getUTCDay();

  // Create empty 53 weeks x 7 days structure
  const weeks: ContributionWeek[] = [];
  let currentDate = new Date(startDate);
  
  // Pad week 0 days prior to Jan 1 with null/out-of-bounds or inactive cells if needed,
  // or align Jan 1 at `startDayOfWeek`.
  // In GitHub calendar, week 0 day 0 is the Sunday on or preceding Jan 1.
  const calendarFirstSunday = new Date(startDate);
  calendarFirstSunday.setUTCDate(startDate.getUTCDate() - startDayOfWeek);

  let currentLoopDate = new Date(calendarFirstSunday);

  for (let weekIdx = 0; weekIdx < 53; weekIdx++) {
    const days: ContributionCell[] = [];
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      const dateStr = currentLoopDate.toISOString().split('T')[0];
      const isSameYear = currentLoopDate.getUTCFullYear() === year;

      days.push({
        date: dateStr,
        year: currentLoopDate.getUTCFullYear(),
        month: currentLoopDate.getUTCMonth(),
        dayOfWeek: dayIdx,
        weekIndex: weekIdx,
        commitCount: 0,
        level: 0,
      });

      // Advance by 1 day
      currentLoopDate.setUTCDate(currentLoopDate.getUTCDate() + 1);
    }
    weeks.push({ weekIndex: weekIdx, days });
  }

  const totalDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return {
    year,
    weeks,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    totalDays,
  };
}

/**
 * Map text pattern matrix onto 53-week calendar grid
 */
export function applyPatternToCalendar(
  grid: CalendarGrid,
  settings: PlannerSettings,
  customOverrides: Record<string, { commitCount: number; level: IntensityLevel }> = {}
): CalendarGrid {
  const { text, intensityMaxCommits, letterSpacing, alignment } = settings;
  const { matrix, charMap } = textToMatrix(text, letterSpacing);

  const matrixCols = matrix[0]?.length || 0;
  const totalWeeksAvailable = 53;

  // Calculate starting week index based on alignment
  let startWeekIdx = 0;
  if (alignment === 'center') {
    startWeekIdx = Math.max(0, Math.floor((totalWeeksAvailable - matrixCols) / 2));
  } else if (alignment === 'right') {
    startWeekIdx = Math.max(0, totalWeeksAvailable - matrixCols);
  }

  // Clone weeks grid
  const updatedWeeks: ContributionWeek[] = grid.weeks.map((week) => ({
    weekIndex: week.weekIndex,
    days: week.days.map((day) => ({ ...day })),
  }));

  // Iterate over each cell in grid
  for (let w = 0; w < totalWeeksAvailable; w++) {
    const colInMatrix = w - startWeekIdx;
    const isWithinMatrixCols = colInMatrix >= 0 && colInMatrix < matrixCols;

    for (let d = 0; d < 7; d++) {
      const cell = updatedWeeks[w].days[d];
      
      // Check if user manually clicked/overrode this specific date
      if (customOverrides[cell.date]) {
        cell.commitCount = customOverrides[cell.date].commitCount;
        cell.level = customOverrides[cell.date].level;
        cell.isCustomDrawn = true;
        continue;
      }

      if (isWithinMatrixCols) {
        const isPixelActive = matrix[d]?.[colInMatrix] === 1;
        const pixelInfo = charMap[d]?.[colInMatrix] || undefined;

        if (isPixelActive) {
          // Calculate commits for active pixel
          const commits = intensityMaxCommits;
          cell.commitCount = commits;
          cell.level = calculateLevel(commits, intensityMaxCommits);
          cell.char = pixelInfo?.char;
          cell.pixelCoord = pixelInfo || undefined;
        } else {
          cell.commitCount = 0;
          cell.level = 0;
        }
      } else {
        cell.commitCount = 0;
        cell.level = 0;
      }
    }
  }

  return {
    ...grid,
    weeks: updatedWeeks,
  };
}

/**
 * Calculate GitHub 0-4 contribution level based on commits and max commits
 */
export function calculateLevel(commits: number, maxCommits: number): IntensityLevel {
  if (commits <= 0) return 0;
  if (commits >= maxCommits) return 4;
  
  const ratio = commits / maxCommits;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}
