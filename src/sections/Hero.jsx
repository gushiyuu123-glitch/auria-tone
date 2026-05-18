import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { id: "works",    en: "WORKS",    jp: "代表作" },
  { id: "services", en: "SERVICES", jp: "できること" },
  { id: "pricing",  en: "PRICING",  jp: "料金" },
  { id: "process",  en: "PROCESS",  jp: "進め方" },
  { id: "faq",      en: "FAQ",      jp: "質問" },
  { id: "contact",  en: "CONTACT",  jp: "初回相談" },
];
const VERDICT = "また来たくなる空間を、設計する。";
const HERO_IMG = "/auria-hero5.jpeg";

function clampActiveId(id) {
  if (!id) return "works";
  const ok = NAV.some((n) => n.id === id);
  return ok ? id : "works";
}

export default function Hero() {
  const [isIn, setIsIn] = useState(false);
  const [reduce, setReduce] = useState(false);

  // 画像が落ちた時の「1回だけ再取得」用
  const [imgOk, setImgOk] = useState(true);
  const [imgRetry, setImgRetry] = useState(0);

  const [activeId, setActiveId] = useState("works");

  const stageRef = useRef(null);
  const navListRef = useRef(null);
  const logoStageRef = useRef(null);
  const microRef = useRef(null);
  const photoRef = useRef(null);
  const glazeRef = useRef(null);

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const applyReduce = () => {
      const r = !!m?.matches;
      setReduce(r);
      if (r) setIsIn(true);
      else requestAnimationFrame(() => setIsIn(true));
    };

    applyReduce();
    m?.addEventListener?.("change", applyReduce);

    const sync = () => {
      const id = window.location.hash?.replace("#", "");
      setActiveId(clampActiveId(id));
    };

    sync();
    window.addEventListener("hashchange", sync);

    return () => {
      window.removeEventListener("hashchange", sync);
      m?.removeEventListener?.("change", applyReduce);
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (m?.matches) return;

    const stage = stageRef.current;
    const navList = navListRef.current;
    const logoStage = logoStageRef.current;
    const micro = microRef.current;
    const photo = photoRef.current;
    const glaze = glazeRef.current;

    if (!stage || !navList || !logoStage) return;

    const items = Array.from(navList.querySelectorAll("li"));

    const ctx = gsap.context(() => {
      gsap.set([logoStage, ...items, micro], {
        opacity: 0,
        y: 10,
        willChange: "transform,opacity",
      });

      const tl = gsap.timeline({ delay: 0.08 });

      tl.to(logoStage, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      })
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            ease: "power2.out",
            stagger: 0.08,
          },
          0.22
        )
        .to(
          micro,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0.55
        )
        .add(() => {
          // intro後は解除（常駐させない）
          gsap.set([logoStage, ...items, micro], { willChange: "auto" });
        });

      if (photo) {
        gsap.to(photo, {
          y: -14,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      if (glaze) {
        gsap.to(glaze, {
          opacity: 0.54,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, stage);

    return () => ctx.revert();
  }, []);

  const cls = [styles.hero, isIn ? styles.isIn : "", reduce ? styles.reduce : ""]
    .filter(Boolean)
    .join(" ");

  const heroSrc =
    imgRetry > 0 ? `${HERO_IMG}?v=${imgRetry}` : HERO_IMG;

  const onHeroImgError = () => {
    // 1回だけ再取得 → それでもダメなら写真を消して下地で逃がす
    setImgRetry((t) => {
      if (t < 1) return t + 1;
      setImgOk(false);
      return t;
    });
  };

  return (
    <section id="top" className={cls} aria-labelledby="hero-title">
      <h1 id="hero-title" className={styles.srOnly}>
        Auria Tone 空間設計事務所
      </h1>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.left}>
          {/* 下地は常に置く（img差し替えでGSAP事故らせない） */}
          <div className={styles.heroFallback} aria-hidden="true" />

          <img
            ref={photoRef}
            className={[
              styles.heroPhoto,
              imgOk ? "" : styles.heroPhotoBroken,
            ].join(" ")}
            src={heroSrc}
            alt=""
            draggable="false"
            loading="eager"
            decoding="async"
            onError={onHeroImgError}
          />

          <div
            ref={glazeRef}
            className={styles.luxeDarkGlaze}
            aria-hidden="true"
          />
          <div className={styles.heroVeil} aria-hidden="true" />

          <p className={styles.verdict}>
            <span className={styles.srOnly}>{VERDICT}</span>

            <span className={styles.verdictChars} aria-hidden="true">
              {Array.from(VERDICT).map((ch, i) => (
                <span
                  key={`${i}-${ch}`}
                  className={styles.verdictChar}
                  style={{ "--i": i }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </p>

          <div ref={microRef} className={styles.microObj} aria-hidden="true">
            <span>MATERIALS</span>
            <span className={styles.microDot}>·</span>
            <span>DRAWING</span>
            <span className={styles.microDot}>·</span>
            <span>COFFEE</span>
          </div>
        </div>

        <aside className={styles.rail} aria-label="ページナビゲーション">
          <nav className={styles.nav} aria-label="サイト内メニュー">
            <ul ref={navListRef} className={styles.navList}>
              {NAV.map((item) => {
                const active = activeId === item.id;
                const isContact = item.id === "contact";

                const liClass = [
                  styles.navItem,
                  isContact ? styles.navItemContact : "",
                  active
                    ? isContact
                      ? styles.navItemContactActive
                      : styles.navItemActive
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <li
                    key={item.id}
                    data-id={item.id}
                    className={liClass}
                    data-active={active ? "true" : "false"}
                  >
                    <a
                      className={styles.navLink}
                      href={`#${item.id}`}
                      aria-current={active ? "location" : undefined}
                    >
                      <span className={styles.navEn}>{item.en}</span>
                      <span className={styles.navJp}>{item.jp}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div ref={logoStageRef} className={styles.logoStage} aria-hidden="true">
          <div className={styles.logoBackVeil} />
          <img
            className={styles.logoHero}
            src="/brand/auria6.svg"
            alt="Auria Tone"
            draggable="false"
          />
          <div className={styles.logoFrontVeil} />
        </div>
      </div>
    </section>
  );
}