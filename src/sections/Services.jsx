import { useState } from "react";
import RevealSection from "../components/RevealSection";
import styles from "./Services.module.css";

const SERVICES_IMG = "/auria-services.png";

const COPY = {
  kickerEn: "SERVICES",
  kickerJp: "できること",
  title: "判断を先に固めると、印象はブレません。",
  lines: [
    "最初に決めるのは、デザインではありません。",
    "判断の基準を先に固定して、印象の揺れを消します。",
    "明度・素材・光。ここが整うと、清潔感と上質さは安定します。",
    "最後は現場で、仕上げの細かいズレを拾います。",
  ],
  tagTop: "明度 → 素材 → 光",
};

export default function Services() {
  // 画像事故対策：1回だけ再取得 → だめなら写真だけ隠して下地へ
  const [imgOk, setImgOk] = useState(true);
  const [imgRetry, setImgRetry] = useState(0);

  const src = imgRetry > 0 ? `${SERVICES_IMG}?v=${imgRetry}` : SERVICES_IMG;

  const onImgError = () => {
    setImgRetry((t) => {
      if (t < 1) return t + 1;
      setImgOk(false);
      return t;
    });
  };

  const onImgLoad = () => setImgOk(true);

  let i = 0;

  return (
    <RevealSection id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.wrap}>
        <div className={styles.grid}>
          {/* left: text */}
          <header className={styles.left}>
            <div className={`${styles.kicker} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true">
              <span className={styles.kickerEn}>{COPY.kickerEn}</span>
              <span className={styles.kickerDash}>—</span>
              <span className={styles.kickerJp}>{COPY.kickerJp}</span>
            </div>

            <h2 id="services-title" className={styles.srOnly}>
              できること
            </h2>

            <p className={`${styles.title} ${styles.stagger}`} style={{ "--i": i++ }}>
              <span className={styles.titleLine}>判断を先に固めると、</span>
              <span className={styles.titleLine}>印象はブレません。</span>
            </p>

            <div className={styles.text}>
              {COPY.lines.map((t) => (
                <p key={t} className={`${styles.line} ${styles.stagger}`} style={{ "--i": i++ }}>
                  {t}
                </p>
              ))}
            </div>
          </header>

          {/* right: tag + one image */}
          <aside className={styles.right} aria-label="判断の軸">
            <div className={`${styles.tag} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true">
              <span className={styles.tagText}>{COPY.tagTop}</span>
              <span className={styles.tagRule} />
            </div>

            <figure className={`${styles.figure} ${styles.stagger}`} style={{ "--i": i++ }}>
              <div className={styles.frame}>
                <div className={styles.imgFallback} aria-hidden="true" />
                <img
                  className={[styles.img, imgOk ? "" : styles.imgBroken].filter(Boolean).join(" ")}
                  src={src}
                  alt="図面と素材サンプル。判断の基準を固めるための準備。"
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
    </RevealSection>
  );
}