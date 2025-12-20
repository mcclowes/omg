---
method: GET
path: /Contacts/{ContactID}/Attachments
operationId: getContactAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
extensions:
  x-hasAccountingValidationError: true
---

# Retrieves attachments for a specific contact in a Xero organisation

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
