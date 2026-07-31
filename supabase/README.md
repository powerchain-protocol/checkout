# Supabase database profile

Use the Supabase Postgres connection string as `DATABASE_URL`. For migrations,
use a direct database connection rather than a transaction-pooler URL.

PowerPay uses Prisma for application queries. Supabase Auth, Storage, Realtime,
and Row Level Security can be integrated separately when required.

Never expose the service-role key in the Vite application.
