# Sankalp Bharat Hackathon

A modern, tricolor‑themed hackathon website built with Vite + React, featuring a 3D rocket animation, theme toggle, and responsive sections for themes, timeline, winners, and registration.

## Highlights
- India tricolor visual theme
- 3D rocket animation (Three.js via React Three Fiber)
- Dark/light mode toggle
- Core Themes section
- Timeline with connected UI
- Winners placeholder section
- Mobile‑first responsive layout

## Tech Stack
- Vite + React
- Tailwind CSS
- Three.js + @react-three/fiber
- Framer Motion (motion/react)
- Tabler Icons

## Project Structure
```
Sankalp bharat/
  client/
    public/
      logo.png
    src/
      assets/
      components/
        Navbar.jsx
        RocketAnimation.jsx
        ui/
          resizable-navbar.jsx
      lib/
        utils.js
      App.jsx
      index.css
      main.jsx
```

## Getting Started

### 1) Install dependencies
```bash
cd client
npm install
```

### 2) Run the dev server
```bash
npm run dev
```

Open the local URL shown in the terminal (typically http://localhost:5173).

## Key Sections
- **Hero**: Hackathon intro, CTA buttons, countdown to problem statement release.
- **Core Themes**: Six focus areas aligned with Environment, Sustainability, Agriculture.
- **Timeline**: Connected timeline with official dates.
- **Winners**: Placeholder cards for top 10 teams (currently TBD).
- **Footer**: Event ownership line with Ascend Club and Zenith Forum.

## Customization Guide

### Update the Countdown Date
Edit `releaseDate` in:
- `client/src/App.jsx`

### Update Themes
Edit `tracks` in:
- `client/src/App.jsx`

### Update Timeline
Edit `timeline` in:
- `client/src/App.jsx`

### Update Winners
Edit Winners section in:
- `client/src/App.jsx`

### Update Rocket
3D rocket and flame logic live in:
- `client/src/components/RocketAnimation.jsx`

### Update Logo
Replace:
- `client/public/logo.png`

## Scripts
From `client/`:
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build

## License
Specify your license here.
