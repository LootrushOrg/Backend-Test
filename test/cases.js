import assert from "node:assert/strict";
import test from "node:test";

/**
 * Let a synchronous or microtask-scheduled start actually call fn.
 */
function tick() {
  return new Promise((resolve) => {
    setImmediate(resolve);
  });
}

/**
 * @param {() => (key: unknown, fn: () => unknown) => Promise<unknown>} createSingleflight
 */
export function registerSingleflightTests(createSingleflight) {
  test("concurrent callers with the same key share one execution", async () => {
    const flight = createSingleflight();
    let calls = 0;
    /** @type {(value: { id: number }) => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    const user = { id: 42 };

    const fn = async () => {
      calls += 1;
      await gate;
      return user;
    };

    const first = flight("user:42", fn);
    const second = flight("user:42", fn);
    const third = flight("user:42", fn);

    await tick();
    assert.equal(calls, 1);

    release(user);
    const results = await Promise.all([first, second, third]);

    assert.deepEqual(results, [user, user, user]);
    assert.equal(results[0], results[1]);
    assert.equal(results[1], results[2]);
  });

  test("different keys run independently", async () => {
    const flight = createSingleflight();
    /** @type {() => void} */
    let releaseA = () => {};
    const gateA = new Promise((resolve) => {
      releaseA = resolve;
    });
    let callsB = 0;

    const pendingA = flight("a", async () => {
      await gateA;
      return "A";
    });
    const pendingB = flight("b", async () => {
      callsB += 1;
      return "B";
    });

    assert.equal(await pendingB, "B");
    assert.equal(callsB, 1);

    releaseA();
    assert.equal(await pendingA, "A");
  });

  test("a later call after success runs the function again", async () => {
    const flight = createSingleflight();
    let calls = 0;
    const fn = async () => {
      calls += 1;
      return calls;
    };

    assert.equal(await flight("k", fn), 1);
    assert.equal(await flight("k", fn), 2);
    assert.equal(calls, 2);
  });

  test("concurrent failures are shared once, then a later call retries", async () => {
    const flight = createSingleflight();
    let calls = 0;
    /** @type {(reason?: unknown) => void} */
    let rejectGate = () => {};
    const gate = new Promise((_, reject) => {
      rejectGate = reject;
    });

    const fn = () => {
      calls += 1;
      return gate;
    };

    const first = flight("k", fn);
    const second = flight("k", fn);
    const reason = new Error("db down");

    await tick();
    assert.equal(calls, 1);
    rejectGate(reason);

    const caught = await Promise.all([
      first.then(
        () => assert.fail("expected a rejection"),
        (error) => error,
      ),
      second.then(
        () => assert.fail("expected a rejection"),
        (error) => error,
      ),
    ]);
    assert.equal(caught[0], reason);
    assert.equal(caught[1], reason);

    assert.equal(await flight("k", async () => "recovered"), "recovered");
    assert.equal(calls, 1);
  });

  test("a synchronous throw rejects and does not stick the key", async () => {
    const flight = createSingleflight();
    let calls = 0;

    await assert.rejects(
      flight("k", () => {
        calls += 1;
        throw new Error("boom");
      }),
      /boom/,
    );

    assert.equal(await flight("k", async () => "ok"), "ok");
    assert.equal(calls, 1);
  });

  test("a burst of waiters still invokes the function once", async () => {
    const flight = createSingleflight();
    let calls = 0;
    /** @type {(value: string) => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });

    const fn = async () => {
      calls += 1;
      await gate;
      return "done";
    };

    const pending = Array.from({ length: 50 }, () => flight("same", fn));
    await tick();
    assert.equal(calls, 1);

    release("done");
    const results = await Promise.all(pending);
    assert.equal(results.length, 50);
    assert.ok(results.every((value) => value === "done"));
  });

  test("string and number keys do not collide", async () => {
    const flight = createSingleflight();
    const values = await Promise.all([
      flight(1, async () => "number"),
      flight("1", async () => "string"),
    ]);

    assert.deepEqual(values.sort(), ["number", "string"]);
  });

  test("fn is called with no arguments", async () => {
    const flight = createSingleflight();

    await flight("k", function fn() {
      assert.equal(arguments.length, 0);
      return "ok";
    });
  });
}
