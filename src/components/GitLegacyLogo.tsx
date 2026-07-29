'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
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
      {/* 1. Black Circle Background on Left */}
      <circle cx="36" cy="46" r="30" fill="#0D1117" />

      {/* 2. White GitHub Octocat Silhouette inside Circle */}
      <path
        d="M36 22c-13.25 0-24 10.75-24 24 0 10.6 6.87 19.59 16.4 22.76 1.2 0.22 1.64-0.52 1.64-1.16 0-0.57-0.02-2.46-0.03-4.46-6.07 1.11-7.63-1.48-8.11-2.83-0.27-0.69-1.43-2.83-2.44-3.4-0.83-0.45-2.02-1.56-0.04-1.59 1.87-0.03 3.2 1.72 3.64 2.43 2.13 3.6 5.55 2.57 6.9 1.96 0.21-1.54 0.83-2.57 1.51-3.16-5.34-0.6-10.95-2.67-10.95-11.88 0-2.62 0.94-4.77 2.48-6.46-0.25-0.61-1.07-3.05 0.24-6.36 0 0 2.02-0.65 6.62 2.46 1.92-0.53 3.97-0.8 6.01-0.81 2.04 0.01 4.09 0.28 6.01 0.81 4.6-3.11 6.62-2.46 6.62-2.46 1.31 3.31 0.49 5.75 0.24 6.36 1.54 1.69 2.48 3.84 2.48 6.46 0 9.23-5.62 11.27-10.98 11.87 0.86 0.74 1.63 2.2 1.63 4.44 0 3.21-0.03 5.8-0.03 6.59 0 0.64 0.43 1.39 1.65 1.15 9.53-3.18 16.39-12.17 16.39-22.76 0-13.25-10.75-24-24-24z"
        fill="#FFFFFF"
      />

      {/* 3. White Document Overlay on Right Side */}
      <g filter="url(#drop-shadow)">
        {/* Document Outer Card */}
        <path
          d="M 50 18 L 72 18 L 84 30 L 84 76 C 84 79.314 81.314 82 78 82 L 50 82 C 46.686 82 44 79.314 44 76 L 44 22 C 44 18.686 46.686 18 50 18 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Dog-ear Folded Top Right Corner */}
        <path
          d="M 72 18 L 72 30 L 84 30 Z"
          fill="#F1F5F9"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Green Commit Branch Vertical Line */}
        <line
          x1="54"
          y1="28"
          x2="54"
          y2="72"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 3 Green Commit Node Circles */}
        <circle cx="54" cy="34" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="54" cy="50" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="54" cy="66" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Commit Log Item Horizontal Lines */}
        <line x1="63" y1="34" x2="77" y2="34" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="63" y1="42" x2="72" y2="42" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <line x1="63" y1="50" x2="77" y2="50" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="63" y1="58" x2="70" y2="58" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <line x1="63" y1="66" x2="77" y2="66" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Subtle Drop Shadow */}
      <defs>
        <filter id="drop-shadow" x="40" y="14" width="50" height="74" filterUnits="userSpaceOnUse">
          <feDropShadow dx="1.5" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  );
};
