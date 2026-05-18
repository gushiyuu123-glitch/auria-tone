import { useState } from "react";
import RevealSection from "../components/RevealSection";
import styles from "./RoleSp.module.css";

const ROLE_IMG = "/auria-role-01.png";

export default function RoleSp() {
  const [imgOk, setImgOk] = useState(true);
  const [imgRetry, setImgRetry] = useState(0);

  const roleSrc = imgRetry > 0 ? `${ROLE_IMG}?v=${imgRetry}` : ROLE_IMG;

  const onImgError = () => {
    setImgRetry((t) => {
      if (t < 1) return t + 1;
      setImgOk(false);
      return t;
    });
  };

  const onImgLoad = () => setImgOk(true);

  return (
    <RevealSection id="role-sp" className={styles.section} aria-labelledby="role-title-sp">
      <div className={styles.wrap}>
        {/* TEXT（判決） */}
        <header className={styles.head}>
          <div className={`${styles.kicker} ${styles.stagger}`} style={{ "--i": 0 }} aria-hidden="true">
            <span className={styles.kickerEn}>ROLE</span>
            <span className={styles.kickerDash}>—</span>
            <span className={styles.kickerJp}>役割</span>
          </div>

          <h2 id="role-title-sp" className={styles.srOnly}>
            役割
          </h2>

          <p className={`${styles.headline} ${styles.stagger}`} style={{ "--i": 1 }}>
            設計で決め切り、仕上げまで揃えます。
          </p>

          <div className={styles.points}>
            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 2 }}>
              図面と仕様で基準を固めます。
            </p>
            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 3 }}>
              現場では監修でズレを回収します。
            </p>
            <p className={`${styles.body} ${styles.stagger}`} style={{ "--i": 4 }}>
              納まりと質感を、最後に合わせ込みます。
            </p>
          </div>

          <div className={styles.noteBlock}>
            <p className={`${styles.note} ${styles.stagger}`} style={{ "--i": 5 }}>
              施工は施工会社が担当します。
            </p>
            <p className={`${styles.note} ${styles.stagger}`} style={{ "--i": 6 }}>
              私たちは設計と監修に責任を持ち、完成まで同じ基準で通します。
            </p>
          </div>
        </header>

        {/* IMAGE（証拠） */}
        <aside className={styles.visual} aria-label="設計から施工までの流れ">
          <div className={`${styles.flow} ${styles.stagger}`} style={{ "--i": 7 }} aria-hidden="true">
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
    </RevealSection>
  );
}