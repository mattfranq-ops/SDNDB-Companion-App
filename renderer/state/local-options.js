import { useState } from "react";

// Per-device settings persisted in localStorage (never shared with the table).
function useLocalOption(key, def) {
  const [val, setVal] = useState(() => { try { const v = localStorage.getItem(key); return v == null ? def : { ...def, ...JSON.parse(v) }; } catch { return def; } });
  const save = (patch) => setVal(prev => { const next = { ...prev, ...patch }; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ } return next; });
  return [val, save];
}

const ROLL_BANNER_KEY = "sdndbz_roll_banner_v1";
const ROLL_BANNER_DEFAULT = { enabled: true, sticky: false, seconds: 4 };

export { useLocalOption, ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT };
