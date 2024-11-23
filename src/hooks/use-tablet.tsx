"use client";

import { useState, useEffect } from "react";

export function useTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 1024);
    };

    checkIsTablet();

    window.addEventListener("resize", checkIsTablet);

    return () => window.removeEventListener("resize", checkIsTablet);
  }, []);

  return isTablet;
}
