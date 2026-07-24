import { useEffect, useState, useRef } from "react";

export default function CountUp({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const endValue = numericValue;
          if (endValue === 0) return;

          const stepTime = Math.max(Math.floor(duration / endValue), 15);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= endValue) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }, 
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [numericValue, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}
