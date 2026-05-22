---
sidebar_position: 9
description: The formal PEG grammar for the OMG language — a self-describing specification derived from the reference parser.
---

# Formal grammar

OMG ships a formal grammar at
[`grammar/omg.peg`](https://github.com/mcclowes/omg/blob/main/grammar/omg.peg).
It is written in [Peggy](https://peggyjs.org) PEG syntax and is the formal
counterpart to the hand-written parser in `packages/omg-parser` — derived
directly from it, so the language is self-describing rather than defined only
by an implementation.

The hand-written parser remains authoritative. Where the grammar and prose
documentation disagree, the grammar (and the parser it mirrors) wins.

## Two layers

The grammar specifies OMG in two layers:

1. **Document layer** — a `.omg.md` file: YAML frontmatter, Markdown prose,
   fenced code blocks, and partial references. Markdown prose itself follows
   CommonMark; the grammar formalises only the OMG-specific structure.
2. **Schema layer** — the type-expression language inside `omg.*` code blocks:
   objects, arrays, unions, intersections, enums, references, primitives, and
   annotations.

## Entry points

The grammar exposes three start rules:

| Rule | Parses |
| --- | --- |
| `Document` | A complete `.omg.md` file |
| `Schema` | A type expression (the body of an `omg.body`, `omg.response.*`, `omg.type`, … block) |
| `ReturnsBlock` | The body of an `omg.returns` block |

## Generating a parser

The grammar is executable. To generate a parser from it:

```bash
npx peggy --allowed-start-rules Document,Schema,ReturnsBlock grammar/omg.peg
```

This is useful for building alternative tooling — a Tree-sitter port, an
editor extension, or an independent syntax checker — without reimplementing the
language from prose.

## Schema operator precedence

Inside the schema layer, operators bind from loosest to tightest:

1. **Union** — `A | B` (a `| null` term marks the type nullable)
2. **Intersection** — `A & B`
3. **Postfix** — `[]`, `?`, `@annotation`
4. **Primary** — primitive / reference / object / array / parenthesised type

A string-literal enum (`"a" | "b" | "c"`) is recognised as a primary type, not
as a union.

## Known divergences

The grammar file documents where the language and the legacy `SYNTAX.md`
diverge — most notably that `= value` default syntax is **not** implemented
(defaults use the `@default(...)` annotation), and that the older
`body { ... }` / `returns Account` style is superseded by the `.omg.md`
document format. See the comment block at the end of `grammar/omg.peg`.
