import { useState } from "react";
import RevealSection from "../components/RevealSection";
import styles from "./ProcessSp.module.css";

const COPY = {
  kickerEn: "PROCESS",
  kickerJp: "進め方",
  headline: "決める順番が見えると、相談はラクになります。",
  lead: [
    "最初に「目的」と「範囲」だけ決めます。",
    "そのあと図面と仕様で基準を固め、現場でズレを回収します。",
  ],
  bottomNote: "初回相談は無料です。問い合わせで、必要な範囲だけ決めます。",
};

const STEPS = [
  {
    no: "01",
    title: "初回相談・範囲決定",
    desc: "目的と範囲だけ決めます。資料が少なくても進められます。",
    img: "/process-01.png",
    alt: "相談のイメージ。ノートとテーブル。",
  },
  {
    no: "02",
    title: "方針・素材の方向決め",
    desc: "明度・素材・光の方針を固定し、判断の迷いを先に消します。",
    img: "/process-02.png",
    alt: "素材サンプルのイメージ。",
  },
  {
    no: "03",
    title: "図面・仕様・見積確定",
    desc: "図面と仕様を揃え、金額と工程のズレが出ない状態にします。",
    img: "/process-03.png",
    alt: "図面とペンのイメージ。",
  },
  {
    no: "04",
    title: "施工（施工会社）・監修",
    desc: "現場でズレを回収し、仕上がりを合わせて引き渡します。",
    img: "/process-04.png",
    alt: "現場確認のイメージ。",
  },
];

function Img({ src, alt, className }) {
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
    <div className={styles.square}>
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
      <div className={styles.veil} aria-hidden="true" />
    </div>
  );
}

export default function ProcessSp() {
  let i = 0;

  return (
    <RevealSection id="process-sp" className={styles.section} aria-labelledby="process-title-sp">
      <div className={styles.wrap}>
        {/* head */}
        <header className={styles.head}>
          <div className={`${styles.kicker} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true">
            <span className={styles.kickerEn}>{COPY.kickerEn}</span>
            <span className={styles.kickerDash}>—</span>
            <span className={styles.kickerJp}>{COPY.kickerJp}</span>
          </div>

          <h2 id="process-title-sp" className={styles.srOnly}>
            進め方
          </h2>

          <p className={`${styles.headline} ${styles.stagger}`} style={{ "--i": i++ }}>
            <span className={styles.headLine}>決める順番が見えると、</span>
            <span className={styles.headLine}>相談はラクになります。</span>
          </p>

          <span className={`${styles.shortRule} ${styles.stagger}`} style={{ "--i": i++ }} aria-hidden="true" />

          <div className={styles.lead}>
            {COPY.lead.map((t) => (
              <p key={t} className={`${styles.leadLine} ${styles.stagger}`} style={{ "--i": i++ }}>
                {t}
              </p>
            ))}
          </div>
        </header>

        {/* timeline */}
        <ol className={styles.flow} aria-label="プロセスの流れ">
          {STEPS.map((s, idx) => (
            <li key={s.no} className={`${styles.step} ${styles.stagger}`} style={{ "--i": i++ }}>
              <div className={styles.row}>
                <figure className={styles.figure}>
                  <Img src={s.img} alt={s.alt} className={styles.img} />
                </figure>

                <div className={styles.meta}>
                  <div className={styles.no}>{s.no}</div>

                  <p className={styles.title}>{s.title}</p>
                  <span className={styles.miniRule} aria-hidden="true" />

                  <p className={styles.desc}>{s.desc}</p>
                </div>
              </div>

              {/* 次へ（気配） */}
              {idx !== STEPS.length - 1 && <span className={styles.arrowBetween} aria-hidden="true">↓</span>}
            </li>
          ))}
        </ol>

        <p className={`${styles.bottomNote} ${styles.stagger}`} style={{ "--i": i++ }}>
          {COPY.bottomNote}
        </p>
      </div>
    </RevealSection>
  );
}