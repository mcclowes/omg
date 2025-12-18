---
method: POST
path: /webhooks/payment.created
operationId: webhook-payment-created
tags: [Webhooks]
summary: Payment created event
---

# payment.created

Sent when a new payment intent is created. This event is sent immediately after the payment is created, before processing begins.

## Delivery

- **Method**: POST to your configured webhook URL
- **Retry policy**: 3 retries with exponential backoff
- **Timeout**: 30 seconds

```omg.body
{
  id: string,
  type: "payment.created",
  created: datetime,
  data: {
    object: {
      id: string,
      object: "payment_intent",
      amount: integer,
      currency: string,
      status: "pending",
      customer_id?: string,
      description?: string,
      metadata?: any,
      created_at: datetime
    }
  }
}
```

```omg.example
{
  "id": "evt_1234567890",
  "type": "payment.created",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "object": {
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
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

```omg.response
{
  received: boolean
}
```
