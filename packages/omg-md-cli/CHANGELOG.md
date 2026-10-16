# omg-md-cli

## 0.5.1

### Patch Changes

- 33b8a93: Report the installed CLI package version with `omg --version` and `omg -V` instead of a fixed value. Version lookup works independently of the current working directory.
- 2f484a8: Restore `omg mock --watch` with Chokidar 5. Changes, additions, and removals of `.omg.md` files under the API directory now restart the server; hidden paths and other file types are ignored. Shutdown closes the watcher and cancels pending restarts.

  Mock shutdown also drains keep-alive connections on Node 18 without interrupting active responses. Concurrent and repeated stop calls complete safely, and queued file edits do not start overlapping restarts.
  - omg-parser@0.5.1
  - omg-compiler@0.5.1
