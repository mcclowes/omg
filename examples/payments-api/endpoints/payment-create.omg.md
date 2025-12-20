---
method: POST
path: /payments
operationId: create-payment
tags: [Payments]
summary: Create a payment intent
webhooks:
  resulting: [payment.created, payment.succeeded, payment.failed]
---

# Create Payment

Creates a new payment intent. The payment will be processed asynchronously, and webhook events will be sent to notify you of the outcome.

## Idempotency

Include an `Idempotency-Key` header to safely retry requests. The same key will return the same response for 24 hours.

```omg.headers
{
  "Idempotency-Key"?: string @maxLength(255)  // Unique key for idempotent requests
}
```

```omg.body
{
  amount: integer @min(1),        // Amount in smallest currency unit (e.g., cents)
  currency: "usd" | "eur" | "gbp",
  customer_id?: string,           // Optional customer reference
  description?: string @maxLength(500),
  metadata?: any                  // Custom key-value pairs
}
```

```omg.response.201
{
  id: string,
  object: "payment_intent",
  amount: integer,
  currency: string,
  status: "pending" | "processing" | "succeeded" | "failed",
  customer_id?: string,
  description?: string,
  metadata?: any,
  created_at: datetime,
  updated_at: datetime
}
```

```omg.example
{
  "id": "pi_1234567890",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "pending",
  "customer_id": "cus_abc123",
  "description": "Order #12345",
  "metadata": {
    "order_id": "12345"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

{{> error }}
