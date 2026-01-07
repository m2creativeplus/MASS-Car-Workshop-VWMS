# MASS OSS (Mobility & Automotive Services – Operating Software System)
## Complete Technical Documentation

---

## 📋 Executive Summary

**MASS OSS** is a comprehensive, enterprise-grade Vehicle Workshop Management System designed to digitize and streamline all aspects of automotive service center operations. Built with modern web technologies, it provides a complete solution for managing customers, vehicles, appointments, work orders, inventory, technicians, and reporting.

### Key Highlights
- 🚗 **26+ Integrated Modules** - Complete workshop operations coverage
- 🔐 **Multi-Tenancy** - Organization-based data isolation (`orgId`)
- 📊 **Real-Time Analytics** - Revenue tracking, performance metrics via Convex
- 🌍 **Somaliland Focus** - "Hargeisa Market" pricing and "Somaliland Transportation" fleet management
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 15.2.6 |
| **UI Library** | React | 19 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.4.17 |
| **UI Components** | Radix UI + shadcn/ui | Latest |
| **Backend/Database** | **Convex** | ^1.31.2 |
| **Auth** | Convex Auth / Clerk | Integrated |
| **Icons** | Lucide React | 0.454.0 |

---

## 🏗️ Architecture Overview

### Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 Frontend                       │
│  App Router → Layout → Providers → Components               │
├─────────────────────────────────────────────────────────────┤
│                 Convex Client Layer                          │
│  useQuery / useMutation → Type-Safe React Hooks             │
├─────────────────────────────────────────────────────────────┤
│                  Backend - Convex                            │
│  Functions (ts) → Schema Validation → Real-time Database    │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
MASS OSS/
├── app/                          # Next.js App Router
├── components/                   # Feature Components
│   ├── dashboard/                # Main Dashboard
│   ├── work-orders/              # Kanban Board
│   ├── inventory/                # Parts & POS
│   └── ui/                       # shadcn/ui Components
├── convex/                       # Backend Logic
│   ├── schema.ts                 # Database Schema (26 Tables)
│   ├── functions.ts              # API Functions
│   └── auth.ts                   # Authentication Config
├── lib/                          # Utilities
├── public/                       # Static Assets
└── package.json                  # Dependencies
```

---

## 🗃️ Database Schema (Convex)

The system uses a **relational-style** schema in Convex with strict runtime validation.

### Core Tables
1.  **Organizations:** Tenants with `slug` and `plan`.
2.  **Users:** Linked to orgs via `userOrgRoles`.
3.  **Customers:** CRM with `customerNumber` and `phone`.
4.  **Vehicles:** Fleet registry with `vin`, `plate`, `make`, `model`.

### Operations Tables
5.  **Appointments:** Scheduling with status workflow.
6.  **WorkOrders:** Job cards with `services`, `labor`, `parts`.
7.  **Inspections:** DVI with `items`, `photos`, `safetyRating`.
8.  **Estimates/Invoices:** Financials with `lineItems`.

### Somaliland Transportation Tables
9.  **SparePartsMaster:** "Toyota 2KD" engine parts, "Hargeisa" pricing.
10. **MarketPriceIntelligence:** "Be Forward" vs "Street Price" comparisons.
11. **Payments:** Supports `ZAAD`, `eDahab`, and `Cash`.

---

## 🚀 Deployment Guide

### Environment Variables
To run locally or deploy, configure `.env.local`:

```bash
# Convex Deployment
CONVEX_DEPLOYMENT=dev:your-project-name

# Public URL
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### Quick Run
```bash
npm install
npx convex dev
npm run dev
```

---

*© 2026 MASS OSS. All rights reserved.*
