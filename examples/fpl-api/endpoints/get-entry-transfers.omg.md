---
method: GET
path: /entry/{entryId}/transfers/
operationId: get-entry-transfers
tags: [Managers]
---

# Get Entry Transfers

Returns all transfers made by a specific manager throughout the season.

```omg.path
{
  entryId: integer  // Manager ID
}
```

```omg.response
[{
  element_in: integer,
  element_in_cost: integer,
  element_out: integer,
  element_out_cost: integer,
  entry: integer,
  event: integer,
  time: datetime
}]
```

```omg.example
[
  {
    "element_in": 351,
    "element_in_cost": 150,
    "element_out": 367,
    "element_out_cost": 85,
    "entry": 1234567,
    "event": 3,
    "time": "2024-08-30T10:15:00Z"
  },
  {
    "element_in": 245,
    "element_in_cost": 60,
    "element_out": 289,
    "element_out_cost": 55,
    "entry": 1234567,
    "event": 4,
    "time": "2024-09-13T18:45:00Z"
  }
]
```

```omg.response.404
{
  detail: string
}
```
