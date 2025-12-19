# PaymentService

```omg.type
type PaymentService = {
  PaymentServiceID?: uuid  // Xero identifier
  PaymentServiceName?: string  // Name of payment service
  PaymentServiceUrl?: string  // The custom payment URL
  PayNowText?: string  // The text displayed on the Pay Now button in Xero Online Invoicing. If this is not set it will default to Pay by credit card
  PaymentServiceType?: string  // This will always be CUSTOM for payment services created via the API.
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
