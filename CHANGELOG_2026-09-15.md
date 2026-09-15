# DLZLAB Timing — Changes Log (2026-09-15)

## Commits

| Hash | Message | Files |
|------|---------|-------|
| `c5a2b2e` | Fix habit/task day chips click handler, add delete buttons | `js/ui.js`, `js/habits.js`, `css/habits.css` |
| `c82bea2` | Add keyboard shortcuts D/T/C/P/I/H/G/A/S for navigation | `js/app.js`, `css/layout.css` |
| `0ae6f83` | Fix timetable shortcut: use W instead of I | `js/app.js` |
| `af2757d` | Bump service worker cache to v2 | `service-worker.js` |
| `fa7f48d` | Add GitHub Actions workflow to deploy timetable/ to GitHub Pages | `.github/workflows/pages.yml` |
| `12e9c34` | Remove GitHub Actions workflow (using gh-pages branch instead) | `.github/workflows/pages.yml` |
| `d788932` | gh-pages branch: DLZLAB Timing PWA | `gh-pages` branch |

## Bug Fixes

1. **Habit/Task delete not working** — No delete button existed anywhere. Added trash icon on each habit row + Delete button in edit modal. Added `delete-habit` action with confirmation dialog.
2. **Task day chips not responding to clicks** — `#fRecDays` buttons had no click event listener. `weekdays` was always empty. Added `toggle('on')` click handler.
3. **Service worker caching old CSS** — Cache name `dlz-timing-v1` → `dlz-timing-v2` to force fresh CSS on deploy.
4. **Timetable shortcut `I` not working** — Changed to `W` (browser/system conflict).

## New Features

1. **Keyboard shortcuts added** — `D` Dashboard, `T` Today, `C` Calendar, `W` Timetable, `P` Schedule, `H` Habits, `G` Goals, `A` Statistics, `S` Settings, `N` Quick add task, `/` Search
2. **Shortcut badges on nav items** — Each nav item now shows a `K` shortcut badge, visible on hover/active
3. **Delete buttons on habits** — Trash icon appears on hover in habit grid; Delete button in edit modal
4. **GitHub Pages deployment** — Created `gh-pages` branch for deployment

## File Changes Summary

### `js/ui.js`
- Added `#fRecDays` click handler (toggle `on` class) in task modal
- Added Delete button to `habitModal` footer when editing
- Added `UI.confirm` integration for delete confirmation

### `js/habits.js`
- Added trash icon delete button (`<button class="hm-delete">`) to each habit row
- Added `'delete-habit'` action with `UI.confirm` + `State.remove('habits', h.id)`

### `js/app.js`
- Added `shortcut: 'X'` to NAV array entries for D/T/C/W/P/H/G/A/S
- Added `n-shortcut` badge HTML in `buildNav()`
- Added keyboard shortcuts: `s`, `g`, `a`, `p`, `w`, `d`
- Added `.n-shortcut` CSS styling

### `css/habits.css`
- Added `.hm-delete` button styling (hidden on hover, visible on touch)
- Added `@media(hover:none)` for touch device visibility
- Added `.n-shortcut` badge styling in `layout.css`

### `css/layout.css`
- Added `.nav-item .n-shortcut` and `.nav-item.on .n-shortcut` styles

### `service-worker.js`
- Changed `CACHE_NAME` from `'dlz-timing-v1'` to `'dlz-timing-v2'`

### `gh-pages` branch
- Created from `timetable/` subdirectory subtree split
- Contains all PWA files at root: `index.html`, `css/`, `js/`, `pwa/`, `service-worker.js`, `favicon.svg`, `.gitignore`

## Deployment Notes

- GitHub Pages source needs to be set to `gh-pages` branch in Settings → Pages
- Service worker cache v2 will force fresh CSS on first visit after deploy
- Root `index.html` (old site) is still in master branch but not served by GitHub Pages when `gh-pages` branch is selected

## GitHub Repo

- `https://github.com/DLZLAB/DLZLAB.github.io.git`
- Branches: `master` (source), `gh-pages` (deployment)
