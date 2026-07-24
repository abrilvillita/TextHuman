# TextHuman

AI-assisted web platform for transforming machine-like Spanish text into more
natural writing styles.

## Live product

[humanizatexto.com](https://humanizatexto.com)

## Highlights

- Country-aware text rewriting
- Text and document processing
- Free and Premium usage limits
- User registration, login and password recovery
- Mercado Pago checkout and webhook fulfillment
- Discount-code management
- Administrative analytics and user management
- Automated transactional emails
- Organic search indexing through a custom domain

## Technology

- HTML5, CSS3 and JavaScript
- Cloudflare Workers
- Supabase / PostgreSQL
- Anthropic API
- Mercado Pago API
- Resend
- GitHub Pages and custom DNS

## Architecture

```text
Browser
   │
   ▼
Cloudflare Worker
   ├── AI provider
   ├── Mercado Pago
   ├── Resend
   └── Supabase
```

The browser never receives the database service-role credential. Sensitive
database, payment and administrative operations are performed by the Worker.

## Security

- Production secrets are stored as Cloudflare environment variables.
- Public database access is restricted with Row Level Security.
- Payment identifiers are unique to prevent duplicate fulfillment.
- Administrative operations require server-side authorization.
- Password hashes are upgraded automatically to PBKDF2 when legacy users sign in.

## Repository scope

This repository contains the public web client. Production secrets, customer
data and private administrative configuration are intentionally excluded.

## Status

Active personal project and continuously improving product.
