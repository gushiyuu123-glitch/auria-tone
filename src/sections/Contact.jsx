import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Contact.module.css";

const COPY = {
  headline: "ここで全部決めなくて大丈夫です。",
  sub: [
    "今の状況と、仕上がりのイメージだけ送ってください。",
    "必要な範囲はこちらで整理して、返信で提案します。",
  ],
  note: "内容は外部に公開しません。返信は1〜2営業日を目安にしています。",
  submit: "相談内容を送る",
};

export default function Contact() {
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
    <section ref={rootRef} id="contact" className={cls} aria-labelledby="contact-title">
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

          <h2 id="contact-title" className={styles.srOnly}>
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

        <div className={styles.stage}>
          <div className={styles.tapeA} aria-hidden="true" />
          <div className={styles.tapeB} aria-hidden="true" />

          <div className={`${styles.sheet} ${styles.stagger}`} style={{ "--i": i++ }}>
            <span className={styles.cornerTL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />

            <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="初回相談フォーム">
              <div className={styles.row}>
                <label className={styles.label} htmlFor="name">
                  お名前
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="例）山田 太郎"
                  autoComplete="name"
                />
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="email">
                  メールアドレス
                </label>
                <input
                  id="email"
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
                <label className={styles.label} htmlFor="type">
                  相談の対象
                </label>
                <div className={styles.field}>
                  <input
                    id="type"
                    name="type"
                    className={styles.input}
                    placeholder="例）マンション改装／戸建て／店舗／インテリア相談 など"
                  />
                  <p className={styles.hint}>未定でも大丈夫です。</p>
                </div>
              </div>

              <div className={`${styles.row} ${styles.rowTall}`}>
                <label className={styles.label} htmlFor="detail">
                  状況と希望
                </label>
                <div className={styles.field}>
                  <textarea
                    id="detail"
                    name="detail"
                    className={styles.textarea}
                    placeholder="例）現在の状況、困っていること、理想のイメージなど。書ける範囲で大丈夫です。"
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="timing">
                  希望時期（任意）
                </label>
                <div className={styles.field}>
                  <input
                    id="timing"
                    name="timing"
                    className={styles.input}
                    placeholder="例）3ヶ月以内／来年春頃／未定"
                  />
                  <p className={styles.hint}>未定でも大丈夫です。</p>
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor="budget">
                  予算感（任意）
                </label>
                <div className={styles.field}>
                  <input
                    id="budget"
                    name="budget"
                    className={styles.input}
                    placeholder="例）〜100万／100〜300万／300〜500万／未定"
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

        <p className={styles.note}>{COPY.note}</p>
      </div>
    </section>
  );
}