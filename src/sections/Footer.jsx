// src/sections/Footer.jsx
import RevealSection from "../components/RevealSection";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

const NAV = [
  { id: "works", label: "WORKS" },
  { id: "role", label: "ROLE" },
  { id: "promise", label: "PROMISE" },
  { id: "services", label: "SERVICES" },
  { id: "pricing", label: "PRICING" },
  { id: "process", label: "PROCESS" },
  { id: "faq", label: "FAQ" },
  { id: "gallery", label: "GALLERY" },
  { id: "contact", label: "CONTACT" },
];

export default function Footer() {
  let i = 0;

  return (
    <RevealSection as="footer" className={styles.footer} aria-label="フッター">
      <div className={styles.wrap}>
        <div className={styles.top}>
          {/* left: brand */}
          <div className={`${styles.brand} ${styles.stagger}`} style={{ "--i": i++ }}>
            <img
              className={styles.brandSvg}
              src="/brand/auria6.svg"
              alt="Auria Tone"
              draggable="false"
              loading="lazy"
              decoding="async"
            />
            <span className={styles.brandJp}>空間設計・監修</span>
          </div>

          {/* center: nav */}
          <nav
            className={`${styles.nav} ${styles.stagger}`}
            style={{ "--i": i++ }}
            aria-label="ページ内ナビゲーション"
          >
            {NAV.map((n) => (
              <a key={n.id} className={styles.navLink} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* right: top */}
          <div className={`${styles.meta} ${styles.stagger}`} style={{ "--i": i++ }}>
            <a className={styles.topLink} href="#top" aria-label="ページ先頭へ">
              TOP <span className={styles.topArrow}>↑</span>
            </a>
          </div>
        </div>

        <div className={`${styles.bottom} ${styles.stagger}`} style={{ "--i": i++ }}>
          <p className={styles.copy}>© {YEAR} AURIA TONE</p>

          <p className={styles.credit}>
            Design &amp; Build:{" "}
            <a
              className={styles.inlineLink}
              href="https://gushikendesign.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GUSHIKEN DESIGN
            </a>
          </p>
        </div>
      </div>
    </RevealSection>
  );
}