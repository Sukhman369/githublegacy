'use client';

import Script from 'next/script';
import React from 'react';

export const KofiWidget: React.FC = () => {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).kofiwidget2) {
          try {
            (window as any).kofiwidget2.init('Support me on Ko-fi', '#737af5', 'U1M224GXT4');
            (window as any).kofiwidget2.draw();
          } catch (e) {
            console.error('Ko-fi widget initialization error:', e);
          }
        }
      }}
    />
  );
};
