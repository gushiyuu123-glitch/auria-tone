import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Promise.module.css";

const COPY = {
  kickerEn: "PROMISE",
  kickerJp: "お約束",
  headline: "基準は、最初から動かしません。",
  lines: [
    "最初に、仕上がりの基準を言葉で固めます。",
    "判断の順番まで、先に決めます。",
    "現場では監修でズレを拾い、納まりを合わせます。",
    "明度・素材・光は、最後にまとめて整えます。",
    "仕上がりが“たまたま”にならないように進めます。",
  ],
  noTitle: "やらないこと",
  noItems: [
    "施工は請負いません。",
    "その場の判断で、仕様は動かしません。",
    "“それっぽい”で終わらせません。",
  ],
};

export default function Promise() {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const r = !!m?.matches;
      setReduce(r);
      if (r) setInView(true);
    };

    apply();

    const el = rootRef.current;
    let io;

    if (!m?.matches && el) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          io.disconnect();
        },
        { threshold: 0.22, rootMargin: "-12% 0px -12% 0px" }
      );
      io.observe(el);
    }

    m?.addEventListener?.("change", apply);

    return () => {
      io?.disconnect?.();
      m?.removeEventListener?.("change", apply);
    };
  }, []);

  const cls = useMemo(
    () =>
      [styles.section, inView ? styles.in : "", reduce ? styles.reduce : ""]
        .filter(Boolean)
        .join(" "),
    [inView, reduce]
  );

  let i = 0;

  return (
    <section ref={rootRef} id="promise" className={cls} aria-labelledby="promise-title">
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div
            className={`${styles.kicker} ${styles.stagger}`}
            style={{ "--i": i++ }}
            aria-hidden="true"
          >
            <span className={styles.kickerEn}>{COPY.kickerEn}</span>
            <span className={styles.kickerDash}>—</span>
            <span className={styles.kickerJp}>{COPY.kickerJp}</span>
          </div>

          <h2 id="promise-title" className={styles.srOnly}>
            お約束
          </h2>

          <p className={`${styles.headline} ${styles.stagger}`} style={{ "--i": i++ }}>
            {COPY.headline}
          </p>

          <span className={`${styles.rule} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true" />

          <div className={styles.text}>
            {COPY.lines.map((t) => (
              <p key={t} className={`${styles.line} ${styles.stagger}`} style={{ "--i": i++ }}>
                {t}
              </p>
            ))}
          </div>

          <span className={`${styles.rule} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true" />

          <p className={`${styles.noTitle} ${styles.stagger}`} style={{ "--i": i++ }}>
            {COPY.noTitle}
          </p>

          <div className={styles.noGrid} role="list">
            {COPY.noItems.map((t) => (
              <p key={t} role="listitem" className={`${styles.noItem} ${styles.stagger}`} style={{ "--i": i++ }}>
                {t}
              </p>
            ))}
          </div>

          <a
            href="#pricing"
            className={`${styles.pricingLink} ${styles.stagger}`}
            style={{ "--i": i++ }}
            aria-label="PRICINGへ"
          >
            <span className={styles.pricingLead}>費用の目安は</span>
            <span className={styles.pricingWord}>PRICING</span>
            <span className={styles.pricingTail}>にまとめています</span>

          </a>
        </div>
      </div>
    </section>
  );
}