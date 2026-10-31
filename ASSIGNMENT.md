# Stratafi — Savings API exercise

**Suggested time:** 10–15 minutes.

## Environment

```bash
npm install
npm run dev
```

Sign in at http://localhost:5173 with **Enter sandbox**. Auth is already wired; goals are stored in memory only.

## Goal

Implement the two `TODO` blocks in `server/src/routes/savings.routes.ts`. Data lives in the `goals` array in `server/src/store.ts`.

### 1. `GET /api/savings`

Return savings goals belonging to the signed-in user (`req.user.userId`).

### 2. `POST /api/savings`

Create a goal and append it to `goals`.

**Request body:** `{ "name": string, "targetAmount": number }`

**Stored shape:**

```json
{
  "id": "<uuid>",
  "userId": "<from req.user>",
  "name": "...",
  "targetAmount": 5000,
  "currentAmount": 0,
  "createdAt": "<ISO timestamp>"
}
```

The frontend is finished—you only need the route handlers.

## Done when

1. Adding a goal shows it in the list immediately.
2. After a full page refresh, the goal is still there (same server process).

Ask questions out loud as you go.
