---
method: POST
path: /webhooks/payment.failed
operationId: webhook-payment-failed
tags: [Webhooks]
summary: Payment failed event
---

# payment.failed

Sent when a payment fails to process. The failure reason is included in the event data.

## Common Failure Codes

| Code | Description |
|------|-------------|
| `card_declined` | The card was declined |
| `insufficient_funds` | Insufficient funds in the account |
| `expired_card` | The card has expired |
| `processing_error` | A processing error occurred |

```omg.body
{
  id: string,
  type: "payment.failed",
  created: datetime,
  data: {
    object: {
      id: string,
      object: "payment_intent",
      amount: integer,
      currency: string,
      status: "failed",
      failure_code: string,
      failure_message: string,
      customer_id?: string,
      description?: string,
      metadata?: any,
      created_at: datetime,
      updated_at: datetime
    }
  }
}
```

```omg.example
{
  "id": "evt_fail123",
  "type": "payment.failed",
  "created": "2024-01-15T10:30:03Z",
  "data": {
    "object": {
      "id": "pi_failed789",
      "object": "payment_intent",
      "amount": 5000,
      "currency": "usd",
      "status": "failed",
      "failure_code": "card_declined",
      "failure_message": "Your card was declined.",
      "customer_id": "cus_xyz789",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:03Z"
    }
  }
}
```

```omg.response
{
  received: boolean
}
```
