# TourVista — Frontend

A lightweight React frontend built with Vite that displays tours and a deck-style image gallery. This repository contains only the frontend portion — the original project includes a backend API that serves tours and images. If you forked this repo and don't have the backend available, see "Backend / API" below for options to run or mock the API locally.

**Demo**:
- I recorded a short walkthrough video for this frontend. The demo file is included as `public/Preview-Demo.mp4` and is embedded below:
- 
## Preview Video

(The video is outdated and does not cover recent updates.)


https://github.com/user-attachments/assets/326cc513-fa0b-448b-8d27-4693d44228d2






**Highlights**:
- Modern React + Vite setup
- Theme toggle (light / dark)
- Responsive card grid of tours with a focused detail modal
- Deck-style image gallery with drag and click navigation

**Tech**: React 19, Vite, plain CSS modules (small custom hooks)

**Quick Links**
- Source: [src](src)
- Entry: [src/main.jsx](src/main.jsx)
- App: [src/App.jsx](src/App.jsx)

**Table of contents**
- **Getting Started**
- **Features**
- **Backend / API**
- **Project Structure**
- **Developing & Building**
- **Notes**

**Getting Started**

- Prerequisites: Node.js 18+ and npm/yarn/pnpm
- Install dependencies:

```bash
npm install
```

- Run development server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

**Features**

- Theme toggle using the `useTheme` hook — persists only in the page state
- Fetches tours from `/api/v1/tours` using the `useTours` hook
- Responsive grid layout: `CardGrid`, `TouristCard`, `TouristModal` components
- Deck-style modal gallery: click / drag to navigate images

**Backend / API**

This frontend expects a backend API exposing the following endpoints and shapes:

- GET `/api/v1/tours` — returns JSON with `{ status, results, data: { tours: [...] } }`.
- Each `tour` object should include fields used by the UI:
	- `id`, `name`, `description`, `price`, `duration`, `difficulty`, `ratingsAverage`, `ratingsQuantity`, `maxGroupSize`, `startDates` (array), `imageCover`, `images` (array)
- Image URLs can be absolute (http/https) or relative. Relative image paths are resolved against `/api/v1/img/tours/` by the frontend.

If you don't have the original backend, recommended options:

- Use `json-server` to mock the API quickly. Create a `db.json` with a `tours` array and run:

```bash
npx json-server --watch db.json --routes routes.json --port 3000
```

Then configure Vite to proxy `/api` to your mock server by adding a `server.proxy` entry to `vite.config.js`.

**Project structure (most relevant files)**
- `src/App.jsx` — app shell, theme toggle and data loader
- `src/hooks/useTours.js` — fetches `/api/v1/tours`
- `src/hooks/useTheme.js` — toggles the light/dark class on `body`
- `src/components/CardGrid.jsx` — renders count and grid of `TouristCard`
- `src/components/TouristCard.jsx` — card UI, image carousel for focused card
- `src/components/TouristModal.jsx` — deck gallery and tour details modal
- `public/` — static assets (place videos like `public/demo.mp4` here)

**Customizing API base / proxy**

To forward API requests to a backend running on another port during development, add a proxy to `vite.config.js`:

```js
// vite.config.js (dev only)
export default {
	server: {
		proxy: {
			'/api': 'http://localhost:3000'
		}
	}
}
```

**Notes & Tips**

- If you see CORS or 404 issues for images, confirm your backend serves images at paths the frontend expects (or use full URLs in `imageCover` and `images`).
- The app currently fetches data from `/api/v1/tours`. If you need to change the path, update `src/hooks/useTours.js`.
- This repo ships only the frontend UI. If you publish the frontend to GitHub without the backend, include the demo video (example: `public/demo.mp4`) and add instructions in this README linking to any mock data you provide.

**License**

This repository contains frontend code only. Use and attribution follow the original project's license (if any). Add a LICENSE file if you want to set terms for this fork.

— End of README —

**Credits**

- Backend implementation by `adhiraj-singh-10088`. The full project (frontend + backend) is available at: https://github.com/adhiraj-singh-10088/practiceProject.git
