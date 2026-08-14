# devzy-scan-repo

**Intentional vulnerable sample code** for Devzy scan E2E validation.

This repository contains synthetic security and compliance issues on purpose.
Do not copy patterns into production code.

## Expected findings (non-exhaustive)

| Area | Example rule / scanner | File |
|------|------------------------|------|
| SQL injection (CWE-89) | `owasp-sql-injection` | `src/db.js` |
| Hardcoded secrets | `owasp-hardcoded-secrets`, gitleaks, rg-secrets | `src/secrets.js`, `config/synthetic-aws.env` |
| Command injection (CWE-78) | `owasp-command-injection` | `src/shell.js` |
| XSS (CWE-79) | `owasp-xss` | `src/xss.js` |
| Weak crypto | `owasp-weak-crypto` | `src/crypto.js` |
| Missing authz (CWE-862) | `l6-missing-authz` (LLM layer) | `src/routes/users.js` |
| Insecure cookies / no helmet | `l3-cookie-flags`, `l3-express-helmet` | `src/server.js` |
| Dockerfile runs as root | `l3-dockerfile-user` | `Dockerfile` |
| Missing CI security gates | `l4-secret-scan`, `l4-sast-required` | `.github/workflows/ci.yml` |
| Dependency CVEs | npm audit / Trivy | `package.json` |

## Local note

Scans triggered from the Devzy dashboard clone this repo from GitHub — push changes
to `main` before re-running a scan.
