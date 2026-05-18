import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FadeNavSp.module.css";

const NAV = [
  { id: "works-sp", label: "WORKS", sub: "代表作" },
  { id: "role-sp", label: "ROLE", sub: "役割" },
  { id: "promise-sp", label: "PROMISE", sub: "お約束" },
  { id: "services-sp", label: "SERVICES", sub: "できること" },
  { id: "pricing-sp", label: "PRICING", sub: "料金" },
  { id: "process-sp", label: "PROCESS", sub: "進め方" },
  { id: "faq-sp", label: "FAQ", sub: "質問" },
  { id: "gallery-sp", label: "GALLERY", sub: "実績" },
  { id: "contact-sp", label: "CONTACT", sub: "初回相談" },
];

export default function FadeNavSp() {
  const [mounted, setMounted] = useState(false);
  const [reduce, setReduce] = useState(false);

  // Hero / Footer が見えてる間は隠す
  const [heroIn, setHeroIn] = useState(true);
  const [footerIn, setFooterIn] = useState(false);

  const [active, setActive] = useState("works-sp");
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // reduced motion
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;

    const apply = () => setReduce(!!m.matches);
    apply();

    if (m.addEventListener) m.addEventListener("change", apply);
    else m.addListener?.(apply);

    return () => {
      if (m.removeEventListener) m.removeEventListener("change", apply);
      else m.removeListener?.(apply);
    };
  }, []);

  // show/hide by Hero + Footer visibility
  useEffect(() => {
    const hero = document.getElementById("top-sp");
    const footer = document.getElementById("footer-sp");

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

  // show rule
  const show = !heroIn && !footerIn;

  // showが消えたらメニューも閉じる（事故防止）
  useEffect(() => {
    if (!show && open) setOpen(false);
  }, [show, open]);

  // open中はスクロールロック + ESCで閉じる
// open中はスクロールロック + ESCで閉じる
useEffect(() => {
  if (!open) return;

  // スクロール位置を保存してからfixedで固定（iOS overflow:hidden対策）
  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  const onKey = (e) => {
    if (e.key === "Escape") setOpen(false);
  };
  window.addEventListener("keydown", onKey);

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    // 元の位置に戻す
    window.scrollTo(0, scrollY);
    window.removeEventListener("keydown", onKey);
  };
}, [open]);

  const dockCls = useMemo(() => {
    return [
      styles.dock,
      show ? styles.show : "",
      open ? styles.open : "",
      reduce ? styles.reduce : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [show, open, reduce]);

  if (!mounted) return null;

  const onJump = (id) => {
    setActive(id);
    setOpen(false);
    // hrefで飛ぶ（SPAでもhashでOK）
  };

  return createPortal(
    <>
      {/* 小さな署名ボタン（普段はこれだけ） */}
      <div className={dockCls} aria-hidden={!show}>
        <button
          type="button"
          className={styles.btn}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="sp-menu-panel"
          onClick={() => setOpen((v) => !v)}
          disabled={!show}
        >
          <span className={styles.icon} aria-hidden="true" />
          <span className={styles.btnLabel}>{open ? "CLOSE" : "MENU"}</span>
        </button>
      </div>

      {/* 全面オーバーレイ（開いた時だけ） */}
      <div
        className={[
          styles.overlay,
          open ? styles.overlayOpen : "",
          reduce ? styles.reduce : "",
        ].join(" ")}
        aria-hidden={open ? "false" : "true"}
        onClick={() => setOpen(false)}
      >
        <div
          id="sp-menu-panel"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="ページ内メニュー"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.panelTop}>
            <a className={styles.brand} href="#top-sp" onClick={() => setOpen(false)} aria-label="トップへ">
              <img className={styles.logo} src="/brand/auria6.svg" alt="" aria-hidden="true" draggable="false" />
            </a>

            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="閉じる">
              <span className={styles.closeX} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          <nav className={styles.nav} aria-label="セクション一覧">
            <ul className={styles.list} role="list">
              {NAV.map((n, idx) => {
                const isActive = active === n.id;
                return (
                  <li key={n.id} role="listitem" className={styles.item}>
                    <a
                      href={`#${n.id}`}
                      className={[styles.link, isActive ? styles.active : ""].join(" ")}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => onJump(n.id)}
                    >
                      <span className={styles.no} aria-hidden="true">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.words}>
                        <span className={styles.en}>{n.label}</span>
                        <span className={styles.jp}>{n.sub}</span>
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className={styles.foot} aria-hidden="true">
            Auria Tone / 空間設計・監修
          </p>
        </div>
      </div>
    </>,
    document.body
  );
}