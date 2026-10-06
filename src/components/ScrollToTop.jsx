import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll on navigation, so we do it ourselves.
// We also move keyboard/screen-reader focus to <main> after a route change.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
