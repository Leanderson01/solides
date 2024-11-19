"use client";

import { useState, useEffect } from "react";

export function useTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 1024);
    };

    // Verificação inicial
    checkIsTablet();

    // Adiciona listener para mudanças de tamanho
    window.addEventListener("resize", checkIsTablet);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsTablet);
  }, []);

  return isTablet;
}
