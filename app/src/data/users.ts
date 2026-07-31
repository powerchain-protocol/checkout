import type { User } from "../../../src/types/user";

export const users: User[] = [
  {
    id: "usr_atlas_owner",
    email: "owner@atlas.example",
    displayName: "Atlas Owner",
    role: "owner",
    merchantId: "mrc_atlas",
    createdAt: "2026-01-05T10:00:00.000Z",
    updatedAt: "2026-07-31T08:15:00.000Z",
  },
  {
    id: "usr_atlas_ops",
    email: "ops@atlas.example",
    displayName: "Atlas Operations",
    role: "operator",
    merchantId: "mrc_atlas",
    createdAt: "2026-02-12T10:00:00.000Z",
    updatedAt: "2026-07-30T12:10:00.000Z",
  },
];
