import React, { useState, useRef, useEffect, useCallback } from "react";
import { chamfer } from "./ui/atoms.jsx";
import { COLORS, FONTS } from "./ui/theme.js";


// Bump this key if the acknowledgement text materially changes — everyone will
// then be shown the new version once.
const ACK_KEY = "sdndbz_credits_ack_v1";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{
      fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 0.8, marginBottom: 8,
    }}>{title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: COLORS.text }}>{children}</div>
  </div>
);

export default function SplashGate({ children }) {
  const [ack, setAck] = useState(() => localStorage.getItem(ACK_KEY) === "1");
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef(null);

  // Enable the button only once the reader has actually reached the bottom of
  // the credits. Re-checked on resize because a taller window can show the
  // whole text without any scrolling at all.
  const check = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reachedEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    if (reachedEnd) setAtEnd(true);
  }, []);

  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [check]);

  if (ack) return children;

  const accept = () => {
    localStorage.setItem(ACK_KEY, "1");
    setAck(true);
  };

  return (
    <div style={{
      minHeight: "100vh", color: COLORS.text,
      background: `radial-gradient(ellipse at 50% 0%, ${COLORS.blue}14, transparent 60%), ${COLORS.bg}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: FONTS.body, padding: 24, boxSizing: "border-box",
    }}>
      <div style={{
        background: COLORS.panel, clipPath: chamfer(18), boxShadow: `inset 0 0 0 1px ${COLORS.border}`,
        width: 640, maxWidth: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        <div style={{ padding: "28px 32px 18px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{
            fontFamily: FONTS.display, fontWeight: 900, fontSize: 20,
            letterSpacing: 1.4, marginBottom: 6,
          }}>
            SDNDBZ COMPANION
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>
            An unofficial fan-made companion app for Super Dungeons and Dragonball.
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={check}
          style={{
            padding: "24px 32px", overflowY: "auto", flex: 1,
            background: COLORS.input,
          }}
        >
          <Section title="Dragon Ball">
            Dragon Ball was created by <strong>Akira Toriyama</strong>. Dragon Ball, Dragon Ball Z,
            and all associated characters, names, settings, and imagery are the property of their
            respective copyright holders, including <strong>Bird Studio</strong>,{" "}
            <strong>Shueisha</strong>, and <strong>Toei Animation</strong>. All rights belong to
            them. This project claims no ownership of any of it, and exists purely out of respect
            and admiration for Toriyama's work.
          </Section>

          <Section title="The Game — Super Dungeons and Dragonball">
            Every rule, technique, feat, species, form, condition, and table in this app comes from
            the <strong>Super Dungeons and Dragonball (SD&amp;DBZ)</strong> tabletop system. That
            system is entirely the work of the <strong>SD&amp;DBZ Team</strong> — this app did not
            design, balance, or write any of it, and takes no credit for the game itself.
            <div style={{ marginTop: 10, color: COLORS.muted }}>
              The rulebook extends thanks to <strong style={{ color: COLORS.text }}>Dilius</strong>,{" "}
              <strong style={{ color: COLORS.text }}>Ifrit</strong>,{" "}
              <strong style={{ color: COLORS.text }}>Quinn</strong>,{" "}
              <strong style={{ color: COLORS.text }}>Vitalism</strong>,{" "}
              <strong style={{ color: COLORS.text }}>Yoohar</strong>,{" "}
              <strong style={{ color: COLORS.text }}>Zeon</strong>, and{" "}
              <strong style={{ color: COLORS.text }}>Gio</strong> for the countless hours they put
              into the system. Book artwork by{" "}
              <strong style={{ color: COLORS.text }}>Un.pibe_mas</strong>.
            </div>
          </Section>

          <Section title="Dungeons &amp; Dragons">
            SD&amp;DBZ is built on the framework of <strong>Dungeons &amp; Dragons 5th Edition
            (2024)</strong>, which is the property of <strong>Wizards of the Coast</strong>. To play
            you will need the SD&amp;DBZ rulebook alongside the 2024 Player's Handbook and Dungeon
            Master's Guide.
          </Section>

          <Section title="About This App">
            This is an unofficial, non-commercial companion tool made by a fan, for a home game. It
            is not affiliated with, endorsed by, or sponsored by any of the parties named above. It
            is not a replacement for the rulebook — it is a sheet-and-tracker that assumes you
            already own and read the book. Please support the official SD&amp;DBZ release and the
            official Dragon Ball releases.
            <div style={{ marginTop: 10 }}>
              If any rights holder named here objects to this tool's existence, it will be taken
              down without argument.
            </div>
          </Section>

          <div style={{
            marginTop: 26, paddingTop: 16, borderTop: `1px solid ${COLORS.border}`,
            fontSize: 12.5, color: COLORS.dim, lineHeight: 1.6,
          }}>
            Dragon Ball © Bird Studio / Shueisha / Toei Animation. Dungeons &amp; Dragons © Wizards
            of the Coast. SD&amp;DBZ game content © the SD&amp;DBZ Team. No copyright infringement
            intended.
          </div>
        </div>

        <div style={{
          padding: "16px 32px 20px", borderTop: `1px solid ${COLORS.border}`,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{ fontSize: 12, color: atEnd ? COLORS.muted : COLORS.gold, flex: 1 }}>
            {atEnd
              ? "Thanks for reading."
              : "Scroll to the end of the credits to continue."}
          </div>
          <button
            onClick={accept}
            disabled={!atEnd}
            style={{
              padding: "10px 22px", borderRadius: 4, letterSpacing: 0.8, textTransform: "uppercase",
              border: `1px solid ${atEnd ? `${COLORS.gold}55` : COLORS.border}`,
              background: atEnd ? `${COLORS.gold}1A` : "transparent",
              color: atEnd ? COLORS.gold : COLORS.dim,
              fontWeight: 700, fontSize: 14,
              cursor: atEnd ? "pointer" : "not-allowed",
              whiteSpace: "nowrap",
            }}
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
