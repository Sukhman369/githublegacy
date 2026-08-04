'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, X, Download, Code, Play, GitBranch, ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GitLegacyLogo } from './GitLegacyLogo';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bashScript: string;
  pythonScript: string;
  powerShellScript?: string;
  projectName: string;
  username?: string;
  repoName?: string;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  bashScript,
  pythonScript,
  powerShellScript = '',
  projectName,
  username = 'your-username',
  repoName = 'github-art-canvas',
}) => {
  const [tab, setTab] = useState<'powershell' | 'bash' | 'python'>('powershell');
  const [copied, setCopied] = useState(false);
  const [copiedStep2, setCopiedStep2] = useState(false);

  if (!isOpen) return null;

  const currentScript = tab === 'bash' ? bashScript : tab === 'python' ? pythonScript : powerShellScript;
  const scriptFileName = tab === 'bash' ? 'git_legacy_art.sh' : tab === 'python' ? 'git_legacy_art.py' : 'git_legacy_art.ps1';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentScript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = scriptFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pushCommandSnippet = `git remote add origin https://github.com/${username}/${repoName}.git\ngit push -u origin main --force`;

  const handleCopyPushCommand = () => {
    navigator.clipboard.writeText(pushCommandSnippet);
    setCopiedStep2(true);
    setTimeout(() => setCopiedStep2(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <GitLegacyLogo className="h-9 w-9" size={36} />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Automated Commit Script Generator</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  @{username}/{repoName}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Run locally to apply contribution artwork &apos;{projectName}&apos; to GitHub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab('powershell')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                tab === 'powershell'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>PowerShell (.ps1)</span>
            </button>
            <button
              onClick={() => setTab('bash')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                tab === 'bash'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Bash Shell (.sh)</span>
            </button>
            <button
              onClick={() => setTab('python')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                tab === 'python'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Python (.py)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Script!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Content Section: Detailed Execution Guide & Script View */}
        <div className="p-6 overflow-y-auto font-sans text-xs text-slate-300 bg-slate-950 flex-1 space-y-5">
          
          {/* Safety Warning Banner */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-200">
                Important: Push to a NEW Empty Repository (<span className="font-mono text-cyan-300">https://github.com/{username}/{repoName}</span>)
              </p>
              <p className="text-[11px] text-amber-300/90 leading-relaxed">
                Create a <strong>new, empty repository</strong> on GitHub for your contribution art. <strong>Do NOT push to an existing project codebase</strong>, as <code className="bg-amber-950/80 px-1 py-0.5 rounded text-amber-200">git push --force</code> will overwrite its commit history!
              </p>
            </div>
          </div>

          {/* Detailed Step-by-Step Execution Guide */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                <span>Complete Execution Guide</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Target: @{username}/{repoName}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[11px]">1</span>
                  <span>Save & Execute Script</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Download <code className="text-emerald-300 font-mono">{scriptFileName}</code> and run it in your local terminal:
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-400">
                  {tab === 'powershell' && `.\\${scriptFileName}`}
                  {tab === 'bash' && `chmod +x ${scriptFileName} && ./${scriptFileName}`}
                  {tab === 'python' && `python ${scriptFileName}`}
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[11px]">2</span>
                  <span>Link Remote & Force Push</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Navigate into <code className="text-cyan-300 font-mono">legacy_art_data</code> folder and push to GitHub:
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-cyan-300 space-y-1 relative group">
                  <button
                    onClick={handleCopyPushCommand}
                    className="absolute top-1 right-1 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copy commands"
                  >
                    {copiedStep2 ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                  <p>git remote add origin https://github.com/{username}/{repoName}.git</p>
                  <p>git push -u origin main --force</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/30 text-[11px]">3</span>
                  <span>Graph Syncing (1–2 mins)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  GitHub automatically recalculates contribution graph metrics within 60-120 seconds after pushing to main branch.
                </p>
              </div>
            </div>

            {/* Important GitHub Requirements Checklist */}
            <div className="pt-2 border-t border-slate-800/60">
              <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>GitHub Contribution Graph Requirements Checklist:</span>
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <li className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/60">
                  <GitBranch className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Must be on default branch (<code className="text-emerald-300">main</code> / <code className="text-emerald-300">master</code>)</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/60">
                  <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Git email must match your registered GitHub account email</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/60">
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Enable &quot;Private Contributions&quot; in profile settings if repo is private</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Script Source Code View */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-emerald-400" />
                <span>Generated Source ({scriptFileName})</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Ready for execution</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-emerald-400 font-mono text-xs overflow-x-auto selection:bg-emerald-500 selection:text-slate-950 max-h-60 leading-relaxed">
              {currentScript}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};
