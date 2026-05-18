import { useState } from "react";
import RevealSection from "../components/RevealSection";
import styles from "./GallerySp.module.css";

const ITEMS = [
  { slot: "slotA", title: "Clinic Reception", desc: "受付まわりの明度と導線。第一印象のブレを抑える。", img: "/auria-gallery-01.png", alt: "クリニックの受付空間。" },
  { slot: "slotB", title: "Head Spa Room", desc: "手元の光と素材。落ち着きが残る仕上げへ。", img: "/auria-gallery-02.png", alt: "ヘッドスパの個室。" },
  { slot: "slotC", title: "Villa Lounge", desc: "面の配分。広さが間延びしないように整える。", img: "/auria-gallery-03.png", alt: "ヴィラのラウンジ空間。" },
  { slot: "slotD", title: "Corridor", desc: "線と陰影。通路を“ただの移動”にしない。", img: "/auria-gallery-04.png", alt: "通路の内装。" },
  { slot: "slotE", title: "Materials & Light", desc: "明度 → 素材 → 光。基準を揃えて迷いを減らす。", img: "/auria-gallery-05.png", alt: "素材サンプルと光の検討。" },
  { slot: "slotF", title: "Sign & Lighting", desc: "見え方の統一。点の調整で全体の品が上がる。", img: "/auria-gallery-06.png", alt: "サインと照明の検討。" },
];

function SafeImage({ src, alt, className }) {
  const [ok, setOk] = useState(true);
  const [retry, setRetry] = useState(0);
  const resolved = retry > 0 ? `${src}?v=${retry}` : src;

  const onError = () => {
    setRetry((t) => {
      if (t < 1) return t + 1;
      setOk(false);
      return t;
    });
  };

  return (
    <>
      <div className={styles.imgFallback} aria-hidden="true" />
      <img
        className={[className, ok ? "" : styles.imgBroken].filter(Boolean).join(" ")}
        src={resolved}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        onError={onError}
        onLoad={() => setOk(true)}
      />
    </>
  );
}

export default function () {
  return (
    <RevealSection
        id="gallery-sp"
      className={styles.section}
      aria-labelledby="gallery-title"
      data-reveal="slow"   /* ← この章だけ少し遅い */
    >
      <div className={styles.wrap}>
        <header className={styles.head}>
          <div className={`${styles.kicker} ${styles.stagger}`} style={{ "--i": 0 }} aria-hidden="true">
            <span className={styles.kickerEn}>SELECTED WORKS</span>
            <span className={styles.kickerDash}>—</span>
            <span className={styles.kickerJp}>実績の一部</span>
          </div>

          <h2 id="gallery-title" className={styles.srOnly}>
            実績ギャラリー
          </h2>

          <div className={`${styles.object} ${styles.stagger}`} style={{ "--i": 1 }} aria-hidden="true">
            <div className={styles.objectRow}>
              <span className={styles.objectLabel}>FIELDS</span>
              <span className={styles.objectValue}>Clinic / Spa / Villa</span>
            </div>
            <div className={styles.objectRow}>
              <span className={styles.objectLabel}>FLOW</span>
              <span className={styles.objectValue}>設計 → 監修 → 施工</span>
            </div>
          </div>
        </header>

        <div className={styles.stage}>
          {ITEMS.map((item, index) => (
            <article
              key={item.title}
              className={`${styles.card} ${styles[item.slot]} ${styles.stagger}`}
              style={{ "--i": index + 2 }}
              tabIndex={0}
              aria-label={`${item.title}：${item.desc}`}
            >
              <figure className={styles.figure}>
                <SafeImage src={item.img} alt={item.alt} className={styles.img} />
              </figure>

              <div className={styles.meta}>
                <p className={styles.metaTitle}>{item.title}</p>
                <p className={styles.metaDesc}>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}