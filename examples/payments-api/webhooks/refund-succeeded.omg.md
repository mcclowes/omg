---
method: POST
path: /webhooks/refund.succeeded
operationId: webhook-refund-succeeded
tags: [Webhooks]
summary: Refund succeeded event
---

# refund.succeeded

Sent when a refund has been successfully processed. Funds have been returned to the customer.

```omg.body
{
  id: string,
  type: "refund.succeeded",
  created: datetime,
  data: {
    object: {
      id: string,
      object: "refund",
      payment_id: string,
      amount: integer,
      currency: string,
      status: "succeeded",
      reason?: string,
      created_at: datetime
    }
  }
}
```

```omg.example
{
  "id": "evt_refund456",
  "type": "refund.succeeded",
  "created": "2024-01-15T14:00:30Z",
  "data": {
    "object": {
      "id": "re_abc123",
      "object": "refund",
      "payment_id": "pi_1234567890",
      "amount": 1000,
      "currency": "usd",
      "status": "succeeded",
      "reason": "requested_by_customer",
      "created_at": "2024-01-15T14:00:00Z"
    }
  }
}
```

```omg.response
{
  received: boolean
}
```
