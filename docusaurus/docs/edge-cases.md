---
sidebar_position: 8
description: How OMG handles webhooks, callbacks, streaming, and binary file upload/download — what works today and what is planned.
---

# Edge cases

OpenAPI supports several patterns beyond plain JSON request/response bodies.
This page documents how OMG handles each one **today**, so you know what to
expect when compiling to OpenAPI 3.1.

| Pattern | Status |
| --- | --- |
| Webhooks | ✅ Supported (as relationship metadata) |
| Binary file download | ✅ Supported |
| Binary file upload | ✅ Supported |
| Callbacks | 🚧 Not yet supported |
| Streaming / server-sent events | 🚧 Not yet supported |
| `multipart/form-data` | 🚧 Not yet supported |

## Webhooks

OMG models webhooks as **relationships between endpoints** rather than as a
separate top-level construct. An endpoint declares which webhooks it triggers
and which it listens for via the `webhooks` frontmatter key:

```yaml
---
method: POST
path: /companies/{companyId}/sync
operationId: start-sync
webhooks:
  resulting:
    - SyncCompleted
    - SyncFailed
  listen:
    - SyncProgress
---
```

- `webhooks.resulting` — webhooks fired as a result of calling this endpoint.
- `webhooks.listen` — webhooks this endpoint subscribes to for progress updates.

On compile these become the vendor extensions `x-webhooks-resulting` and
`x-webhooks-listen` on the operation. The webhook *payload* itself is modelled
as an ordinary endpoint — define the receiver as a `POST` endpoint whose
request body is the event schema. See the `payments-api` example for a
complete setup.

> OMG does not currently emit OpenAPI 3.1's native top-level `webhooks` object.

## Binary file download

A response whose body is a raw file is declared as a `string` annotated with
`@format("binary")`:

```omg.response
string @format("binary")
```

The compiler emits this under the `application/octet-stream` media type:

```yaml
responses:
  "200":
    description: Success
    content:
      application/octet-stream:
        schema:
          type: string
          format: binary
```

A plain `string` body (no `@format("binary")`) stays `application/json`.

> Response headers such as `Content-Disposition` cannot yet be declared in an
> `omg.response` block.

## Binary file upload

The same rule applies to request bodies. An `omg.body` block whose schema is a
binary string compiles to an `application/octet-stream` request body:

```omg.body
string @format("binary")
```

```yaml
requestBody:
  required: true
  content:
    application/octet-stream:
      schema:
        type: string
        format: binary
```

This covers raw binary uploads. Multi-part uploads (a file plus metadata
fields) are **not** yet supported — see below.

## Not yet supported

The following OpenAPI patterns have no OMG syntax yet. Each is tracked by its
own issue:

- **Callbacks**
  ([#103](https://github.com/mcclowes/omg/issues/103)) — OpenAPI's `callbacks`
  object (out-of-band requests the API makes back to the caller). OMG has no
  syntax for it; the importer passes callbacks through when reading existing
  specs but cannot author them.
- **Streaming / server-sent events**
  ([#104](https://github.com/mcclowes/omg/issues/104)) — `text/event-stream`
  responses and chunked transfer. The compiler currently emits every
  non-binary body as `application/json`; there is no way to declare an
  alternative media type.
- **`multipart/form-data`**
  ([#105](https://github.com/mcclowes/omg/issues/105)) — a request body mixing
  a file part with regular form fields. Raw single-payload binary upload works
  (above), but multi-part bodies need a media-type-per-field construct that OMG
  does not have.

If you need one of these, follow or open an issue on
[GitHub](https://github.com/mcclowes/omg/issues).
