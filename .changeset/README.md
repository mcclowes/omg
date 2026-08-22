# Changesets

Add a changeset to each pull request that changes OMG's published behavior:

```sh
npm run changeset
```

Choose the package that owns the change and the appropriate semantic version bump. The core packages release in lockstep, so Changesets applies the highest selected bump to the whole group. Documentation, tests, refactors, and dependency-only changes don't need a changeset.

Changesets maintains package changelogs and opens the release pull request. Keep the root `CHANGELOG.md` updated as the product-level changelog while this workflow is being trialed.

`omg-vscode` has its own version and release cadence, so it is intentionally excluded.
