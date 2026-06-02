# Fireart Test Task

Small full‑stack app for browsing **English Premier League** teams and players, powered by the public [TheSportsDB](https://www.thesportsdb.com/free_api)

## Architecture

Hybrid by design — server‑rendered shell + one Vue island:

- **Express 5 + EJS** renders `/teams`, `/teams/:id`, `/players/:id`
- **Vue 3 + Vite + Tailwind 4** powers the players grid on the team page
- The Vue app talks to **our own** `/api/teams/:id/players` endpoint

 ```text
src/
├── client/   → Vue 3 + Vite + Tailwind
└── server/   → Express + EJS + API layer
public/       → built frontend assets (Vite output)
```


## Requirements

- **Node.js 20+ (required)**
- npm 10+
- Internet access (calls `thesportsdb.com` at runtime)

## Node version setup

If you use `nvm`:

```bash
nvm install 20
nvm use 20
````

## Install

Two `package.json` files on purpose — install both:

```bash
npm install
npm install --prefix src/client
```

## Build (prod)

```bash
npm run build --prefix src/client   # outputs to /public/assets
node src/server/app.js              # serves the built bundle
```

## Run (dev)

Two terminals:

1. **Express + EJS** (nodemon) — http://localhost:3000
   ```bash
   npm run dev
   ```
2. **Vite** (HMR for Vue + Tailwind) — http://localhost:5173
   ```bash
   cd src/client && npm run dev
   ```


## Routes

| Method | Path                       | Description                            |
|--------|----------------------------|----------------------------------------|
| GET    | `/teams`                   | List of EPL teams                      |
| GET    | `/teams/:id`               | Team details + Vue island with players |
| GET    | `/players/:id`             | Player details                         |
| GET    | `/api/teams/:id/players`   | JSON consumed by the Vue island        |

## Config

Only `PORT` is read from env (defaults to `3000`):
Upstream API config lives in `src/server/services/sports.service.js`.

## Notes

- Tailwind v4 scans **both** `.vue` and `.ejs` files (see `@source` rules in `src/client/src/style.css`)