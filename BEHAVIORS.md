# OMG Behaviors - API Behavior Specification

> Extending OMG to capture what OpenAPI cannot: real API dynamics

## The Gap

OpenAPI describes **shapes**. Real APIs have **behaviors**.

```
Static Contract (OpenAPI)     vs     Behavioral Contract (OMG Behaviors)
─────────────────────────────────────────────────────────────────────────
"Invoice has a status field"         "Invoice transitions Draft→Sent→Paid"
"DELETE returns 204 or 404"          "DELETE returns 404 if not found"
"POST creates an invoice"            "POST creates invoice, updates balance"
"Webhook has this shape"             "Webhook fires when invoice.paid"
```

This document proposes language extensions to make OMG a **behavioral specification**.

---

## 1. Resource Lifecycles & State Machines

### The Problem

APIs have resources with lifecycles. An Invoice isn't just data—it's a state machine:

```
     ┌──────────────────────────────────────┐
     │                                      │
     ▼                                      │
  [Draft] ──send()──▶ [Sent] ──pay()──▶ [Paid]
     │                  │
     │                  │ void()
     │                  ▼
     └──void()──▶    [Void]
```

OpenAPI can only say "status is an enum". It can't express:
- Valid transitions
- What triggers transitions
- What's allowed/forbidden in each state

### Proposed Syntax

```oal
resource Invoice {
  # Type definition (existing OMG)
  type {
    id: uuid
    status: InvoiceStatus
    amount: decimal
    lineItems: LineItem[]
    paidAt?: datetime
  }

  # State machine definition (NEW)
  lifecycle status {
    Draft {
      -> Sent via send() "Send invoice to customer"
      -> Void via void() "Cancel draft invoice"

      allow update, delete
    }

    Sent {
      -> Paid via pay() {
        requires paymentMethod
        sets paidAt = now()
      }
      -> Void via void() "Cancel sent invoice"

      allow update(dueDate, notes)  # Only these fields
      deny delete "Cannot delete sent invoice"
    }

    Paid {
      -> Void via refund() {
        requires reason
        creates CreditNote
      }

      deny update "Paid invoices are immutable"
      deny delete
    }

    Void {
      terminal  # No transitions out
      deny update, delete
    }

    initial: Draft
  }
}
```

### What This Enables

1. **Documentation**: Auto-generate state diagrams
2. **Validation**: Reject invalid transition requests
3. **Mock servers**: Maintain state, return correct errors
4. **Contract tests**: Verify state machine is honored
5. **SDK generation**: Generate transition methods

### Compiled Output

This compiles to OpenAPI 3.1 + extensions:

```yaml
components:
  schemas:
    Invoice:
      type: object
      properties:
        status:
          type: string
          enum: [Draft, Sent, Paid, Void]
      x-omg-lifecycle:
        field: status
        states:
          Draft:
            transitions:
              - to: Sent
                via: send
              - to: Void
                via: void
            operations:
              allow: [update, delete]
          # ... etc
```

---

## 2. Cross-Endpoint Relationships & Causality

### The Problem

Endpoints don't exist in isolation:
- `POST /invoices` creates → `GET /invoices/{id}` returns it
- `DELETE /invoices/{id}` → subsequent `GET` returns 404
- `POST /transactions` → `GET /accounts/{id}` balance changes

OpenAPI treats each endpoint as independent.

### Proposed Syntax

```oal
resource Invoice {
  # Define the causal relationships
  relationships {
    # Creating an invoice makes it retrievable
    create -> exists {
      "After POST /invoices returns 201, GET /invoices/{id} returns the invoice"
    }

    # Deleting removes it
    delete -> !exists {
      "After DELETE /invoices/{id} returns 204, GET returns 404"
    }

    # Updating is reflected
    update -> reflects {
      "After PATCH /invoices/{id}, GET returns updated data"
    }
  }

  # Cross-resource effects
  effects {
    on create {
      Account[this.accountId].balance += this.amount
    }

    on delete where status == Draft {
      # No side effects for draft deletion
    }

    on transition Sent -> Paid {
      Account[this.accountId].receivable -= this.amount
      Account[this.accountId].cash += this.amount
      emit event invoice.paid
    }
  }
}
```

### Link Propagation

```oal
## Create Invoice

```http
POST /invoices
```

returns {
  201: Invoice {
    # The returned ID can be used in these endpoints
    links {
      self: GET /invoices/{id}
      update: PATCH /invoices/{id}
      delete: DELETE /invoices/{id}
      send: POST /invoices/{id}/send
      lines: GET /invoices/{id}/lines
    }
  }
}
```

---

## 3. Conditional Responses

### The Problem

OpenAPI lists status codes but can't say **when** each occurs:

```yaml
responses:
  200: Success
  404: Not Found
  409: Conflict
```

Which conditions produce 404 vs 409? Nobody knows.

### Proposed Syntax

```oal
## Delete Invoice

```http
DELETE /invoices/{invoiceId}
```

returns {
  204: void
    when exists(invoiceId) && status in [Draft, Void]
    "Invoice successfully deleted"

  404: NotFoundError
    when !exists(invoiceId)
    "Invoice does not exist"

  409: ConflictError
    when exists(invoiceId) && status in [Sent, Paid]
    "Cannot delete invoice in ${status} status"
}
```

### Complex Conditions

```oal
## Transfer Funds

```http
POST /accounts/{accountId}/transfer
```

body {
  toAccountId: uuid
  amount: decimal @min(0.01)
}

returns {
  200: TransferResult
    when balance >= amount && toAccount.exists && toAccount.active

  400: ValidationError
    when amount <= 0
    "Amount must be positive"

  404: NotFoundError
    when !exists(accountId)
    "Source account not found"

  404: NotFoundError
    when !toAccount.exists
    "Destination account not found"

  409: InsufficientFundsError
    when balance < amount
    "Insufficient funds: balance is ${balance}, requested ${amount}"

  409: AccountInactiveError
    when !toAccount.active
    "Destination account is inactive"
}
```

---

## 4. Temporal Behaviors

### The Problem

APIs have timing characteristics:
- Eventual consistency windows
- Async operations with polling
- Rate limits
- Retry behaviors

None expressible in OpenAPI.

### Proposed Syntax

#### Eventual Consistency

```oal
resource Invoice {
  consistency {
    # After write, reads may be stale
    eventual within 5s {
      "Changes may take up to 5 seconds to propagate"
    }

    # Or strong consistency for specific operations
    strong for [create, delete]
  }
}
```

#### Async Operations

```oal
## Create Invoice (Async)

```http
POST /invoices
```

async {
  # Returns immediately with operation ID
  returns {
    202: AsyncOperation {
      operationId: uuid
      status: "pending"
      _links: {
        poll: GET /operations/{operationId}
      }
    }
  }

  # Poll endpoint for completion
  poll GET /operations/{operationId} {
    interval: 1s
    timeout: 5m

    complete when status == "completed" {
      returns Invoice at result
    }

    failed when status == "failed" {
      returns AsyncError at error
    }
  }

  # Alternative: webhook notification
  notify webhook invoice.created {
    when status == "completed"
  }
}
```

#### Rate Limiting

```oal
rateLimit {
  # Global default
  default: 100/minute

  # Per-endpoint overrides
  endpoints {
    "POST /invoices": 10/minute
    "GET /reports/*": 5/minute
  }

  # Response when exceeded
  exceeded {
    returns 429 TooManyRequests {
      retryAfter: int "Seconds until rate limit resets"
    }
    headers {
      Retry-After: retryAfter
      X-RateLimit-Remaining: 0
      X-RateLimit-Reset: datetime
    }
  }
}
```

#### Retry Behavior

```oal
retry {
  # Which errors are retryable
  retryable: [429, 500, 502, 503, 504]

  # Recommended strategy
  strategy: exponential {
    initial: 1s
    max: 30s
    jitter: true
  }

  # Idempotency
  idempotent: [GET, PUT, DELETE]

  # Idempotency keys for non-idempotent
  idempotencyKey for [POST] {
    header: Idempotency-Key
    ttl: 24h
  }
}
```

---

## 5. Webhooks & Events

### The Problem

OpenAPI 3.1 has webhooks but can't express:
- What triggers them
- Event ordering
- Delivery guarantees
- Correlation with API calls

### Proposed Syntax

```oal
events {
  # Event definitions with per-event delivery guarantees
  event invoice.created {
    type: Invoice
    trigger: on Invoice.create
    delivery: at-least-once
  }

  event invoice.paid {
    type {
      invoice: Invoice
      payment: Payment
    }
    trigger: on Invoice.transition(Sent -> Paid)
    delivery: at-least-once
  }

  event invoice.sent {
    type: Invoice
    trigger: on Invoice.transition(Draft -> Sent)
    delivery: at-least-once
  }

  event invoice.voided {
    type {
      invoice: Invoice
      reason?: string
    }
    trigger: on Invoice.transition(* -> Void)
    delivery: at-least-once
  }

  event invoice.overdue {
    type: Invoice
    trigger: schedule daily when dueDate < now() && status == Sent
    delivery: best-effort  # Less critical, can miss occasionally
  }

  # Default delivery configuration (can be overridden per-event)
  delivery {
    # Default guarantee if not specified per-event
    default: at-least-once

    # Webhook endpoints receive events
    webhook {
      method: POST
      headers {
        X-Webhook-Signature: hmac-sha256(body, secret)
        X-Event-Type: event.type
        X-Event-Id: uuid
        X-Timestamp: datetime
      }

      retry {
        attempts: 5
        backoff: exponential(1s, 30s)
      }

      timeout: 30s
    }

    # Ordering guarantees
    ordering {
      per-resource: ordered "Events for same resource delivered in order"
      global: unordered "No global ordering guarantee"
    }
  }
}
```

### Event Sequences

```oal
# Define expected event sequences
sequence invoice.lifecycle {
  invoice.created
  -> invoice.sent?          # Optional
  -> invoice.paid | invoice.voided

  # Never see paid after voided
  invariant: !(invoice.voided -> invoice.paid)
}
```

---

## 6. Business Invariants

### The Problem

APIs maintain invariants that span multiple resources:
- Account balance = sum of transactions
- Order total = sum of line items
- User can't have more than N active subscriptions

### Proposed Syntax

```oal
invariants {
  # Balance calculation
  Account.balance == sum(Transaction where accountId == Account.id).amount
    "Account balance must equal sum of transactions"

  # Order integrity
  Order.total == sum(Order.lineItems).subtotal + Order.tax
    "Order total must match line items plus tax"

  # Business rule
  count(Subscription where userId == User.id && status == Active) <= User.plan.maxSubscriptions
    "User cannot exceed subscription limit for their plan"

  # Referential integrity
  forall Invoice.customerId exists Customer.id
    "Invoice must reference existing customer"
}
```

### Constraint Violations

```oal
## Create Transaction

```http
POST /transactions
```

constraints {
  # Check before applying
  precondition Account.exists "Account must exist"
  precondition Account.active "Account must be active"

  # Check after applying
  postcondition Account.balance >= Account.overdraftLimit
    else reject 409 InsufficientFunds
}
```

---

## 7. Authentication & Authorization Flows

### Beyond Security Schemes

```oal
auth {
  # OAuth2 flow with behaviors
  oauth2 {
    flows {
      authorizationCode {
        authorize: GET /oauth/authorize
        token: POST /oauth/token
        refresh: POST /oauth/token
        revoke: POST /oauth/revoke
      }
    }

    # Token behaviors
    accessToken {
      lifetime: 1h
      refresh: automatic when expires_in < 5m
    }

    refreshToken {
      lifetime: 30d
      rotation: true "New refresh token on each use"
      revocation: cascade "Revoking refresh token revokes access token"
    }

    # Scope-based behavior
    scopes {
      read: "Read access to resources"
      write: "Write access to resources" requires read
      admin: "Administrative access" requires [read, write]
    }
  }
}

## List Invoices

```http
GET /invoices
```

auth {
  required: true
  scopes: [read]

  # Response varies by permission
  behavior {
    with scope admin: returns all invoices
    with scope read: returns invoices where ownerId == currentUser
    without auth: returns 401
  }
}
```

---

## 8. Data Relationships & References

### The Problem

IDs in responses reference other resources. OpenAPI can't express:
- What the ID references
- Whether it's guaranteed to exist
- How to resolve it

### Proposed Syntax

```oal
type Invoice {
  id: uuid

  # Explicit reference with resolution
  customerId: uuid -> Customer {
    resolve: GET /customers/{customerId}
    guarantee: exists "Customer always exists for valid invoice"
  }

  # Optional reference
  assignedTo?: uuid -> User {
    resolve: GET /users/{assignedTo}
    guarantee: soft "User may have been deleted"
  }

  # Embedded vs referenced
  lineItems: LineItem[] {
    embedded: true "Always included in response"
  }

  payments: uuid[] -> Payment {
    embedded: false "Fetch via GET /invoices/{id}/payments"
    resolve: GET /payments/{id}
  }
}
```

### Expand/Include Patterns

```oal
## Get Invoice

```http
GET /invoices/{id}
```

query {
  expand?: string[] @enum([customer, payments, lineItems.product])
    "Embed related resources"

  fields?: string[]
    "Sparse fieldset"
}

returns Invoice {
  expansion {
    customer: embeds Customer at customerId
    payments: embeds Payment[] at payments
    "lineItems.product": embeds Product at lineItems[*].productId
  }
}
```

---

## Compilation Strategy

### OpenAPI + Extensions

Behaviors compile to standard OpenAPI 3.1 plus `x-omg-*` extensions:

```yaml
paths:
  /invoices/{id}:
    delete:
      responses:
        204:
          description: Invoice deleted
          x-omg-condition: "exists(invoiceId) && status in [Draft, Void]"
        404:
          description: Not found
          x-omg-condition: "!exists(invoiceId)"
        409:
          description: Conflict
          x-omg-condition: "exists(invoiceId) && status in [Sent, Paid]"
```

### Standalone Behavior Spec

Generate a separate `behaviors.json` for tools:

```json
{
  "resources": {
    "Invoice": {
      "lifecycle": {
        "field": "status",
        "states": {...},
        "transitions": [...]
      },
      "invariants": [...],
      "effects": [...]
    }
  },
  "events": [...],
  "temporalBehaviors": {...}
}
```

### Tool Integration

| Tool | Uses Behaviors For |
|------|-------------------|
| Mock servers | Maintain state, enforce lifecycles |
| Contract tests | Verify behavioral compliance |
| SDK generators | Generate state-aware clients |
| Documentation | State diagrams, sequence diagrams |
| API gateways | Validate transitions, enforce rate limits |

---

## Example: Complete Invoice Resource

```oal
# Invoices

Manage customer invoices through their complete lifecycle.

resource Invoice {
  type {
    id: uuid @readonly
    number: string @readonly "Auto-generated invoice number"
    customerId: uuid -> Customer
    status: InvoiceStatus

    lineItems: LineItem[] @minItems(1)
    subtotal: decimal @readonly
    tax: decimal @readonly
    total: decimal @readonly

    issueDate: date
    dueDate: date
    paidAt?: datetime @readonly

    @constraint dueDate >= issueDate
    @constraint total == subtotal + tax
    @constraint subtotal == sum(lineItems.amount)
  }

  lifecycle status {
    Draft {
      -> Sent via send {
        requires lineItems.length > 0
        sets issueDate = now() if !issueDate
      }
      -> Void via void
      allow update, delete
    }

    Sent {
      -> Paid via pay {
        requires paymentId: uuid -> Payment
        sets paidAt = now()
      }
      -> Void via void { requires reason: string }
      allow update(dueDate, notes)
      deny delete
    }

    Paid {
      deny update, delete
      -> Void via refund {
        requires reason: string
        creates CreditNote(invoice: this, amount: total)
      }
    }

    Void {
      terminal
      deny update, delete
    }

    initial: Draft
  }

  effects {
    on transition Sent -> Paid {
      Account[this.receivablesAccountId].balance -= this.total
      emit invoice.paid { invoice: this }
    }
  }

  consistency eventual within 3s
}

---

## List Invoices

```http
GET /invoices
```

use pagination

query {
  status?: InvoiceStatus[]
  customerId?: uuid
  dateFrom?: date
  dateTo?: date
}

returns Invoice[] {
  when authorized(invoices.read)
  filter by currentUser.customerId if !authorized(invoices.read.all)
}

---

## Create Invoice

```http
POST /invoices
```

body {
  customerId: uuid
  lineItems: CreateLineItem[]
  dueDate?: date = daysFromNow(30)
  notes?: string
}

returns {
  201: Invoice
    when valid(body)
    creates Invoice(status: Draft)

  400: ValidationError
    when !valid(body)

  404: NotFoundError
    when !exists(Customer, customerId)
}

---

## Send Invoice

```http
POST /invoices/{invoiceId}/send
```

returns {
  200: Invoice
    when status == Draft && lineItems.length > 0
    transitions Draft -> Sent
    emits invoice.sent

  404: NotFoundError
    when !exists(invoiceId)

  409: InvalidStateError
    when status != Draft
    "Invoice is already ${status}"

  409: ValidationError
    when lineItems.length == 0
    "Cannot send invoice with no line items"
}

---

## Pay Invoice

```http
POST /invoices/{invoiceId}/pay
```

body {
  paymentMethodId: uuid -> PaymentMethod
  amount?: decimal "Partial payment amount, defaults to total"
}

returns {
  200: Invoice
    when status == Sent && paymentMethod.valid
    transitions Sent -> Paid

  402: PaymentFailedError
    when !paymentMethod.chargeable
    "Payment method cannot be charged: ${paymentMethod.error}"

  409: InvalidStateError
    when status != Sent
}
```

---

## Migration Path

### Phase 1: Optional Behaviors
Add behaviors alongside existing OMG. Compiles to OpenAPI + extensions.

### Phase 2: Behavior-Aware Tooling
Mock servers, contract testers understand behaviors.

### Phase 3: Full Specification
Behaviors become first-class, enable advanced tooling.

---

## Open Questions

1. **Syntax verbosity**: Is this too complex? Should behaviors be in separate files?

2. **Compilation targets**: Besides OpenAPI extensions, what formats?
   - AsyncAPI for events?
   - State chart XML (SCXML)?
   - Protocol Buffers service definitions?

3. **Verification**: How do we verify implementations match behavioral specs?
   - Runtime assertion injection?
   - Formal verification?
   - Simulation/fuzzing?

4. **Scope**: Where's the line between spec and implementation?
   - Should `effects` actually run code?
   - Should invariants be enforced or just documented?

---

## Prior Art

- **Pact**: Consumer-driven contracts with state
- **Dredd**: API testing with hooks
- **State charts (SCXML)**: Formal state machine specification
- **TLA+**: Temporal logic for system specification
- **Alloy**: Relational modeling and verification
- **Design by Contract**: Preconditions/postconditions (Eiffel)
- **OpenAPI Overlays**: Extensions proposal
