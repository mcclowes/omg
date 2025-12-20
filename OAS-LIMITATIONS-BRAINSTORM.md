# OAS Limitations Brainstorm

> Beyond BEHAVIORS.md: Additional capabilities OMG could offer that OpenAPI cannot express

This document expands on BEHAVIORS.md with additional gaps in OpenAPI specification coverage.

---

## Already Covered in BEHAVIORS.md

For reference, these are already designed:
- State Machines & Lifecycles
- Cross-Endpoint Causality
- Conditional Responses
- Temporal Behaviors (consistency, async, rate limits, retry)
- Webhooks & Events
- Business Invariants
- Auth Flows & Scope-based behavior
- Data Relationships & References

---

## NEW: Additional Gaps to Address

### 1. API Versioning Semantics

OAS can only declare a version number. It cannot express:

```oal
versioning {
  # Version strategy
  strategy: header "X-API-Version" | path "/v{n}/" | query "?version="

  # Current versions
  versions {
    v1: deprecated since 2024-01-01, sunset 2025-01-01
    v2: current
    v3: beta, requires header "X-Beta-Features: true"
  }

  # Breaking changes require version bump
  breaking-change-policy: major-version

  # Default version if unspecified
  default: latest-stable

  # Cross-version compatibility
  compatibility {
    v1 -> v2: automatic "Requests are transparently upgraded"
    v2 -> v1: degraded "Some fields omitted in v1 response"
  }
}

# Per-endpoint version differences
## Get Account

```http
GET /accounts/{id}
```

versions {
  v1: returns AccountV1
  v2: returns AccountV2 {
    adds: [metadata, tags]
    removes: [legacyField]  # Breaking!
    renames: { old_name -> newName }
  }
}
```

**What this enables:**
- Generate migration guides automatically
- Warn SDK users about deprecation
- Test backward compatibility
- Auto-negotiate versions in clients

---

### 2. Pagination Patterns

OAS has no pagination standard. Every API invents its own.

```oal
pagination {
  # Pagination strategy
  strategy: cursor | offset | keyset | page-number

  # Cursor-based (recommended)
  cursor {
    param: "cursor"
    response: {
      nextCursor?: string
      prevCursor?: string
      hasMore: boolean
    }

    # Cursor is opaque or decodable
    encoding: opaque | base64(field: id, direction: asc)

    # Consistency guarantee
    consistency: snapshot "Cursors see consistent point-in-time"
  }

  # Page size
  pageSize {
    param: "limit"
    default: 20
    max: 100
    min: 1
  }

  # Total count availability
  totalCount: expensive "Only returned if include_count=true"

  # Ordering guarantees
  ordering: stable "Same query returns same order"
}

## List Invoices

```http
GET /invoices
```

use pagination(cursor)

# Defines what fields can be sorted
sortable: [createdAt, amount, dueDate]
sortDefault: createdAt desc
```

**What this enables:**
- SDK generators create proper iterators
- Documentation explains pagination clearly
- Contract tests verify pagination correctness

---

### 3. Filtering & Query DSL

OAS can list query parameters. It cannot express complex filtering languages.

```oal
filtering {
  # Query language style
  style: field-params | single-filter | graphql-like

  # Field-based filtering
  operators {
    eq: "field=value"           # Exact match
    ne: "field!=value"          # Not equal
    gt: "field>value"           # Greater than
    lt: "field<value"           # Less than
    gte: "field>=value"
    lte: "field<=value"
    in: "field=a,b,c"           # In list
    contains: "field~=value"    # Contains substring
    startsWith: "field^=value"  # Starts with
    regex: "field:regex"        # Regex match
    null: "field=null"          # Is null
    exists: "field=*"           # Field exists
  }

  # Compound filters
  compound {
    and: "filter[]=a&filter[]=b"
    or: "filter=a|b"
    not: "filter=!a"
  }

  # Nested field access
  nesting: dot "customer.address.city=London"

  # Array field filtering
  arrays {
    any: "tags[any]=urgent"     # Any element matches
    all: "tags[all]=active"     # All elements match
    size: "tags[size]=3"        # Array length
  }
}

## List Invoices

```http
GET /invoices
```

query {
  filter: FilterExpression {
    # Filterable fields with allowed operators
    filterable {
      status: [eq, ne, in]
      amount: [eq, gt, lt, gte, lte]
      createdAt: [gt, lt, gte, lte]
      "customer.name": [eq, contains, startsWith]
      tags: [any, all]
    }
  }
}
```

**What this enables:**
- SDKs with type-safe query builders
- Docs showing exact filter syntax
- Filter validation at gateway level

---

### 4. Bulk Operations

OAS has no way to express batch semantics.

```oal
bulk {
  # Maximum items per batch
  maxItems: 100

  # Atomicity
  atomicity: all-or-nothing | best-effort | transactional

  # Error handling
  errors: stop-on-first | collect-all | continue-on-error

  # Response format
  response: {
    succeeded: Item[]
    failed: { index: int, error: Error }[]
    # Or streaming for large batches
    streaming: true
  }

  # Ordering guarantee
  ordering: preserved "Results match input order"
}

## Bulk Create Invoices

```http
POST /invoices/bulk
```

body {
  items: CreateInvoice[] @maxItems(100)
}

bulk {
  atomicity: best-effort
  errors: collect-all

  returns {
    200: {
      created: Invoice[]
      errors: { index: int, error: ValidationError }[]
    }

    413: PayloadTooLargeError
      when items.length > 100
  }

  # Partial success is not 4xx
  partialSuccess: 200 with errors array
}
```

---

### 5. Caching Semantics

OAS cannot express caching behavior beyond basic headers.

```oal
caching {
  # Cache-Control directives
  default: private, max-age=60

  # Conditional requests
  etag {
    algorithm: strong | weak
    granularity: resource | collection
  }

  # Cache invalidation
  invalidation {
    on Invoice.update: invalidate GET /invoices/{id}
    on Invoice.create: invalidate GET /invoices
    on Invoice.delete: invalidate [
      GET /invoices/{id},
      GET /invoices,
      GET /customers/{customerId}/invoices
    ]
  }

  # Stale-while-revalidate
  staleWhileRevalidate: 30s

  # Vary headers
  vary: [Accept, Accept-Language, Authorization]
}

## Get Invoice

```http
GET /invoices/{id}
```

cache {
  strategy: etag
  maxAge: 5m
  private: true "Response varies by user"

  # Cache key composition
  key: [invoiceId, Accept, Authorization.userId]

  # When cache is bypassed
  bypass: when header "Cache-Control: no-cache"
}
```

---

### 6. Content Negotiation

Beyond Accept headers, real negotiation is complex.

```oal
contentNegotiation {
  # Response formats
  produces {
    "application/json": default, weight=1.0
    "application/xml": weight=0.9
    "text/csv": for [GET /reports/*], weight=0.5
    "application/pdf": for [GET /invoices/{id}], weight=0.8
  }

  # Request formats
  consumes {
    "application/json": default
    "multipart/form-data": for uploads
    "application/x-www-form-urlencoded": legacy
  }

  # Language negotiation
  languages {
    supported: [en, fr, de, es, ja]
    default: en
    affects: [error.message, documentation, enum.displayName]
  }

  # Charset
  charset: utf-8 only

  # 406 behavior
  unsupported: return 406 with supported alternatives
}
```

---

### 7. Sparse Fieldsets / Field Selection

GraphQL-like field selection for REST.

```oal
fieldSelection {
  # Query parameter for field selection
  param: "fields"

  # Syntax
  syntax: comma-separated | json-path | graphql-like

  # Examples
  examples {
    "fields=id,name,email"
    "fields=id,address(city,zip)"
    "fields=*,-password"  # All except password
  }
}

## Get User

```http
GET /users/{id}
```

query {
  fields?: string "Comma-separated field names"

  # Allowed fields (security boundary)
  selectable: [id, name, email, createdAt, address, orders]

  # Never selectable (security)
  forbidden: [passwordHash, internalNotes, ssn]

  # Always included (required for client)
  required: [id]

  # Default if not specified
  default: [id, name, email]
}

returns User {
  # Sparse response handling
  sparse: true "Response may omit fields based on selection"
}
```

---

### 8. Full-Text Search

OAS can't express search semantics at all.

```oal
search {
  # Search endpoint
  endpoint: GET /search

  # Query syntax
  syntax: simple | lucene | elasticsearch

  # Searchable fields with weights
  fields {
    title: weight=2.0, analyzed
    description: weight=1.0, analyzed
    tags: weight=1.5, exact
    content: weight=0.5, analyzed, highlightable
  }

  # Analyzers
  analyzers {
    default: standard
    content: {
      tokenizer: whitespace
      filters: [lowercase, stemmer, stop_words]
    }
  }

  # Facets
  facets {
    category: terms, size=10
    price: range, buckets=[0-100, 100-500, 500+]
    date: date_histogram, interval=month
  }

  # Relevance
  scoring: bm25 | tfidf | custom

  # Suggestions
  suggestions {
    didYouMean: true
    autocomplete: true, minChars=2
  }
}

## Search Products

```http
GET /products/search
```

query {
  q: string "Search query"
  facets?: string[] "Facets to include in response"
  highlight?: boolean = true "Highlight matches"
}

returns {
  results: Product[] {
    @highlight: true "Matching text highlighted"
    @score: number "Relevance score"
  }
  facets: Facets
  suggestions?: string[]
  total: int
}
```

---

### 9. File Upload/Download Semantics

OAS has limited file handling.

```oal
files {
  upload {
    # Upload styles
    style: multipart | direct | resumable | chunked

    # Size limits
    maxSize: 100MB

    # Resumable uploads (tus protocol)
    resumable {
      protocol: tus | custom
      chunkSize: 5MB
      expiration: 24h
    }

    # Virus scanning
    scanning: async, webhookOnComplete

    # Processing pipeline
    processing {
      images: [thumbnail, resize, optimize]
      documents: [ocr, extract-text]
    }
  }

  download {
    # Range request support
    rangeRequests: true

    # Content-Disposition
    disposition: inline | attachment

    # Signed URLs
    signedUrls {
      ttl: 1h
      singleUse: false
    }

    # Streaming
    streaming: true
  }
}

## Upload Document

```http
POST /documents
Content-Type: multipart/form-data
```

body {
  file: binary @maxSize(100MB) @mimeTypes([pdf, docx, xlsx])
  metadata?: DocumentMetadata
}

upload {
  style: resumable

  returns {
    # Initial response for resumable
    201: { uploadId: uuid, uploadUrl: uri }
      when style == resumable

    # Direct upload response
    201: Document
      when style == direct

    # Progress webhook
    processing: async {
      webhook: document.processed
      poll: GET /documents/{id}/status
    }
  }
}
```

---

### 10. Real-Time / Streaming

Beyond webhooks, real-time patterns.

```oal
realtime {
  # Transport options
  transports {
    websocket: /ws
    sse: /events
    longPoll: /poll
  }

  # Channels/topics
  channels {
    "invoices.{invoiceId}": {
      subscribe: requires scope invoices.read
      events: [invoice.updated, invoice.paid]
    }

    "user.{userId}.notifications": {
      subscribe: requires userId == currentUser.id
      events: [notification.*]
    }
  }

  # Connection lifecycle
  connection {
    heartbeat: 30s
    reconnect: exponential(1s, 30s)
    sessionRecovery: 5m "Replay missed events on reconnect"
  }

  # Backpressure
  backpressure {
    strategy: drop-oldest | buffer(1000) | slow-consumer-disconnect
  }
}

## Subscribe to Invoice Updates

```ws
WS /invoices/{invoiceId}/stream
```

messages {
  # Server -> Client
  server: InvoiceEvent {
    type: "update" | "status_change" | "payment"
    data: Invoice
    timestamp: datetime
  }

  # Client -> Server
  client: {
    ping: { type: "ping" }
    ack: { type: "ack", eventId: uuid }
  }
}

delivery: at-least-once with ack
```

---

### 11. Error Taxonomy

Beyond HTTP status codes, structured error semantics.

```oal
errors {
  # Base error structure
  structure {
    type: uri "Error type identifier"
    title: string "Human-readable summary"
    status: int "HTTP status code"
    detail?: string "Human-readable explanation"
    instance?: uri "URI identifying this occurrence"

    # RFC 7807 Problem Details
    format: rfc7807
  }

  # Error hierarchy
  taxonomy {
    ClientError (4xx) {
      ValidationError (400) {
        InvalidFormat
        MissingField
        InvalidValue
        CrossFieldConstraint
      }
      AuthenticationError (401) {
        TokenExpired
        TokenInvalid
        TokenMissing
      }
      AuthorizationError (403) {
        InsufficientScope
        ResourceForbidden
        ActionForbidden
      }
      NotFoundError (404) {
        ResourceNotFound
        EndpointNotFound
      }
      ConflictError (409) {
        DuplicateResource
        InvalidStateTransition
        ConcurrencyConflict
      }
      RateLimitError (429) {
        TooManyRequests
        QuotaExceeded
      }
    }

    ServerError (5xx) {
      InternalError (500)
      NotImplemented (501)
      ServiceUnavailable (503) {
        Maintenance
        Overloaded
        DependencyFailure
      }
    }
  }

  # Error behaviors
  behaviors {
    retryable: [429, 500, 502, 503, 504]
    retryAfter: header "Retry-After" for [429, 503]

    # Correlation
    tracing: header "X-Request-Id" in all errors
  }
}
```

---

### 12. Transactions & Sagas

Multi-step operations that need rollback.

```oal
saga CreateOrderSaga {
  description: "Create order with payment and inventory reservation"

  steps {
    1. reserveInventory {
      action: POST /inventory/reserve
      compensate: POST /inventory/release
      timeout: 5s
    }

    2. chargePayment {
      action: POST /payments/charge
      compensate: POST /payments/refund
      timeout: 30s
      retries: 3
    }

    3. createOrder {
      action: POST /orders
      compensate: DELETE /orders/{orderId}
      timeout: 5s
    }

    4. sendConfirmation {
      action: POST /notifications/send
      compensate: none "Best effort, no rollback"
      optional: true
    }
  }

  rollback {
    order: reverse "Execute compensations in reverse order"
    timeout: 60s
    onFailure: manual-intervention
  }

  # Saga state visibility
  status: GET /sagas/{sagaId} {
    returns {
      state: "pending" | "completed" | "compensating" | "failed"
      completedSteps: Step[]
      currentStep?: Step
      errors?: Error[]
    }
  }
}
```

---

### 13. Computed Fields & Derived Data

How fields are calculated.

```oal
type Invoice {
  lineItems: LineItem[]
  taxRate: decimal
  discount?: decimal

  # Computed fields
  subtotal: decimal = sum(lineItems.amount)
    @readonly
    @computed
    "Sum of all line item amounts"

  taxAmount: decimal = subtotal * taxRate
    @readonly
    @computed

  total: decimal = subtotal + taxAmount - (discount ?? 0)
    @readonly
    @computed
    @precision(2)

  # Conditional computed
  status: InvoiceStatus =
    if paidAt then "Paid"
    else if dueDate < now() then "Overdue"
    else if sentAt then "Sent"
    else "Draft"
    @computed

  # Aggregated from related resources
  paymentCount: int = count(payments where invoiceId == this.id)
    @computed
    @lazy "Not included by default, use ?include=paymentCount"
}
```

---

### 14. Multi-Tenancy

How tenant isolation works.

```oal
multiTenancy {
  # Tenant identification
  identification {
    strategy: subdomain | header | path | jwt-claim

    subdomain: "{tenant}.api.example.com"
    header: "X-Tenant-Id"
    path: "/tenants/{tenantId}/..."
    claim: "tenant_id"
  }

  # Isolation level
  isolation {
    data: schema | row | database
    compute: shared | dedicated
  }

  # Cross-tenant behavior
  crossTenant {
    allowed: false
    exceptions: [
      GET /admin/tenants  # Super-admin only
    ]
  }

  # Tenant context propagation
  context {
    required: true
    anonymous: allowed for [GET /public/*]
  }
}

## Create Invoice

```http
POST /invoices
```

tenancy {
  # Automatically scoped to current tenant
  scope: currentTenant

  # Cannot create for other tenants
  constraint: invoice.tenantId == currentTenant.id
}
```

---

### 15. Audit & Compliance

What gets logged and tracked.

```oal
audit {
  # What to audit
  scope: all | writes-only | sensitive

  # Audit record structure
  record {
    timestamp: datetime
    actor: { userId, ip, userAgent }
    action: string
    resource: { type, id }
    changes: { before, after }
    outcome: success | failure
    requestId: uuid
  }

  # Sensitive field handling
  sensitive {
    mask: [ssn, creditCard, password]
    omit: [passwordHash]
    hash: [email]  # For searchability without exposure
  }

  # Retention
  retention {
    default: 7 years
    pii: 3 years then anonymize
    security: 10 years
  }

  # Access to audit logs
  access: requires scope audit.read
}

## Update User

```http
PATCH /users/{id}
```

audit {
  action: "user.update"

  # What to capture
  capture: [before, after, diff]

  # Sensitive field handling in audit
  mask: [ssn]

  # Who can see this audit entry
  visibility: admin | compliance | self
}
```

---

### 16. SLA / SLO Definitions

Performance guarantees.

```oal
sla {
  # Availability
  availability: 99.9% "Three nines"

  # Latency targets
  latency {
    p50: 100ms
    p95: 500ms
    p99: 1s
    max: 30s "Request timeout"
  }

  # Error budget
  errorBudget {
    monthly: 0.1%
    alertAt: 50% consumed
  }

  # Per-endpoint SLOs
  endpoints {
    "GET /health": {
      latency: { p99: 50ms }
      availability: 99.99%
    }

    "POST /reports/generate": {
      latency: { p99: 60s }  # Long-running
      availability: 99%
    }
  }

  # Degradation behavior
  degradation {
    strategy: shed-load | reduce-features

    reducedMode {
      disable: [search, recommendations, analytics]
      message: "Operating in reduced capacity mode"
    }
  }
}
```

---

### 17. Feature Flags & Experiments

Conditional API behavior.

```oal
features {
  # Feature definitions
  flags {
    newCheckoutFlow: {
      description: "New streamlined checkout"
      rollout: 50%  # A/B test
      segments: [beta-users, enterprise]
      default: false
    }

    enhancedSearch: {
      description: "AI-powered search"
      status: beta
      requires: header "X-Enable-Beta: true"
    }
  }

  # Per-endpoint features
  endpoint /checkout {
    features {
      if newCheckoutFlow: use NewCheckoutHandler
      else: use LegacyCheckoutHandler
    }

    # Response varies by feature
    returns {
      201: CheckoutResultV2 when feature(newCheckoutFlow)
      201: CheckoutResultV1 when !feature(newCheckoutFlow)
    }
  }
}
```

---

### 18. SDK Generation Hints

Metadata for better client generation.

```oal
sdkHints {
  # Naming overrides
  naming {
    operationId: snake_case | camelCase | PascalCase
    parameters: camelCase
    models: PascalCase
  }

  # Grouping
  groups {
    "Invoices": [createInvoice, getInvoice, listInvoices, updateInvoice]
    "Payments": [chargePayment, refundPayment, getPayment]
  }

  # Method names (override operationId)
  methods {
    "list-invoices": invoices.list()
    "create-invoice": invoices.create()
    "get-invoice": invoices.get(id)
  }

  # Fluent builder patterns
  builders {
    Invoice: {
      chainable: [withCustomer, withLineItems, withDueDate]
      terminal: [create, send]
    }
  }

  # Async patterns
  async {
    style: promises | async-await | callbacks
    pagination: async-iterator
  }

  # Error handling
  errors {
    style: exceptions | result-types | error-codes
    typed: true "Generate typed error classes"
  }
}

## Create Invoice

```http
POST /invoices
```

sdk {
  # Method signature hint
  signature: createInvoice(customer: Customer, lineItems: LineItem[], options?: InvoiceOptions)

  # Return type hint
  returns: Promise<Invoice>

  # Example usage
  example: |
    const invoice = await client.invoices.create({
      customer: customerId,
      lineItems: [{ product: "widget", quantity: 2 }]
    });
}
```

---

### 19. Cost & Quotas

Resource consumption tracking.

```oal
quotas {
  # Quota dimensions
  dimensions {
    requests: per-minute, per-day
    storage: bytes, per-account
    compute: cpu-seconds, per-request
    egress: bytes, per-month
  }

  # Quota tiers
  tiers {
    free: {
      requests: 1000/day
      storage: 100MB
    }
    pro: {
      requests: 100000/day
      storage: 10GB
    }
    enterprise: {
      requests: unlimited
      storage: unlimited
    }
  }

  # Quota response headers
  headers {
    X-Quota-Limit: tier.limit
    X-Quota-Remaining: remaining
    X-Quota-Reset: reset timestamp
  }

  # Overage behavior
  overage {
    strategy: hard-limit | soft-limit | pay-as-you-go
    gracePeriod: 24h for soft-limit
  }
}

## Generate Report

```http
POST /reports
```

cost {
  # Cost estimation
  estimate: compute(rows * 0.001 + bytes * 0.0001)

  # Cost headers
  headers {
    X-Cost-Estimate: before execution
    X-Cost-Actual: after execution
  }

  # Confirmation for expensive operations
  confirm: when estimate > 1000 units

  returns {
    402: QuotaExceededError
      when !hasQuota(compute, estimate)
  }
}
```

---

### 20. Dependency & Health Semantics

Beyond simple health checks.

```oal
health {
  # Health check endpoint
  endpoint: GET /health

  # Component health
  components {
    database: {
      check: SELECT 1
      timeout: 5s
      critical: true "Failure makes API unhealthy"
    }

    cache: {
      check: PING
      timeout: 1s
      critical: false "Degraded but operational"
    }

    paymentProvider: {
      check: GET /status
      timeout: 10s
      critical: false
    }
  }

  # Aggregate status
  status {
    healthy: all critical components healthy
    degraded: some non-critical components unhealthy
    unhealthy: any critical component unhealthy
  }

  # Response
  response {
    200: when healthy
    503: when unhealthy

    body: {
      status: "healthy" | "degraded" | "unhealthy"
      components: { name: { status, latency?, error? } }
      version: string
      uptime: duration
    }
  }

  # Dependency graph
  dependencies {
    /invoices: [database, cache]
    /payments: [database, paymentProvider]
    /reports: [database, cache, analytics-service]
  }
}
```

---

## Summary: The Complete OMG Behavioral Vocabulary

| Category | OAS Coverage | OMG Extension |
|----------|-------------|---------------|
| **State & Lifecycle** | Enums only | State machines, transitions, allowed operations |
| **Causality** | None | Cross-endpoint effects, side effects |
| **Conditional Responses** | None | When conditions for each status code |
| **Temporal** | None | Consistency, async, rate limits, retry |
| **Events** | Basic webhooks | Triggers, delivery, ordering, sequences |
| **Invariants** | None | Cross-resource constraints |
| **Auth** | Security schemes | Scope behavior, token lifecycle, permission-based responses |
| **Relationships** | None | References, resolution, expansion |
| **Versioning** | Version number | Strategy, compatibility, migration |
| **Pagination** | None | Strategy, consistency, cursor encoding |
| **Filtering** | None | Query DSL, operators, field access |
| **Bulk Ops** | None | Atomicity, error handling, ordering |
| **Caching** | None | ETags, invalidation, stale-while-revalidate |
| **Content Neg** | Partial | Full negotiation, language, charset |
| **Field Selection** | None | Sparse fieldsets, security boundaries |
| **Search** | None | Full-text, facets, relevance, suggestions |
| **Files** | Partial | Resumable, processing, signed URLs |
| **Real-time** | None | WebSocket, SSE, channels, backpressure |
| **Errors** | Status codes | Taxonomy, retryability, correlation |
| **Transactions** | None | Sagas, compensation, rollback |
| **Computed** | None | Derived fields, formulas, lazy evaluation |
| **Multi-tenancy** | None | Isolation, identification, scoping |
| **Audit** | None | Logging, masking, retention |
| **SLA/SLO** | None | Latency, availability, degradation |
| **Features** | None | Flags, experiments, rollouts |
| **SDK Hints** | operationId | Naming, grouping, builders, async patterns |
| **Quotas** | None | Limits, tiers, cost estimation |
| **Health** | None | Components, dependencies, degradation |

---

## Implementation Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Conditional Responses | High | Low | P0 |
| Pagination | High | Low | P0 |
| Error Taxonomy | High | Low | P0 |
| State Machines | High | Medium | P1 |
| Filtering DSL | High | Medium | P1 |
| SDK Hints | Medium | Low | P1 |
| Bulk Operations | Medium | Low | P1 |
| Caching | Medium | Low | P2 |
| File Handling | Medium | Medium | P2 |
| Real-time | Medium | High | P2 |
| Versioning | Medium | Medium | P2 |
| Search | Low | High | P3 |
| Transactions/Sagas | Low | High | P3 |
| Multi-tenancy | Low | Medium | P3 |
| SLA/SLO | Low | Low | P3 |

---

## The Core Insight

OpenAPI is a **structural schema** - it describes data shapes.

OMG Behaviors creates a **behavioral specification** - it describes how the API works.

The fundamental question: **What would a developer need to know to build a perfect mock, generate a smart SDK, or write comprehensive tests?**

Everything in this document answers that question.
