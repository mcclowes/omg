---
method: GET
path: /Contacts/{ContactID}/CISSettings
operationId: getContactCISSettings
tags:
  - Accounting
summary: Retrieves CIS settings for a specific contact in a Xero organisation
---

# Retrieves CIS settings for a specific contact in a Xero organisation

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
CISSettings
```
