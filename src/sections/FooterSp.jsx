// src/sections/FooterSp.jsx
import styles from "./FooterSp.module.css";

const YEAR = new Date().getFullYear();

const NAV = [
  { id: "works-sp", label: "WORKS" },
  { id: "role-sp", label: "ROLE" },
  { id: "promise-sp", label: "PROMISE" },
  { id: "services-sp", label: "SERVICES" },
  { id: "pricing-sp", label: "PRICING" },
  { id: "process-sp", label: "PROCESS" },
  { id: "faq-sp", label: "FAQ" },
  { id: "gallery-sp", label: "GALLERY" },
  { id: "contact-sp", label: "CONTACT" },
];

export default function FooterSp() {
  return (
    <footer id="footer-sp" className={styles.footer} aria-label="フッター">
      <div className={styles.wrap}>
        {/* 上：ブランド */}
        <div className={styles.brandRow}>
          <div className={styles.brand}>
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

          <a className={styles.topLink} href="#top-sp" aria-label="ページ先頭へ">
            TOP <span className={styles.topArrow}>↑</span>
          </a>
        </div>

        {/* 罫線 */}
        <div className={styles.rule} aria-hidden="true" />

        {/* 中：ナビ（2列） */}
        <nav className={styles.nav} aria-label="ページ内ナビゲーション">
          {NAV.map((n) => (
            <a key={n.id} className={styles.navLink} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>

        {/* 下：コピーライト */}
        <div className={styles.bottom}>
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
    </footer>
  );
}