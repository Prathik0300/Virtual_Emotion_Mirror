import { useEffect, useState } from "react";
import debounce from "lodash-es/debounce";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  console.log({ w: window.innerWidth });
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateSize = debounce((): void => {
      setIsMobile(window.innerWidth < 768);
    }, 100);
    window.addEventListener("resize", updateSize);
    return (): void => {
      window.removeEventListener("resize", updateSize);
      updateSize.cancel();
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
