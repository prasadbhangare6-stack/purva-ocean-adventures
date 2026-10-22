# Purva Ocean Adventures — Full-Stack Architecture

A full-stack ocean expedition & diving platform divided into dedicated **Frontend** and **Backend** applications.

---

## 📁 Repository Structure

```
Purva Ocean Adventures/
├── frontend/                     # Client application (Vite + React + TypeScript)
│   ├── src/
│   │   ├── components/           # UI components, modals, and editorial sections
│   │   ├── data/                 # Copy, hero scenes, assets, and API endpoints
│   │   ├── lib/                  # GSAP animations, parallax, and motion utilities
│   │   ├── App.tsx               # Root editorial grid composition
│   │   └── main.tsx              # Application entry
│   ├── public/                   # Images and typography assets
│   ├── vite.config.ts            # Vite config with backend /api proxy
│   └── package.json
│
├── backend/                      # API server (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/               # Environment configuration
│   │   ├── controllers/          # Business logic handlers
│   │   ├── middleware/           # Zod validation, request logger, error handler
│   │   ├── routes/               # Modular REST API routes
│   │   ├── types/                # TypeScript interfaces & Zod schemas
│   │   ├── data/                 # Seed data & persistent storage utility
│   │   ├── app.ts                # Express setup & CORS middleware
│   │   └── index.ts              # Server lifecycle & graceful shutdown
│   ├── data-storage/             # Auto-persisted JSON data (inquiries, subscribers, trips)
│   ├── tsconfig.json
│   └── package.json
│
├── preview/                      # Reference desktop and mobile mockups
├── image-search/                 # Stock imagery library
├── package.json                  # Root monorepo orchestration scripts
└── README.md                     # Architecture documentation
```

---

## ⚡ Quick Start

### 1. Install Dependencies

You can install all dependencies across both frontend and backend in one command:

```bash
npm run install:all
```

Or install separately:
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Run Development Servers

Run both **Frontend** (Vite on port `5173`) and **Backend** (Express on port `5000`) simultaneously:

```bash
npm run dev
```

Or run individually:
```bash
npm run dev:frontend   # Runs Vite on http://localhost:5173
npm run dev:backend    # Runs Express on http://localhost:5000
```

### 3. Production Build

```bash
npm run build          # Builds both frontend and backend
npm run start:backend  # Starts production backend server
```

---

## 🌐 API Endpoints Reference

The backend exposes a clean REST API mounted under `/api`. In development, Vite automatically proxies any `/api` call to `http://localhost:5000`.

### Health & Status
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, uptime, and timestamp |

### Inquiries & Bookings
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/inquiries` | Submit expedition enquiry (name, email, dates, travellers, experience, notes) |
| `GET` | `/api/inquiries` | List all inquiries (supports `?status=pending\|contacted` and `?search=...`) |
| `GET` | `/api/inquiries/:id` | Get details of a single enquiry |
| `PATCH` | `/api/inquiries/:id/status` | Update enquiry status (`pending`, `contacted`, `confirmed`, `archived`) |
| `DELETE` | `/api/inquiries/:id` | Remove an enquiry record |

### Newsletter & Destination Updates
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/newsletter` | Subscribe email to destination route updates |
| `GET` | `/api/newsletter` | List all subscribers |
| `DELETE` | `/api/newsletter/:idOrEmail` | Unsubscribe an email address |

### Expeditions & Trips
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | Get all upcoming expeditions with itinerary and spot counts |
| `GET` | `/api/trips/:identifier` | Get expedition details by slug (`maldives-maafushi`) or ID |
| `PATCH` | `/api/trips/:identifier/spots` | Update remaining spots for an expedition |

### Dynamic Content
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/content/experiences` | Beginners, Certified Divers, Non-Divers packages |
| `GET` | `/api/content/gallery` | Gallery items (supports `?category=Underwater\|People\|Destinations`) |
| `GET` | `/api/content/faqs` | Frequently asked questions |
| `GET` | `/api/testimonials` | Verified guest testimonials |
| `POST` | `/api/testimonials` | Submit a new guest story for review |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env` - Optional)
```env
# Optional override if not using default Vite proxy
VITE_INQUIRY_ENDPOINT=/api/inquiries
VITE_NEWSLETTER_ENDPOINT=/api/newsletter
```
