<div align="center">

# TextHuman
### AI-assisted SaaS for more natural Spanish writing

[![Live](https://img.shields.io/badge/Live-humanizatexto.com-7c5cff?style=for-the-badge&logo=googlechrome&logoColor=white)](https://humanizatexto.com)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=111)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)

</div>

---

## About
TextHuman transforms machine-like Spanish text into writing that feels more natural across Latin America and Spain. I developed the product from idea to deployment, combining a responsive frontend, secure backend integrations, subscriptions, document processing and a custom domain.

## Highlights
- Country-aware rewriting styles
- Text and document processing
- Registration, login and password recovery
- Free and Premium usage limits
- Mercado Pago checkout and webhook fulfillment
- Discount-code workflows and transactional email
- Administrative analytics and user management
- SEO, custom DNS and responsive motion-focused UI

## Architecture
```text
Browser → Cloudflare Worker → AI provider
                            ├→ Mercado Pago
                            ├→ Resend
                            └→ Supabase / PostgreSQL
```
Sensitive database, payment and administrative operations are handled by the Worker. Production credentials are not stored in the browser.

## Technology
HTML5 · CSS3 · JavaScript · Cloudflare Workers · Supabase · PostgreSQL · Anthropic API · Mercado Pago · Resend · GitHub Pages

## Security
- Secrets stored as Cloudflare environment variables
- Server-side payment verification
- Database access protected with RLS
- Privileged operations routed through protected endpoints
- No service-role credential committed to this repository

## Run locally
```bash
git clone https://github.com/abrilvillita/TextHuman.git
cd TextHuman
```
Open `index.html`. Production-only features require their configured services.

## Status
**Live and evolving.** The public repository documents the client application; production secrets remain private.

## Product film

[![Watch the TextHuman product film](https://img.shields.io/badge/▶_Watch-Product_film-7c5cff?style=for-the-badge)](https://github.com/abrilvillita/TextHuman/raw/refs/heads/main/TextHuman_Product_Film_Master.mp4)

A 20-second motion-design overview of the product experience and architecture. It uses fictional, sanitized interface data—no user, payment or administrative information is shown.

---
<div align="center">Built by [Abril Miranda Villa Márquez](https://github.com/abrilvillita)</div>
