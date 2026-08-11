import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const isSamePageNavigation =
      pathname.startsWith("/proyectos") &&
      prevPathname.current.startsWith("/proyectos");

    if (!isSamePageNavigation) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
