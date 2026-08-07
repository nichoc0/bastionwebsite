# bastionwebsite

The Bastion marketing site — [trybastion.ai](https://trybastion.ai).

Astro 5, hand-written CSS, TypeScript. No UI framework, no CSS framework, no
dependencies beyond Astro and one self-hosted font. See `CLAUDE.md` for the
positioning, hard rules, and performance budget before changing copy or structure.

## Develop

```bash
npm install
npm run dev       # localhost:4321
npm run build     # -> dist/
npm run preview
```

## Deploy

Hosted on Vercel, auto-deployed on push:

- `main` → **trybastion.ai** (production)
- `staging` → **staging.trybastion.ai**

`vercel.json` pins the framework, build command and output directory, so a deploy
does not depend on dashboard settings.
