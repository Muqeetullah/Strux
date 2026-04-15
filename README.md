# Strux

Strux is an architectural visualization web app built with React Router 7, React, TypeScript, and Tailwind CSS.

It lets you:

- upload a 2D floor plan
- preview the uploaded image before generation
- generate a rendered result through a server-side Gemini image route
- compare before/after outputs on a dedicated project page
- browse featured static case studies and locally saved projects

## Stack

- React 19
- React Router 7 with SSR
- TypeScript
- Tailwind CSS 4
- `react-compare-slider`
- Gemini image generation via a server route

## Current Behavior

There are two project sources in the app:

- Featured demo projects
  - Static showcase entries loaded from local assets in `public/uploads/assets`
  - Used for the homepage project gallery and detail-page comparisons
- User-generated local projects
  - Saved into `.data/projects.json`
  - Uploaded/generated images are written to `public/uploads/projects/<project-id>`

The app currently uses a Gemini-powered API route at `app/routes/api.generate-render.ts`.

Important note:

- The Gemini image route is currently built around a preview/free-tier model and may hit quota or availability limits.
- When that happens, the frontend shows an inline error instead of silently failing.

## Routes

Main routes:

- `/` - homepage with upload flow and project gallery
- `/visualizer/:id` - project detail page with before/after comparison
- `/pricing` - marketing page
- `/community` - marketing page
- `/enterprise` - marketing page

Internal routes:

- `/api/generate-render` - image generation endpoint
- `/api/projects/save` - save a project
- `/api/projects/list` - list stored projects
- `/api/projects/get?id=...` - fetch one stored project

## Project Structure

```text
app/
  routes/
    home.tsx
    visualizer.$id.tsx
    pricing.tsx
    community.tsx
    enterprise.tsx
    api.generate-render.ts
    api.projects.save.ts
    api.projects.list.ts
    api.projects.get.ts
components/
  Navbar.tsx
  Footer.tsx
  Upload.tsx
  MarketingPage.tsx
  ui/
lib/
  ai.action.ts
  project.action.ts
  featured-projects.ts
  server/
    project-store.ts
public/
  uploads/
    assets/
    projects/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_google_ai_studio_key
```

Get your key from:

- [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Run the app

```bash
npm run dev
```

### 4. Open it

By default, open the local URL shown by React Router dev server.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run typecheck
```

Runs React Router type generation and TypeScript checks.

```bash
npm run build
```

Builds the client and server bundles.

```bash
npm run start
```

Runs the built server from `build/server/index.js`.

## How Local Persistence Works

When a project is saved:

- metadata is written to `.data/projects.json`
- source and rendered images are written under `public/uploads/projects/<project-id>`

Because of that:

- `.data` should not be treated as durable production storage
- `public/uploads` will grow over time in local development
- generated/demo assets are served directly by the app

## Known Limitations

- Gemini preview/free-tier image generation can be rate-limited or unavailable
- project storage is currently file-based, not database-backed
- project writes are local-only and meant for MVP/dev usage
- the homepage still includes some demo/sample content rather than only live generated projects

## Design Notes

The current UI includes:

- a homepage with an upload CTA and project gallery
- standalone marketing pages for Pricing, Community, and Enterprise
- a dedicated case-study style detail page with comparison slider
- a simplified footer and navigation system

## Suggested Next Improvements

- add server-side image size/type validation for `/api/generate-render`
- make local project writes atomic to avoid race conditions
- replace JSON storage with a database or hosted backend
- add proper auth if the app moves beyond local/demo use
- improve metadata and SEO for all public pages

## Assets

Featured demo assets currently used by the homepage gallery:

- `public/uploads/assets/floor.webp`
- `public/uploads/assets/floor-gen.png`
- `public/uploads/assets/apartment.webp`
- `public/uploads/assets/apart-gen.png`
- `public/uploads/assets/room.jpeg`
- `public/uploads/assets/room-gen.png`

## License

Private project. Add a formal license if you plan to distribute it.
