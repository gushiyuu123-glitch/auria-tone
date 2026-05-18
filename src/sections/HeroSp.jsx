import { useEffect, useMemo, useState } from "react";
import styles from "./HeroSp.module.css";

const NAV = [
  { id: "works-sp", en: "WORKS", jp: "代表作" },
  { id: "role-sp", en: "ROLE", jp: "役割" },
  { id: "promise-sp", en: "PROMISE", jp: "お約束" },
  { id: "services-sp", en: "SERVICES", jp: "できること" },
  { id: "pricing-sp", en: "PRICING", jp: "料金" },
  { id: "process-sp", en: "PROCESS", jp: "進め方" },
  { id: "faq-sp", en: "FAQ", jp: "質問" },
  { id: "gallery-sp", en: "GALLERY", jp: "実績" },
  { id: "contact-sp", en: "CONTACT", jp: "初回相談" },
];

const HERO_IMG = "/auria-hero5.jpeg";
const COPY = { l1: "また来たくなる", l2: "空間を、設計する。" };

function clampActiveId(id) {
  if (!id) return "works-sp";
  return NAV.some((n) => n.id === id) ? id : "works-sp";
}

export default function HeroSp() {
  const [isIn, setIsIn] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [activeId, setActiveId] = useState("works-sp");

  // 画像事故：1回だけ再取得 → だめなら写真だけ消す
  const [imgOk, setImgOk] = useState(true);
  const [imgRetry, setImgRetry] = useState(0);

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const r = !!m?.matches;
      setReduce(r);
      if (r) setIsIn(true);
      else requestAnimationFrame(() => setIsIn(true));
    };

    apply();

    const onHash = () => {
      const id = window.location.hash?.replace("#", "");
      setActiveId(clampActiveId(id));
    };
    onHash();

    if (m?.addEventListener) m.addEventListener("change", apply);
    else m?.addListener?.(apply);

    window.addEventListener("hashchange", onHash);

    return () => {
      if (m?.removeEventListener) m.removeEventListener("change", apply);
      else m?.removeListener?.(apply);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const heroSrc = imgRetry > 0 ? `${HERO_IMG}?v=${imgRetry}` : HERO_IMG;

  const onImgError = () => {
    setImgRetry((t) => {
      if (t < 1) return t + 1;
      setImgOk(false);
      return t;
    });
  };

  const cls = useMemo(
    () => [styles.hero, isIn ? styles.isIn : "", reduce ? styles.reduce : ""].filter(Boolean).join(" "),
    [isIn, reduce]
  );

  return (
    <section id="top-sp" className={cls} aria-labelledby="hero-title-sp">
      <h1 id="hero-title-sp" className={styles.srOnly}>
        Auria Tone 空間設計・監修
      </h1>

      {/* bg */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.fallback} />
        <img
          className={[styles.photo, imgOk ? "" : styles.photoBroken].filter(Boolean).join(" ")}
          src={heroSrc}
          alt=""
          loading="eager"
          decoding="async"
          draggable="false"
          onError={onImgError}
          onLoad={() => setImgOk(true)}
        />
        <div className={styles.overlay} />
        <div className={styles.glow} />
      </div>

      {/* 左上署名 */}
      <p className={styles.signature}>空間設計・監修</p>

      {/* 中央ステージ（ロゴ主役） */}
      <div className={styles.centerStage}>
        <img className={styles.logo} src="/brand/auria6.svg" alt="Auria Tone" draggable="false" />
        <p className={styles.copy}>
          <span className={styles.copyLine}>{COPY.l1}</span>
          <span className={styles.copyLine}>{COPY.l2}</span>
        </p>
      </div>

      {/* ナビ：索引（UI感を消す） */}
      <nav className={styles.menu} aria-label="ページ内メニュー">
        <div className={styles.menuVeil} aria-hidden="true" />
        <ul className={styles.menuList} role="list">
          {NAV.map((n) => {
            const active = activeId === n.id;
            return (
              <li key={n.id} role="listitem" className={styles.menuItem}>
                <a
                  href={`#${n.id}`}
                  className={[styles.link, active ? styles.active : ""].join(" ")}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(n.id)}
                >
                  <span className={styles.linkEn}>{n.en}</span>
                  <span className={styles.linkJp}>{n.jp}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}