import { createId, uuid } from "../src/utils/id.js";
import { prisma } from "./prisma.js";

async function main() {
  const merchantId = uuid();

  await prisma.merchant.upsert({
    where: { slug: "atlas-commerce" },
    update: {},
    create: {
      id: merchantId,
      name: "Atlas Commerce",
      slug: "atlas-commerce",
      authority: process.env.POWERPAY_MERCHANT_AUTHORITY ?? "configure-authority",
      treasury: process.env.POWERPAY_MERCHANT_TREASURY ?? "configure-treasury",
    },
  });

  console.log(`Seeded PowerPay beta database (${createId("seed")})`);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
