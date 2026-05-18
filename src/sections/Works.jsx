// src/sections/Works.jsx
import { useLayoutEffect, useRef, useState } from "react";
import RevealSection from "../components/RevealSection";
import styles from "./Works.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORKS = {
  a: {
    label: "INTERIOR",
    meta: "Beauty / Head Spa",
    img: "/auria-works-01.jpeg",
    alt: "明度を抑えた落ち着いたトーンの内装。",
  },
  b: {
    label: "INTERIOR",
    meta: "Clinic / Medical",
    img: "/auria-works-02.jpeg",
    alt: "白の量と清潔感を整えた医療系の内装。",
  },
  main: {
    label: "TONE BOARD",
    meta: "Materials / Light / Finish",
    img: "/auria-works-main.jpeg",
    alt: "素材サンプルと図面で、判断の根拠を残した記録。",
  },
};

function WorkImage({ src, alt, imgRef }) {
  const [ok, setOk] = useState(true);
  const [retry, setRetry] = useState(0);
  const resolvedSrc = retry > 0 ? `${src}?v=${retry}` : src;

  const onError = () => {
    setRetry((t) => {
      if (t < 1) return t + 1;
      setOk(false);
      return t;
    });
  };

  return (
    <div className={styles.frame}>
      <div className={styles.imgFallback} aria-hidden="true" />
      <img
        ref={imgRef}
        className={[styles.img, ok ? "" : styles.imgBroken].filter(Boolean).join(" ")}
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        onError={onError}
        onLoad={() => setOk(true)}
      />
    </div>
  );
}

export default function Works() {
  const rootRef = useRef(null);

  // GSAPは「画像だけ」動かす（レイアウトは触らない）
  const aImgRef = useRef(null);
  const bImgRef = useRef(null);
  const mainImgRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (m?.matches) return;

    const root = rootRef.current;
    if (!root) return;

    const aImg = aImgRef.current;
    const bImg = bImgRef.current;
    const mainImg = mainImgRef.current;

    const ctx = gsap.context(() => {
      const setBase = (el) => {
        if (!el) return;
        gsap.set(el, {
          willChange: "transform",
          scale: 1.01,
          y: 0,
          force3D: true,
        });
      };

      setBase(aImg);
      setBase(bImg);
      setBase(mainImg);

      if (aImg) {
        gsap.to(aImg, {
          y: -10,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      if (bImg) {
        gsap.to(bImg, {
          y: -14,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      if (mainImg) {
        gsap.fromTo(
          mainImg,
          { y: 16, scale: 1.035 },
          {
            y: -16,
            scale: 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  // 旧の “証拠の章” の間を保つため、mainだけ少し遅らせる（i=4）
  return (
    <RevealSection
      ref={rootRef}
      id="works"
      className={styles.section}
      aria-labelledby="works-title"
      data-reveal="slow"
      threshold={0.2}
      rootMargin="-10% 0px -10% 0px"
    >
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <header className={`${styles.head} ${styles.stagger}`} style={{ "--i": 0 }}>
            <div className={styles.kicker} aria-hidden="true">
              <span className={styles.kickerEn}>WORKS</span>
              <span className={styles.kickerDash}>—</span>
              <span className={styles.kickerJp}>代表作</span>
            </div>

            <h2 id="works-title" className={styles.srOnly}>
              代表作
            </h2>

            <p className={styles.support}>仕上がりに、理由が残る。</p>
          </header>

          <figure className={[styles.card, styles.cardA, styles.stagger].join(" ")} style={{ "--i": 1 }}>
            <WorkImage src={WORKS.a.img} alt={WORKS.a.alt} imgRef={aImgRef} />
            <figcaption className={styles.cap}>
              <span className={styles.capRule} aria-hidden="true" />
              <span className={styles.capLabel}>{WORKS.a.label}</span>
              <span className={styles.capMeta}>{WORKS.a.meta}</span>
            </figcaption>
          </figure>

          <figure className={[styles.card, styles.cardB, styles.stagger].join(" ")} style={{ "--i": 2 }}>
            <WorkImage src={WORKS.b.img} alt={WORKS.b.alt} imgRef={bImgRef} />
            <figcaption className={styles.cap}>
              <span className={styles.capRule} aria-hidden="true" />
              <span className={styles.capLabel}>{WORKS.b.label}</span>
              <span className={styles.capMeta}>{WORKS.b.meta}</span>
            </figcaption>
          </figure>

          <figure className={[styles.main, styles.cardMain, styles.stagger].join(" ")} style={{ "--i": 4 }}>
            <WorkImage src={WORKS.main.img} alt={WORKS.main.alt} imgRef={mainImgRef} />
            <figcaption className={styles.capMain}>
              <span className={styles.capRule} aria-hidden="true" />
              <span className={styles.capLabel}>{WORKS.main.label}</span>
              <span className={styles.capMeta}>{WORKS.main.meta}</span>
            </figcaption>
          </figure>

          <a className={[styles.more, styles.stagger].join(" ")} style={{ "--i": 5 }} href="#works" aria-label="作品一覧へ">
            <span className={styles.moreRule} aria-hidden="true" />
            <span className={styles.moreText}>作品一覧へ</span>
            <span className={styles.moreRule} aria-hidden="true" />
          </a>
        </div>
      </div>
    </RevealSection>
  );
}