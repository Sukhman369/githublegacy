'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, X, Download, Code, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GitLegacyLogo } from './GitLegacyLogo';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bashScript: string;
  pythonScript: string;
  projectName: string;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  bashScript,
  pythonScript,
  projectName,
}) => {
  const [tab, setTab] = useState<'bash' | 'python'>('bash');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentScript = tab === 'bash' ? bashScript : pythonScript;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = tab === 'bash' ? 'git_legacy_art.sh' : 'git_legacy_art.py';
    const blob = new Blob([currentScript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <GitLegacyLogo className="h-9 w-9" size={36} />
            <div>
              <h3 className="text-base font-bold text-white">Automated Commit Script</h3>
              <p className="text-xs text-slate-400">Run this locally to generate backdated commits for your repository</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-slate-900">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('bash')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                tab === 'bash'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Bash Shell Script (.sh)</span>
            </button>
            <button
              onClick={() => setTab('python')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                tab === 'python'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Python Script (.py)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Script'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950 flex-1 space-y-4">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 font-sans space-y-1">
            <p className="text-white font-semibold flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 text-emerald-400" />
              How to execute:
            </p>
            {tab === 'bash' ? (
              <ol className="list-decimal list-inside text-xs space-y-1 text-slate-300">
                <li>Save file as <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">git_legacy_art.sh</code></li>
                <li>Make executable: <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">chmod +x git_legacy_art.sh</code></li>
                <li>Execute: <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">./git_legacy_art.sh</code></li>
              </ol>
            ) : (
              <ol className="list-decimal list-inside text-xs space-y-1 text-slate-300">
                <li>Save file as <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">git_legacy_art.py</code></li>
                <li>Execute: <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">python git_legacy_art.py</code></li>
              </ol>
            )}
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-emerald-400 overflow-x-auto selection:bg-emerald-500 selection:text-slate-950">
            {currentScript}
          </pre>
        </div>
      </div>
    </div>
  );
};
