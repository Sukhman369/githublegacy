export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-github-contribution-graph-works',
    title: 'How GitHub Contribution Graphs Work: The Math Behind the 53-Week Grid',
    excerpt:
      'Ever wondered how GitHub calculates contribution levels, leap years, and week columns? Here is a deep dive into the underlying calendar logic.',
    publishedAt: 'July 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Sukhman',
      role: 'Creator of GitLegacy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Git', 'GitHub', 'Algorithms', 'Calendar'],
    featured: true,
    content: `
### Introduction

GitHub's contribution graph is one of the most iconic visual features for developers worldwide. It displays your activity over a 52 to 53-week rolling window, rendered as a matrix of 7 rows (Sunday to Saturday).

In this article, we'll explore how GitHub structures dates, handles leap years, and maps commit frequency into 5 discrete color intensity levels.

---

### The 53-Week Matrix Structure

A standard calendar year has 365 days (366 in a leap year). Divided by 7 days per week, that gives 52 full weeks plus 1 or 2 extra days. Because week 1 might start mid-week depending on January 1st, GitHub renders 53 columns of 7 cells (a total of 371 grid slots).

- Rows (0 to 6): Represent Sunday (0), Monday (1), Tuesday (2), Wednesday (3), Thursday (4), Friday (5), and Saturday (6).
- Columns (0 to 52): Represent Sunday-aligned week numbers from the beginning of the target year.

---

### Understanding Intensity Levels (0 to 4)

GitHub dynamically normalizes your commit counts into 5 color levels based on your maximum daily commits:

1. Level 0 (No activity): 0 commits (Gray or dark background).
2. Level 1 (Low activity): Top 25th percentile of daily activity.
3. Level 2 (Medium activity): 25th to 50th percentile.
4. Level 3 (High activity): 50th to 75th percentile.
5. Level 4 (Peak activity): Top 25% peak commit days.

---

### Designing Artwork with Pixel Fonts

By treating the 53-week grid as a 53x7 pixel canvas, developers can render text using a binary 5x7 pixel font matrix. Each letter occupies a 5-column width by 7-row height matrix, separated by 1 column of empty padding.

Tools like GitLegacy automate this calculation, converting user input into exact backdated dates with GIT_AUTHOR_DATE environment variables!

---

### Conclusion

Whether you want to visualize a streak or craft contribution art, understanding the 53x7 matrix is the key to designing your GitHub legacy.
    `,
  },
  {
    slug: 'guide-to-backdated-git-commits',
    title: 'The Developer Guide to Automating Backdated Git Commits Responsibly',
    excerpt:
      'Learn how Git environment variables work under the hood to set author dates and committer dates for historical contribution graph planning.',
    publishedAt: 'July 25, 2026',
    readTime: '4 min read',
    author: {
      name: 'Sukhman',
      role: 'Creator of GitLegacy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Git', 'CLI', 'Automation', 'DevOps'],
    featured: false,
    content: `
### How Git Stores Commit Timestamps

When you make a commit in Git, two distinct timestamps are attached to the commit object:

1. GIT_AUTHOR_DATE: The original date when the code change was authored.
2. GIT_COMMITTER_DATE: The timestamp when the commit was applied to the repository.

GitHub uses the GIT_AUTHOR_DATE timestamp to populate your contribution graph grid!

---

### Overriding Timestamps via Command Line

You can manually backdate a Git commit using environment variables in Bash or PowerShell:

GIT_AUTHOR_DATE="2026-01-15T12:00:00" GIT_COMMITTER_DATE="2026-01-15T12:00:00" git commit -m "Historical planning commit" --allow-empty

---

### Automating via Python or Bash Scripts

Instead of manually running hundreds of CLI commands, GitLegacy generates fully executable Bash (.sh) or Python (.py) scripts.

---

### Best Practices

- Always run commit scripts inside a dedicated repository (e.g., githublegacy) to keep your production repositories clean.
- Ensure your local Git email matches your primary GitHub account email so GitHub attributes the contributions to your profile.
    `,
  },
  {
    slug: 'designing-github-profile-art-templates',
    title: 'Designing GitHub Profile Contribution Art: Tips & Aesthetic Palettes',
    excerpt:
      'Discover creative patterns, logo designs, and color palettes to make your developer profile stand out.',
    publishedAt: 'July 20, 2026',
    readTime: '6 min read',
    author: {
      name: 'Sukhman',
      role: 'Creator of GitLegacy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Design', 'UI/UX', 'Developer Profile', 'Themes'],
    featured: false,
    content: `
### Why Contribution Art Matters

Your GitHub profile is your developer resume. A clean contribution pattern or custom pixel art instantly demonstrates creativity, technical curiosity, and CLI mastery.

---

### Popular Preset Styles

1. Custom Name / Initials: Spell out your name, handle, or initials across the center 30 columns.
2. Cyberpunk & Halloween Themes: Use custom color palettes to transform standard green squares into vibrant purple, neon cyan, or pumpkin orange.
3. Streak Art: Create high-density vertical bars or gradient waveforms.

---

### Freehand Studio Drawing Mode

GitLegacy features a Freehand Pixel Studio that allows you to click or drag over cells to draw custom icons (hearts, logos, spaceships) directly on the grid before exporting the commit script!
    `,
  },
];
