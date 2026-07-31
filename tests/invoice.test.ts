import { describe, expect, it } from "vitest";
import { calculateInvoiceTotals } from "../src/services/invoice-service.js";

describe("invoice totals", () => {
  it("calculates line items and fees", () => {
    const result = calculateInvoiceTotals({
      lineItems: [
        { id: "1", name: "Plan", quantity: 2, unitAmount: "10.00" },
      ],
      fees: [{ code: "network", label: "Network", amount: "0.01" }],
    });

    expect(result.subtotal).toBe("20.00");
    expect(result.total).toBe("20.01");
  });
});
