---
method: POST
path: /webhooks/refund.created
operationId: webhook-refund-created
tags: [Webhooks]
summary: Refund created event
---

# refund.created

Sent when a refund is initiated. The refund may still be processing at this point.

```omg.body
{
  id: string,
  type: "refund.created",
  created: datetime,
  data: {
    object: {
      id: string,
      object: "refund",
      payment_id: string,
      amount: integer,
      currency: string,
      status: "pending",
      reason?: string,
      created_at: datetime
    }
  }
}
```

```omg.example
{
  "id": "evt_refund123",
  "type": "refund.created",
  "created": "2024-01-15T14:00:00Z",
  "data": {
    "object": {
      "id": "re_abc123",
      "object": "refund",
      "payment_id": "pi_1234567890",
      "amount": 1000,
      "currency": "usd",
      "status": "pending",
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
