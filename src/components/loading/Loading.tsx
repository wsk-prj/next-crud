"use client";

import { useEffect, useState } from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  const [dots, setDots] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 333);

    return () => clearInterval(interval);
  }, []);

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
