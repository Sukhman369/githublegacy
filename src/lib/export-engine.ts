import { CalendarGrid, PlannerSettings } from '../types/calendar';

/**
 * Generate CSV export text
 */
export function generateCSV(grid: CalendarGrid): string {
  const header = 'Date,Commits,WeekIndex,DayOfWeek,Level,Character\n';
  const rows: string[] = [];

  grid.weeks.forEach((w) => {
    w.days.forEach((d) => {
      if (d.commitCount > 0) {
        const charStr = d.char ? `"${d.char}"` : '';
        rows.push(`${d.date},${d.commitCount},${d.weekIndex},${d.dayOfWeek},${d.level},${charStr}`);
      }
    });
  });

  return header + rows.join('\n');
}

/**
 * Generate JSON export text
 */
export function generateJSON(grid: CalendarGrid, settings: PlannerSettings): string {
  const activeCells = grid.weeks
    .flatMap((w) => w.days)
    .filter((d) => d.commitCount > 0)
    .map((d) => ({
      date: d.date,
      commits: d.commitCount,
      level: d.level,
      char: d.char,
    }));

  const payload = {
    projectName: 'GitLegacy Strategy',
    year: grid.year,
    text: settings.text,
    settings: {
      intensityMaxCommits: settings.intensityMaxCommits,
      letterSpacing: settings.letterSpacing,
      alignment: settings.alignment,
    },
    totalActiveDays: activeCells.length,
    totalCommits: activeCells.reduce((acc, c) => acc + c.commits, 0),
    schedule: activeCells,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Generate standalone Bash script to apply commits to a target Git repo
 */
export function generateBashScript(grid: CalendarGrid, repoName: string = 'githublegacy'): string {
  const activeCells = grid.weeks
    .flatMap((w) => w.days)
    .filter((d) => d.commitCount > 0 && d.year === grid.year);

  const lines: string[] = [
    '#!/bin/bash',
    '# =========================================================',
    `# GitLegacy Automated Commit Script for ${grid.year}`,
    `# Generated for repo: ${repoName}`,
    '# =========================================================',
    '',
    'set -e',
    '',
    'echo "🚀 Starting GitLegacy commit generation..."',
    'mkdir -p legacy_art_data',
    'cd legacy_art_data',
    'git init',
    '',
    '# Function to write commit',
    'make_commit() {',
    '  local commit_date="$1"',
    '  local count="$2"',
    '  for ((i=1; i<=count; i++)); do',
    '    echo "GitLegacy contribution: $commit_date #$i" >> activity.txt',
    '    git add activity.txt',
    '    GIT_AUTHOR_DATE="$commit_date 12:00:00" GIT_COMMITTER_DATE="$commit_date 12:00:00" \\',
    '    git commit -m "feat(legacy): contribution art $commit_date #$i" --quiet',
    '  done',
    '}',
    '',
  ];

  activeCells.forEach((c) => {
    lines.push(`make_commit "${c.date}" ${c.commitCount}`);
  });

  lines.push('');
  lines.push('echo "✅ Finished generating ' + activeCells.reduce((a, b) => a + b.commitCount, 0) + ' commits!"');
  lines.push('echo "👉 Now run: git remote add origin <YOUR_REPO_URL> && git push -u origin main --force"');

  return lines.join('\n');
}

/**
 * Generate Python automation script
 */
export function generatePythonScript(grid: CalendarGrid): string {
  const activeCells = grid.weeks
    .flatMap((w) => w.days)
    .filter((d) => d.commitCount > 0 && d.year === grid.year);

  const script = `import os
import subprocess

# GitLegacy Automation Script
# Total Active Days: ${activeCells.length}

SCHEDULE = ${JSON.stringify(activeCells.map(c => [c.date, c.commitCount]))}

def run_cmd(cmd, env=None):
    subprocess.run(cmd, shell=True, check=True, env=env)

print("Starting Git legacy generation...")

if not os.path.exists("activity_log.txt"):
    with open("activity_log.txt", "w") as f:
        f.write("GitLegacy Log\\n")

for date_str, count in SCHEDULE:
    for i in range(count):
        with open("activity_log.txt", "a") as f:
            f.write(f"Commit on {date_str} #{i+1}\\n")
        
        env = os.environ.copy()
        date_iso = f"{date_str}T12:00:00"
        env["GIT_AUTHOR_DATE"] = date_iso
        env["GIT_COMMITTER_DATE"] = date_iso
        
        run_cmd("git add activity_log.txt", env=env)
        run_cmd(f'git commit -m "feat(legacy): contribution {date_str} #{i+1}"', env=env)

print("Finished generating commits! Push to your repository to update GitHub contribution graph.")
`;

  return script;
}
