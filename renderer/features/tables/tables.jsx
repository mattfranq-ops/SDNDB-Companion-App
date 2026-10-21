import React, { useState, useRef } from "react";
import { ClipboardList, Dices, Download, Plus, Table2, Trash2, Upload, X } from "lucide-react";
import { BOOK_TABLES, BOUNTY_TIERS, DOWNTIME_ACTIVITIES, GAMBLING_GAMES, MAX_TRAINING_BOONS_PER_RANK, TRAINING_ARC_STYLES, TRAINING_BOON_SPENDS } from "../../data/book-tables.js";
import { NPC_POOLS } from "../../data/name-pools.js";
import { pick, roll, uid } from "../../lib/dice.js";
import { ORACLE_ODDS, askOracle } from "../../engine/table-tools.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, Field, LoadingBlock, ScannerHeader, Tag, TextInput, downloadJSON } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { scaledNpc } from "../npcs/antagonist.jsx";

/* ============================== TABLES ============================== */
function BookTableCard({ table }) {
  const [result, setResult] = useState(null);
  const doRoll = () => {
    const n = roll(20);
    const row = table.rows.find(r => {
      if (r.range.includes("-")) { const [a,b] = r.range.split("-").map(Number); return n >= a && n <= b; }
      return Number(r.range) === n;
    });
    setResult({ n, row });
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700 }}>{table.name}</div>
          <div style={{ color: COLORS.dim, fontSize: 11.5 }}>{table.die} · {table.source}</div>
        </div>
        <Btn variant="gold" size="sm" onClick={doRoll}><Dices size={13}/> Roll</Btn>
      </div>
      {result && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontFamily: FONTS.mono, marginBottom: 4 }}>Rolled {result.n}</div>
          <div style={{ fontSize: 13 }}>{result.row?.result || "No matching row."}</div>
        </div>
      )}
      <details><summary style={{ cursor: "pointer", color: COLORS.muted, fontSize: 12 }}>View full table</summary>
        <div style={{ marginTop: 8 }}>
          {table.rows.map((r,i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, padding: "5px 0", borderBottom: i<table.rows.length-1?`1px solid ${COLORS.border}`:"none" }}>
              <div style={{ width: 44, flexShrink: 0, color: COLORS.gold, fontFamily: FONTS.mono }}>{r.range}</div>
              <div style={{ color: COLORS.muted }}>{r.result}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function NameTableCard() {
  const [result, setResult] = useState(null);
  const doRoll = () => setResult(`${pick(NPC_POOLS.first)} ${Math.random()>0.4?pick(NPC_POOLS.last):""}`.trim());
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div><div style={{ fontWeight: 700 }}>NPC Name Generator</div><div style={{ color: COLORS.dim, fontSize: 11.5 }}>GM Toolkit</div></div>
        <Btn variant="gold" size="sm" onClick={doRoll}><Dices size={13}/> Roll</Btn>
      </div>
      {result && <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 700 }}>{result}</div>}
    </div>
  );
}
function FlavorTableCard({ title, pool }) {
  const [result, setResult] = useState(null);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div><div style={{ fontWeight: 700 }}>{title}</div><div style={{ color: COLORS.dim, fontSize: 11.5 }}>GM Toolkit</div></div>
        <Btn variant="gold" size="sm" onClick={() => setResult(pick(pool))}><Dices size={13}/> Roll</Btn>
      </div>
      {result && <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, fontSize: 13 }}>{result}</div>}
    </div>
  );
}

const blankCustomTable = () => ({ id: uid(), name: "New Table", die: "1d20", rows: [] });

function CustomTablesTab() {
  const [tables, persist, error] = useSharedList("custom_tables");
  const [openId, setOpenId] = useState(null);
  const fileRef = useRef();
  if (tables === null) return <LoadingBlock />;
  const add = () => { const t = blankCustomTable(); persist([...tables, t]); setOpenId(t.id); };
  const update = (id, patch) => persist(tables.map(t => t.id===id?{...t,...patch}:t));
  const remove = (id) => { persist(tables.filter(t => t.id!==id)); setOpenId(null); };
  const open = tables.find(t => t.id === openId);

  const importFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const data = JSON.parse(reader.result); persist([...tables, { ...blankCustomTable(), ...data, id: uid() }]); } catch { alert("Couldn't read that file."); } };
    reader.readAsText(f);
  };

  if (open) {
    const addRow = () => update(open.id, { rows: [...open.rows, { range: String(open.rows.length+1), result: "" }] });
    const updateRow = (i, patch) => update(open.id, { rows: open.rows.map((r,j) => j===i?{...r,...patch}:r) });
    const removeRow = (i) => update(open.id, { rows: open.rows.filter((_,j) => j!==i) });
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <TextInput value={open.name} onChange={e => update(open.id, { name: e.target.value })} style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, background: "transparent", border: "none", maxWidth: 260 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant="blue" onClick={() => downloadJSON(open, `${open.name.replace(/\s+/g,'_')}.json`)}><Download size={13}/></Btn>
            <Btn size="sm" variant="danger" onClick={() => remove(open.id)}><Trash2 size={13}/></Btn>
            <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
          </div>
        </div>
        <Field label="Die"><TextInput value={open.die} onChange={e => update(open.id, { die: e.target.value })} style={{ maxWidth: 120 }} /></Field>
        {open.rows.map((r,i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <TextInput value={r.range} onChange={e => updateRow(i, { range: e.target.value })} style={{ width: 70 }} placeholder="1-3" />
            <TextInput value={r.result} onChange={e => updateRow(i, { result: e.target.value })} placeholder="Result text..." />
            <Btn size="sm" variant="ghost" onClick={() => removeRow(i)}><Trash2 size={13} color={COLORS.red}/></Btn>
          </div>
        ))}
        <Btn size="sm" onClick={addRow}><Plus size={13}/> Add Row</Btn>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Btn variant="gold" onClick={add}><Plus size={14}/> New Table</Btn>
        <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importFile} />
        <Btn onClick={() => fileRef.current.click()}><Upload size={14}/> Import</Btn>
      </div>
      {tables.length === 0 ? (
        <EmptyState icon={Table2} title="No custom tables yet" body="Build your own, or import one someone shared with you." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
          {tables.map(t => (
            <div key={t.id} onClick={() => setOpenId(t.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div style={{ color: COLORS.dim, fontSize: 11.5 }}>{t.die} · {t.rows.length} rows</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DowntimeTab() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Downtime Activities</div>
        <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 12 }}>Spend Downtime Points your DM awards between sessions.</div>
        {DOWNTIME_ACTIVITIES.map((a, i) => (
          <div key={i} onClick={() => setOpenIdx(openIdx===i?null:i)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>{a.name}</div>
              <Tag color={COLORS.gold}>{a.cost} DP</Tag>
            </div>
            {openIdx === i && <div style={{ color: COLORS.muted, fontSize: 12.5, marginTop: 8, lineHeight: 1.5 }}>{a.desc}</div>}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Training Arcs</div>
        {TRAINING_ARC_STYLES.map((t, i) => (
          <div key={i} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4 }}>{t.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12.5, lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {MAX_TRAINING_BOONS_PER_RANK.map(r => <Tag key={r.rank} color={COLORS.blue}>Ki Rank {r.rank}: max {r.max} Boons</Tag>)}
        </div>
      </div>

      <div>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Spending Training Boons</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
          {TRAINING_BOON_SPENDS.map((s, i) => (
            <div key={i} style={{ fontSize: 12.5, color: COLORS.text, padding: "5px 0", borderBottom: i<TRAINING_BOON_SPENDS.length-1?`1px solid ${COLORS.border}`:"none" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GamblingTab() {
  const [selected, setSelected] = useState(null);
  const [stake, setStake] = useState(50);
  const [result, setResult] = useState(null);

  const play = (game) => {
    if (game.name === "Dice Clash") {
      const player = roll(6) + roll(6);
      const house = roll(6) + roll(6) + 2;
      if (player > house) setResult({ text: `You rolled ${player} vs house's ${house}. You win ${stake*2} Ƶeni!`, win: true });
      else if (player === house) setResult({ text: `Tie at ${player}. Stake returned.`, win: null });
      else setResult({ text: `You rolled ${player} vs house's ${house}. You lose your ${stake} Ƶeni.`, win: false });
    } else if (game.name === "Ki Pull Machines") {
      const r = roll(20);
      if (r >= 22) setResult({ text: `Rolled ${r}. Jackpot! ${stake*2} Ƶeni plus a bonus Common item roll.`, win: true });
      else if (r >= 12) setResult({ text: `Rolled ${r}. Hit! You win ${stake*2} Ƶeni.`, win: true });
      else setResult({ text: `Rolled ${r}. No luck this pull.`, win: false });
    } else {
      const r = roll(20);
      if (r === 20) setResult({ text: `Natural 20! You win ${stake*3} Ƶeni.`, win: true });
      else if (r >= 14) setResult({ text: `Rolled ${r} vs DC 14. You win ${stake*2} Ƶeni.`, win: true });
      else setResult({ text: `Rolled ${r} vs DC 14. You lose your ${stake} Ƶeni.`, win: false });
    }
  };

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 14 }}>Not in the book — built to fit the Zeni economy. Use as flavor for a night at the tables.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, marginBottom: 16 }}>
        {GAMBLING_GAMES.map((g, i) => (
          <div key={i} onClick={() => { setSelected(g); setResult(null); }} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${selected===g?COLORS.gold:COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{g.name}</div>
            <div style={{ color: COLORS.dim, fontSize: 11, marginBottom: 6 }}>Stake: {g.stake}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.4 }}>{g.desc}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{selected.name}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: COLORS.muted }}>Stake (Ƶeni):</span>
            <TextInput type="number" value={stake} onChange={e => setStake(+e.target.value)} style={{ width: 100 }} />
            <Btn variant="gold" onClick={() => play(selected)}><Dices size={14}/> Play</Btn>
          </div>
          {result && (
            <div style={{ background: COLORS.panel2, border: `1px solid ${result.win===true?COLORS.green+"55":result.win===false?COLORS.red+"55":COLORS.border}`, borderRadius: 8, padding: 12, fontSize: 13, color: result.win===true?COLORS.green:result.win===false?COLORS.red:COLORS.text }}>{result.text}</div>
          )}
        </div>
      )}
    </div>
  );
}

function BountyHuntingTab() {
  const [bounties, persist, error] = useSharedList("bounties");
  const [openId, setOpenId] = useState(null);
  if (bounties === null) return <LoadingBlock />;

  const rollBounty = (tierKey) => {
    const tier = BOUNTY_TIERS.find(t => t.key === tierKey);
    const npc = scaledNpc({ species: pick(NPC_POOLS.species), role: pick(NPC_POOLS.role), tierKey: tier.npcTier });
    const bounty = {
      id: uid(), tier: tier.label, target: npc.name, reward: tier.reward,
      status: "open", lastKnown: pick(NPC_POOLS.planet), notes: npc.hook,
    };
    persist([bounty, ...bounties]);
  };
  const setStatus = (id, status) => persist(bounties.map(b => b.id===id?{...b,status}:b));
  const remove = (id) => { persist(bounties.filter(b => b.id!==id)); setOpenId(null); };

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 14 }}>Not in the book — designed to fit. Reward scales with target tier; claim or fail a bounty to track your table's board.</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {BOUNTY_TIERS.map(t => <Btn key={t.key} variant="gold" size="sm" onClick={() => rollBounty(t.key)}><Plus size={12}/> {t.label} ({t.reward})</Btn>)}
      </div>
      {error && <ErrorBanner text={error} />}
      {bounties.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No bounties posted" body="Roll a new bounty at any tier above to populate the board." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {bounties.map(b => (
            <div key={b.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{b.target}</div>
                  <div style={{ color: COLORS.muted, fontSize: 11.5, marginTop: 2 }}>{b.tier} · Last seen: {b.lastKnown}</div>
                  <div style={{ color: COLORS.dim, fontSize: 11.5, marginTop: 2, fontStyle: "italic" }}>{b.notes}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Tag color={b.status==="open"?COLORS.gold:b.status==="claimed"?COLORS.green:COLORS.red}>{b.status}</Tag>
                  <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{b.reward}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {b.status !== "claimed" && <Btn size="sm" variant="blue" onClick={() => setStatus(b.id, "claimed")}>Mark Claimed</Btn>}
                {b.status !== "failed" && <Btn size="sm" onClick={() => setStatus(b.id, "failed")}>Mark Failed</Btn>}
                {b.status !== "open" && <Btn size="sm" onClick={() => setStatus(b.id, "open")}>Reopen</Btn>}
                <Btn size="sm" variant="danger" onClick={() => remove(b.id)}><Trash2 size={12}/></Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// Yes/no oracle for questions nobody planned for ("Is the shop still open?").
function OracleCard() {
  const [question, setQuestion] = useState("");
  const [odds, setOdds] = useState("even");
  const [result, setResult] = useState(null);
  const color = result ? (result.yes ? COLORS.green : COLORS.red) : COLORS.gold;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 2 }}>Oracle</div>
      <div style={{ color: COLORS.dim, fontSize: 11.5, marginBottom: 10 }}>Ask a yes/no question, pick how likely "yes" is, and roll d100.</div>
      <TextInput value={question} onChange={e => setQuestion(e.target.value)} placeholder="Is anyone guarding the ship?" style={{ marginBottom: 10 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {ORACLE_ODDS.map(o => (
          <button key={o.key} onClick={() => setOdds(o.key)} style={{ cursor: "pointer", fontSize: 12, fontWeight: 600, borderRadius: 16, padding: "5px 12px", background: odds === o.key ? `${COLORS.gold}22` : COLORS.panel2, color: odds === o.key ? COLORS.gold : COLORS.muted, border: `1px solid ${odds === o.key ? COLORS.gold : COLORS.border}` }}>{o.label}</button>
        ))}
      </div>
      <Btn variant="gold" size="sm" onClick={() => setResult({ ...askOracle(odds), question: question.trim() })}><Dices size={13}/> Ask</Btn>
      {result && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${color}55`, borderRadius: 8, padding: 10, marginTop: 10 }}>
          {result.question && <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>{result.question}</div>}
          <div style={{ fontSize: 16, fontWeight: 800, color }}>{result.answer}</div>
          <div style={{ fontSize: 11, color: COLORS.dim, fontFamily: FONTS.mono }}>d100 {result.d100} against {result.chance}</div>
        </div>
      )}
    </div>
  );
}

function TablesScreen({ onBack }) {
  const [sub, setSub] = useState("book");
  return (
    <div>
      <ScannerHeader title="TABLES" subtitle="Book tables, downtime & training, gambling, bounties, and your own custom rolls." onBack={onBack} />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {[["book","Book Tables"],["downtime","Downtime & Training"],["gambling","Gambling"],["bounty","Bounty Hunting"],["gm","GM Toolkit"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "book" && BOOK_TABLES.map(t => <BookTableCard key={t.id} table={t} />)}
      {sub === "downtime" && <DowntimeTab />}
      {sub === "gambling" && <GamblingTab />}
      {sub === "bounty" && <BountyHuntingTab />}
      {sub === "gm" && (
        <>
          <OracleCard />
          <NameTableCard />
          <FlavorTableCard title="Homeworld / Planet Flavor" pool={NPC_POOLS.planet} />
          <FlavorTableCard title="NPC Role / Archetype" pool={NPC_POOLS.role} />
          <FlavorTableCard title="Plot Hook" pool={NPC_POOLS.hook} />
        </>
      )}
      {sub === "custom" && <CustomTablesTab />}
    </div>
  );
}

export {
  BookTableCard,
  NameTableCard,
  OracleCard,
  FlavorTableCard,
  blankCustomTable,
  CustomTablesTab,
  DowntimeTab,
  GamblingTab,
  BountyHuntingTab,
  TablesScreen,
};
