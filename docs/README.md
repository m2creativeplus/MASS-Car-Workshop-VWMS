# MASS OSS Documentation

**Version:** 2.0 | **Last Updated:** January 11, 2026

Welcome to the MASS OSS (Mobility & Automotive Service System) documentation. This comprehensive documentation package covers everything from system architecture to testing procedures.

---

## 📚 Documentation Index

| Document | Description | Size |
|----------|-------------|------|
| [System Design](./SYSTEM_DESIGN_DOCUMENTATION.md) | Complete architecture, sitemap, tech stack, and deployment | ~25 KB |
| [UI/UX Design System](./UI_UX_DESIGN_SYSTEM.md) | Colors, typography, components, and patterns | ~15 KB |
| [Module Features](./MODULE_FEATURES.md) | All 32 modules with features and status | ~20 KB |
| [Integrations & API](./INTEGRATIONS_API.md) | Backend APIs, payment, and communication integrations | ~12 KB |
| [Testing & QA](./TESTING_QA.md) | Test checklists, security, and quality metrics | ~15 KB |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Convex account

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd MASS-Car-Workshop-VWMS

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your NEXT_PUBLIC_CONVEX_URL

# Run development server
npm run dev

# Deploy Convex functions
npx convex dev
```

### Demo Login
- **Admin:** admin@masscar.com / 123456
- **Owner:** owner@masscar.com / 123456

---

## 🏗️ Project Structure

```
MASS-Car-Workshop-VWMS/
├── app/                    # Next.js App Router
│   ├── dashboard/          # 32 dashboard modules
│   ├── client/             # Customer portal
│   └── portal/             # Public booking
├── components/             # React components
├── convex/                 # Backend (Convex)
│   ├── schema.ts          # 1300+ line schema
│   └── functions.ts       # 1950+ line API
├── lib/                    # Utilities
├── public/                 # Static assets
└── docs/                   # This documentation
```

---

## 📋 Module Overview

### Core Operations (8 modules)
- Dashboard, Work Orders, Appointments, Customers
- Vehicles, Estimates, Inspections, Check-In

### Inventory & Sales (4 modules)
- Inventory, POS, Catalog, Marketplace

### Imports & Supply (3 modules)
- Japan Imports, Suppliers, Import Duty Calculator

### Growth & Marketing (3 modules)
- Affiliates, Marketing, Declined Jobs

### Knowledge & AI (4 modules)
- Knowledge Base, Blog, AI Assistant, AI Diagnostics

### Portals (3 modules)
- Customer Portal, Vendor Dashboard, Support Center

### CMS & Content (4 modules)
- CMS Hub, Blog CMS, FAQ CMS, Pages CMS

### Admin & Settings (3 modules)
- Settings, Locations, Reports, Export Center

---

## 🎨 Design System

### Brand Colors
- **Primary:** #FF4D24 (MASS Red)
- **Background:** #000000 (Pure Black)
- **Cards:** #1A1A1A (Dark Charcoal)

### Typography
- **Headings:** Oxanium (Google Fonts)
- **Body:** Inter / System

---

## 🔌 Integrations

| Integration | Status | Purpose |
|-------------|--------|---------|
| Convex | ✅ Active | Real-time database |
| Vercel | ✅ Active | Hosting |
| Stripe | ⚙️ Configured | Payments |
| Zaad/eDahab | 🔄 Planned | Mobile money |
| Twilio | 🔄 Planned | SMS notifications |

---

## ✅ Recent Fixes

| Issue | Status | Date |
|-------|--------|------|
| `customers.tsx:374` undefined variable | ✅ Fixed | 2026-01-11 |
| `vehicles.tsx:249` broken refresh button | ✅ Fixed | 2026-01-11 |

---

## 📞 Support

- **Live URL:** [mass-car-workshop-vwms.vercel.app](https://mass-car-workshop-vwms.vercel.app)
- **Email:** info@mass-oss.com
- **Location:** Hargeisa, Somaliland

---

## 📄 License

MASS OSS is proprietary software owned by M2 Creative.

---

**Built with ❤️ by M2 Creative**
