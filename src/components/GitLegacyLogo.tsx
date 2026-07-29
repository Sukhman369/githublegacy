'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const GitLegacyLogo: React.FC<LogoProps> = ({
  className = 'h-10 w-10',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Octocat Silhouette Circle Background */}
      <path
        d="M48 14C29.222 14 14 29.222 14 48c0 15.022 9.742 27.766 23.254 32.257 1.7.313 2.324-.738 2.324-1.638 0-.809-.03-3.486-.045-6.315-9.458 2.056-11.453-4.015-11.453-4.015-1.547-3.928-3.776-4.974-3.776-4.974-3.085-2.11.233-2.067.233-2.067 3.413.24 5.21 3.504 5.21 3.504 3.033 5.198 7.96 3.697 9.898 2.827.307-2.197 1.187-3.698 2.16-4.549-7.55-.858-15.488-3.775-15.488-16.804 0-3.712 1.326-6.746 3.504-9.125-.35-0.859-1.519-4.316.333-8.999 0 0 2.856-.914 9.356 3.487a32.58 32.58 0 018.513-1.144c2.887.013 5.795.39 8.516 1.144 6.495-4.401 9.345-3.487 9.345-3.487 1.857 4.683.688 8.14.338 8.999 2.183 2.379 3.5 5.413 3.5 9.125 0 13.062-7.95 15.936-15.525 16.777 1.22 1.052 2.31 3.13 2.31 6.307 0 4.553-.042 8.226-.042 9.345 0 .908.614 1.965 2.342 1.632C72.268 75.756 82 63.018 82 48c0-18.778-15.222-34-34-34z"
        fill="#090d16"
      />

      {/* Main Dark Circle border/glow */}
      <circle cx="48" cy="48" r="34" stroke="#1e293b" strokeWidth="3" />

      {/* Document Sheet Overlay */}
      <g filter="url(#shadow)">
        {/* Paper Background */}
        <path
          d="M 44 24 L 72 24 L 84 36 L 84 82 C 84 85.314 81.314 88 78 88 L 44 88 C 40.686 88 38 85.314 38 82 L 38 30 C 38 26.686 40.686 24 44 24 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Folded Corner */}
        <path
          d="M 72 24 L 72 36 L 84 36 Z"
          fill="#E2E8F0"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Green Git Branch Timeline Line */}
        <line
          x1="51"
          y1="34"
          x2="51"
          y2="78"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Green Commit Node 1 */}
        <circle cx="51" cy="40" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />

        {/* Green Commit Node 2 */}
        <circle cx="51" cy="56" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />

        {/* Green Commit Node 3 */}
        <circle cx="51" cy="72" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />

        {/* Horizontal Commit Log Lines */}
        <line x1="60" y1="40" x2="76" y2="40" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="60" y1="48" x2="71" y2="48" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="60" y1="56" x2="76" y2="56" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="60" y1="64" x2="69" y2="64" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="60" y1="72" x2="76" y2="72" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Shadow Definition */}
      <defs>
        <filter id="shadow" x="32" y="20" width="60" height="76" filterUnits="userSpaceOnUse">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
    </svg>
  );
};
