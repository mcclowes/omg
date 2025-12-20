---
method: PUT
path: /Contacts
operationId: createContacts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - phone: null
      is_object: true
      key: phone
      keyPascal: Phone
    - phoneNumber: null
      key: phoneNumber
      keyPascal: PhoneNumber
      keySnake: phone_number
      default: 555-1212
      object: phone
    - phoneType: null
      is_last: true
      nonString: true
      key: phoneType
      keyPascal: PhoneType
      keySnake: phone_type
      default: MOBILE
      php: XeroAPI\XeroPHP\Models\Accounting\Phone::PHONE_TYPE_MOBILE
      node: Phone.PhoneTypeEnum.MOBILE
      ruby: XeroRuby::Accounting::PhoneType::MOBILE
      python_string: MOBILE
      java: com.xero.models.accounting.Phone.PhoneTypeEnum.MOBILE
      csharp: Phone.PhoneTypeEnum.MOBILE
      object: phone
    - phones: null
      is_list: true
      key: phones
      keyPascal: Phone
    - add_phone: null
      is_last: true
      is_list_add: true
      key: phones
      keyPascal: Phones
      object: phone
    - contact: null
      is_object: true
      key: contact
      keyPascal: Contact
    - name: null
      key: name
      keyPascal: Name
      default: Bruce Banner
      object: contact
    - emailAddress: null
      key: emailAddress
      keyPascal: EmailAddress
      keySnake: email_address
      default: hulk@avengers.com
      object: contact
    - set_phones: null
      is_last: true
      is_variable: true
      nonString: true
      key: phones
      keyPascal: Phones
      default: phones
      object: contact
    - contacts: null
      is_object: true
      key: contacts
      keyPascal: Contacts
    - add_contact: null
      is_last: true
      is_array_add: true
      key: contacts
      keyPascal: Contacts
      java: Contacts
      csharp: Contact
      object: contact
---

# Creates multiple contacts (bulk) in a Xero organisation

```omg.body
Contacts
```

```omg.response
Contacts
```

```omg.response.400
Error
```

{{> query/summarize-errors }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
