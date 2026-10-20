import React, { useState } from "react";
import { Coins, MapPin, Orbit, Rocket, RotateCcw } from "lucide-react";
import { useLocalOption } from "../../app/App.jsx";
import { RARITY_TIERS, rarityInfo } from "../../data/book-tables.js";
import { HIGH_TECH_PARTS } from "../../data/hightech-data.js";
import { BOOK_EQUIPMENT, slotTypeLabel } from "../../engine/equipment.js";
import { UNI_TECH, ensureGalaxyLayout } from "../../engine/universe.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, LoadingBlock, ScannerHeader, Select, Tag } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { GalaxyForge, GalaxyMap } from "./galaxy-views.jsx";

/* ===== Store & Night Market economics — planet-contextual pricing and stock.
   Everything keys off the CURRENT LOCATION planet: its economy biases which
   categories are stocked and their multipliers, wealth caps the rarity on the
   shelf, tech level gates High-Tech Parts, and the local tax rate is added on
   top. The Night Market ignores tax (no receipts) and gets richer on black-market
   and low-stability worlds. Prices come only from real book Ƶeni values. ===== */
const STORE_ECONOMY = {
  "Mining & Ore":       { armor: 0.9,  tech: 1.15, note: "Ore is cheap; finished tech is imported and marked up." },
  "Heavy Industry":     { armor: 0.85, tech: 0.95, note: "Factory world — armor and parts roll off the line cheap." },
  "Agriculture":        { armor: 1.05, tech: 1.3,  techStock: false, note: "Farm world — little demand for high-tech; parts are special-order only." },
  "Tech & R&D":         { armor: 1.05, tech: 0.8,  note: "Cutting-edge labs — cybernetics are cheap and plentiful." },
  "Luxury Goods":       { armor: 1.25, tech: 1.2,  note: "Everything carries a prestige markup." },
  "Black Market":       { armor: 0.8,  tech: 0.8,  illicit: true, note: "No receipts, no questions — cheap, but caveat emptor." },
  "Military Complex":   { armor: 0.8,  tech: 0.9,  note: "Garrison world — battle armor is surplus-cheap." },
  "Trade Hub":          { armor: 0.95, tech: 0.95, note: "Everything's available at fair, competitive prices." },
  "Ki-Crystal Harvest": { armor: 1.0,  tech: 1.0,  note: "Ki-crystal wealth keeps prices steady." },
  "Salvage & Scrap":    { armor: 0.75, tech: 0.7,  note: "Second-hand and salvaged — dirt cheap, quality not guaranteed." },
};
const storeEcon = (planet) => STORE_ECONOMY[planet?.economy] || { armor: 1, tech: 1, note: "" };
const RTIER_IDX = (key) => Math.max(0, RARITY_TIERS.findIndex(r => r.key === (key || "common")));
const planetTechIdx = (planet) => Math.max(0, UNI_TECH.indexOf(planet?.tech));
const planetOpen = (planet) => !!planet && !!planet.economy && planet.economy !== "Uninhabited" && planet.population !== "Uninhabited";
const wealthRarityCap = (planet) => [0, 1, 2, 3, 5][Math.max(0, Math.min(4, planet?.wealthIdx ?? 2))];
const techNeeded = (zeni) => zeni <= 100 ? 0 : zeni <= 1000 ? 1 : zeni <= 5000 ? 2 : 3;
function storePrice(base, planet, kind) {
  const mult = kind === "hightech" ? storeEcon(planet).tech : storeEcon(planet).armor;
  return Math.max(1, Math.round((base || 0) * mult * (1 + (planet?.taxRate || 0) / 100)));
}
function buildStoreCatalog(customHighTech) {
  const armor = BOOK_EQUIPMENT.map(e => ({ ...e, kind: "equipment", storeGroup: "Armor & Shields" }));
  const tech = [...HIGH_TECH_PARTS, ...(customHighTech || [])].map(p => ({
    catalogId: p.id, name: p.name, kind: "hightech", storeGroup: "High-Tech Parts",
    zeni: p.zeni, rarity: "uncommon", integrationDC: p.integrationDC, effect: p.effect, advancedTech: p.advancedTech,
  }));
  return [...armor, ...tech];
}
const storeStock = (planet, catalog) => catalog.filter(it => it.kind === "hightech"
  ? (storeEcon(planet).techStock !== false && planetTechIdx(planet) >= techNeeded(it.zeni))
  : RTIER_IDX(it.rarity) <= wealthRarityCap(planet));
function purchaseItemFromCatalog(it) {
  if (it.kind === "equipment") { const { kind, storeGroup, ...gear } = it; return { ...gear, id: uid(), qty: 1 }; }
  return { id: uid(), name: it.name, rarity: it.rarity || "uncommon", zeni: it.zeni, qty: 1, notes: "High-Tech Part — install via Inventory → Cybernetics." };
}
function hashStr(s) { let h = 2166136261; for (let i = 0; i < (s || "").length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function nightMarketStock(planet, catalog, seed) {
  if (!planetOpen(planet)) return [];
  const econ = storeEcon(planet);
  const stab = planet?.stabilityIdx ?? 2;
  const rng = mulberry32(hashStr((planet?.id || "") + ":" + seed));
  const richness = (econ.illicit ? 2 : 0) + (2 - Math.min(2, stab));            // 0..4 — black-market + unrest = richer
  const count = Math.min(catalog.length, 3 + richness);
  const pool = catalog
    .map(it => ({ it, w: rng() + RTIER_IDX(it.rarity) * 0.15 + (it.zeni > 1000 ? 0.3 : 0) + (it.kind === "hightech" ? 0.2 : 0) }))
    .sort((a, b) => b.w - a.w).map(x => x.it);
  return pool.slice(0, count).map(it => { const discount = 0.6 + rng() * 0.25; return { ...it, price: Math.max(1, Math.round((it.zeni || 0) * discount)), discount }; });
}

// Location + shopper bar shared by the Store and Night Market.
function MarketHeader({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, isDM }) {
  const planet = current?.planet;
  const stat = (label, val, color) => <span style={{ fontSize: 11.5 }}><span style={{ color: COLORS.dim }}>{label} </span><span style={{ color: color || COLORS.text, fontWeight: 600 }}>{val}</span></span>;
  const shopper = chars.find(c => c.id === shopperId) || null;
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
      <div style={{ flex: "2 1 340px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <MapPin size={14} color={COLORS.gold} />
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Current Location</span>
        </div>
        <Select value={galaxy?.currentPlanetId || ""} onChange={e => onSetLocation(e.target.value)}>
          <option value="">— pick a world —</option>
          {galaxy.systems.filter(s => isDM || s.discovered).map(s => (
            <optgroup key={s.id} label={s.name.replace(/ System$/, "")}>
              {s.planets.map(p => <option key={p.id} value={p.id}>{p.name}{planetOpen(p) ? ` — ${p.economy}` : " (uninhabited)"}</option>)}
            </optgroup>
          ))}
        </Select>
        {planet && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            {planetOpen(planet) ? <>
              {stat("Economy", planet.economy, COLORS.blue)}
              {stat("Tax", `${planet.taxRate}%`, planet.taxRate >= 20 ? COLORS.red : COLORS.text)}
              {stat("Wealth", planet.wealth, COLORS.gold)}
              {stat("Tech", planet.tech)}
              {stat("Stability", planet.stability, (planet.stabilityIdx ?? 2) <= 1 ? COLORS.red : COLORS.green)}
            </> : <span style={{ fontSize: 11.5, color: COLORS.dim }}>Uninhabited — no vendors here.</span>}
          </div>
        )}
        {planet && planetOpen(planet) && storeEcon(planet).note && <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 6, fontStyle: "italic" }}>{storeEcon(planet).note}</div>}
      </div>
      <div style={{ flex: "1 1 220px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Shopping As</div>
        <Select value={shopperId || ""} onChange={e => setShopperId(e.target.value)}>
          <option value="">— who's buying —</option>
          {chars.filter(c => !c.archived).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        {shopper && <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}><Coins size={15} color={COLORS.gold} /><span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 18, color: COLORS.gold }}>Ƶ {(shopper.zeni || 0).toLocaleString()}</span></div>}
      </div>
    </div>
  );
}

function StoreItemCard({ item, price, base, canBuy, reason, onBuy }) {
  const rc = rarityInfo(item.rarity).color;
  const discounted = base != null && price < base;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{item.name}</span>
        <Tag color={rc}>{rarityInfo(item.rarity).label}</Tag>
      </div>
      {item.kind === "equipment"
        ? <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "JetBrains Mono, monospace" }}>{[item.acBase ? `AC ${item.acBase}` : null, item.acBonus ? `+${item.acBonus} AC` : null, item.dr ? `DR ${item.dr}` : null, slotTypeLabel(item.slot)].filter(Boolean).join(" · ")}</div>
        : <div style={{ fontSize: 11, color: COLORS.blue, fontFamily: "JetBrains Mono, monospace" }}>Integration DC {item.integrationDC}</div>}
      {(item.notes || item.effect) && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.45 }}>{item.notes || item.effect}</div>}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: COLORS.gold }}>Ƶ {price.toLocaleString()}</span>
          {discounted && <span style={{ fontSize: 10, color: COLORS.dim, textDecoration: "line-through" }}>Ƶ {base.toLocaleString()}</span>}
        </span>
        <Btn size="sm" variant="gold" disabled={!canBuy} title={canBuy ? "Buy" : reason} onClick={onBuy} style={!canBuy ? { opacity: 0.5, cursor: "not-allowed" } : {}}>Buy</Btn>
      </div>
    </div>
  );
}

function StoreScreen({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, onBuy, isDM }) {
  const [custom] = useSharedList("custom_hightech_v1");
  if (!galaxy) return <EmptyState icon={Coins} title="No galaxy charted yet" body="Forge a galaxy first — the Store prices gear by the planet you're standing on." />;
  const catalog = buildStoreCatalog(custom || []);
  const shopper = chars.find(c => c.id === shopperId) || null;
  const header = <MarketHeader galaxy={galaxy} current={current} chars={chars} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={onSetLocation} isDM={isDM} />;
  const planet = current?.planet;
  if (!planet) return <div>{header}<EmptyState icon={MapPin} title="Pick a location" body="Choose the world the party is on — the Store stocks and prices gear to its economy and local tax." /></div>;
  if (!planetOpen(planet)) return <div>{header}<EmptyState icon={Coins} title="No market here" body={`${planet.name} is uninhabited — no vendors. Set a populated world as your location.`} /></div>;
  const stock = storeStock(planet, catalog);
  const groups = ["Armor & Shields", "High-Tech Parts"];
  return (
    <div>
      {header}
      {groups.map(g => {
        const items = stock.filter(i => i.storeGroup === g);
        if (!items.length) return null;
        return (
          <div key={g} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>{g}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {items.map(it => {
                const price = storePrice(it.zeni, planet, it.kind);
                const canBuy = !!shopper && (shopper.zeni || 0) >= price;
                return <StoreItemCard key={it.catalogId || it.name} item={it} price={price} base={price !== it.zeni ? it.zeni : null} canBuy={canBuy} reason={!shopper ? "Pick who's shopping" : "Not enough Ƶeni"} onBuy={() => onBuy(it, price)} />;
              })}
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Wealth caps rarity on the shelf; tech level and economy decide what's stocked. Buying deducts Ƶeni and drops the item into {shopper ? shopper.name + "'s" : "the buyer's"} inventory.</div>
    </div>
  );
}

function NightMarketScreen({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, onBuy, onRefresh, isDM }) {
  const [custom] = useSharedList("custom_hightech_v1");
  if (!galaxy) return <EmptyState icon={Rocket} title="No galaxy charted yet" body="Forge a galaxy first — the Night Market rides on the world you're standing on." />;
  const catalog = buildStoreCatalog(custom || []);
  const shopper = chars.find(c => c.id === shopperId) || null;
  const header = <MarketHeader galaxy={galaxy} current={current} chars={chars} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={onSetLocation} isDM={isDM} />;
  const planet = current?.planet;
  if (!planet) return <div>{header}<EmptyState icon={MapPin} title="Pick a location" body="Choose the world the party is on — the Night Market's stock depends on it." /></div>;
  if (!planetOpen(planet)) return <div>{header}<EmptyState icon={Rocket} title="No stall here" body={`${planet.name} is uninhabited — nobody's dealing. Set a populated world as your location.`} /></div>;
  const stock = nightMarketStock(planet, catalog, galaxy.marketSeed || 0);
  const illicit = storeEcon(planet).illicit;
  return (
    <div>
      {header}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Tonight's Stall</div>
        <span style={{ fontSize: 11, color: COLORS.dim }}>{illicit ? "A black-market world — the stall runs deep." : (planet.stabilityIdx ?? 2) <= 1 ? "Low stability — desperate goods change hands." : "A quiet corner deal — thin pickings."} No tax, no receipts.</span>
        <div style={{ flex: 1 }} />
        {isDM && <Btn size="sm" onClick={onRefresh}><RotateCcw size={13} /> New Stock</Btn>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
        {stock.map(it => {
          const canBuy = !!shopper && (shopper.zeni || 0) >= it.price;
          return <StoreItemCard key={(it.catalogId || it.name) + it.price} item={it} price={it.price} base={it.zeni} canBuy={canBuy} reason={!shopper ? "Pick who's shopping" : "Not enough Ƶeni"} onBuy={() => onBuy(it, it.price)} />;
        })}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 10 }}>Stock is fixed per world until the DM pulls New Stock. Richer on black-market and low-stability worlds.</div>
    </div>
  );
}

function UniverseTab() {
  const [screen, setScreen] = useState("map"); // map | store | market
  const [state, persist, error] = useSharedList("universe");
  const [chars, persistChars] = useSharedList("characters_v2");
  const [shopperId, setShopperId] = useState("");
  // View mode is per-device (not shared): the DM's device runs "dm", players'
  // devices run "player" and only see revealed systems.
  const [viewOpt, setViewOpt] = useLocalOption("sdndbz_universe_view_v1", { mode: "player" });
  const isDM = viewOpt.mode === "dm";
  if (state === null || chars === null) return <LoadingBlock />;
  const galaxy = state && state[0] ? ensureGalaxyLayout(state[0]) : null;
  const setGalaxy = (g) => persist(g ? [g] : []);
  const characterNames = (chars || []).filter(c => !c.archived).map(c => c.name).filter(Boolean);
  // Current-location plumbing for the Store / Night Market.
  const currentLoc = galaxy ? galaxy.systems.flatMap(s => s.planets.map(p => ({ system: s, planet: p }))).find(x => x.planet.id === galaxy.currentPlanetId) || null : null;
  const setLocation = (planetId) => galaxy && setGalaxy({ ...galaxy, currentPlanetId: planetId });
  const refreshMarket = () => galaxy && setGalaxy({ ...galaxy, marketSeed: (galaxy.marketSeed || 0) + 1 });
  const buy = (catalogItem, price) => {
    if (!shopperId) return;
    persistChars((chars || []).map(c => c.id === shopperId ? { ...c, zeni: Math.max(0, (c.zeni || 0) - price), items: [...(c.items || []), purchaseItemFromCatalog(catalogItem)] } : c));
  };

  return (
    <div>
      <ScannerHeader title="UNIVERSE & ECONOMY" subtitle="The galaxy your campaign lives in — worlds, economies, and who calls them home." />
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        {[["map", "Galaxy Map", Orbit], ["store", "Store", Coins], ["market", "Night Market", Rocket]].map(([k, label, Icon]) => (
          <button key={k} onClick={() => setScreen(k)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", background: screen === k ? `${COLORS.gold}1A` : COLORS.panel2, color: screen === k ? COLORS.gold : COLORS.muted, border: `1px solid ${screen === k ? COLORS.gold + "55" : COLORS.border}` }}><Icon size={14} /> {label}</button>
        ))}
        <div style={{ flex: 1 }} />
        {/* Per-device DM / Player view */}
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {[["dm", "DM View"], ["player", "Player View"]].map(([m, label]) => (
            <button key={m} onClick={() => setViewOpt({ mode: m })} title={m === "dm" ? "See everything and control what players discover" : "See only what the DM has revealed"} style={{ padding: "7px 12px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", background: viewOpt.mode === m ? (m === "dm" ? `${COLORS.gold}22` : `${COLORS.blue}22`) : "transparent", color: viewOpt.mode === m ? (m === "dm" ? COLORS.gold : COLORS.blue) : COLORS.muted, border: "none" }}>{label}</button>
          ))}
        </div>
      </div>

      {screen === "map" && (galaxy
        ? <GalaxyMap galaxy={galaxy} characters={characterNames} onChange={setGalaxy} isDM={isDM} />
        : isDM ? <GalaxyForge onGenerate={setGalaxy} />
          : <EmptyState icon={Orbit} title="No galaxy charted yet" body="The DM hasn't forged the galaxy for this campaign — check back once they have." />)}

      {screen === "store" && (
        <StoreScreen galaxy={galaxy} current={currentLoc} chars={chars || []} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={setLocation} onBuy={buy} isDM={isDM} />
      )}
      {screen === "market" && (
        <NightMarketScreen galaxy={galaxy} current={currentLoc} chars={chars || []} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={setLocation} onBuy={buy} onRefresh={refreshMarket} isDM={isDM} />
      )}
    </div>
  );
}

export {
  STORE_ECONOMY,
  storeEcon,
  RTIER_IDX,
  planetTechIdx,
  planetOpen,
  wealthRarityCap,
  techNeeded,
  storePrice,
  buildStoreCatalog,
  storeStock,
  purchaseItemFromCatalog,
  hashStr,
  mulberry32,
  nightMarketStock,
  MarketHeader,
  StoreItemCard,
  StoreScreen,
  NightMarketScreen,
  UniverseTab,
};
