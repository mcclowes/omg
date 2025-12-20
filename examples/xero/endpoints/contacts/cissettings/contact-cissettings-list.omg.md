---
method: GET
path: /Contacts/{ContactID}/CISSettings
operationId: getContactCISSettings
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves CIS settings for a specific contact in a Xero organisation

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.response
CISSettings
```

{{> headers/xero-tenant-id }}
