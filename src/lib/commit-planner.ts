import { CalendarGrid, StrategyStats } from '../types/calendar';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Calculate strategy stats and analytics for the generated calendar grid
 */
export function calculateStrategyStats(grid: CalendarGrid): StrategyStats {
  let totalCommits = 0;
  let activeDays = 0;
  let peakCommits = 0;
  let peakDate = '';
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const monthlyMap: Record<number, number> = {};
  for (let m = 0; m < 12; m++) {
    monthlyMap[m] = 0;
  }

  let totalYearDays = 0;

  // Flatten all days in chronological order
  const allDays = grid.weeks.flatMap((w) => w.days).filter((d) => d.year === grid.year);
  totalYearDays = allDays.length;

  allDays.forEach((cell) => {
    const commits = cell.commitCount;
    totalCommits += commits;

    if (commits > 0) {
      activeDays++;
      monthlyMap[cell.month] = (monthlyMap[cell.month] || 0) + commits;

      if (commits > peakCommits) {
        peakCommits = commits;
        peakDate = cell.date;
      }

      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  });

  currentStreak = tempStreak;

  const avgCommitsPerActiveDay = activeDays > 0 ? Math.round((totalCommits / activeDays) * 10) / 10 : 0;
  const completionRate = totalYearDays > 0 ? Math.round((activeDays / totalYearDays) * 1000) / 10 : 0;

  const monthlyDistribution = MONTH_NAMES.map((monthName, idx) => ({
    monthName,
    commits: monthlyMap[idx] || 0,
  }));

  return {
    totalCommits,
    activeDays,
    totalYearDays,
    avgCommitsPerActiveDay,
    peakCommits,
    peakDate: peakDate || `${grid.year}-01-01`,
    completionRate,
    longestStreak,
    currentStreak,
    monthlyDistribution,
  };
}
