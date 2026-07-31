export interface ClientRecord {
  id: string;
  name: string;
  initials: string;
  email: string;
  company: string;
  wallet: string;
  status: "active" | "new" | "vip";
  lifetimeValue: string;
  payments: number;
}

export const clients: ClientRecord[] = [
  {
    id: "client-1",
    name: "Amelia Hart",
    initials: "AH",
    email: "amelia@verdantgrid.io",
    company: "Verdant Grid",
    wallet: "9xQe...J7KP",
    status: "vip",
    lifetimeValue: "$18,420",
    payments: 42,
  },
  {
    id: "client-2",
    name: "Noah Bennett",
    initials: "NB",
    email: "noah@northstar.energy",
    company: "Northstar Energy",
    wallet: "7Gf3...Xo8d",
    status: "active",
    lifetimeValue: "$7,980",
    payments: 18,
  },
  {
    id: "client-3",
    name: "Maya Chen",
    initials: "MC",
    email: "maya@helio.market",
    company: "Helio Market",
    wallet: "3Pk8...Lm22",
    status: "new",
    lifetimeValue: "$1,250",
    payments: 3,
  },
  {
    id: "client-4",
    name: "Daniel Okafor",
    initials: "DO",
    email: "daniel@circularworks.co",
    company: "Circular Works",
    wallet: "8Hd9...Lk2m",
    status: "active",
    lifetimeValue: "$12,680",
    payments: 27,
  },
];
