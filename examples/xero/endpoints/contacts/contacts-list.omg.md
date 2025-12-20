---
method: GET
path: /Contacts
operationId: getContacts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves all contacts in a Xero organisation

```omg.query
{
  IDs?: uuid[]  // Filter by a comma separated list of ContactIDs. Allows you to retrieve a specific set of contacts in a single call.
  summaryOnly?: boolean @default(false)  // Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient.
  searchTerm?: string  // Search parameter that performs a case-insensitive text search across the Name, FirstName, LastName, ContactNumber and EmailAddress fields.
}
```

```omg.response
Contacts
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/include-archived }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
