# MASS OSS - Complete System Design & Documentation

**Version:** 2.0  
**Last Updated:** January 11, 2026  
**Author:** M2 Creative  
**Status:** Production Ready

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Sitemap & Information Architecture](#3-sitemap--information-architecture)
4. [Module Documentation](#4-module-documentation)
5. [UI/UX Design Guidelines](#5-uiux-design-guidelines)
6. [Website Copy & Content](#6-website-copy--content)
7. [System Integrations](#7-system-integrations)
8. [Data Schema & Models](#8-data-schema--models)
9. [Wireframes & User Flows](#9-wireframes--user-flows)
10. [Testing & QA](#10-testing--qa)
11. [Deployment & DevOps](#11-deployment--devops)
12. [Appendices](#appendices)

---

# 1. Executive Summary

## 1.1 Product Overview

**MASS OSS** (Mobility & Automotive Service System - Open Source Software) is an enterprise-grade automotive workshop management platform designed to digitize vehicle service operations in emerging markets, with primary focus on Somaliland and the Horn of Africa region.

### Mission Statement
> Transform automotive workshops from paper-based operations to digital-first enterprises, enabling international-standard service delivery with local market adaptations.

### Key Differentiators
| Feature | MASS OSS | Tekmetric | Mitchell1 | Shop-Ware |
|---------|----------|-----------|-----------|-----------|
| **Somaliland Localization** | ✅ Full | ❌ | ❌ | ❌ |
| **Mobile Money (Zaad/eDahab)** | ✅ Native | ❌ | ❌ | ❌ |
| **Japan Import Market Data** | ✅ Integrated | ❌ | ❌ | ❌ |
| **Multi-Language (Somali/Arabic)** | ✅ Planned | ❌ | ❌ | ❌ |
| **Real-time Convex Backend** | ✅ Yes | ❌ | ❌ | ❌ |
| **Open Source Core** | ✅ Yes | ❌ | ❌ | ❌ |

### Target Market
- **Primary:** Automotive workshops in Somaliland (50+ shops in Hargeisa alone)
- **Secondary:** East African automotive service industry
- **Tertiary:** Emerging market workshops globally

---

## 1.2 Business Model

```
┌────────────────────────────────────────────────────────────────┐
│                    MASS OSS Revenue Model                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐       │
│  │  Subscription │   │  Transaction │   │   Services   │       │
│  │    Tiers     │   │     Fees     │   │   Revenue    │       │
│  ├──────────────┤   ├──────────────┤   ├──────────────┤       │
│  │ Free: $0/mo  │   │ Parts Sales  │   │ Consulting   │       │
│  │ Pro: $49/mo  │   │ Commissions  │   │ Training     │       │
│  │ Ent: $199/mo │   │ Payment Fee  │   │ Custom Dev   │       │
│  └──────────────┘   └──────────────┘   └──────────────┘       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

# 2. System Architecture

## 2.1 Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        MASS OSS Tech Stack                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                                               │
│  │   Frontend   │  Next.js 15 + React 19 + TypeScript           │
│  │              │  Tailwind CSS + Framer Motion                 │
│  │              │  Recharts + Lucide Icons                      │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │   Backend    │  Convex (Real-time BaaS)                      │
│  │              │  Serverless Functions                         │
│  │              │  Built-in Authentication                      │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │   Database   │  Convex Document Store                        │
│  │              │  Real-time Subscriptions                      │
│  │              │  Automatic Indexing                           │
│  └──────────────┘                                               │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Payments    │    │   Hosting    │    │  Analytics   │      │
│  │  Stripe +    │    │    Vercel    │    │   Plausible  │      │
│  │  Zaad/eDahab │    │              │    │              │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 2.2 Architecture Diagram

```
                         ┌─────────────────┐
                         │   Public Users  │
                         │  (Customers)    │
                         └────────┬────────┘
                                  │
                         ┌────────▼────────┐
                         │  Landing Page   │
                         │  (/page.tsx)    │
                         └────────┬────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Customer Portal │    │   Login/Auth    │    │  Public Pages   │
│ /portal/demo    │    │    /login       │    │ /about, /contact│
└────────┬────────┘    └────────┬────────┘    └─────────────────┘
         │                      │
         └──────────┬───────────┘
                    │
           ┌────────▼────────┐
           │   Dashboard     │
           │  /dashboard/*   │
           └────────┬────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌────────┐    ┌──────────┐    ┌──────────┐
│ Convex │◄───│  Queries │    │Mutations │
│   DB   │    │  (Read)  │    │ (Write)  │
└────────┘    └──────────┘    └──────────┘
```

## 2.3 Folder Structure

```
MASS-Car-Workshop-VWMS/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Public landing page
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── services/                 # Services page
│   ├── login/                    # Authentication
│   ├── dashboard/                # Protected dashboard area
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── work-orders/          # Work order management
│   │   ├── customers/            # CRM module
│   │   ├── vehicles/             # Fleet registry
│   │   ├── appointments/         # Scheduling
│   │   ├── inventory/            # Parts stock
│   │   ├── pos/                  # Point of sale
│   │   ├── estimates/            # Quotations
│   │   ├── inspections/          # Digital vehicle inspection
│   │   ├── cms/                  # Content management
│   │   │   ├── blog/             # Blog management
│   │   │   ├── faq/              # FAQ management
│   │   │   └── pages/            # Dynamic pages
│   │   └── ... (32 total modules)
│   ├── client/                   # Customer-facing portal
│   │   ├── vehicles/             # My vehicles
│   │   ├── invoices/             # My invoices
│   │   └── appointments/         # My appointments
│   └── portal/                   # Public booking portal
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard-specific components
│   ├── layout/                   # Layout components (sidebar, header)
│   └── providers/                # Context providers
├── convex/                       # Backend logic
│   ├── schema.ts                 # Database schema (1300+ lines)
│   ├── functions.ts              # API functions (1950+ lines)
│   └── blog.ts                   # Blog-specific functions
├── lib/                          # Utility functions
│   ├── data.ts                   # Seed data
│   ├── utils.ts                  # Helpers
│   └── database.ts               # Legacy DB client
└── public/                       # Static assets
```

---

# 3. Sitemap & Information Architecture

## 3.1 Complete Sitemap

```
MASS OSS
│
├── PUBLIC WEBSITE
│   ├── / (Home)
│   ├── /about
│   ├── /services
│   ├── /contact
│   ├── /features
│   ├── /pricing
│   ├── /network
│   ├── /compare
│   ├── /mass-os
│   ├── /privacy
│   ├── /terms
│   └── /login
│
├── CUSTOMER PORTAL (/client)
│   ├── /client/vehicles
│   ├── /client/appointments
│   ├── /client/invoices
│   └── /client/repairs
│
├── PUBLIC BOOKING (/portal)
│   └── /portal/demo
│
└── DASHBOARD (/dashboard) - 32 Modules
    │
    ├── OVERVIEW
    │   ├── Dashboard (Home)
    │   └── Reports
    │
    ├── OPERATIONS
    │   ├── Work Orders
    │   ├── Appointments
    │   ├── Vehicles
    │   ├── Customers
    │   ├── Estimates
    │   ├── Inspections (DVI)
    │   └── Check-In
    │
    ├── INVENTORY & SALES
    │   ├── Inventory (Parts Stock)
    │   ├── POS (Point of Sale)
    │   ├── Catalog
    │   └── Market (Marketplace)
    │
    ├── GROWTH & MARKETING
    │   ├── Affiliates
    │   ├── Marketing
    │   ├── Declined Jobs
    │   └── Reminders (N/A - in sidebar)
    │
    ├── IMPORTS & SUPPLY CHAIN
    │   ├── Japan Imports
    │   └── Suppliers
    │
    ├── KNOWLEDGE & AI
    │   ├── Knowledge Base
    │   ├── Blog & News
    │   ├── AI Assistant
    │   └── AI Diagnostics
    │
    ├── PORTALS
    │   ├── Customer Portal
    │   ├── Vendor Dashboard
    │   └── Support Center
    │
    ├── TEMPLATES & SETUP
    │   ├── Canned Jobs
    │   ├── DVI Templates
    │   ├── Technicians (Mechanics)
    │   └── Network (Partners)
    │
    ├── ADMIN
    │   ├── CMS Control
    │   │   ├── Blog
    │   │   ├── FAQ
    │   │   └── Pages
    │   ├── Settings
    │   ├── Locations
    │   ├── Export Center
    │   └── Contact
    │
    └── UTILITIES
        └── /tools/import-duty (Duty Calculator)
```

## 3.2 User Role Access Matrix

| Module | Admin | Staff | Technician | Customer |
|--------|:-----:|:-----:|:----------:|:--------:|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Work Orders | ✅ | ✅ | ✅ | ❌ |
| Customers | ✅ | ✅ | ❌ | ❌ |
| Vehicles | ✅ | ✅ | ✅ | ✅ |
| Appointments | ✅ | ✅ | ✅ | ✅ |
| Inventory | ✅ | ✅ | ❌ | ❌ |
| POS | ✅ | ✅ | ❌ | ❌ |
| Estimates | ✅ | ✅ | ✅ | ❌ |
| Inspections | ✅ | ✅ | ✅ | ❌ |
| Reports | ✅ | ✅ | ❌ | ❌ |
| AI Tools | ✅ | ✅ | ✅ | ❌ |
| CMS | ✅ | ❌ | ❌ | ❌ |
| Settings | ✅ | ❌ | ❌ | ❌ |

---

# 4. Module Documentation

## 4.1 Core Modules

### 4.1.1 Work Orders (Job Cards)

**Purpose:** Central hub for tracking vehicle repair jobs from check-in to delivery.

**Features:**
- Kanban-style workflow visualization
- 8-stage status pipeline: Check-In → Inspecting → Awaiting Approval → In Progress → Waiting Parts → Complete → Invoiced → Cancelled
- Technician assignment
- Parts and labor tracking
- Customer communication log
- Photo attachments

**Data Model Fields:**
```typescript
{
  jobNumber: string,          // Auto-generated: WO-XXXXXX
  vehicleId: Id,              // Link to vehicle
  customerId: Id,             // Link to customer
  technicianId?: Id,          // Assigned mechanic
  serviceAdvisorId?: Id,      // Front desk staff
  status: WorkOrderStatus,    // 8 possible values
  priority: Priority,         // low/normal/high/urgent
  services: string[],         // List of services
  customerComplaint: string,  // What customer reported
  diagnosis: string,          // Tech findings
  workPerformed: string,      // Completed work description
  mileageIn: number,
  mileageOut: number,
  laborHours: number,
  partsTotal: number,
  laborTotal: number,
  taxAmount: number,
  totalAmount: number,
  checkinDate: string,
  completedAt?: string,
}
```

---

### 4.1.2 Customers (CRM)

**Purpose:** Customer relationship management with complete service history.

**Features:**
- Customer profile with contact details
- Vehicle ownership links
- Service history timeline
- Total spend tracking
- Preferred contact method
- Birthday/reminder automation

**Key Operations:**
- `getCustomers(orgId)` - List all customers
- `addCustomer(...)` - Create new customer
- `updateCustomer(id, ...)` - Update details
- `deleteCustomer(id)` - Remove customer

---

### 4.1.3 Vehicles (Fleet Registry)

**Purpose:** Complete vehicle database with service history and documentation.

**Features:**
- VIN decoding
- Make/Model/Year tracking
- Mileage history
- Owner assignment
- Registration & insurance expiry tracking
- Service due reminders

**Supported Vehicle Data:**
- 50+ pre-seeded vehicles (Toyota, Honda, Nissan, Suzuki, Mitsubishi)
- Somaliland license plate format: `SL-XXXXX-X`
- Japan import integration (BE FORWARD pricing)

---

### 4.1.4 Inventory (Parts Stock)

**Purpose:** Real-time parts inventory management with auto-decrement on sales.

**Features:**
- Part number and barcode tracking
- Category/subcategory organization
- Cost price vs selling price
- Stock level alerts (reorder points)
- Supplier linking
- Condition tracking (new/used/refurbished)

**Auto-Decrement Logic:**
When a sale is recorded via POS, inventory quantities are automatically reduced:
```typescript
// In createSale mutation:
for (const item of args.items) {
  const inventoryItem = await ctx.db.get(item.inventoryId);
  if (inventoryItem) {
    const newQuantity = Math.max(0, inventoryItem.stockQuantity - item.quantity);
    await ctx.db.patch(item.inventoryId, { stockQuantity: newQuantity });
  }
}
```

---

### 4.1.5 Digital Vehicle Inspection (DVI)

**Purpose:** Comprehensive multi-point vehicle inspection with photo evidence.

**Features:**
- Customizable inspection templates
- Item-by-item status: OK / Attention / Immediate Attention / N/A
- Photo and video capture
- Customer-shareable inspection reports
- Safety rating (Safe / Attention Needed / Unsafe)
- Overall condition score

**Inspection Categories:**
- Exterior
- Interior
- Under Hood
- Under Vehicle
- Brakes
- Tires
- Electrical
- Fluids

---

### 4.1.6 Point of Sale (POS)

**Purpose:** Quick parts sales with multiple payment method support.

**Features:**
- Product search by name/part number
- Cart management
- Multiple payment methods:
  - Cash
  - Zaad (Telesom mobile money)
  - eDahab (Dahabshiil mobile money)
  - Card
  - Bank Transfer
- Receipt generation
- Sales number tracking

---

## 4.2 Growth Modules

### 4.2.1 Japan Imports

**Purpose:** Track vehicle imports from Japan with pricing intelligence.

**Features:**
- BE FORWARD price integration
- FOB to landed cost calculation
- Import duty calculator
- Shipping status tracking

### 4.2.2 Affiliates

**Purpose:** Referral partner management for lead generation.

**Features:**
- Affiliate registration
- Referral code tracking
- Commission calculation
- Performance dashboard

### 4.2.3 Marketing

**Purpose:** Campaign management and customer engagement.

**Features:**
- SMS/WhatsApp campaign creation
- Segment-based targeting
- Template library
- Delivery tracking

---

## 4.3 Content Modules

### 4.3.1 CMS - Blog

**Purpose:** Technical articles and news for SEO and customer education.

**Features:**
- Rich text editor
- Featured image
- Category/tag system
- SEO metadata
- Publish scheduling

### 4.3.2 CMS - FAQ

**Purpose:** Frequently asked questions for self-service support.

**Features:**
- Question/Answer pairs
- Category grouping
- Sort order control

### 4.3.3 Knowledge Base

**Purpose:** Internal technical documentation for staff training.

**Features:**
- Article library
- Search functionality
- Category navigation

---

# 5. UI/UX Design Guidelines

## 5.1 Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Red** | `#FF4D24` | CTAs, accents, brand identity |
| **Hover Red** | `#FF6B47` | Button hover states |
| **Dark Background** | `#000000` | Public site background |
| **Dashboard Dark** | `#0F172A` | Dashboard sidebar |
| **Card Background** | `#1A1A1A` | Cards on dark theme |
| **Border Light** | `rgba(255,255,255,0.1)` | Subtle borders |
| **Text Primary** | `#FFFFFF` | Headings on dark |
| **Text Secondary** | `#9CA3AF` | Body text on dark |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| **Headings** | Oxanium | 700 Bold | 32-72px |
| **Body** | Inter/System | 400-500 | 14-16px |
| **Mono** | JetBrains Mono | 400 | 12-14px |
| **Labels** | System | 600 Semibold | 10-12px |

### Spacing Scale

```
4px  - Micro spacing
8px  - Component internal
12px - Small gaps
16px - Standard gap
24px - Section internal
32px - Section external
48px - Large sections
64px - Page sections
```

---

## 5.2 Component Patterns

### Cards

```
┌────────────────────────────────────┐
│  ┌─────────┐                       │
│  │  Icon   │  Title               │
│  └─────────┘  Subtitle             │
│                                    │
│  Main Content Area                 │
│                                    │
│  ┌──────────────┐ ┌──────────────┐ │
│  │   Action 1   │ │   Action 2   │ │
│  └──────────────┘ └──────────────┘ │
└────────────────────────────────────┘
```

### Stat Cards (Dashboard)

```
┌────────────────────────────────────┐
│ ●●● Gradient Background ●●●       │
├────────────────────────────────────┤
│  PARTS IN STOCK        [Icon]     │
│  287                              │
│  ↑ +8.2% this week                │
├────────────────────────────────────┤
│  ▶ View Details                   │
└────────────────────────────────────┘
```

### Data Tables

```
┌──────────┬──────────┬──────────┬──────────┐
│  Header  │  Header  │  Header  │ Actions  │
├──────────┼──────────┼──────────┼──────────┤
│  Cell    │  Cell    │  Badge   │ 👁 ✏️ 🗑  │
│  Cell    │  Cell    │  Badge   │ 👁 ✏️ 🗑  │
│  Cell    │  Cell    │  Badge   │ 👁 ✏️ 🗑  │
├──────────┴──────────┴──────────┴──────────┤
│  Showing 1-10 of 50      < 1 2 3 ... >    │
└───────────────────────────────────────────┘
```

---

## 5.3 Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

---

# 6. Website Copy & Content

## 6.1 Landing Page Copy

### Hero Section
```
[Eyebrow] Premium Automotive Excellence

[Headline]
PROFESSIONAL
CAR REPAIR
AND MAINTENANCE

[Subheadline]
Experience world-class automotive service with MASS OSS 
certified workshops. International standards, local expertise.

[CTA Primary] Get an Appointment →
[CTA Secondary] Our Services
```

### Services Section
```
[Section Title] OUR SERVICES

1. Engine Repair
   Complete engine diagnostics, rebuilds, and maintenance

2. Auto Painting
   Professional spray painting and bodywork finishing

3. Diagnostics
   Computer-based fault detection and scanning

4. Electrical
   Battery, alternator, and wiring repair

5. AC Service
   Climate control repair and regas services

6. Tire Service
   Wheel alignment, balancing, and tire fitting
```

### Stats Section
```
15+      Years Experience
500+     Happy Customers
50+      Expert Mechanics
24/7     Support Available
```

### Trust Section
```
[Section Title] WHY CHOOSE US

✓ 900+ Five Star Reviews
  Trusted by hundreds of satisfied customers

✓ Professional Team
  Certified mechanics with years of experience

✓ Fast Turnaround
  Most repairs completed same-day

✓ Quality Guaranteed
  All work backed by our service warranty
```

### CTA Section
```
READY TO GET YOUR
CAR SERVICED?

Experience international-standard automotive service. 
Book your appointment today and join thousands of 
satisfied customers.

[Book Appointment →]  [📞 Call Us Now]
```

---

## 6.2 SEO Metadata

### Homepage
```typescript
export const metadata = {
  title: "MASS OSS | Professional Car Repair & Workshop Management",
  description: "Experience world-class automotive service. Professional car repair, maintenance, and digital workshop management for Somaliland.",
  keywords: ["car repair", "Hargeisa", "mechanic", "workshop", "Somaliland", "auto service"],
  openGraph: {
    title: "MASS OSS - Premium Automotive Excellence",
    description: "International standards, local expertise",
    url: "https://mass-car-workshop-vwms.vercel.app",
    siteName: "MASS OSS",
    type: "website",
  }
}
```

---

# 7. System Integrations

## 7.1 Current Integrations

| Integration | Status | Purpose |
|-------------|--------|---------|
| **Convex** | ✅ Active | Real-time database & backend |
| **Vercel** | ✅ Active | Hosting & deployment |
| **Stripe** | ⚠️ Partial | International payments |
| **GitHub** | ✅ Active | Version control |

## 7.2 Planned Integrations

| Integration | Priority | Purpose |
|-------------|----------|---------|
| **Zaad/eDahab API** | High | Local mobile money |
| **Twilio** | High | SMS notifications |
| **WhatsApp Business** | High | Customer messaging |
| **ALLDATA** | Medium | Repair information |
| **PartsTech** | Medium | Parts ordering |
| **QuickBooks** | Medium | Accounting sync |
| **BE FORWARD API** | Medium | Japan import pricing |
| **VIN Decoder** | Low | Vehicle data lookup |

## 7.3 Integration Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     MASS OSS Core                             │
│                    (Next.js + Convex)                        │
└───────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Payments    │   │Communications │   │   Data APIs   │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ Stripe        │   │ Twilio        │   │ VIN Decoder   │
│ Zaad          │   │ WhatsApp      │   │ BE FORWARD    │
│ eDahab        │   │ Email         │   │ ALLDATA       │
│ Bank Transfer │   │ Push          │   │ PartsTech     │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

# 8. Data Schema & Models

## 8.1 Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    USERS     │     │ORGANIZATIONS │     │  USER_ORG    │
│              │◄───►│              │◄────│   ROLES      │
│ - email      │     │ - name       │     │ - role       │
│ - firstName  │     │ - slug       │     │ - department │
│ - role       │     │ - plan       │     └──────────────┘
└──────┬───────┘     └──────────────┘
       │
       │ owns/serves
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  CUSTOMERS   │◄───►│   VEHICLES   │◄───►│ WORK_ORDERS  │
│              │     │              │     │              │
│ - firstName  │     │ - make       │     │ - jobNumber  │
│ - lastName   │     │ - model      │     │ - status     │
│ - phone      │     │ - vin        │     │ - services[] │
│ - email      │     │ - mileage    │     │ - totalAmount│
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ APPOINTMENTS │     │ INSPECTIONS  │     │  ESTIMATES   │
│              │     │              │     │              │
│ - date       │     │ - items[]    │     │ - lineItems[]│
│ - duration   │     │ - photos[]   │     │ - subtotal   │
│ - status     │     │ - condition  │     │ - status     │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   INVOICES   │◄───►│   PAYMENTS   │     │    SALES     │
│              │     │              │     │  (POS)       │
│ - lineItems[]│     │ - amount     │     │ - items[]    │
│ - totalAmount│     │ - method     │     │ - totalAmount│
│ - balanceDue │     │ - reference  │     │ - paymentMethod│
└──────────────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  INVENTORY   │◄───►│  SUPPLIERS   │     │ LABOR_GUIDE  │
│              │     │              │     │              │
│ - partNumber │     │ - name       │     │ - opCode     │
│ - stockQty   │     │ - category   │     │ - stdHours   │
│ - sellPrice  │     │ - terms      │     │ - rate       │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 8.2 Complete Table List

| Table | Purpose | Key Indexes |
|-------|---------|-------------|
| `users` | Staff accounts | by_email, by_role |
| `organizations` | Multi-tenant orgs | by_slug |
| `userOrgRoles` | Role assignments | by_user, by_org |
| `customers` | CRM contacts | by_email, by_org |
| `vehicles` | Fleet registry | by_vin, by_customer |
| `suppliers` | Vendor database | by_code, by_org |
| `inventory` | Parts stock | by_partNumber, by_org |
| `laborGuide` | Service operations | by_code, by_category |
| `appointments` | Scheduling | by_date, by_customer |
| `workOrders` | Job cards | by_jobNumber, by_status |
| `inspections` | Digital inspections | by_vehicle, by_status |
| `estimates` | Quotations | by_customer, by_status |
| `invoices` | Billing | by_invoiceNumber |
| `sales` | POS transactions | by_date, by_org |
| `reminders` | Notifications | by_dueDate, by_type |
| `payments` | Payment records | by_invoice, by_method |
| `expenses` | Operational costs | by_category, by_date |
| `automotivePois` | Stakeholder map | by_city, by_category |
| `sparePartsMaster` | Parts catalog | by_partNumber |
| `marketPriceIntelligence` | Pricing data | by_make, by_model |
| `massPartners` | B2B network | by_type, by_status |

---

# 9. Wireframes & User Flows

## 9.1 Customer Journey

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. AWARENESS     2. BOOKING      3. SERVICE     4. FOLLOW-UP│
│  ────────────     ───────────     ──────────     ───────────│
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   ┌──────────┐│
│  │ Landing  │───►│ Book     │───►│ Check-In │───►│ Invoice  ││
│  │ Page     │    │ Online   │    │ Vehicle  │   │ Payment  ││
│  └──────────┘    └──────────┘    └──────────┘   └──────────┘│
│       │               │               │              │       │
│       ▼               ▼               ▼              ▼       │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   ┌──────────┐│
│  │ Services │    │ SMS      │    │ DVI      │   │ Reminder ││
│  │ Info     │    │ Confirm  │    │ Report   │   │ Service  ││
│  └──────────┘    └──────────┘    └──────────┘   └──────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 9.2 Work Order Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│CHECK-IN │───►│INSPECT  │───►│AWAITING │───►│IN       │
│         │    │         │    │APPROVAL │    │PROGRESS │
└─────────┘    └─────────┘    └─────────┘    └────┬────┘
                                                  │
                              ┌───────────────────┘
                              │
                              ▼
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│CANCELLED│◄───│WAITING  │◄───│COMPLETE │───►│INVOICED │
│         │    │PARTS    │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

## 9.3 Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│ ┌──────────┐                              ┌──────────────────┐ │
│ │  MASS    │     MASS OSS DASHBOARD       │ 👤 Admin User ▼  │ │
│ │   OSS    │                              └──────────────────┘ │
│ └──────────┘                                                   │
├────────────┬───────────────────────────────────────────────────┤
│            │                                                   │
│ Dashboard  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ Work Orders│  │Parts    │ │Customers│ │Cars     │ │Mechanics│ │
│ Customers  │  │287      │ │10       │ │45       │ │12       │ │
│ Vehicles   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│ Appointments│                                                  │
│ Inventory  │  ┌──────────────────────────────────────────────┐│
│ POS        │  │       Monthly Repairs Chart                   ││
│            │  │  ▓▓▓▓                                         ││
│ ─────────  │  │  ▓▓▓▓ ▓▓▓▓                                    ││
│ CMS        │  │  ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓                          ││
│ Settings   │  │  Jan  Feb  Mar  Apr  May  Jun                 ││
│            │  └──────────────────────────────────────────────┘│
│            │                                                   │
└────────────┴───────────────────────────────────────────────────┘
```

---

# 10. Testing & QA

## 10.1 Test Categories

### Unit Tests
- Component rendering tests
- Utility function tests
- Form validation tests

### Integration Tests
- Convex query/mutation tests
- API endpoint tests
- Authentication flow tests

### End-to-End Tests
- Complete user journeys
- Cross-browser testing
- Mobile responsiveness

## 10.2 Test Checklist

### Authentication
- [ ] Demo user login (admin@masscar.com / 123456)
- [ ] Role-based access control
- [ ] Session persistence
- [ ] Logout functionality

### Dashboard
- [ ] Stats cards render with data
- [ ] Charts display correctly
- [ ] Responsive layout on mobile
- [ ] Quick actions navigable

### Work Orders
- [ ] Create new work order
- [ ] Status transitions
- [ ] Assign technician
- [ ] View work order details
- [ ] Edit work order
- [ ] Delete work order

### Customers
- [ ] List all customers
- [ ] Create customer
- [ ] Edit customer
- [ ] View customer details
- [ ] Delete customer
- [ ] Search functionality

### Vehicles
- [ ] List all vehicles
- [ ] Create vehicle
- [ ] Edit vehicle (mileage)
- [ ] View vehicle details
- [ ] Delete vehicle
- [ ] Filter by status

### Inventory
- [ ] List all parts
- [ ] Create part
- [ ] Edit stock quantity
- [ ] Low stock alerts
- [ ] Category filtering

### POS
- [ ] Product search
- [ ] Add to cart
- [ ] Calculate totals
- [ ] Process payment
- [ ] Generate receipt
- [ ] Inventory auto-decrement

### CMS
- [ ] Create blog post
- [ ] Edit blog post
- [ ] Publish/unpublish
- [ ] Create FAQ item
- [ ] Edit FAQ item

## 10.3 Known Issues (Fixed)

| Issue | Status | Resolution |
|-------|--------|------------|
| `customers.tsx:374` undefined variable | ✅ Fixed | Changed to `activeCustomers.length` |
| `vehicles.tsx:249` broken refresh button | ✅ Fixed | Removed button (Convex auto-updates) |

---

# 11. Deployment & DevOps

## 11.1 Deployment Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   GitHub    │───►│   Vercel    │───►│ Production  │
│   Push      │    │   Build     │    │   Live      │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Convex     │    │   Next.js   │    │ CDN Edge    │
│  Functions  │    │   Build     │    │ Deployment  │
│  Deploy     │    │   Check     │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 11.2 Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | ⚠️ For payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhooks | ⚠️ For payments |

## 11.3 Deployment Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy Convex functions
npx convex deploy
```

## 11.4 Production URL

**Live:** https://mass-car-workshop-vwms.vercel.app

---

# Appendices

## A. Glossary

| Term | Definition |
|------|------------|
| **DVI** | Digital Vehicle Inspection |
| **CRM** | Customer Relationship Management |
| **POS** | Point of Sale |
| **WO** | Work Order |
| **ARO** | Average Repair Order |
| **GP** | Gross Profit |
| **Zaad** | Telesom mobile money service |
| **eDahab** | Dahabshiil mobile money service |
| **FOB** | Free on Board (shipping term) |
| **Convex** | Real-time backend-as-a-service |

## B. Role Codes (International Standard)

Based on Tekmetric, Mitchell1, and Shop-Ware benchmarks:

### Management
- `SUPER_ADMIN` - System administrator
- `OWNER` - Business owner
- `DEALER_PRINCIPAL` - Dealership principal
- `GENERAL_MANAGER` - General manager
- `SERVICE_MANAGER` - Service department head

### Front Office
- `SERVICE_ADVISOR` - Customer-facing advisor
- `SERVICE_WRITER` - Repair order writer
- `CSR` - Customer service representative
- `CASHIER` - Payment processor

### Technical
- `SHOP_FOREMAN` - Lead technician/supervisor
- `MASTER_TECH` - ASE Master technician
- `DIAG_TECH` - Diagnostic specialist
- `TECH_B` - Journeyman technician
- `TECH_C` - Apprentice technician
- `LUBE_TECH` - Oil change technician
- `DIESEL_TECH` - Diesel specialist
- `EV_TECH` - Electric vehicle specialist

### External
- `CUSTOMER` - Regular customer
- `FLEET_CUSTOMER` - Fleet account
- `VENDOR` - Parts supplier
- `AFFILIATE` - Referral partner

## C. File References

| Document | Path |
|----------|------|
| Schema | `convex/schema.ts` |
| Functions | `convex/functions.ts` |
| Landing Page | `app/page.tsx` |
| Dashboard | `components/dashboard/dashboard.tsx` |
| Sidebar | `components/layout/sidebar.tsx` |
| Seed Data | `lib/data.ts` |

---

**Document Version:** 2.0  
**Last Updated:** January 11, 2026  
**Prepared by:** M2 Creative  
**Contact:** info@mass-oss.com
