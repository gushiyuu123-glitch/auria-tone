import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

const RevealSection = forwardRef(function RevealSection(
  {
    as: Tag = "section",
    className = "",
    threshold = 0.22,
    rootMargin = "-12% 0px -12% 0px",
    once = true,
    children,
    ...props
  },
  forwardedRef
) {
  const innerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);

  // forwardRef + 内部ref を両方満たす
  const setRefs = useCallback(
    (node) => {
      innerRef.current = node;

      if (!forwardedRef) return;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else forwardedRef.current = node;
    },
    [forwardedRef]
  );

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    let canceled = false;

    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (canceled) return;
      const r = !!m?.matches;
      setReduce(r);
      if (r) setInView(true);
    };

    apply();

    let io;

    // reduce でなければ IntersectionObserver
    if (!m?.matches) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (canceled) return;

          if (once) {
            if (!entry.isIntersecting) return;
            setInView(true);
            io.disconnect();
          } else {
            // once=false のときは出たり消えたりを許可
            setInView(entry.isIntersecting);
          }
        },
        { threshold, rootMargin }
      );

      io.observe(el);
    }

    // addEventListenerが無い環境のフォールバック（古いSafari等）
    if (m?.addEventListener) m.addEventListener("change", apply);
    else m?.addListener?.(apply);

    return () => {
      canceled = true;
      io?.disconnect?.();

      if (m?.removeEventListener) m.removeEventListener("change", apply);
      else m?.removeListener?.(apply);
    };
  }, [threshold, rootMargin, once]);

  const cls = [
    className,
    "reveal-section",
    inView ? "reveal-in" : "",
    reduce ? "reveal-reduce" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={setRefs} className={cls} {...props}>
      {children}
    </Tag>
  );
});

export default RevealSection;