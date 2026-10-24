import { describe, it, expect } from "vitest";
import { addDie, askOracle, blankClock, dropDie, rollClock } from "../renderer/engine/table-tools.js";

const seq = (...vals) => { let i = 0; return () => vals[i++ % vals.length]; };

describe("clocks", () => {
  it("drops dice at or under the drop value", () => {
    // d6 faces 1, 4, 2, 6 with dropOn 2: the 1 and the 2 go.
    const r = rollClock({ ...blankClock("c"), remaining: 4, dropOn: 2 }, seq(0, 0.5, 0.2, 0.99));
    expect(r.faces).toEqual([4, 6]);
    expect(r.dropped).toBe(2);
    expect(r.remaining).toBe(2);
    expect(r.done).toBe(false);
  });
  it("fires when the last die goes", () => {
    expect(rollClock({ ...blankClock("c"), remaining: 1 }, () => 0).done).toBe(true);
    expect(rollClock({ ...blankClock("c"), remaining: 0 }).done).toBe(false);
  });
  it("keeps every die when dropping by hand", () => {
    const r = rollClock({ ...blankClock("c"), remaining: 3, dropOn: 0 }, () => 0);
    expect(r.remaining).toBe(3);
    expect(dropDie({ remaining: 3, faces: [1, 1, 1] }, 0)).toEqual({ faces: [1, 1], remaining: 2 });
    expect(addDie({ remaining: 2 }).remaining).toBe(3);
  });
});

describe("oracle", () => {
  it("answers by likelihood", () => {
    expect(askOracle("likely", () => 0.7).answer).toBe("Yes");      // 71 ≤ 75
    expect(askOracle("likely", () => 0.8).answer).toBe("No");       // 81
    expect(askOracle("likely", () => 0.0).answer).toBe("Yes, and…"); // 1 ≤ 15
    expect(askOracle("likely", () => 0.99).answer).toBe("No, and…"); // 100 > 95
    expect(askOracle("nope", () => 0.49).chance).toBe(50);
  });
});
