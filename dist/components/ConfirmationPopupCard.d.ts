import { type SolanaCluster } from "../explorer.js";
export interface ConfirmationPopupCardProps {
    open: boolean;
    status?: "confirmed" | "processing" | "failed";
    amount: string;
    asset: string;
    signature?: string;
    cluster?: SolanaCluster;
    reference?: string;
    onClose: () => void;
}
export declare function ConfirmationPopupCard({ open, status, amount, asset, signature, cluster, reference, onClose }: ConfirmationPopupCardProps): any;
