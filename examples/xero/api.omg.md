---
name: Xero Accounting API
version: 10.0.0
baseUrl: https://api.xero.com/api.xro/2.0
servers:
  - url: https://api.xero.com/api.xro/2.0
    description: The Xero Accounting API exposes accounting and related functions of the main Xero application and can be used for a variety of purposes such as creating transactions like invoices and credit notes, right through to extracting accounting data via our reports endpoint.
contact:
  name: Xero Platform Team
  email: api@xero.com
  url: https://developer.xero.com
termsOfService: https://developer.xero.com/xero-developer-platform-terms-conditions/
securitySchemes:
  OAuth2:
    type: oauth2
    description: For more information
    flows:
      authorizationCode:
        authorizationUrl: https://login.xero.com/identity/connect/authorize
        tokenUrl: https://identity.xero.com/connect/token
        scopes:
          email: Grant read-only access to your email
          openid: Grant read-only access to your open id
          profile: your profile information
          accounting.attachments: Grant read-write access to attachments
          accounting.attachments.read: Grant read-only access to attachments
          accounting.budgets.read: Grant read-only access to read budgets
          accounting.contacts: Grant read-write access to contacts and contact groups
          accounting.contacts.read: Grant read-only access to contacts and contact groups
          accounting.journals.read: Grant read-only access to journals
          accounting.reports.read: Grant read-only access to accounting reports
          accounting.reports.tenninetynine.read: Grant read-only access to 1099 reports
          accounting.settings: Grant read-write access to organisation and account settings
          accounting.settings.read: Grant read-only access to organisation and account settings
          accounting.transactions: Grant read-write access to bank transactions, credit notes, invoices, repeating invoices
          accounting.transactions.read: Grant read-only access to invoices
          paymentservices: Grant read-write access to payment services
---

# Xero Accounting API
