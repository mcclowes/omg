---
sidebar_position: 10
description: Use the reusable OMG GitHub Action to build, lint, and check OMG specs in CI/CD.
---

# GitHub Action

OMG ships a reusable [composite GitHub Action](https://github.com/mcclowes/omg/blob/main/action.yml)
so you can validate, build, and check OMG specs in CI without scripting the CLI
yourself.

```yaml
- uses: mcclowes/omg@v1
  with:
    command: build
    input: api/api.omg.md
    output: openapi.yaml
```

## Inputs

| Input | Default | Description |
| --- | --- | --- |
| `command` | `build` | Command to run: `build`, `lint`, `breaking`, or `changelog` |
| `input` | _(required)_ | Path to the OMG spec (`api.omg.md`) or project directory |
| `base` | `''` | Baseline spec to compare against — required for `breaking` and `changelog` |
| `output` | `''` | Output file path — used by `build` and `changelog` |
| `format` | `yaml` | Output format for `build`: `yaml` or `json` |
| `fail-on-breaking` | `true` | For `breaking`: fail the job when breaking changes are found |
| `cli-version` | `latest` | npm dist-tag or version of `omg-md-cli` to use |
| `node-version` | `20` | Node.js version to set up |
| `working-directory` | `.` | Directory to run the command in |

The action sets up Node.js and runs `omg-md-cli` via `npx`. For the `breaking`
and `changelog` commands it also installs
[oasdiff](https://github.com/oasdiff/oasdiff) automatically.

## Examples

### Lint and build

```yaml
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: mcclowes/omg@v1
        with:
          command: lint
          input: api
      - uses: mcclowes/omg@v1
        with:
          command: build
          input: api/api.omg.md
          output: openapi.yaml
```

### Fail a pull request on breaking changes

Check out both the PR and the base branch, then compare them:

```yaml
jobs:
  breaking-changes:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          path: head
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.base.ref }}
          path: base
      - uses: mcclowes/omg@v1
        with:
          command: breaking
          base: base/api/api.omg.md
          input: head/api/api.omg.md
```

A complete, ready-to-copy workflow lives at
[`examples/github-workflow.yml`](https://github.com/mcclowes/omg/blob/main/examples/github-workflow.yml).

## Pinning

`mcclowes/omg@v1` tracks the latest `v1.x` release. Pin to an exact tag
(`mcclowes/omg@v1.2.3`) or a commit SHA for fully reproducible builds, and use
the `cli-version` input to pin the `omg-md-cli` version independently.
