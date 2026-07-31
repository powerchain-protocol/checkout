export declare const MOBILE_BREAKPOINT = 768;
export declare const TABLET_BREAKPOINT = 1024;
export interface ResponsiveViewport {
    width: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    orientation: "portrait" | "landscape";
}
export declare function useResponsiveViewport(mobileBreakpoint?: number, tabletBreakpoint?: number): ResponsiveViewport;
export declare function useMobile(breakpoint?: number): boolean;
export declare function useMediaQuery(query: string): boolean;
//# sourceMappingURL=use-mobile.d.ts.map