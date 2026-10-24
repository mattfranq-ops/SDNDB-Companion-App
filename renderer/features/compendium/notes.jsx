import React, { useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { uid } from "../../lib/dice.js";
import { usePersonalList, useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, LoadingBlock, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

/* ============================== NOTES ============================== */
function NotesTab() {
  const [shared, persistShared, sharedErr] = useSharedList("notes_shared_v2");
  const [personal, persistPersonal] = usePersonalList("notes_personal_v2");
  const [mode, setMode] = useState("shared");
  const list = mode === "shared" ? shared : personal;
  const persist = mode === "shared" ? persistShared : persistPersonal;
  if (list === null) return <LoadingBlock />;
  const add = () => persist([{ id: uid(), title: "New Note", body: "", updated: Date.now() }, ...list]);
  const update = (id, patch) => persist(list.map(n => n.id===id?{...n,...patch,updated:Date.now()}:n));
  const remove = (id) => persist(list.filter(n => n.id !== id));
  return (
    <div>
      {mode === "shared" && sharedErr && <ErrorBanner text={sharedErr} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Btn variant={mode==="shared"?"blue":"default"} onClick={() => setMode("shared")}>Table Notes</Btn>
        <Btn variant={mode==="personal"?"gold":"default"} onClick={() => setMode("personal")}>My Private Notes</Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="gold" onClick={add}><Plus size={14}/> New Note</Btn>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={FileText} title="No notes yet" body={mode==="shared" ? "Session recaps, house rules — visible to everyone." : "Only you can see these."} action={<Btn variant="gold" onClick={add}><Plus size={14}/> New Note</Btn>} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
          {list.map(n => (
            <div key={n.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <TextInput value={n.title} onChange={e => update(n.id, { title: e.target.value })} style={{ fontWeight: 700, background: "transparent", border: "none", padding: 0 }} />
                <Trash2 size={14} color={COLORS.red} style={{ cursor: "pointer", flexShrink: 0, marginLeft: 6 }} onClick={() => remove(n.id)} />
              </div>
              <TextArea value={n.body} onChange={e => update(n.id, { body: e.target.value })} style={{ minHeight: 80 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export {
  NotesTab,
};
