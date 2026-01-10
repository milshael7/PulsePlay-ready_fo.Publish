# PulsePlay Security Guidelines

## Backend Security
- All API routes protected with JWT (`jwtGuard` middleware)
- Sensitive actions (override wallet, set limits) require admin authentication.

## Frontend Security
- Do not store secrets in frontend code.
- Only consume `/api/*` endpoints; no direct DB access.

## Data Storage
- Passwords and sensitive data must be hashed.
- Database credentials must be stored in `.env` file.

## Network Security
- Use CORS with care; only allow trusted origins.
- Validate and sanitize all incoming requests.
- Rate limit APIs to prevent brute force attacks.

## Recommendations
- Monitor logs for suspicious activity.
- Update dependencies regularly.
- Use SSL/TLS for all production deployments.