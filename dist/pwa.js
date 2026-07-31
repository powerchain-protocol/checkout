import { useEffect } from "react";
/**
 * Installs PowerPay PWA metadata and registers /service-worker.js.
 * Render once near the root of a React application.
 */
export function PowerPayPwa({ manifestHref = "/manifest.webmanifest", themeColor = "#063022", enabled = true, }) {
    useEffect(() => {
        if (!enabled)
            return;
        const upsertLink = (rel, href, sizes) => {
            let link = document.head.querySelector(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ""}`);
            if (!link) {
                link = document.createElement("link");
                link.rel = rel;
                if (sizes)
                    link.sizes = sizes;
                document.head.appendChild(link);
            }
            link.href = href;
        };
        upsertLink("manifest", manifestHref);
        upsertLink("icon", "/icons/favicon.ico");
        upsertLink("icon", "/icons/powerpay-mark.svg", "any");
        upsertLink("apple-touch-icon", "/icons/app-icon-180.png", "180x180");
        let theme = document.head.querySelector('meta[name="theme-color"]');
        if (!theme) {
            theme = document.createElement("meta");
            theme.name = "theme-color";
            document.head.appendChild(theme);
        }
        theme.content = themeColor;
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").catch(() => {
                // Apps may run the SDK without serving a service worker.
            });
        }
    }, [enabled, manifestHref, themeColor]);
    return null;
}
export default PowerPayPwa;
//# sourceMappingURL=pwa.js.map