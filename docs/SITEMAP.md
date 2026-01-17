# MASS OSS Complete Sitemap

> All pages and routes in the application

---

## Visual Sitemap

```
                        ┌──────────────┐
                        │   MASS OSS   │
                        │   (Root)     │
                        └──────┬───────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
┌──────▼──────┐        ┌───────▼───────┐      ┌───────▼───────┐
│   PUBLIC    │        │   DASHBOARD   │      │    CLIENT     │
│   SITE      │        │   (Staff)     │      │   PORTAL      │
└──────┬──────┘        └───────┬───────┘      └───────┬───────┘
       │                       │                       │
   [8 pages]              [32 modules]            [7 pages]
```

---

## 1. Public Website (Marketing)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, services, stats, CTA |
| `/about` | About Us | Company story, team, mission |
| `/services` | Services | Full service catalog |
| `/contact` | Contact | Form, location, hours |
| `/book` | Book Now | Appointment booking |
| `/pricing` | Pricing | Service price list |
| `/features` | Features | Platform features |
| `/network` | Network | Workshop locations |
| `/portal` | Customer Portal | Portal entry |
| `/login` | Login | Staff/customer login |
| `/privacy` | Privacy Policy | Legal |
| `/terms` | Terms of Service | Legal |

---

## 2. Dashboard (Staff Portal)

### Core Operations
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard` | Main Dashboard | KPIs, quick actions |
| `/dashboard/appointments` | Appointments | Calendar, scheduling |
| `/dashboard/check-in` | Check-In | Vehicle intake |
| `/dashboard/work-orders` | Work Orders | Job management |
| `/dashboard/inspections` | Inspections | DVI module |
| `/dashboard/estimates` | Estimates | Quote builder |

### Assets Management
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/vehicles` | Vehicles | Fleet registry |
| `/dashboard/customers` | Customers | CRM |
| `/dashboard/inventory` | Inventory | Parts stock |
| `/dashboard/suppliers` | Suppliers | Vendor management |
| `/dashboard/technicians` | Technicians | Staff management |

### Finance
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/pos` | POS | Point of sale |
| `/dashboard/reports` | Reports | Analytics |
| `/dashboard/export` | Export | Data export |

### AI & Intelligence
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/diagnostics` | AI Diagnostics | OBD + Image AI |
| `/dashboard/japan-imports` | Japan Imports | BE FORWARD tracker |
| `/dashboard/market` | Market Intel | Pricing intelligence |
| `/dashboard/ai-tools` | AI Tools | AI assistant |
| `/dashboard/knowledge-base` | Knowledge Base | Technical library |

### Marketing
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/affiliates` | Affiliates | Partner program |
| `/dashboard/marketing` | Marketing | Campaigns |
| `/dashboard/blog` | Blog | Content management |

### Admin & Settings
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/cms` | CMS | Content editor |
| `/dashboard/settings` | Settings | Configuration |
| `/dashboard/locations` | Locations | Multi-location |
| `/dashboard/network` | Network | Partner network |
| `/dashboard/admin` | Admin | Super admin |

### Templates & Tools
| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard/canned-jobs` | Canned Jobs | Job templates |
| `/dashboard/inspection-templates` | Inspection Templates | DVI templates |
| `/dashboard/declined-jobs` | Declined Jobs | Lost opportunities |
| `/dashboard/support` | Support | Help center |
| `/dashboard/vendor` | Vendor Portal | Supplier portal |
| `/dashboard/portal` | Customer View | Customer portal preview |

---

## 3. Client Portal

| Route | Page | Description |
|-------|------|-------------|
| `/client` | Dashboard | Customer home |
| `/client/vehicles` | My Vehicles | Vehicle list |
| `/client/appointments` | Appointments | Booking history |
| `/client/estimates` | Estimates | View quotes |
| `/client/invoices` | Invoices | Payment history |
| `/client/inspections` | Inspections | DVI reports |
| `/client/profile` | Profile | Account settings |

---

## 4. API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/ai-tools` | POST | AI assistant |
| `/api/webhooks` | POST | External webhooks |

---

## 5. Special Routes

| Route | Purpose |
|-------|---------|
| `/verify/[id]` | Public vehicle passport |
| `/compare` | Vehicle comparison tool |
| `/tools` | Public tools |
| `/mass-os` | Platform overview |

---

## Route Count Summary

| Section | Routes |
|---------|--------|
| Public Website | 12 |
| Dashboard | 32 |
| Client Portal | 7 |
| API | 2 |
| Special | 4 |
| **Total** | **57** |
