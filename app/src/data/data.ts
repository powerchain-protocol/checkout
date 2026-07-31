import type { Invoice } from "../../../src/types/invoice";

export const demoInvoice: Invoice = {
  id: "inv_demo_2048",
  number: "INV-2048",
  merchantId: "mrc_atlas",
  customerId: "cus_solaris",
  currency: "USDC",
  lineItems: [
    {
      id: "line_1",
      name: "Carbon reporting subscription",
      description: "Professional monthly plan",
      quantity: 1,
      unitAmount: "99.00",
      taxRate: 0,
    },
    {
      id: "line_2",
      name: "Settlement automation",
      quantity: 1,
      unitAmount: "24.00",
      taxRate: 0,
    },
  ],
  subtotal: "123.00",
  tax: "0.00",
  fees: [{ code: "network", label: "Estimated network fee", amount: "0.01" }],
  total: "123.01",
  status: "draft",
  dueAt: "2026-08-07T23:59:59.000Z",
  createdAt: "2026-07-31T09:00:00.000Z",
  notes: "Payment settles to the configured Atlas Commerce treasury.",
};
