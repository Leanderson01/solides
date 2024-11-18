import { useEffect, useState } from "react";

export function useTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIfTablet = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    checkIfTablet();
    window.addEventListener("resize", checkIfTablet);

    return () => {
      window.removeEventListener("resize", checkIfTablet);
    };
  }, []);

  return isTablet;
}
