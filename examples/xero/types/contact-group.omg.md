# ContactGroup

```omg.type
type ContactGroup = {
  Name?: string  // The Name of the contact group. Required when creating a new contact  group
  Status?: "ACTIVE" | "DELETED"  // The Status of a contact group. To delete a contact group update the status to DELETED. Only contact groups with a status of ACTIVE are returned on GETs.
  ContactGroupID?: uuid  // The Xero identifier for an contact group – specified as a string following the endpoint name. e.g. /297c2dc5-cc47-4afd-8ec8-74990b8761e9
  Contacts?: Contact[]  // The ContactID and Name of Contacts in a contact group. Returned on GETs when the ContactGroupID is supplied in the URL.
}
```
