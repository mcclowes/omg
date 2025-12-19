---
method: GET
path: /Contacts/{ContactID}/Attachments
operationId: getContactAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific contact in a Xero organisation
---

# Retrieves attachments for a specific contact in a Xero organisation

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
Attachments
```
