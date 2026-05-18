import RevealSection from "../components/RevealSection";
import styles from "./ContactSp.module.css";

const COPY = {
  headline: "ここで全部決めなくて大丈夫です。",
  sub: [
    "今の状況と、仕上がりのイメージだけ送ってください。",
    "必要な範囲はこちらで整理して、返信で提案します。",
  ],
  note: "内容は外部に公開しません。返信は1〜2営業日を目安にしています。",
  submit: "相談内容を送る",
};

export default function ContactSp() {
  let i = 0;

  return (
    <RevealSection id="contact-sp" className={styles.section} aria-labelledby="contact-title-sp">
      <div className={styles.wrap}>
        <header className={styles.head}>
          <img
            className={`${styles.sign} ${styles.stagger}`}
            style={{ "--i": i++ }}
            src="/contact1.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />

          <h2 id="contact-title-sp" className={styles.srOnly}>
            初回相談
          </h2>

          <p className={`${styles.title} ${styles.stagger}`} style={{ "--i": i++ }}>
            {COPY.headline}
          </p>

          <div className={styles.sub}>
            {COPY.sub.map((t) => (
              <p key={t} className={`${styles.subLine} ${styles.stagger}`} style={{ "--i": i++ }}>
                {t}
              </p>
            ))}
          </div>
        </header>

        <div className={styles.stage} aria-label="初回相談フォームの用紙">
          <div className={styles.tapeA} aria-hidden="true" />
          <div className={styles.tapeB} aria-hidden="true" />

          <div className={`${styles.sheet} ${styles.stagger}`} style={{ "--i": i++ }}>
            <span className={styles.cornerTL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />

            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
              aria-label="初回相談フォーム"
            >
              <div className={styles.row}>
                <label className={styles.label} htmlFor="name-sp">
                  お名前
                </label>
                <input
                  id="name-sp"
                  name="name"
                  className={styles.input}
                  placeholder="例）山田 太郎"
                  autoComplete="name"
                />
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="email-sp">
                  メールアドレス
                </label>
                <input
                  id="email-sp"
                  name="email"
                  type="email"
                  inputMode="email"
                  className={styles.input}
                  placeholder="例）taro.yamada@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="type-sp">
                  相談の対象
                </label>
                <div className={styles.field}>
                  <input
                    id="type-sp"
                    name="type"
                    className={styles.input}
                    placeholder="例）改装／新築／店舗／インテリア相談 など"
                    autoComplete="off"
                  />
                  <p className={styles.hint}>未定でも大丈夫です。</p>
                </div>
              </div>

              <div className={`${styles.row} ${styles.rowTall}`}>
                <label className={styles.label} htmlFor="detail-sp">
                  状況と希望
                </label>
                <div className={styles.field}>
                  <textarea
                    id="detail-sp"
                    name="detail"
                    className={styles.textarea}
                    placeholder="例）現在の状況、困っていること、理想のイメージなど。書ける範囲で大丈夫です。"
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="timing-sp">
                  希望時期（任意）
                </label>
                <div className={styles.field}>
                  <input
                    id="timing-sp"
                    name="timing"
                    className={styles.input}
                    placeholder="例）3ヶ月以内／来年春頃／未定"
                    autoComplete="off"
                  />
                  <p className={styles.hint}>未定でも大丈夫です。</p>
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="budget-sp">
                  予算感（任意）
                </label>
                <div className={styles.field}>
                  <input
                    id="budget-sp"
                    name="budget"
                    className={styles.input}
                    placeholder="例）〜100万／100〜300万／300〜500万／未定"
                    autoComplete="off"
                  />
                  <p className={styles.hint}>未定でも大丈夫です。</p>
                </div>
              </div>

              <div className={styles.submitRow}>
                <button type="submit" className={styles.button}>
                  {COPY.submit}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className={`${styles.note} ${styles.stagger}`} style={{ "--i": i++ }}>
          {COPY.note}
        </p>
      </div>
    </RevealSection>
  );
}