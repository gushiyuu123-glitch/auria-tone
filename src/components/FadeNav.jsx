import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FadeNav.module.css";
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

export default function FadeNav() {
  const [mounted, setMounted] = useState(false);
  const [reduce, setReduce] = useState(false);

  // Hero / Footer が見えてる間は隠す
  const [heroIn, setHeroIn] = useState(true);   // 初期はHero想定で隠す
  const [footerIn, setFooterIn] = useState(false);

  const [active, setActive] = useState("works");

  useEffect(() => setMounted(true), []);

  // reduced motion
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const apply = () => setReduce(!!m.matches);
    apply();
    m.addEventListener?.("change", apply);
    return () => m.removeEventListener?.("change", apply);
  }, []);

  // show/hide by Hero + Footer visibility
  useEffect(() => {
    const hero = document.getElementById("top");
    const footer = document.querySelector("footer"); // Footer.jsx が <footer> なのでこれで取れる

    // Heroが無いなら「上では隠さない」扱い
    if (!hero) setHeroIn(false);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setHeroIn(e.isIntersecting);
          if (e.target === footer) setFooterIn(e.isIntersecting);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -22% 0px" }
    );

    if (hero) io.observe(hero);
    if (footer) io.observe(footer);

    return () => io.disconnect();
  }, []);

  // active section
  useEffect(() => {
    const ids = NAV.map((n) => n.id).filter((id) => document.getElementById(id));
    if (!ids.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (hit?.target?.id) setActive(hit.target.id);
      },
      { threshold: [0.22, 0.34, 0.46], rootMargin: "-36% 0px -48% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const show = !heroIn && !footerIn;

  const cls = useMemo(() => {
    return [styles.nav, show ? styles.show : "", reduce ? styles.reduce : ""]
      .filter(Boolean)
      .join(" ");
  }, [show, reduce]);

  if (!mounted) return null;

  return createPortal(
    <nav className={cls} aria-label="ページ内ナビゲーション">
      <a className={styles.brand} href="#top" aria-label="トップへ">
        <img className={styles.logo} src="/brand/auria6.svg" alt="" aria-hidden="true" draggable="false" />
      </a>

      <div className={styles.links} role="list">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={[styles.link, active === n.id ? styles.active : ""].join(" ")}
            role="listitem"
            aria-current={active === n.id ? "true" : undefined}
          >
            {n.label}
          </a>
        ))}
      </div>
    </nav>,
    document.body
  );
}