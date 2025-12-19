---
method: GET
path: /Contacts/{ContactID}/Attachments/{FileName}
operationId: getContactAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific contact by file name
---

# Retrieves a specific attachment from a specific contact by file name

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  contentType: string  // The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf
}
```

```omg.response
string @format("binary")
```
