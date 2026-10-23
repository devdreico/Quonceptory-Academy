# Quonceptory Academy

Bilingual (Spanish/English) website for Quonceptory Academy, built with React, TypeScript, Vite, React Router and Tailwind CSS.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL after startup. Routes are available under `/es` and `/en`; the root route redirects using the saved language or browser preference.

## Validation and production

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Current prototype boundaries

- The course catalog, AI tool directory, projects, community content, events and articles use local TypeScript data.
- The portal sign-in is a local demonstration only. It does not authenticate a real account; the demo profile is saved in the current browser's local storage.
- Contact form submission prepares a message in the visitor's email application. It does not send or store contact data on a server.
- Newsletter subscriptions are stored locally in the current browser and are not sent to a mailing service.
- Enrollment, payments, course progress, CRM and newsletter delivery require backend integrations and are not enabled.
