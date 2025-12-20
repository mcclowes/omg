---
method: POST
path: /refunds
operationId: create-refund
tags: [Refunds]
summary: Create a refund
follows: [create-payment]
webhooks:
  resulting: [refund.created, refund.succeeded]
---

# Create Refund

Creates a refund for a completed payment. Refunds can be partial or full.

```omg.body
{
  payment_id: string,             // The payment to refund
  amount?: integer @min(1),       // Amount to refund (defaults to full amount)
  reason?: "duplicate" | "fraudulent" | "requested_by_customer"
}
```

```omg.response.201
{
  id: string,
  object: "refund",
  payment_id: string,
  amount: integer,
  currency: string,
  status: "pending" | "succeeded" | "failed",
  reason?: string,
  created_at: datetime
}
```

```omg.example
{
  "id": "re_abc123",
  "object": "refund",
  "payment_id": "pi_1234567890",
  "amount": 1000,
  "currency": "usd",
  "status": "pending",
  "reason": "requested_by_customer",
  "created_at": "2024-01-15T14:00:00Z"
}
```

```omg.response.400
{
  error: {
    type: "invalid_request_error",
    code: "amount_too_large" | "charge_already_refunded",
    message: string
  }
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
