import { useEffect, useMemo, useState } from "react";

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export interface ResponsiveViewport {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: "portrait" | "landscape";
}

function viewportState(
  mobileBreakpoint: number,
  tabletBreakpoint: number,
): ResponsiveViewport {
  const width = typeof window === "undefined" ? tabletBreakpoint : window.innerWidth;
  return {
    width,
    isMobile: width < mobileBreakpoint,
    isTablet: width >= mobileBreakpoint && width < tabletBreakpoint,
    isDesktop: width >= tabletBreakpoint,
    orientation:
      typeof window !== "undefined" && window.innerHeight > width
        ? "portrait"
        : "landscape",
  };
}

export function useResponsiveViewport(
  mobileBreakpoint = MOBILE_BREAKPOINT,
  tabletBreakpoint = TABLET_BREAKPOINT,
): ResponsiveViewport {
  const [viewport, setViewport] = useState(() =>
    viewportState(mobileBreakpoint, tabletBreakpoint),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () =>
      setViewport(viewportState(mobileBreakpoint, tabletBreakpoint));

    const mobile = window.matchMedia(
      `(max-width: ${mobileBreakpoint - 1}px)`,
    );
    const tablet = window.matchMedia(
      `(max-width: ${tabletBreakpoint - 1}px)`,
    );

    update();
    mobile.addEventListener?.("change", update);
    tablet.addEventListener?.("change", update);
    window.addEventListener("orientationchange", update);

    return () => {
      mobile.removeEventListener?.("change", update);
      tablet.removeEventListener?.("change", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return viewport;
}

export function useMobile(
  breakpoint = MOBILE_BREAKPOINT,
): boolean {
  const viewport = useResponsiveViewport(
    breakpoint,
    Math.max(TABLET_BREAKPOINT, breakpoint + 1),
  );
  return viewport.isMobile;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [query]);

  return matches;
}
