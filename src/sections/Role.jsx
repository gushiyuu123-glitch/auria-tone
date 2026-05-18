import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Role.module.css";

const ROLE_IMG = "/auria-role-01.png";

export default function Role() {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);

  // 画像事故対策：1回だけ再取得 → だめなら写真だけ隠して下地へ
  const [imgOk, setImgOk] = useState(true);
  const [imgRetry, setImgRetry] = useState(0);

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

    // reduce でなければ IntersectionObserver
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

  const roleSrc = imgRetry > 0 ? `${ROLE_IMG}?v=${imgRetry}` : ROLE_IMG;

  const onImgError = () => {
    setImgRetry((t) => {
      if (t < 1) return t + 1;
      setImgOk(false);
      return t;
    });
  };

  const onImgLoad = () => {
    // 途中で復帰した場合に備えて保険
    setImgOk(true);
  };

  return (
    <section ref={rootRef} id="role" className={cls} aria-labelledby="role-title">
      <div className={styles.wrap}>
        <div className={styles.grid}>
          {/* left: text */}
          <header className={styles.left}>
            <div
              className={`${styles.kicker} ${styles.stagger}`}
              style={{ "--i": 0 }}
              aria-hidden="true"
            >
              <span className={styles.kickerEn}>ROLE</span>
              <span className={styles.kickerDash}>—</span>
              <span className={styles.kickerJp}>役割</span>
            </div>

            <h2 id="role-title" className={styles.srOnly}>
              役割
            </h2>

            <p className={`${styles.headline} ${styles.stagger}`} style={{ "--i": 1 }}>
              設計で決め切り、仕上げまで揃えます。
            </p>

            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 2 }}>
              図面と仕様で基準を固めます。
            </p>
            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 3 }}>
              現場では監修でズレを回収します。
            </p>
            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 4 }}>
              納まりと質感を、最後に合わせ込みます。
            </p>

            <p className={`${styles.note} ${styles.stagger}`} style={{ "--i": 5 }}>
              施工は施工会社が担当します。
            </p>
            <p className={`${styles.note} ${styles.stagger}`} style={{ "--i": 6 }}>
              私たちは設計と監修に責任を持ち、完成まで同じ基準で通します。
            </p>
          </header>

          {/* right: flow + image */}
          <aside className={styles.visual} aria-label="設計から施工までの流れ">
            <div className={`${styles.flow} ${styles.stagger}`} style={{ "--i": 7 }}>
              <span className={styles.flowText}>設計</span>
              <span className={styles.flowArrow}>→</span>
              <span className={styles.flowText}>監修</span>
              <span className={styles.flowArrow}>→</span>
              <span className={styles.flowText}>施工</span>
            </div>

            <figure className={`${styles.shot} ${styles.stagger}`} style={{ "--i": 8 }}>
              <div className={styles.frame}>
                <div className={styles.imgFallback} aria-hidden="true" />
                <img
                  className={[styles.img, imgOk ? "" : styles.imgBroken].filter(Boolean).join(" ")}
                  src={roleSrc}
                  alt="設計と現場監修のプロセスを示すイメージ。"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  onError={onImgError}
                  onLoad={onImgLoad}
                />
              </div>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}