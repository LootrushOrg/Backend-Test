# Stratafi

Local sandbox for practicing small backend changes against a real UI. No database, no migrations—just an in-memory store and a single Savings screen.

**Exercise brief:** [ASSIGNMENT.md](./ASSIGNMENT.md)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 and choose **Enter sandbox**.

| Service   | URL                      |
| --------- | ------------------------ |
| Frontend  | http://localhost:5173    |
| API       | http://localhost:3001    |
| Health    | http://localhost:3001/health |

## What you will touch

```
src/pages/Savings.tsx               UI (complete)
server/src/store.ts                 users + goals (in memory)
server/src/routes/savings.routes.ts two TODOs (GET + POST)
ASSIGNMENT.md                       task description
```

Optional Hardhat contracts live under `contracts/` (`npm run contracts:install` first).

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | API + Vite together |
| `npm run build` | Typecheck + production frontend build |
| `npm run contracts:compile` | Compile Solidity |
| `npm run contracts:test` | Contract unit tests |
