# GitLegacy Future Roadmap & Deployment Strategy

This document outlines the architectural plan, deployment best practices, and feature roadmap for the future iterations of **GitLegacy**.

---

## 🚀 1. Production Deployment & Going Live

### Recommended Hosting: Vercel
As a **Next.js 16 (Turbopack)** web application, Vercel is the recommended deployment target for zero-configuration, instant global CDN delivery, and automatic HTTPS.

#### Pre-Deployment Checklist
- [x] **Type Safety**: Verify TypeScript compilation (`npx tsc --noEmit`).
- [x] **Production Build**: Verify static & dynamic routes (`npm run build`).
- [ ] **SEO & Metadata**: Configure Open Graph tags (`og:image`, `og:title`, `og:description`) and Twitter cards in `src/app/layout.tsx`.
- [ ] **Favicon Branding**: Complete icon suite in `/public` (`favicon.ico`, `apple-touch-icon.png`).
- [ ] **Analytics**: Integrate privacy-focused analytics (`@vercel/analytics` or Google Analytics).
- [ ] **Domain Setup**: Connect custom domain (e.g., `gitlegacy.dev`) via CNAME & A records.

---

## 🎨 2. Feature Roadmap

### Phase 2: Direct Automation & OAuth Integration

#### 1. 1-Click GitHub OAuth Direct Sync 🤖
- **Goal**: Eliminate the need for users to copy/paste or run CLI scripts manually.
- **Implementation**:
  - Integrate GitHub OAuth 2.0 (`read:user`, `repo` scope).
  - Create a Next.js Server Action / API Route that programmatically commits to a user's chosen repository using the GitHub REST/GraphQL API (`octokit`).

#### 2. Image-to-Contribution Matrix Converter 🖼️
- **Goal**: Convert custom user images, avatars, or logos into a 53-week contribution graph.
- **Implementation**:
  - Image canvas parser mapping pixel brightness/grayscale values into intensity levels (0 to 4).
  - Aspect-ratio scaling to fit 53 weeks x 7 days matrix.

---

### Phase 3: Automation & Community Engagement

#### 3. Live GitHub Actions Cron Workflow Generator ⚡
- **Goal**: Generate a `.github/workflows/git_legacy_cron.yml` configuration.
- **Implementation**:
  - Rather than generating all backdated commits at once, the GitHub Action runs on a daily `cron` schedule to commit naturally according to the user's design over time.

#### 4. Community Preset Marketplace & Sharing 🌐
- **Goal**: Allow developers to share and discover contribution graph art templates (e.g., Pacman, Space Invaders, company logos).
- **Implementation**:
  - URL hash/query payload encoder for 1-click sharing.
  - Public preset submissions showcase.

---

## 🔒 3. Repository Hygiene & Indexing
- **Git Tracking**: Project documentation in `docs/` is tracked in version control.
- **Graphify Analysis**: `docs/` is excluded in `.graphifyignore` to keep code dependency graphs clean and focused on executable source files (`src/`).
