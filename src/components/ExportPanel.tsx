'use client';

import React, { useState } from 'react';
import { CalendarGrid, PlannerSettings } from '../types/calendar';
import { generateCSV, generateJSON, generateBashScript, generatePythonScript, generatePowerShellScript } from '../lib/export-engine';
import { ScriptModal } from './ScriptModal';
import { downloadGraphAsSVG } from '../lib/graph-image-export';
import { Download, FileSpreadsheet, FileCode, Terminal, Sparkles, FileImage } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportPanelProps {
  grid: CalendarGrid;
  settings: PlannerSettings;
  isDarkMode?: boolean;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ grid, settings, isDarkMode = true }) => {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleDownloadSVG = () => {
    downloadGraphAsSVG(grid, settings);
    triggerConfetti();
  };

  const handleExportCSV = () => {
    const csvContent = generateCSV(grid);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const handleExportJSON = () => {
    const jsonContent = generateJSON(grid, settings);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const handleShareLink = () => {
    const params = new URLSearchParams({
      text: settings.text,
      year: settings.year.toString(),
      intensity: settings.intensityMaxCommits.toString(),
      theme: settings.themeId,
      align: settings.alignment,
    });
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedFormat('share');
    triggerConfetti();
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  const targetUsername = settings.username || 'your-username';
  const targetRepoName = settings.repoName || 'github-art-canvas';
  const bashScript = generateBashScript(grid, targetRepoName, targetUsername);
  const pythonScript = generatePythonScript(grid, targetUsername, targetRepoName);
  const powerShellScript = generatePowerShellScript(grid, targetUsername, targetRepoName);

  return (
    <>
      <div
        className={`rounded-2xl border p-5 shadow-xl transition-colors space-y-4 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className={`flex items-center justify-between border-b pb-3 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Download className="h-5 w-5 text-emerald-500" />
            <span>Export & Commit Automation</span>
          </h3>
          <span className={`text-xs font-sans ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Ready to apply to your repository
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* 1-Click SVG Download */}
          <button
            onClick={handleDownloadSVG}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-teal-500/50 text-teal-300'
                : 'bg-slate-50 border-slate-200 hover:border-teal-400 text-teal-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-teal-400 border-slate-800' : 'bg-white text-teal-600 border-slate-200'
              }`}>
                <FileImage className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Download Vector (SVG)</p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Scalable vector file</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

          {/* Script Generator Button */}
          <button
            onClick={() => setIsScriptModalOpen(true)}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-emerald-400 border-slate-800' : 'bg-white text-emerald-600 border-slate-200'
              }`}>
                <Terminal className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Git Commit Script</p>
                <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-normal">PowerShell / Bash / Python</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-emerald-400 border-slate-800' : 'bg-white text-emerald-600 border-slate-200'
              }`}>
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Export CSV</p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Spreadsheet schedule</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

          {/* JSON Export */}
          <button
            onClick={handleExportJSON}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-cyan-400 border-slate-800' : 'bg-white text-cyan-600 border-slate-200'
              }`}>
                <FileCode className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Export JSON</p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Structured payload</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

        </div>
      </div>

      <ScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        bashScript={bashScript}
        pythonScript={pythonScript}
        powerShellScript={powerShellScript}
        projectName={settings.text}
        username={targetUsername}
        repoName={targetRepoName}
      />
    </>
  );
};
