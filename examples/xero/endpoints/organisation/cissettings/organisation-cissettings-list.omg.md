---
method: GET
path: /Organisation/{OrganisationID}/CISSettings
operationId: getOrganisationCISSettings
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves the CIS settings for the Xero organistaion.

```omg.path
{
  OrganisationID: uuid  // The unique Xero identifier for an organisation
}
```

```omg.response
CISOrgSettings
```

{{> headers/xero-tenant-id }}
