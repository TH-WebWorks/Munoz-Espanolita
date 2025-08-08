# Muñoz Españolita — Static Website

A fast, mobile‑optimized static website for the restaurant "Muñoz Españolita", ready to deploy on GitHub Pages.

## Structure

- `index.html`: Main site (About, Menu, Gallery, Visit, Contact)
- `styles.css`: Global styles with responsive layout
- `script.js`: Mobile navigation and smooth scrolling
- `404.html`: Friendly not‑found page for GitHub Pages
- `.nojekyll`: Disables Jekyll processing on GitHub Pages
- `assets/favicon.svg`: Vector favicon

## Local Preview

You can open `index.html` directly in a browser, or serve locally:

```bash
# Using Python 3
python -m http.server 5173
# then visit http://localhost:5173
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In your GitHub repository, go to Settings → Pages.
3. Under "Build and deployment", set:
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`), folder: `/ (root)`
4. Save. Your site will be live at the URL shown by GitHub Pages.

Notes:
- `.nojekyll` is included to prevent Jekyll from interfering with static assets.
- Use relative paths so the site works for both user and project pages.

## Customize

- Update address, phone, hours, social links inside `index.html`.
- Replace gallery images or add your own to a folder (e.g., `assets/`) and update the `src` attributes accordingly.
- Adjust colors and spacing via CSS variables in `styles.css`.

## License

MIT