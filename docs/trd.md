# Technical Requirements Document (TRD)

**Project:** GitLegacy

**Version:** 1.0

**Status:** Draft

**Author:** Sukhman

**Last Updated:** July 2026

---

# 1. Introduction

## 1.1 Purpose

This document defines the technical architecture, technology stack, system design, implementation approach, and engineering standards for GitLegacy.

GitLegacy is a developer tool that enables users to design GitHub contribution art before making commits by generating an interactive GitHub-style contribution calendar and an optimized commit strategy.

This document serves as the primary reference for software development throughout the project lifecycle.

---

# 2. Technical Vision

The primary goal is to build a lightweight, scalable, and maintainable platform capable of serving developers worldwide.

The system should:

- Feel extremely responsive
- Produce results instantly
- Require minimal infrastructure
- Support future SaaS features
- Support millions of generated calendars
- Support GitHub integrations
- Maintain clean architecture

---

# 3. System Architecture

```
                    Internet
                         │
          ┌──────────────┴──────────────┐
          │                             │
          │        Next.js Client       │
          │ (TypeScript + React + SSR)  │
          └──────────────┬──────────────┘
                         │
                  REST API (HTTPS)
                         │
          ┌──────────────┴──────────────┐
          │                             │
          │       Laravel 12 API        │
          └──────────────┬──────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
 PostgreSQL          Redis          Cloud Storage
                                (Cloudflare R2)
```

---

# 4. Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| Next.js | Frontend Framework |
| React | UI Rendering |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| Lucide React | Icons |
| Framer Motion | Animations |
| TanStack Query | API State Management |
| React Hook Form | Forms |
| Zod | Validation |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Laravel 12 | REST API |
| PHP 8.4+ | Runtime |
| Composer | Dependency Management |

---

## Database

PostgreSQL

Reason:

- Better indexing
- Better JSON support
- Better scalability
- Excellent performance
- Future AI compatibility

---

## Cache

Redis

Used for

- Cache
- Sessions
- Queue
- Rate limiting

---

## Queue

Laravel Queue

Driver

Redis

---

## Storage

Cloudflare R2

Stores

- Images
- Exports
- Future user uploads

---

## Authentication

Laravel Sanctum

Future

GitHub OAuth

Google OAuth

---

## Version Control

Git

GitHub

---

## CI/CD

GitHub Actions

Deployment Pipeline

```
Push

↓

Run Tests

↓

Build

↓

Deploy
```

---

# 5. Core Modules

## Calendar Engine

Responsibilities

- Generate yearly calendar
- Calculate week positions
- Handle leap years
- Map pixels
- Generate contribution strategy

---

## Font Engine

Responsibilities

- Convert text into pixels
- Support multiple fonts
- Character spacing
- Character scaling

---

## Date Mapper

Responsibilities

- Assign pixels to dates
- Calculate week offsets
- Handle calendar alignment

---

## Commit Planner

Responsibilities

- Generate commit count
- Optimize spacing
- Calculate statistics

---

## Rendering Engine

Responsibilities

- GitHub-style graph
- Hover effects
- Dark mode
- Light mode
- Zoom
- Responsive rendering

---

## Export Engine

Supports

- CSV
- JSON
- PNG
- PDF (Future)

---

## Share Engine

Responsibilities

- Generate share URLs
- Public previews
- Privacy settings

---

# 6. Frontend Architecture

```
app/

components/

hooks/

lib/

services/

types/

styles/

public/

utils/
```

---

## Components

```
Calendar

CalendarCell

Tooltip

StatisticsPanel

CommitPlanner

ExportPanel

Navigation

Footer

ThemeSwitcher

SettingsPanel
```

---

# 7. Backend Architecture

```
app/

├── Domain/
│
├── Http/
│
├── Models/
│
├── Services/
│
├── Jobs/
│
├── Events/
│
├── Listeners/
│
├── Policies/
│
├── Notifications/
│
├── Console/
│
└── Providers/
```

---

# 8. Domain Layer

```
Domain/

Calendar/

Font/

Github/

Export/

Sharing/

Analytics/
```

Each domain must remain independent.

No domain should directly depend on another.

Communication should happen through services.

---

# 9. API Structure

```
/api/v1
```

Example

```
POST /generate

POST /export

GET /design/{id}

POST /share

POST /github/connect

GET /analytics
```

---

# 10. Calendar Generation Process

```
User enters text

↓

Font Engine

↓

Pixel Matrix

↓

Calendar Generator

↓

Date Mapper

↓

Commit Planner

↓

Calendar JSON

↓

Frontend Renderer
```

---

# 11. Data Flow

```
Text

↓

Pixels

↓

Calendar Coordinates

↓

Dates

↓

Commit Count

↓

Statistics

↓

Preview

↓

Export
```

---

# 12. Database

## Initial Tables

users

projects

designs

exports

shares

api_tokens

activity_logs

github_accounts

analytics

---

# 13. Project Structure

```
GitLegacy/

frontend/

backend/

docs/

docker/

scripts/

.github/

```

---

# 14. Performance Goals

Calendar Generation

<50ms

API Response

<200ms

Page Load

<2s

Lighthouse

95+

Time to Interactive

<2s

---

# 15. Security

Laravel CSRF

Input Validation

Rate Limiting

OAuth Protection

XSS Protection

CSP Headers

HTTPS Only

Secure Cookies

Sanitized Exports

---

# 16. Scalability

Target

100 Concurrent Users

↓

10,000 Users

↓

100,000 Users

↓

1 Million Generated Calendars

↓

Global CDN

No architectural rewrite should be required.

---

# 17. Future GitHub Integration

GitHub OAuth

Contribution History

Repository Selection

Contribution Statistics

Contribution Comparison

Year-over-Year Analytics

Contribution Heatmaps

Developer Dashboard

---

# 18. Future AI Features

AI Font Generator

Logo Detection

Image to Contribution Art

Smart Layout Suggestions

Contribution Optimization

Automatic Center Alignment

Character Compression

---

# 19. Future Modules

```
Core

│

├── Calendar Engine

├── Font Engine

├── Date Mapper

├── Commit Planner

├── Export Engine

├── Share Engine

├── Analytics

├── GitHub Integration

├── AI Engine

└── Marketplace
```

---

# 20. Deployment

## Frontend

Vercel

---

## Backend

Docker

Laravel

Nginx

PHP-FPM

---

## Database

PostgreSQL

---

## Cache

Redis

---

## Storage

Cloudflare R2

---

## Monitoring

Laravel Telescope

Laravel Horizon

Sentry

Uptime Kuma

---

# 21. Coding Standards

Backend

- PSR-12
- SOLID Principles
- Domain Driven Design
- Repository Pattern where appropriate
- Service Layer
- Form Requests for validation

Frontend

- Functional Components
- TypeScript Strict Mode
- Atomic Component Design
- Reusable Components
- No inline styles
- ESLint + Prettier

---

# 22. Engineering Principles

- Keep business logic out of controllers.
- Keep UI independent from business logic.
- Every module should have a single responsibility.
- Avoid premature optimization.
- Build reusable services.
- Favor composition over inheritance.
- Every feature should be testable.
- Every API should be versioned.
- Prefer explicit code over magic.
- Write documentation alongside implementation.

---

# 23. Architecture Decisions

## Why Next.js?

- Excellent SEO
- Server-side rendering
- React ecosystem
- Vercel integration
- Great developer experience

---

## Why Laravel?

- Mature ecosystem
- Built-in authentication
- Queues
- Scheduler
- Notifications
- API resources
- Excellent testing support
- Long-term maintainability

---

## Why PostgreSQL?

- Better JSON support
- Strong indexing
- Advanced querying
- Reliable performance
- Scales well for SaaS

---

## Why Redis?

- High-speed caching
- Queue support
- Session storage
- Rate limiting

---

## Why Tailwind CSS?

- Rapid UI development
- Utility-first approach
- Small production bundle
- Easy responsive design

---

# 24. Long-Term Vision

GitLegacy should evolve beyond a simple contribution planner into a complete GitHub productivity platform.

Future versions will include:

- GitHub analytics
- Team dashboards
- Contribution planning
- Pixel art studio
- AI-assisted layouts
- Developer profiles
- Public design marketplace
- Community templates
- Contribution streak planning
- Open API for third-party integrations

---

# 25. Conclusion

GitLegacy is designed with a long-term architecture that prioritizes maintainability, scalability, and developer experience. The chosen technology stack provides a solid foundation for both the initial planning tool and future expansion into a full-featured developer platform without requiring major architectural rewrites.