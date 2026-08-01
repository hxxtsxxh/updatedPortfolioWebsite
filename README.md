# Heet Shah Portfolio

This repository hosts the static site for [heettshahh.com](https://heettshahh.com).

## Editing the site

- The deployable site lives in `site/`.
- Update files in `site/` when making content or visual changes.
- Keep asset paths relative to the `site/` directory because Netlify publishes that directory as the site root.

## Deployment

Netlify publishes `site/` whenever changes are pushed to the `main` branch. The deployment configuration is in `netlify.toml` and intentionally has no build command.

## Local preview

From the repository root, run:

```bash
python3 -m http.server 3000 --directory site
```

Then open `http://localhost:3000`.
