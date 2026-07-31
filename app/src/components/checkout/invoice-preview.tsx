import { DownloadIcon, FileTextIcon } from "@radix-ui/react-icons";
import type { Invoice } from "../../../../src/types/invoice";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency, formatDateTime } from "@app-lib/utils";

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  return (
    <Card className="invoice-preview">
      <CardHeader>
        <div>
          <span className="invoice-icon"><FileTextIcon /></span>
          <p className="eyebrow">Invoice preview</p>
          <CardTitle>{invoice.number}</CardTitle>
        </div>
        <Badge variant="outline">{invoice.status}</Badge>
      </CardHeader>

      <CardContent>
        <div className="invoice-meta">
          <div>
            <span>Created</span>
            <strong>{formatDateTime(invoice.createdAt)}</strong>
          </div>
          <div>
            <span>Due</span>
            <strong>
              {invoice.dueAt ? formatDateTime(invoice.dueAt) : "Due on receipt"}
            </strong>
          </div>
        </div>

        <div className="invoice-lines">
          {invoice.lineItems.map((item) => (
            <div className="invoice-line" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.quantity} × {formatCurrency(item.unitAmount)}</span>
              </div>
              <strong>
                {formatCurrency(
                  Number(item.unitAmount) * item.quantity,
                )}
              </strong>
            </div>
          ))}
        </div>

        <div className="invoice-totals">
          <div><span>Subtotal</span><strong>{formatCurrency(invoice.subtotal)}</strong></div>
          <div><span>Tax</span><strong>{formatCurrency(invoice.tax)}</strong></div>
          {invoice.fees.map((fee) => (
            <div key={fee.code}>
              <span>{fee.label}</span>
              <strong>{formatCurrency(fee.amount)}</strong>
            </div>
          ))}
          <div className="invoice-total">
            <span>Total</span>
            <strong>{formatCurrency(invoice.total)}</strong>
          </div>
        </div>

        {invoice.notes && <p className="invoice-notes">{invoice.notes}</p>}

        <button className="secondary-button invoice-download" type="button">
          <DownloadIcon />
          Download invoice
        </button>
      </CardContent>
    </Card>
  );
}
