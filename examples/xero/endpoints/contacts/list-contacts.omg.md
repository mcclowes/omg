---
method: GET
path: /Contacts
operationId: getContacts
tags:
  - Accounting
summary: Retrieves all contacts in a Xero organisation
---

# Retrieves all contacts in a Xero organisation

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  IDs?: uuid[]  // Filter by a comma separated list of ContactIDs. Allows you to retrieve a specific set of contacts in a single call.
  page?: integer  // e.g. page=1 - Up to 100 contacts will be returned in a single API call.
  includeArchived?: boolean  // e.g. includeArchived=true - Contacts with a status of ARCHIVED will be included in the response
  summaryOnly?: boolean @default(false)  // Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient.
  searchTerm?: string  // Search parameter that performs a case-insensitive text search across the Name, FirstName, LastName, ContactNumber and EmailAddress fields.
  pageSize?: integer  // Number of records to retrieve per page
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
Contacts
```
