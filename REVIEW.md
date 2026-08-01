# Frontend Code Review

## 1. Activity Feed: unnecessary derived state and timer-driven rendering

**Category:** Performance, maintainability, React best practices

**What was wrong:** The Activity Feed originally kept multiple versions of the same list in state, updated them through several effects, and ran a timer every 1.4 seconds. It also applied the same search logic more than once and formatted timestamps repeatedly.

**Why it matters:** This added unnecessary renders and created multiple sources of truth, which made the component harder to reason about and maintain.

**Improvement made:** The current implementation keeps only the fetched activity and the search query, derives the visible list and summary values with `useMemo`, and removes the timer-based updates.

## 2. Next.js version below the security patch level

**Category:** Security

**What was wrong:** The frontend depended on an older Next.js release that was below the patched version for known App Router security issues.

**Why it matters:** Using an outdated framework can expose deployments to known vulnerabilities even when the application code itself is otherwise correct.

**Improvement made:** Next.js was upgraded to `14.2.35`.

## 3. Activity Feed: missing request and empty-state feedback

**Category:** UX, React best practices

**What was wrong:** The original experience treated failed requests like empty data and rendered the list before the request finished. It also did not clearly explain when a search returned no results.

**Why it matters:** Users could not distinguish loading, failure, and genuinely empty states, which made the experience feel unreliable.

**Improvement made:** The current UI now exposes explicit loading and error states, supports retry, and clearly distinguishes between an empty feed and an empty search result.

## 4. Repeated layout and styling patterns across the app

**Category:** Code quality, maintainability, React best practices

**What was wrong:** Several parts of the interface reused similar layout and styling patterns in a way that made the code feel repetitive.

**Why it matters:** Repeated structure increases file size and makes future changes slower and more error-prone.

**Improvement made:** Shared UI components were introduced to keep the experience more consistent and reduce duplicated markup.

## 5. Accessibility and clarity opportunities

**Category:** UX, accessibility, maintainability

**What was wrong:** Some controls still rely on minimal visual affordances rather than a fully accessible and explicit experience.

**Why it matters:** Clear labels and stronger visual state cues help users understand the interface more quickly, especially when interacting with filters and actions.

**Improvement made:** The task-filter controls now use clearer visual states, and the UI is more consistent in how it communicates completed versus pending items.
