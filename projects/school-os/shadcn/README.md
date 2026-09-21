# School OS — shadcn rebuild

A standalone React/Vite recreation of the School OS prototype. It preserves the dashboard layout and representative interactions while replacing the original exported single-file implementation with maintainable React components and shadcn-style UI primitives.

## Run locally

```bash
npm install
npm run dev
```

The development server is configured for `http://localhost:5273/`.

The GitHub Pages build publishes this implementation at `/MPI/projects/school-os/shadcn/`, with the landing and login entries nested beneath it.

## Included interactions

- Navigate all school and administration sections
- Search and filter operational tables
- Switch schools and seasons
- Create events and see them appear in the schedule rail
- Expand schedule details and clear event holds
- Open actions and record feedback through toasts
- Switch light/dark appearance in Settings or the user menu
- Responsive mobile navigation
