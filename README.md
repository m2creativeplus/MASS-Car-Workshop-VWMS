# MASS OSS
## Mobility & Automotive Services – Operating Software System

*Unified Modular & Scalable Vehicle Workshop Management System*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://mass-workshop-v2.vercel.app)

## Overview

MASS OSS (formerly MASS Car Workshop) is an enterprise-grade, Multi-Tenant SaaS platform designed for the Somaliland and East African automotive market. It provides a comprehensive solution for managing workshops, fleets (Somaliland Transportation), and spare parts inventory with "Hargeisa Market" intelligence.

**Architecture:**
- **Frontend:** Next.js 15 (App Router) + React 19
- **Backend:** Convex (Real-time Database & Functions)
- **Styling:** Tailwind CSS + shadcn/ui
- **Tenancy:** Strict Organization-based isolation (`orgId`)

## Key Modules
1. **Fleet Management:** DVI Inspections, Vehicle Registry, History.
2. **Somaliland Transportation:** Market Price Intelligence (Toyota/Suzuki focus), Spare Parts Master.
3. **Operations:** Work Orders (Kanban), Appointments, Time Tracking.
4. **Financials:** Estimates, Invoices, Split Payments (ZAAD/eDahab).

## Deployment

Your project is live at:
**[https://mass-workshop-v2.vercel.app](https://mass-workshop-v2.vercel.app)**

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/m2creativeplus/MASS-Car-Workshop-VWMS.git
    cd MASS-Car-Workshop-VWMS
    ```
    *(Note: We recommend renaming the folder to `MASS OSS` locally)*

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start Convex Dev:
    ```bash
    npx convex dev
    ```

4.  Run the App:
    ```bash
    npm run dev
    ```
