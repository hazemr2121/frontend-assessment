# Frontend Code Review

## 1. Activity Feed: unnecessary derived state and timer-driven rendering

**Category:** Performance, maintainability, React best practices

**What was wrong:** The Activity Feed kept three versions of the activity list (`allActivity`, `shownActivity`, and `forcedList`), updated them through several effects, and ran a timer every 1.4 seconds. It also applied the same search filter twice and formatted every timestamp twice.

**Why it matters:** The timer triggered continuous renders without a user-facing purpose, while storing derived lists as state created multiple sources of truth. This made the component harder to follow and added needless work for every search and timer update.

**Improvement made:** The page now stores only the fetched activity and search query. The visible list and summary counts are derived with `useMemo`; a single named filter and time-format helper replace the duplicated functions. The unused timer and state-synchronization effects have been removed.

## 2. Next.js version below the security patch level

**Category:** Security

**What was wrong:** The frontend depended on `next@14.2.5`. This release is affected by App Router security advisories and its own package metadata warns that it contains a security vulnerability.

**Why it matters:** The application uses the App Router, so an outdated framework can expose deployed instances to known framework-level vulnerabilities even if the application code is otherwise correct.

**Improvement made:** Next.js has been upgraded to `14.2.35`, the patched release in the existing 14.x line.

## 3. Activity Feed: missing request and empty-state feedback

**Category:** UX, React best practices

**What was wrong:** The Activity Feed treated failed requests as an empty array and rendered the list before the request had completed. It did not check non-success HTTP responses, offer a retry action, or explain when a search returned no matches.

**Why it matters:** Users could not distinguish a loading or failed request from genuinely empty activity. This makes transient network failures look like data loss and leaves users without a way to recover.

**Improvement made:** The page now checks HTTP responses, exposes explicit loading and error states, provides a retry action, and distinguishes between an empty feed and an empty search result.

## 4. duplicate code across the app

**Category:** Code Quality, Maintainability, React Best Practices

**What was wrong:** So much code is duplicate.

**Why it matters:** Any styling change has to be made in all places instead of one and duplicated markup increases file size and cognitive load, making the component harder to scan and review.

**Improvement made:** Extracted the repeated markup into a single shared component.
