# Live coding: coalesce in-flight work (15 minutes)

Time box: **15 minutes**. Node.js 18+ only. No libraries.

Many callers can ask for the same expensive work at the same time (a user profile, a feature flag, a token refresh). Each caller should get the result, but the work should run only once while it is still in flight.

Implement `createSingleflight()` in `src/singleflight.js`.

```js
const flight = createSingleflight();

const user = await flight("user:42", async () => {
  return db.users.find("42");
});
```

## Required behavior

1. **One execution per key while in flight.** If several callers use the same `key` before the work settles, `fn` runs once. Every caller receives the same resolution or the same rejection.
2. **No cache.** When that call settles, success or failure, the key is forgotten. The next caller must run `fn` again.
3. **Keys are independent.** Different keys may run at the same time and must not block each other.
4. **Call `fn` with no arguments.** The key is not passed into `fn`.
5. **Synchronous throws count as failure.** If `fn` throws before returning a promise, callers reject, and the key is cleared so a later call can retry.
6. **Do not leak keys.** After a call settles, nothing for that key should remain stored.

## Out of scope

- Do not cache successful values.
- Do not add retries, timeouts, or cancellation unless you finish early and the interviewer asks.
- `fn` is trusted interview code. You do not need to validate arguments beyond what the tests cover.

## Run the tests

```bash
npm test
```

Talk through the failure path and how you clear the key. That discussion is part of the exercise.
