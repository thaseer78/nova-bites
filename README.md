# NOVA BITES — Premium Restaurant Website

A React + Vite restaurant website with an editorial luxury direction: warm ivory, charcoal, muted copper, serif display typography, photographic menu cards, Framer Motion transitions, responsive navigation, dietary labels, menu filters, reservation links, a location card and newsletter form.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Business details included

- Address: 42 Indiranagar 100ft Rd, Bengaluru
- Hours: Tuesday–Sunday, 12:00 PM–11:30 PM; Monday closed
- Phone / WhatsApp: +91 98765 43210

These details were supplied for the website refactor. Confirm that the address, opening hours, contact number, menu and prices are accurate before accepting real reservations or publishing as a live business website.

## Important implementation notes

- Framer Motion is included as a dependency; run `npm install` after extracting.
- The newsletter form currently validates the email and shows a confirmation in the browser. To collect subscribers, connect it to a mailing-list service or backend.
- The map is an interactive Google Maps embed inside a dark-styled location panel. The map tiles are served by Google and may not be fully dark themed.
- Photography and fonts are loaded externally, so an internet connection is required.
