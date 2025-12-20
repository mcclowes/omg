---
method: GET
path: /payments/{paymentId}
operationId: get-payment
tags: [Payments]
summary: Retrieve a payment
follows: [create-payment]
webhooks:
  listen: [payment.succeeded, payment.failed]
---

# Get Payment

Retrieves the details of a payment intent. You can poll this endpoint to check the payment status, or subscribe to webhooks for real-time updates.

```omg.path
{
  paymentId: string  // Payment intent ID (e.g., pi_1234567890)
}
```

```omg.response
{
  id: string,
  object: "payment_intent",
  amount: integer,
  currency: string,
  status: "pending" | "processing" | "succeeded" | "failed",
  customer_id?: string,
  description?: string,
  metadata?: any,
  failure_code?: string,
  failure_message?: string,
  created_at: datetime,
  updated_at: datetime
}
```

```omg.response.404
{
  error: {
    type: "invalid_request_error",
    code: "resource_missing",
    message: string
  }
}
```
