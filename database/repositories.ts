import { prisma } from "./prisma.js";

export const repositories = {
  merchants: {
    byId: (id: string) => prisma.merchant.findUnique({ where: { id } }),
    bySlug: (slug: string) => prisma.merchant.findUnique({ where: { slug } }),
  },
  users: {
    byId: (id: string) => prisma.user.findUnique({ where: { id } }),
    byWallet: (walletAddress: string) =>
      prisma.user.findUnique({ where: { walletAddress } }),
  },
  invoices: {
    byId: (id: string) =>
      prisma.invoice.findUnique({
        where: { id },
        include: { lines: true, fees: true, payments: true },
      }),
  },
  payments: {
    byId: (id: string) => prisma.payment.findUnique({ where: { id } }),
    byReference: (reference: string) =>
      prisma.payment.findUnique({ where: { reference } }),
  },
};
