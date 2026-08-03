'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import { Terminal, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScriptGeneratorPage() {
  const { isDarkMode } = useTheme();
  const [tab, setTab] = useState<'bash' | 'python'>('bash');
  const [copied, setCopied] = useState(false);

  const sampleBashScript = `#!/usr/bin/env bash
# GitLegacy Automated Backdated Commit Script
# Repository: gitlegacy

echo "🚀 Starting GitLegacy automated commit generation..."
git init

# Setting local author dates
GIT_AUTHOR_DATE="2026-01-05T12:00:00" GIT_COMMITTER_DATE="2026-01-05T12:00:00" git commit --allow-empty -m "GitLegacy commit [2026-01-05]"
GIT_AUTHOR_DATE="2026-01-06T12:00:00" GIT_COMMITTER_DATE="2026-01-06T12:00:00" git commit --allow-empty -m "GitLegacy commit [2026-01-06]"
GIT_AUTHOR_DATE="2026-01-07T12:00:00" GIT_COMMITTER_DATE="2026-01-07T12:00:00" git commit --allow-empty -m "GitLegacy commit [2026-01-07]"

echo "✅ All scheduled commits generated successfully!"
echo "👉 Run 'git push origin main' to publish your artwork to GitHub."
`;

  const samplePythonScript = `#!/usr/bin/env python3
# GitLegacy Python Automation Script

import os
import subprocess

COMMITS = [
    ("2026-01-05", 5),
    ("2026-01-06", 3),
    ("2026-01-07", 5),
]

def main():
    print("🚀 Starting GitLegacy python commit generator...")
    for date_str, count in COMMITS:
        for i in range(count):
            env = os.environ.copy()
            timestamp = f"{date_str}T12:00:00"
            env["GIT_AUTHOR_DATE"] = timestamp
            env["GIT_COMMITTER_DATE"] = timestamp
            subprocess.run(
                ["git", "commit", "--allow-empty", "-m", f"GitLegacy artwork commit {i+1}"],
                env=env,
                check=True
            )
    print("✅ Completed successfully! Run 'git push origin main'")

if __name__ == "__main__":
    main()
`;

  const activeScript = tab === 'bash' ? sampleBashScript : samplePythonScript;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
              isDarkMode
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>CLI Script Generator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            GitHub Backdated <span className="text-emerald-500">Commit Script Generator</span>
          </h1>

          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Generate standalone Bash (.sh) and Python (.py) CLI scripts to apply contribution artwork to your GitHub repository automatically.
          </p>
        </div>

        {/* Live Code Preview Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden space-y-0">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab('bash')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  tab === 'bash'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bash Script (.sh)
              </button>
              <button
                onClick={() => setTab('python')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  tab === 'python'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Python Script (.py)
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-bold transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Script'}</span>
            </button>
          </div>

          <pre className="p-6 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
            <code>{activeScript}</code>
          </pre>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/tools/art-studio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-lg hover:scale-105 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Design Custom Artwork in Studio</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
