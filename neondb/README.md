# Neon database profile

Set the pooled Neon connection string as `DATABASE_URL`. Use a direct connection
for migrations when your project provides one.

Neon branches are useful for preview deployments. Each Vercel preview should use
an isolated database branch or a read-only dataset where possible.
