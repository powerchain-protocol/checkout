export interface PowerPayPwaProps {
    manifestHref?: string;
    themeColor?: string;
}
/**
 * Installs PowerPay PWA metadata and registers /service-worker.js.
 * Render once near the root of a React application.
 */
export declare function PowerPayPwa({ manifestHref, themeColor, }: PowerPayPwaProps): null;
export default PowerPayPwa;
