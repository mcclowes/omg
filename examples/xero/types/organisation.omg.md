# Organisation

```omg.type
type Organisation = {
  OrganisationID?: uuid  // Unique Xero identifier
  APIKey?: string  // Display a unique key used for Xero-to-Xero transactions
  Name?: string  // Display name of organisation shown in Xero
  LegalName?: string  // Organisation name shown on Reports
  PaysTax?: boolean  // Boolean to describe if organisation is registered with a local tax authority i.e. true, false
  Version?: "AU" | "NZ" | "GLOBAL" | "UK" | "US" | "AUONRAMP" | "NZONRAMP" | "GLOBALONRAMP" | "UKONRAMP" | "USONRAMP"  // See Version Types
  OrganisationType?: "ACCOUNTING_PRACTICE" | "COMPANY" | "CHARITY" | "CLUB_OR_SOCIETY" | "INDIVIDUAL" | "LOOK_THROUGH_COMPANY" | "NOT_FOR_PROFIT" | "PARTNERSHIP" | "S_CORPORATION" | "SELF_MANAGED_SUPERANNUATION_FUND" | "SOLE_TRADER" | "SUPERANNUATION_FUND" | "TRUST"  // Organisation Type
  BaseCurrency?: CurrencyCode
  CountryCode?: CountryCode
  IsDemoCompany?: boolean  // Boolean to describe if organisation is a demo company.
  OrganisationStatus?: string  // Will be set to ACTIVE if you can connect to organisation via the Xero API
  RegistrationNumber?: string  // Shows for New Zealand, Australian and UK organisations
  EmployerIdentificationNumber?: string  // Shown if set. US Only.
  TaxNumber?: string  // Shown if set. Displays in the Xero UI as Tax File Number (AU), GST Number (NZ), VAT Number (UK) and Tax ID Number (US & Global).
  FinancialYearEndDay?: integer  // Calendar day e.g. 0-31
  FinancialYearEndMonth?: integer  // Calendar Month e.g. 1-12
  SalesTaxBasis?: "PAYMENTS" | "INVOICE" | "NONE" | "CASH" | "ACCRUAL" | "FLATRATECASH" | "FLATRATEACCRUAL" | "ACCRUALS"  // The accounting basis used for tax returns. See Sales Tax Basis
  SalesTaxPeriod?: "MONTHLY" | "QUARTERLY1" | "QUARTERLY2" | "QUARTERLY3" | "ANNUALLY" | "ONEMONTHS" | "TWOMONTHS" | "SIXMONTHS" | "1MONTHLY" | "2MONTHLY" | "3MONTHLY" | "6MONTHLY" | "QUARTERLY" | "YEARLY" | "NONE"  // The frequency with which tax returns are processed. See Sales Tax Period
  DefaultSalesTax?: string  // The default for LineAmountTypes on sales transactions
  DefaultPurchasesTax?: string  // The default for LineAmountTypes on purchase transactions
  PeriodLockDate?: string  // Shown if set. See lock dates
  EndOfYearLockDate?: string  // Shown if set. See lock dates
  CreatedDateUTC?: string  // Timestamp when the organisation was created in Xero
  Timezone?: TimeZone
  OrganisationEntityType?: "ACCOUNTING_PRACTICE" | "COMPANY" | "CHARITY" | "CLUB_OR_SOCIETY" | "INDIVIDUAL" | "LOOK_THROUGH_COMPANY" | "NOT_FOR_PROFIT" | "PARTNERSHIP" | "S_CORPORATION" | "SELF_MANAGED_SUPERANNUATION_FUND" | "SOLE_TRADER" | "SUPERANNUATION_FUND" | "TRUST"  // Organisation Entity Type
  ShortCode?: string  // A unique identifier for the organisation. Potential uses.
  Class?: "DEMO" | "TRIAL" | "STARTER" | "STANDARD" | "PREMIUM" | "PREMIUM_20" | "PREMIUM_50" | "PREMIUM_100" | "LEDGER" | "GST_CASHBOOK" | "NON_GST_CASHBOOK" | "ULTIMATE" | "LITE" | "ULTIMATE_10" | "ULTIMATE_20" | "ULTIMATE_50" | "ULTIMATE_100" | "IGNITE" | "GROW" | "COMPREHENSIVE" | "SIMPLE"  // Organisation Classes describe which plan the Xero organisation is on (e.g. DEMO, TRIAL, PREMIUM)
  Edition?: "BUSINESS" | "PARTNER"  // BUSINESS or PARTNER. Partner edition organisations are sold exclusively through accounting partners and have restricted functionality (e.g. no access to invoicing)
  LineOfBusiness?: string  // Description of business type as defined in Organisation settings
  Addresses?: AddressForOrganisation[]  // Address details for organisation – see Addresses
  Phones?: Phone[]  // Phones details for organisation – see Phones
  ExternalLinks?: ExternalLink[]  // Organisation profile links for popular services such as Facebook,Twitter, GooglePlus and LinkedIn. You can also add link to your website here. Shown if Organisation settings  is updated in Xero. See ExternalLinks below
  PaymentTerms?: PaymentTerm
}
```
