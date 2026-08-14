# DNS.md

## What DNS does

DNS translates a human-readable hostname into the destination information needed to reach a service. The portfolio can live at a Netlify hostname while a later custom hostname points to the same deployed site.

## CNAME

For the custom subdomain, the intended relationship is conceptually:

```text
kaziafrozalam.flyrank.ai
        ↓
      CNAME
        ↓
kaziafrozalam.netlify.app
```

A CNAME record tells DNS resolvers that one hostname is an alias for another hostname. Netlify then serves the deployed application and can provision HTTPS for the custom hostname once the domain is correctly attached in Netlify.

## Request flow

```text
User enters domain
        ↓
Browser
        ↓
DNS resolver
        ↓
Authoritative nameserver
        ↓
CNAME record
        ↓
Netlify hostname
        ↓
Netlify infrastructure
        ↓
HTTPS
        ↓
Website
```

### Resolver

The recursive resolver used by the browser/device checks its cache and, when necessary, asks the DNS hierarchy for the answer.

### Nameserver

The authoritative nameserver holds the DNS records for the domain or delegated zone and returns the configured record.

### DNS record

A DNS record describes how a hostname should resolve. For this setup, the relevant record is a CNAME for the custom subdomain.

### TTL

TTL (time to live) tells resolvers how long a DNS answer may be cached. During a DNS change, different users can temporarily see old and new answers until caches expire.

### Propagation

DNS changes are not a single global switch. Cached answers expire at different times, so the new record can appear gradually across resolvers.

### HTTPS / SSL

Once the custom hostname resolves to the deployed service and is added to the Netlify site configuration, Netlify can issue and manage the site's TLS certificate. Visitors then reach the portfolio over HTTPS.

## If DNS is misconfigured

Typical symptoms include the domain not resolving, a Netlify domain-assignment error, an unexpected site appearing, or HTTPS not becoming ready. Check the hostname spelling, CNAME target, DNS provider/zone, and the custom-domain configuration in Netlify. Also allow time for cached records to expire.

## Why the app does not need rebuilding

DNS is outside the Next.js application bundle. Changing which hostname points at the deployment changes the route users take to reach the already-built site. Assets use relative paths and the application does not hardcode the Netlify hostname, so a correctly configured custom domain can be attached without rebuilding the application.
