---
method: GET
path: /ContactGroups
operationId: getContactGroups
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves the contact Id and name of each contact group

```omg.response
ContactGroups
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}
