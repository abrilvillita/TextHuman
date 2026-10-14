# TextHuman maintenance review — 2026-10-14

## Implemented

- Replaced random naturalness/fluency/coherence percentages with an honest review notice. No author-detection guarantee.
- DOCX/PPTX now use JSZip 3.10.1 + XML parsing, with paragraph breaks and actual presentation order. ZIP central-directory bounds reject excessive inflated sizes and encrypted archives. Uploads are capped at 5 MB; PDFs at 200 pages, with evaluation disabled in the existing PDF.js reader.
- Extracted document text is no longer silently truncated. Users see the whole extraction and the word limit before processing.
- Added request timeout, malformed/empty result handling, duplicate processing guard, and Mercado Pago checkout hostname validation. Returning with `?pay=ok` no longer claims payment approval.
- Removed prompts to fabricate personal experiences and unverified source consultation.
- Removed unlimited-use, export-PDF/DOCX, full-history and priority promises unsupported by this frontend. Published limits match the existing frontend's 1,000-word / 20-improvement checks; backend enforcement still requires verification.
- Owner confirmed advertised Premium price is $7.99 USD. Removed $149 MXN as an advertised charge (it was confused with the net payout). MXN conversion uses Frankfurter daily reference data and date; failures display no invented rate. Checkout total may differ. Updated structured offer metadata too.
- Added explicit registration consent links and a refund/clarification process preserving non-waivable consumer rights. No retroactive waiver for prior payments. Avoided inventing refund deadlines or promising successful detection bypass.
- Added an independent deterministic rules laboratory. Production rewriting still calls the existing AI Worker; existing paid functionality has not been replaced by a lower-capability engine.

## No-AI feasibility

`rules-lab.html` performs local whitespace cleanup and optional narrow Spanish phrase simplification. Quotes, URLs, inline code, numbers and paragraph structure are protected where supported. Rules are deterministic and report actual substitutions. A rule can still lose a nuance; review is required.

Without a trained model, generic contextual rewriting, country-appropriate slang, perspective conversion and semantic analysis cannot be promised at the current scope. A large grammar/dictionary/rule system is possible, but it is a separate development project, with language coverage and quality evaluation. The existing `texthuman-hub` repository already offers code-based utility/conversion tools; that is a different product from this rewriting service and was not swapped into production.

## Verified

- JavaScript syntax for every inline and added script.
- Rules tests: deterministic output, protected quotes/URLs/inline code, unchanged numbers, default behavior and input limits.
- HTML duplicate-ID check.
- ZIP tests and browser-run synthetic compressed DOCX/PPTX tests (results recorded in the delivery message).

## Still needs evidence / user-supplied information

1. The actual `texthuman-api.mirandavilla341.workers.dev` Worker source is absent from this repository. `wrangler.jsonc` deploys static assets, not that API. Payment amount/currency, quota reset, webhook verification, idempotency, auth storage, refund operations and retention cannot be fully audited from this frontend. Do not treat this review as proof that those server behaviors are secure or match the contract.
2. Provider's legal identity, appropriate business/service address and contact phone for the legal/privacy notices. Do not invent or automatically publish a home address. Current notice gives the brand, Mexico and support email; this does not constitute a complete provider identification/privacy compliance review.
3. Whether checkout uses one-off payments or recurring subscriptions, exact charged currency and conversion. The frontend creates a preference; this alone does not prove all backend payment settings. If recurrent billing exists, implement explicit consent, clear dates/amounts, renewal notice and an immediate cancellation mechanism, not merely a contact email.
4. Record terms version, timestamp and acceptance server-side when registering/paying. The checkbox added here is frontend consent and can be bypassed without server enforcement. Existing users must not be silently bound to materially different conditions.
5. Test registration, account recovery, payment activation, duplicate webhook, cancellation and a refund in sandbox with the actual services. No real payment, account creation, customer data export or refund was performed in this review.
6. Replace the legacy PDF.js dependency with a current supported self-hosted build in a dedicated tested migration. `isEvalSupported:false` is an immediate mitigation, not a full dependency/security audit.
7. Verify privacy retention periods, hosting/AI providers and international data handling against actual configuration, including advertising consent where required.

## Primary references

- https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf — especially art. 76 BIS (provider/contact, clear costs, recurrent payments/cancellation) and 92 BIS/TER (deficient/unprovided service).
- https://burocomercial.profeco.gob.mx/tiendasvirtuales/ — information and cancellation/refund criteria.
- https://stuk.github.io/jszip/documentation/api_jszip/load_async.html
- https://stuk.github.io/jszip/documentation/api_zipobject/async.html
- https://frankfurter.dev/ — reference conversion API, not Mercado Pago's settlement quote.

This is a concrete technical/content review, not an assurance of complete legal compliance. A qualified review of the final notice and actual business/payment practices remains necessary.
