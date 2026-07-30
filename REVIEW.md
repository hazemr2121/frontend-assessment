# Frontend Code Review

## 1. Activity Feed: unnecessary derived state and timer-driven rendering

**Category:** Performance, maintainability, React best practices

**What was wrong:** The Activity Feed kept three versions of the activity list (`allActivity`, `shownActivity`, and `forcedList`), updated them through several effects, and ran a timer every 1.4 seconds. It also applied the same search filter twice and formatted every timestamp twice.

**Why it matters:** The timer triggered continuous renders without a user-facing purpose, while storing derived lists as state created multiple sources of truth. This made the component harder to follow and added needless work for every search and timer update.

**Improvement made:** The page now stores only the fetched activity and search query. The visible list and summary counts are derived with `useMemo`; a single named filter and time-format helper replace the duplicated functions. The unused timer and state-synchronization effects have been removed.
