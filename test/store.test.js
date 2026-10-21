import { describe, it, expect } from "vitest";
import { cartTotal, checkoutPatch } from "../renderer/features/universe/store.jsx";

describe("store cart", () => {
  const vest = { kind: "equipment", storeGroup: "Armor & Shields", name: "Padded Gi", zeni: 50 };
  const part = { kind: "hightech", name: "Scouter Lens", zeni: 400, rarity: "rare" };
  const cart = [{ key: "a", item: vest, price: 60, qty: 2 }, { key: "b", item: part, price: 380, qty: 1 }];
  it("totals the cart", () => expect(cartTotal(cart)).toBe(500));
  it("pays once and adds one entry per unit", () => {
    const p = checkoutPatch({ zeni: 700, items: [{ name: "Old" }] }, cart);
    expect(p.zeni).toBe(200);
    expect(p.items.map(i => i.name)).toEqual(["Old", "Padded Gi", "Padded Gi", "Scouter Lens"]);
    expect(p.items[1].kind).toBeUndefined();
    expect(new Set(p.items.map(i => i.id)).size).toBe(4);
  });
  it("equips gear into empty slots only", () => {
    const shield = { kind: "equipment", name: "Shield", slot: "held", zeni: 10 };
    const gi = { kind: "equipment", name: "Padded Gi", slot: "body", zeni: 5 };
    const worn = { id: "a1", name: "Old Armor", slot: "body" };
    const p = checkoutPatch({ zeni: 100, items: [worn], equipment: { body: "a1" } },
      [{ item: shield, price: 10, qty: 3 }, { item: gi, price: 5, qty: 1 }]);
    expect(p.equipment.body).toBe("a1");
    expect(p.items.find(i => i.id === p.equipment.hand1).name).toBe("Shield");
    expect(p.items.find(i => i.id === p.equipment.hand2).name).toBe("Shield");
    expect(p._equipped).toEqual(["Shield", "Shield"]);
  });
  it("refuses a cart the buyer can't pay for", () => {
    expect(checkoutPatch({ zeni: 499 }, cart)).toBeNull();
    expect(checkoutPatch({ zeni: 900 }, [])).toBeNull();
  });
});
