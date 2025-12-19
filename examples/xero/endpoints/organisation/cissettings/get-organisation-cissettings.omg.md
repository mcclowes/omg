---
method: GET
path: /Organisation/{OrganisationID}/CISSettings
operationId: getOrganisationCISSettings
tags:
  - Accounting
summary: Retrieves the CIS settings for the Xero organistaion.
---

# Retrieves the CIS settings for the Xero organistaion.

```omg.path
{
  OrganisationID: uuid  // The unique Xero identifier for an organisation
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
CISOrgSettings
```
