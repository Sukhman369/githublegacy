import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * ARCHIVED SOCIAL SHARE BUTTONS
 * Location: src/components/archive/social-share-backup.tsx
 * Purpose: Preserves the standard "Share on X" and "Share on LinkedIn" modal buttons & URL generators.
 */

export interface ArchivedSocialShareProps {
  shareText: string;
  shareUrl: string;
}

export function generateSocialShareUrls(shareText: string, shareUrl: string) {
  const twitterShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  return { twitterShareUrl, linkedinShareUrl };
}

export const ArchivedSocialShareButtons: React.FC<ArchivedSocialShareProps> = ({ shareText, shareUrl }) => {
  const { twitterShareUrl, linkedinShareUrl } = generateSocialShareUrls(shareText, shareUrl);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {/* Share on X */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-sm bg-black hover:bg-slate-900 text-white border border-slate-800 shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Share on X</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </a>

      {/* Share on LinkedIn */}
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
        </svg>
        <span>Share on LinkedIn</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </a>
    </div>
  );
};
