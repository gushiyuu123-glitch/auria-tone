import RevealSection from "../components/RevealSection";
import styles from "./PricingSp.module.css";

const COPY = {
  title: "費用は、内容で決まります。",
  lead: [
    "範囲と関わり方で、必要な工程と時間は変わります。",
    "広さより、決める量と監修回数が効きます。",
    "迷いが増えないように、最初に目安を置きます。",
  ],
  prices: [
    { label: "設計＋監修", range: "¥80万〜¥180万" },
    { label: "設計のみ", range: "¥50万〜¥120万" },
    { label: "改装設計", range: "¥120万〜¥260万" },
    { label: "スポット監修", range: "¥15万〜¥45万" },
    { label: "部分設計・整理", range: "¥10万〜¥30万" },
  ],
  supp: [
    "含む：図面・仕様の整理 / 判断基準の固定 / 必要に応じた監修",
    "変動：範囲 / 監修回数 / 既存資料の有無",
  ],
  cta: "初回相談で、必要な範囲だけ決めます。",
};

export default function PricingSp() {
  let i = 0;

  return (
    <RevealSection id="pricing-sp" className={styles.section} aria-labelledby="pricing-title-sp">
      <div className={styles.paper}>
        <div className={styles.wrap}>
          <div className={styles.inner}>
            {/* head */}
            <header className={styles.head}>
              <img
                className={`${styles.signature} ${styles.stagger}`}
                style={{ "--i": i++ }}
                src="/pricing2.svg"
                alt=""
                aria-hidden="true"
                draggable="false"
              />

              <h2 id="pricing-title-sp" className={styles.srOnly}>
                料金
              </h2>

              <p className={`${styles.title} ${styles.stagger}`} style={{ "--i": i++ }}>
                {COPY.title}
              </p>

              <div className={styles.lead}>
                {COPY.lead.map((t) => (
                  <p key={t} className={`${styles.leadLine} ${styles.stagger}`} style={{ "--i": i++ }}>
                    {t}
                  </p>
                ))}
              </div>
            </header>

            {/* ledger */}
            <aside className={styles.ledger} aria-label="料金の目安">
              <dl className={styles.priceList}>
                {COPY.prices.map((p) => (
                  <div key={p.label} className={`${styles.priceRow} ${styles.stagger}`} style={{ "--i": i++ }}>
                    <dt className={styles.priceLabel}>{p.label}</dt>
                    <dd className={styles.priceRange}>{p.range}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.supp}>
                {COPY.supp.map((t) => (
                  <p key={t} className={`${styles.suppLine} ${styles.stagger}`} style={{ "--i": i++ }}>
                    {t}
                  </p>
                ))}
              </div>

              <a
                href="#contact-sp"
                className={`${styles.ctaInline} ${styles.stagger}`}
                style={{ "--i": i++ }}
                aria-label="初回相談へ"
              >
                <span className={styles.ctaText}>{COPY.cta}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}