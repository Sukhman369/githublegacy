'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { BLOG_POSTS } from '../../../lib/blog-data';
import { useTheme } from '../../../context/ThemeContext';
import { ArrowLeft, Clock, Calendar, Share2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
        <Link href="/blog" className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl">
          Return to Blog Corner
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className={`inline-flex items-center gap-2 text-xs font-semibold hover:text-emerald-500 transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog Corner</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 border-b pb-8 border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                S
              </div>
              <div>
                <p className="font-bold text-sm">{post.author.name}</p>
                <p className="opacity-70 text-[11px]">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-80">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <article className={`max-w-none space-y-5 text-base leading-relaxed ${
          isDarkMode ? 'text-slate-200' : 'text-slate-800'
        }`}>
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();

            // Horizontal rule
            if (trimmed === '---') {
              return (
                <hr key={index} className={`my-6 border-t ${
                  isDarkMode ? 'border-slate-700/60' : 'border-slate-300'
                }`} />
              );
            }

            // Heading h3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-bold text-emerald-500 mt-8 mb-3">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            // Numbered list (1. 2. 3. etc.)
            if (/^\d+\.\s/.test(trimmed)) {
              const listItems = trimmed.split('\n').filter((line) => /^\d+\.\s/.test(line.trim()));
              return (
                <ol key={index} className="list-decimal pl-6 space-y-1.5 my-3">
                  {listItems.map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              );
            }

            // Unordered list
            if (trimmed.startsWith('- ')) {
              const listItems = trimmed.split('\n').filter((l) => l.trim().startsWith('- '));
              return (
                <ul key={index} className="list-disc pl-6 space-y-1.5 my-3">
                  {listItems.map((item, i) => (
                    <li key={i}>{item.replace(/^\s*-\s/, '')}</li>
                  ))}
                </ul>
              );
            }

            // Code block
            if (trimmed.startsWith('```')) {
              const codeText = trimmed.replace(/```[a-z]*/g, '').trim();
              return (
                <pre key={index} className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 my-4">
                  <code>{codeText}</code>
                </pre>
              );
            }

            // Bare code line (no markdown fences, just a long command)
            if (trimmed.startsWith('GIT_AUTHOR_DATE') || trimmed.startsWith('git ') || trimmed.startsWith('chmod') || trimmed.startsWith('./')) {
              return (
                <pre key={index} className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 my-4">
                  <code>{trimmed}</code>
                </pre>
              );
            }

            if (!trimmed) return null;

            return <p key={index}>{trimmed}</p>;
          })}
        </article>

        {/* Footer Call to Action */}
        <div className={`mt-12 p-6 rounded-2xl border text-center space-y-3 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h4 className="text-lg font-bold">Ready to design your contribution art?</h4>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Try GitLegacy Studio now and generate backdated commit scripts in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Open GitLegacy Studio</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
