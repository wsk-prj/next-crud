"use client";

import { useEffect, useState } from "react";
import styles from "./Loading.module.css";

const Loading = ({ delay = 150 }: { delay?: number }): React.ReactNode => {
  const [dots, setDots] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 333);

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center">
        <span className={styles.dotsContainer}>
          <span className={dots >= 1 ? styles.activeDot : styles.dot}>.</span>
          <span className={dots >= 2 ? styles.activeDot : styles.dot}>.</span>
          <span className={dots >= 3 ? styles.activeDot : styles.dot}>.</span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
