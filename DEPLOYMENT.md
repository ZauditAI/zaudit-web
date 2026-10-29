# Zaudit website deployment

The live site is https://zaudit.co, deployed by the existing GitHub Pages workflow on pushes to main. The DNS and Pages custom domain remain unchanged.

Run `npm ci` and `npm run build`. The deployment artifact is `build/`. `public/release.json` records the Mac download size and SHA-256. Update the disk image and manifest together. Only the compiled early-access app is distributed here; no gateway credentials, user books or native engine source belong in this repository.

The AI gateway is https://zaudit-gateway-production.up.railway.app. Its health endpoint is `/health`. It uses the separate Zaudit Supabase project for sign-in and OpenRouter for planning. The native app contains the public endpoint configuration. OpenRouter credentials stay on Railway. Payments are disabled; trial requests go to vaibhavmaloopm@gmail.com and access is granted by the operator.

Current download: Apple Silicon, macOS 13+, version 0.3.1 early access. It is ad-hoc signed, not Developer ID signed or notarized. Public installation without Gatekeeper intervention remains blocked on Apple signing/notarization. Do not describe this as a signed production release or full Tally parity.

Rollback: revert the website release commit and let the Pages workflow deploy. Do not overwrite customer databases or remove their local books. Gateway releases and the Mac app have separate deployment lifecycles.

AI remains invitation-only by owner request. The app offers sign-in for activated trial accounts, not public signup. Custom SMTP is not configured. Confirmation redirects now point to https://zaudit.co/auth.html, which clears response fragments and returns users to the native app.

0.3.0 adds nested workflow conditions, deterministic oldest-first bill allocation, report actions and receivables/payables aging. Unsigned builds retain AI sessions only in memory; sign in again after reopening. Optional TypeSafe/Jev integration is prepared but not configured or live-qualified. OpenRouter remains the live provider.

0.3.1 extends the app response window to 180 seconds and the planner transport to 120 seconds. OpenRouter throughput routing is capped at $0.20 per million input tokens and $0.80 per million output tokens; the existing $5 account-key cap remains.
