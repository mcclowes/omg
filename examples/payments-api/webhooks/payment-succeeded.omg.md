---
method: POST
path: /webhooks/payment.succeeded
operationId: webhook-payment-succeeded
tags: [Webhooks]
summary: Payment succeeded event
---

# payment.succeeded

Sent when a payment is successfully processed. This is the confirmation that funds have been captured.

## Handling

When you receive this event, you should:
1. Fulfill the order or service
2. Send confirmation to the customer
3. Update your records

```omg.body
{
  id: string,
  type: "payment.succeeded",
  created: datetime,
  data: {
    object: {
      id: string,
      object: "payment_intent",
      amount: integer,
      currency: string,
      status: "succeeded",
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
  "id": "evt_9876543210",
  "type": "payment.succeeded",
  "created": "2024-01-15T10:30:05Z",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "object": "payment_intent",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "customer_id": "cus_abc123",
      "description": "Order #12345",
      "metadata": {
        "order_id": "12345"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:05Z"
    }
  }
}
```

```omg.response
{
  received: boolean
}
```
