import RevealSection from "../components/RevealSection";
import styles from "./FaqSp.module.css";

const COPY = {
  head: "よくある確認",
  lead: "気になる点は、ここで先に整理します。",
  qas: [
    {
      q: "施工もお願いできますか？",
      a: "施工は施工会社が担当です。私たちは設計と監修で、基準がズレないように最後まで整えます。",
    },
    {
      q: "監修では何をしますか？",
      a: "現場でズレを見つけ、直す場所が分かる形で指示します。仕上げの揺れを回収する役割です。",
    },
    {
      q: "予算が未確定でも相談できますか？",
      a: "できます。最初は「どこまでやるか」だけ決めて、必要な範囲に合わせて見積の形にします。",
    },
    {
      q: "期間はどれくらい見ればいいですか？",
      a: "範囲と監修回数で変わります。初回相談で工程感とスケジュールの当たりを置きます。",
    },
    {
      q: "得意な空間は？",
      a: "清潔感・上質さ・落ち着きが出る方向が得意です。WORKSの空気が好みなら相性が合います。",
    },
    {
      q: "対応エリアは？",
      a: "沖縄本島を中心に対応しています。遠方・離島は内容により調整します。",
    },
  ],
  foot: "ここにない内容も、そのまま聞いてください",
};

export default function FaqSp() {
  let i = 0;

  return (
    <RevealSection id="faq-sp" className={styles.section} aria-labelledby="faq-title-sp">
      <div className={styles.wrap}>
        <div className={styles.inner}>
          {/* head */}
          <header className={styles.header}>
            <img
              className={`${styles.mark} ${styles.stagger}`}
              style={{ "--i": i++ }}
              src="/qa.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
            />

            <h2 id="faq-title-sp" className={`${styles.head} ${styles.stagger}`} style={{ "--i": i++ }}>
              {COPY.head}
            </h2>

            <p className={`${styles.lead} ${styles.stagger}`} style={{ "--i": i++ }}>
              {COPY.lead}
            </p>
          </header>

          {/* list */}
          <div className={styles.list} role="list">
            {COPY.qas.map((item) => (
              <details key={item.q} className={`${styles.item} ${styles.stagger}`} style={{ "--i": i++ }}>
                <summary className={styles.summary}>
                  <span className={styles.qLabel} aria-hidden="true">
                    Q
                  </span>
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.chev} aria-hidden="true">
                    →
                  </span>
                </summary>

                <div className={styles.answer}>
                  <p className={styles.aText}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* foot */}
          <p className={`${styles.foot} ${styles.stagger}`} style={{ "--i": i++ }}>
            {COPY.foot}
          </p>
        </div>
      </div>
    </RevealSection>
  );
}