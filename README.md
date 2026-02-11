# bulk-insertion-handler

Express + TypeScript service scaffold for handling bulk insertion workflows.

## Tech Stack

- Node.js (ESM)
- TypeScript
- Express
- Zod (environment validation)
- Winston (logging)
- ESLint + Prettier

## Prerequisites

- Node.js 24+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` values as needed.

4. Start in development mode:

```bash
npm run dev
```

The app runs on `PORT` and is mounted under `/api/v1`.

## Environment Variables

Required environment variables are defined in `.env.example` and validated in `src/schemas/env.schema.ts`.

| Variable | Required | Description | Allowed / Example |
| --- | --- | --- | --- |
| `NODE_ENV` | Yes | Runtime environment | `development`, `test`, `production` |
| `BASE_URL` | Yes | Base URL of the connecting application/API | `https://example.com` |
| `PORT` | Yes | Server port | `3000` |
| `LOG_LEVEL` | Yes | Log verbosity | `info`, `debug` |

Example:

```env
NODE_ENV=production
BASE_URL=base-url-of-connecting-app
PORT=3000
LOG_LEVEL=info
```

## Scripts

- `npm run build`: Compile TypeScript to `dist/`.
- `npm run clean`: Remove `dist/`.
- `npm run lint`: Run ESLint.
- `npm run format`: Run Prettier.
- `npm run dev`: Run development server with `nodemon` + `tsx`.
- `npm run start`: Run compiled app from `dist/index.js`.
- `npm run docker:up`: Start `app` service with Docker Compose.
- `npm run docker:down`: Stop `app` service.
- `npm run docker:dev:up`: Start `app-dev` service with Docker Compose.
- `npm run docker:dev:down`: Stop `app-dev` service.

## API Base Path

- Base path: `/api/v1`
- Insert route group: `/api/v1/insert`

Note: `src/routes/insert.routes.ts` is currently a route scaffold with no endpoints defined yet.

## Build and Run (Production)

```bash
npm run build
npm start
```

## Docker

Start production-style container:

```bash
npm run docker:up
```

Start development container:

```bash
npm run docker:dev:up
```
