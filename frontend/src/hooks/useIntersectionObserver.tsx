import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = ({
  rootRef,
  rootMargin = "0px",
  threshold = 1.0,
}: any) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const targetElement = <div id="test" ref={targetRef} />;
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }
    const rootElement = rootRef?.current || null;
    console.log({
      rootElement,
      targetRef: targetRef.current,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting((prev) =>
          prev !== entry.isIntersecting ? entry.isIntersecting : prev
        );
      },
      { root: rootElement, rootMargin, threshold }
    );
    observer.observe(targetRef.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetElement, rootMargin, threshold]);

  return { targetRef, isIntersecting, rootRef };
};
