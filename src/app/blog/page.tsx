'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BLOG_POSTS } from '../../lib/blog-data';
import { BookOpen, Search, Sparkles, Clock, ArrowRight, Tag, User } from 'lucide-react';

export default function BlogIndexPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(BLOG_POSTS.flatMap((post) => post.tags)));

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode((prev) => !prev)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
              isDarkMode
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>GitLegacy Blog Corner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Developer Guides & <span className="text-emerald-500">Git Insights</span>
          </h1>

          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Articles, tutorials, and deep dives on GitHub contribution algorithms, Git CLI tips, and profile customization.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl border focus:outline-none focus:border-emerald-500 ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedTag === null
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-400 border border-slate-800'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Banner */}
        {featuredPost && !searchQuery && !selectedTag && (
          <div
            className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-all relative overflow-hidden group ${
              isDarkMode
                ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800'
                : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-3">
              <Sparkles className="h-4 w-4" />
              <span>Featured Article</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 group-hover:text-emerald-500 transition-colors">
              <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-6 max-w-3xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4 border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold">{featuredPost.author.name}</p>
                  <p className="text-[11px] opacity-70">{featuredPost.publishedAt} • {featuredPost.readTime}</p>
                </div>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-100 hover:border-emerald-500/40'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-emerald-500/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold leading-snug hover:text-emerald-500 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className={`text-xs leading-relaxed line-clamp-3 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {post.excerpt}
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                isDarkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-emerald-500 hover:underline flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
