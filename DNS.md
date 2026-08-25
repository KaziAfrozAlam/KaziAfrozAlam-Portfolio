# DNS & Deployment — kaziafrozalam.flyrank.ai

This site deploys to **Netlify** at `kaziafrozalam.netlify.app`. The eventual
custom domain `kaziafrozalam.flyrank.ai` is a **pointer** to that same
deployment — not a separate build or migration.

```text
kaziafrozalam.flyrank.ai
        │  CNAME
        ▼
kaziafrozalam.netlify.app
```

## The DNS record

Add **one CNAME record** on the `flyrank.ai` DNS zone:

| Type  | Name (Host)     | Value / Target              | TTL    |
| ----- | --------------- | --------------------------- | ------ |
| CNAME | `kaziafrozalam` | `kaziafrozalam.netlify.app` | 3600   |

> The **Name** is just the subdomain label (`kaziafrozalam`), because the record
> already lives inside the `flyrank.ai` zone. The **Value** is the full Netlify
> subdomain — never an IP address (Netlify’s IPs change).

Then, in Netlify: **Site → Domain management → Add a domain** → enter
`kaziafrozalam.flyrank.ai` so Netlify knows to serve and issue a certificate for
it.

## What actually happens when someone visits

1. **Browser** asks its **resolver** (usually the ISP’s) for
   `kaziafrozalam.flyrank.ai`.
2. The resolver walks the DNS tree to the **nameservers** authoritative for
   `flyrank.ai`.
3. Those nameservers return the **CNAME record**, which says “look up
   `kaziafrozalam.netlify.app` instead.”
4. The resolver resolves the Netlify hostname to Netlify’s current **edge IPs**.
5. **Netlify** matches the incoming `Host` header, serves the site over the CDN,
   and terminates **HTTPS**.
6. The **browser** renders the response. Same app, custom domain.

## Propagation & TTL

- **TTL** (Time To Live) is how long resolvers cache the record. `3600` = 1 hour.
- After you first add the record, global **propagation** typically takes minutes
  to a few hours (occasionally up to 24–48h for stubborn caches).
- Lower the TTL (e.g. `300`) **before** a planned change so updates apply faster;
  raise it back afterwards to reduce lookups.

## SSL / HTTPS

- Netlify issues a free **Let’s Encrypt** certificate automatically once the
  domain is added **and** the CNAME resolves correctly.
- Certificate provisioning only succeeds after DNS points at Netlify — so add
  the record first, then wait for the “Certificate” status to go green.
- Enable **Force HTTPS** in Netlify so all `http://` traffic is redirected.

## Troubleshooting

| Symptom                                | Likely cause / fix                                                                              |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| “DNS record not found”                 | Record not saved, or wrong host label. Confirm `kaziafrozalam` on the `flyrank.ai` zone.        |
| Still resolves to old target           | TTL cache. Wait for TTL to expire, or flush local DNS (`dscacheutil`, `ipconfig /flushdns`).    |
| Site loads but no HTTPS / cert warning | Certificate not issued yet. Wait for DNS to resolve to Netlify, then re-check.                  |
| “Not found” / Netlify 404              | Domain not added in Netlify **Domain management**, so the `Host` isn’t matched.                 |
| CNAME rejected at the apex             | You can’t CNAME a root domain — not an issue here since this is a subdomain.                    |

## Verify from the terminal

```bash
dig kaziafrozalam.flyrank.ai CNAME +short   # → kaziafrozalam.netlify.app
curl -I https://kaziafrozalam.flyrank.ai    # → HTTP/2 200 from Netlify
```

The Netlify domain stays the canonical origin; the FlyRank subdomain simply
points at it. No redesign, no separate deploy.
