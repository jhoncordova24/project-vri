import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const isDetailRoute =
      pathname.includes("/detalle/") ||
      (pathname.startsWith("/noticias/") && pathname !== "/noticias");

    const wasDetailRoute =
      prevPathname.current.includes("/detalle/") ||
      (prevPathname.current.startsWith("/noticias/") &&
        prevPathname.current !== "/noticias");

    const preserveScrollSections = ["/proyectos", "/noticias"];

    const isSameSection =
      !isDetailRoute &&
      !wasDetailRoute &&
      preserveScrollSections.some(
        (prefix) =>
          pathname.startsWith(prefix) &&
          prevPathname.current.startsWith(prefix),
      );

    if (!isSameSection) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
