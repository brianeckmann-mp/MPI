# MaxPreps AI Showcase

Static prototype for the MaxPreps AI design showcase.

## Local preview

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000`.

## GitHub Pages deployment

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

1. Create a GitHub repo.
2. Push this project to the `main` branch.
3. In GitHub, enable Pages with:
   - Source: `GitHub Actions`
4. Every push to `main` will redeploy the site.
