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

/**
 * Generate PowerShell script for Windows users
 */
export function generatePowerShellScript(grid: CalendarGrid): string {
  const activeCells = grid.weeks
    .flatMap((w) => w.days)
    .filter((d) => d.commitCount > 0 && d.year === grid.year);

  const lines: string[] = [
    '# =========================================================',
    `# GitLegacy Automated Commit Script (PowerShell) for ${grid.year}`,
    '# =========================================================',
    '',
    '$ErrorActionPreference = "Stop"',
    'Write-Host "🚀 Starting GitLegacy commit generation..." -ForegroundColor Green',
    '',
    'New-Item -ItemType Directory -Force -Path "legacy_art_data" | Out-Null',
    'Set-Location "legacy_art_data"',
    'git init',
    '',
    '$schedule = @(',
  ];

  activeCells.forEach((c) => {
    lines.push(`  @{ Date = "${c.date}"; Count = ${c.commitCount} }`);
  });

  lines.push(')');
  lines.push('');
  lines.push('foreach ($item in $schedule) {');
  lines.push('  for ($i = 1; $i -le $item.Count; $i++) {');
  lines.push('    $commitDate = "$($item.Date)T12:00:00"');
  lines.push('    Add-Content -Path "activity.txt" -Value "GitLegacy contribution: $commitDate #$i"');
  lines.push('    git add activity.txt');
  lines.push('    $env:GIT_AUTHOR_DATE = $commitDate');
  lines.push('    $env:GIT_COMMITTER_DATE = $commitDate');
  lines.push('    git commit -m "feat(legacy): contribution art $($item.Date) #$i" --quiet');
  lines.push('  }');
  lines.push('}');
  lines.push('');
  lines.push('Remove-Item Env:\\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue');
  lines.push('Remove-Item Env:\\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue');
  lines.push('');
  lines.push(`Write-Host "✅ Finished generating ${activeCells.reduce((a, b) => a + b.commitCount, 0)} commits!" -ForegroundColor Green`);
  lines.push('Write-Host "👉 Now run: git remote add origin <YOUR_REPO_URL> && git push -u origin main --force" -ForegroundColor Yellow');

  return lines.join('\n');
}

/**
 * Draw offscreen high-res canvas banner and trigger PNG download
 */
function drawCanvasBanner(
  grid: CalendarGrid,
  theme: { isDark: boolean; levels: [string, string, string, string, string] },
  title: string,
  width: number,
  height: number,
  filename: string
) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = width * 2; // 2x DPI Retina
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(2, 2);

  // Background
  ctx.fillStyle = theme.isDark ? '#0d1117' : '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Card Border / Glow
  ctx.strokeStyle = theme.isDark ? '#30363d' : '#e1e4e8';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Grid dimensions calculation
  const availableW = width - 160;
  const cellW = Math.min(22, Math.max(8, Math.floor(availableW / 53)));
  const cellH = cellW;
  const gap = 3;
  const gridW = 53 * (cellW + gap);
  const gridH = 7 * (cellH + gap);

  const startX = Math.floor((width - gridW) / 2);
  const startY = Math.floor((height - gridH) / 2) + (height > 600 ? 40 : 15);

  // Header Title
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = theme.isDark ? '#f0f6fc' : '#1f2328';
  ctx.textAlign = 'center';
  ctx.fillText(`GitLegacy • ${title} (${grid.year})`, width / 2, startY - 35);

  // Subtitle
  ctx.font = '14px SFMono-Regular, Consolas, monospace';
  ctx.fillStyle = theme.isDark ? '#8b949e' : '#656d76';
  ctx.fillText(`GitHub Contribution Planning Studio`, width / 2, startY - 15);

  // Render Grid Cells
  grid.weeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = startX + wIdx * (cellW + gap);
      const y = startY + dIdx * (cellH + gap);

      ctx.fillStyle = theme.levels[day.level];
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, cellW, cellH, Math.max(1, Math.floor(cellW / 4)));
      } else {
        ctx.rect(x, y, cellW, cellH);
      }
      ctx.fill();
    });
  });

  // Footer Branding
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#10b981';
  ctx.fillText('Designed with gitlegacy.dev', width / 2, startY + gridH + 35);

  // Trigger Download
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function exportTwitterBanner(grid: CalendarGrid, theme: any, title: string = 'LORD') {
  drawCanvasBanner(grid, theme, title, 1500, 500, `git_legacy_twitter_banner_${grid.year}.png`);
}

export function exportLinkedInBanner(grid: CalendarGrid, theme: any, title: string = 'LORD') {
  drawCanvasBanner(grid, theme, title, 1584, 396, `git_legacy_linkedin_banner_${grid.year}.png`);
}

export function exportInstagramPost(grid: CalendarGrid, theme: any, title: string = 'LORD') {
  drawCanvasBanner(grid, theme, title, 1080, 1080, `git_legacy_instagram_post_${grid.year}.png`);
}

