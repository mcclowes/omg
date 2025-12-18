---
name: Payments API
version: 1.0.0
baseUrl: https://api.payments.example.com/v1
---

# Payments API

A Stripe-like payments API demonstrating webhook support for asynchronous event notifications.

## Features

- **Payment processing** - Create and manage payment intents
- **Webhooks** - Real-time notifications for payment events
- **Idempotency** - Safe retry handling with idempotency keys

## Webhook Events

This API sends webhooks for the following events:

| Event | Description |
|-------|-------------|
| `payment.created` | A new payment intent was created |
| `payment.succeeded` | Payment was successfully processed |
| `payment.failed` | Payment processing failed |
| `refund.created` | A refund was initiated |
| `refund.succeeded` | Refund was successfully processed |
