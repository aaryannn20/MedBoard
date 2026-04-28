# MedBoard — B2B Healthcare SaaS Dashboard

A modern healthcare platform UI built with React, TypeScript, Zustand, and Firebase Authentication.

## Features

- **Authentication** — Firebase email/password login with session handling, validation, and error states
- **Dashboard** — KPI stat cards, admissions/discharges area chart, recent patients list
- **Analytics** — Bar charts, pie charts, line charts, and radial bar charts (Recharts)
- **Patient Management** — Grid/List toggle view with search and status filtering
- **Notifications** — Service Worker with push/local notifications on page load
- **State Management** — Zustand stores for auth, patients, and notifications
- **Responsive** — Mobile-first layout with collapsible sidebar

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Routing | React Router 7 |
| State | Zustand 5 |
| Auth | Firebase Authentication |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | CSS Modules + CSS custom properties |

## Project Structure

```
src/
├── components/
│   ├── Layout/          # AppLayout (sidebar, topbar, notification dropdown)
│   └── ProtectedRoute   # Auth guard
├── config/
│   └── firebase.ts      # Firebase initialization
├── data/
│   └── mock.ts          # Mock data generators
├── pages/
│   ├── LoginPage/       # Login form
│   ├── DashboardPage/   # Home dashboard
│   ├── AnalyticsPage/   # Charts & analytics
│   └── PatientsPage/    # Patient grid/list views
├── stores/
│   ├── authStore.ts     # Authentication state
│   ├── patientStore.ts  # Patient data & filters
│   └── notificationStore.ts
├── styles/
│   └── global.css       # Design tokens & base styles
├── types/
│   └── index.ts         # Shared TypeScript interfaces
├── router.tsx           # Route definitions (lazy-loaded)
├── sw-register.ts       # Service Worker registration
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Email/Password auth enabled

### Setup

1. **Install dependencies**
   ```bash
   cd healthcare-saas
   npm install
   ```

2. **Configure Firebase**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your Firebase project credentials.

3. **Start dev server**
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` and sign in with your Firebase user.

## Service Worker / Notifications

- The Service Worker (`public/sw.js`) is registered on page load.
- On first visit it requests notification permission.
- A demo notification fires 3 seconds after permission is granted.
- Clicking the notification navigates to the Patients page.
- The SW also caches assets for offline resilience.

## Build for Production

```bash
npm run build
npm run preview
```
