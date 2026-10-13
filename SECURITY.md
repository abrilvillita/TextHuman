# Security

This repository contains the public browser client for TextHuman. Server-side code and production configuration are managed separately, so a review of this repository alone cannot verify authentication, payment fulfillment, rate limits, RLS, or administrator authorization.

## Browser data

The current client stores its session token in localStorage. This makes prevention of cross-site scripting especially important: any script that executes in the page origin could read that token. The client should eventually use a server-issued, short-lived session design with appropriate cookie protections, after reviewing the Worker and account flows together. Do not treat hiding controls in the UI as authorization.

## Reporting

Do not put credentials, user text, private account data, or exploit details in public issues. Use GitHub private vulnerability reporting if enabled, or contact the product owner through the support address on the site.

## Deployment checks

Before shipping security changes, test login, password reset, text and file processing, subscription checkout, webhook fulfillment, RLS-denied requests and admin endpoints with non-privileged accounts. Verify that no server secret is bundled into the browser.
