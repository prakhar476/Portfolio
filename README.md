# Prakhar Singh — Portfolio (React)

A professional portfolio site built with React + Vite, plain CSS (no
framework), and a hand-rolled Canvas-based 3D sphere — no Three.js or
animation library dependencies.

## Getting Started

```bash
npm install
npm run dev       # starts a local dev server, usually http://localhost:5173
```

Build for production:

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

The `dist/` folder is fully static — deploy it to Vercel, Netlify, GitHub
Pages, S3 + CloudFront, or any static host.

## Project Structure

```
index.html                  Vite entry HTML (loads fonts, mounts #root)
public/
  favicon.svg
src/
  main.jsx                  React root render
  App.jsx                   Composition root — assembles all sections

  components/
    Navbar.jsx / .css        Fixed nav + mobile hamburger menu
    Hero.jsx / .css          Name, typewriter role text, CTA buttons
    Sphere3D.jsx / .css      3D node-sphere canvas (wraps useSphere3D)
    ParticleField.jsx        Background particle canvas (wraps the hook)
    About.jsx / .css         Bio, terminal widget, quick facts
    Skills.jsx / .css        Skill category cards + animated progress bars
    Projects.jsx / .css      Project cards with tags + links
    Education.jsx / .css     Timeline, certifications, interests
    Contact.jsx / .css       Social links + controlled contact form
    Footer.jsx / .css
    Icons.jsx                Shared inline SVG icons

  hooks/
    useSphere3D.js           3D rotation/projection + drag interaction
    useParticleField.js      Particle drift + connecting-line animation
    useReveal.js             IntersectionObserver-based scroll reveal
    useTypewriter.js         Typing/deleting text-cycle effect

  data/
    siteData.js              ALL editable content: name, skills, projects,
                              education, certifications, nav links, etc.

  styles/
    tokens.css               Colors, fonts, spacing — change the theme here
    base.css                 Resets, scrollbar, focus rings
    layout.css                Shared utilities: .container, .card, .tag,
                              buttons, reveal animation, background blobs
    index.css                Imports the three files above, in order
```

## Editing Content

Almost everything you'd want to change for personal use lives in
**`src/data/siteData.js`** — name, role list, bio, skills + percentages,
projects, education timeline, certifications, and social links. You
shouldn't need to touch component files for routine content updates.

## Re-theming

Colors, fonts, and spacing are all CSS custom properties defined once in
**`src/styles/tokens.css`**. Change a value there and it propagates
everywhere automatically.

## Going Live with the Contact Form

The form currently simulates a network request (see the comment block in
`src/components/Contact.jsx`). Wire it to a real backend, a service like
Formspree or EmailJS, or a serverless function before deploying.

## Notes on the 3D Sphere & Particle Background

Both are built with the 2D Canvas API plus manual 3D math (fibonacci point
distribution + simple rotation matrices for the sphere) — no Three.js, no
WebGL, no extra dependencies. This keeps the bundle small and avoids GPU
context overhead, while still being visually convincing. If you later want
true WebGL/Three.js, swap out `useSphere3D.js` only — the rest of the app
doesn't need to know how the canvas is drawn.
