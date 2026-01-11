# MASS OSS - Complete Module Features & Functionality

**Version:** 1.0  
**Last Updated:** January 11, 2026

---

## Module Overview

MASS OSS contains **32 dashboard modules** organized into functional categories. This document details every feature, user flow, and capability.

---

# 1. CORE OPERATIONS MODULES

## 1.1 Dashboard (Home)

**Route:** `/dashboard`  
**Component:** `components/dashboard/dashboard.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| KPI Cards | 4 stat cards with real-time metrics | ✅ Active |
| Monthly Repairs Chart | Area chart showing repair trends | ✅ Active |
| Work Order Donut | Status distribution pie chart | ✅ Active |
| Recent Activity | Live feed of recent actions | ✅ Active |
| Quick Actions | Shortcut buttons to common tasks | ✅ Active |
| Owner Financial View | Revenue/profit cards (owner only) | ✅ Active |

### KPI Cards
1. **Parts In Stock** - Total inventory with weekly trend
2. **Customers** - Active customer count with new today
3. **Cars In Stock** - Vehicles with active status
4. **Mechanics** - Technician headcount

### Data Sources
- Static data from `lib/data.ts` (demo mode)
- Real-time when Convex queries active

---

## 1.2 Work Orders

**Route:** `/dashboard/work-orders`  
**Component:** `components/work-orders/work-orders.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Create Work Order | New job card form | ✅ Active |
| Edit Work Order | Modify existing job | ✅ Active |
| Status Workflow | 8-stage pipeline | ✅ Active |
| Technician Assignment | Assign mechanic to job | ✅ Active |
| Parts Linking | Add parts to job | ✅ Active |
| Labor Time Tracking | Hours worked | ✅ Active |
| Customer Notes | Communication log | ✅ Active |
| Priority Levels | Low/Normal/High/Urgent | ✅ Active |

### Status Pipeline

```
CHECK-IN → INSPECTING → AWAITING APPROVAL → IN PROGRESS 
                                                ↓
          CANCELLED ← WAITING PARTS ← COMPLETE → INVOICED
```

### User Flows

**Create Work Order:**
1. Click "New Work Order" button
2. Select customer from dropdown
3. Select vehicle from customer's vehicles
4. Enter service type and customer complaint
5. Assign technician (optional)
6. Set priority level
7. Click "Create"

**Status Transition:**
1. Click on work order row
2. Use status dropdown to change
3. Add notes if required
4. Confirm transition

---

## 1.3 Appointments

**Route:** `/dashboard/appointments`  
**Component:** `components/appointments/appointments.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Calendar View | Month/week/day views | ✅ Active |
| Create Appointment | Schedule new booking | ✅ Active |
| Edit Appointment | Modify existing | ✅ Active |
| Status Tracking | Scheduled/Confirmed/Completed | ✅ Active |
| Duration Setting | Estimate service time | ✅ Active |
| Reminder System | SMS/Email alerts | 🔄 Planned |
| Technician Assignment | Book specific mechanic | ✅ Active |

### Appointment Statuses
- `scheduled` - Initial booking
- `confirmed` - Customer confirmed
- `in-progress` - Service started
- `completed` - Service finished
- `cancelled` - Appointment cancelled
- `no-show` - Customer didn't arrive

---

## 1.4 Customers

**Route:** `/dashboard/customers`  
**Component:** `components/customers/customers.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Customer List | Paginated table view | ✅ Active |
| Create Customer | Add new contact | ✅ Active |
| Edit Customer | Update details | ✅ Active |
| Delete Customer | Remove record | ✅ Active |
| View Detail | Full profile modal | ✅ Active |
| Vehicle Linking | See customer's cars | ✅ Active |
| Search | Filter by name/email/phone | ✅ Active |
| Active/Inactive Toggle | Status management | ✅ Active |

### Customer Fields
- First Name (required)
- Last Name (required)
- Email
- Phone
- Address
- City
- Country (default: Somaliland)
- Preferred Contact Method
- Notes

---

## 1.5 Vehicles

**Route:** `/dashboard/vehicles`  
**Component:** `components/vehicles/vehicles.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Vehicle List | Grid/table view | ✅ Active |
| Create Vehicle | Add new vehicle | ✅ Active |
| Edit Vehicle | Update mileage/status | ⚠️ Limited |
| Delete Vehicle | Remove record | ✅ Active |
| Status Filter | Active/In-Service/Delivered | ✅ Active |
| VIN Tracking | Unique identifier | ✅ Active |
| Owner Linking | Connect to customer | ✅ Active |

### Vehicle Fields
- Make (required) - Toyota, Honda, Nissan, etc.
- Model (required)
- Year (required)
- VIN
- License Plate
- Color
- Engine Type
- Transmission
- Fuel Type
- Mileage
- Last Service Date
- Insurance Expiry
- Registration Expiry

### Limitation Note
⚠️ Currently `updateVehicle` mutation only supports: mileage, status, lastServiceDate

---

## 1.6 Estimates (Quotations)

**Route:** `/dashboard/estimates`  
**Component:** `app/dashboard/estimates/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Create Estimate | Build quote from inspection | 🔄 Placeholder |
| Line Items | Parts + labor breakdown | 🔄 Placeholder |
| Customer Approval | Send for approval | 🔄 Placeholder |
| Convert to Invoice | One-click conversion | 🔄 Planned |
| Expiry Dates | Quote validity period | 🔄 Planned |
| PDF Export | Print-ready quotes | 🔄 Planned |

### Estimate Statuses
- `draft` - Work in progress
- `sent` - Sent to customer
- `viewed` - Customer opened
- `approved` - Customer accepted
- `declined` - Customer rejected
- `expired` - Past validity date
- `revised` - New version created

---

## 1.7 Inspections (DVI)

**Route:** `/dashboard/inspections`  
**Component:** `app/dashboard/inspections/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-Point Inspection | 50+ item checklist | 🔄 Placeholder |
| Photo Capture | Visual evidence | 🔄 Planned |
| Condition Rating | OK/Attention/Immediate | 🔄 Planned |
| Customer Report | Shareable link | 🔄 Planned |
| Template Selection | Pre-built checklists | 🔄 Planned |
| Safety Rating | Safe/Attention/Unsafe | 🔄 Planned |

### Inspection Categories
1. Exterior Body
2. Interior Cabin
3. Under Hood (Engine)
4. Under Vehicle
5. Brakes & Suspension
6. Tires & Wheels
7. Electrical & Lighting
8. Fluids & Filters

---

## 1.8 Check-In

**Route:** `/dashboard/check-in`  
**Component:** `app/dashboard/check-in/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Quick Check-In | Start service workflow | ✅ Active |
| Customer Lookup | Find by phone/plate | ✅ Active |
| Vehicle Selection | Pick from customer cars | ✅ Active |
| Photo Capture | Document arrival condition | ✅ Active |
| Mileage Entry | Record current reading | ✅ Active |
| Service Type Selection | Choose service needed | ✅ Active |

---

# 2. INVENTORY & SALES MODULES

## 2.1 Inventory (Parts Stock)

**Route:** `/dashboard/inventory`  
**Component:** `components/inventory/inventory.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Parts List | Searchable catalog | ✅ Active |
| Add Part | Create new SKU | ✅ Active |
| Edit Part | Update stock/price | ✅ Active |
| Delete Part | Remove item | ✅ Active |
| Low Stock Alerts | Reorder notifications | ✅ Active |
| Category Filter | Engine/Brakes/Filters | ✅ Active |
| Barcode Support | Scan tracking | ✅ Active |
| Supplier Linking | Vendor association | ✅ Active |

### Inventory Fields
- Part Number (required)
- Name (required)
- Description
- Category
- Subcategory
- Brand
- Supplier
- Cost Price
- Selling Price
- Stock Quantity
- Min Stock Level
- Max Stock Level
- Reorder Point
- Unit of Measure
- Barcode
- Location
- Condition (New/Used/Refurbished)

---

## 2.2 POS (Point of Sale)

**Route:** `/dashboard/pos`  
**Component:** `components/pos/pos.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Product Search | Find by name/part number | ✅ Active |
| Cart Management | Add/remove items | ✅ Active |
| Quantity Adjustment | Update counts | ✅ Active |
| Total Calculation | Auto subtotal/tax/total | ✅ Active |
| Payment Methods | Cash/Zaad/eDahab/Card | ✅ Active |
| Receipt Generation | Sale confirmation | ✅ Active |
| Inventory Decrement | Auto-reduce stock | ✅ Active |

### Payment Methods
| Method | Type | Status |
|--------|------|--------|
| Cash | Physical | ✅ Active |
| Zaad | Mobile Money (Telesom) | ✅ Active |
| eDahab | Mobile Money (Dahabshiil) | ✅ Active |
| Card | Credit/Debit | ✅ Active |
| Bank Transfer | Wire | ✅ Active |

### POS Workflow
1. Search for product
2. Add to cart
3. Adjust quantities
4. Apply discounts (if any)
5. Select payment method
6. Enter payment reference
7. Complete sale
8. Stock auto-decremented
9. Receipt generated

---

## 2.3 Catalog

**Route:** `/dashboard/catalog`  
**Component:** `app/dashboard/catalog/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Parts Catalog | Browse all parts | 🔄 Placeholder |
| Category Navigation | Explore by type | 🔄 Planned |
| Price Display | Cost + markup | 🔄 Planned |
| Compatibility | Vehicle fitment | 🔄 Planned |
| Image Gallery | Part photos | 🔄 Planned |

---

## 2.4 Market (Marketplace)

**Route:** `/dashboard/market`  
**Component:** `app/dashboard/market/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Vehicle Listings | Cars for sale | ✅ Active |
| Price Comparisons | Market intelligence | ✅ Active |
| BE FORWARD Integration | Japan import pricing | ✅ Active |
| Local Market Data | Street prices | ✅ Active |

---

# 3. IMPORTS & SUPPLY CHAIN

## 3.1 Japan Imports

**Route:** `/dashboard/japan-imports`  
**Component:** `app/dashboard/japan-imports/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Import Tracking | Shipment status | ✅ Active |
| FOB Pricing | Japan auction prices | ✅ Active |
| Landed Cost Calculator | Total import cost | ✅ Active |
| Vehicle Listings | Available imports | ✅ Active |
| Documentation | Import paperwork | ✅ Active |

### Cost Calculation
```
Landed Cost = FOB Price × 1.25 + $20 (shipping estimate)
```

---

## 3.2 Suppliers

**Route:** `/dashboard/suppliers`  
**Component:** `app/dashboard/suppliers/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Supplier List | Vendor database | 🔄 Placeholder |
| Contact Details | Phone/email/address | 🔄 Planned |
| Credit Terms | Payment conditions | 🔄 Planned |
| Purchase History | Order records | 🔄 Planned |
| Rating System | Vendor scoring | 🔄 Planned |

---

## 3.3 Import Duty Calculator

**Route:** `/tools/import-duty`  
**Component:** `app/tools/import-duty/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Vehicle Value Input | FOB price | ✅ Active |
| Duty Calculation | Customs fees | ✅ Active |
| Total Cost Display | All-in pricing | ✅ Active |

---

# 4. GROWTH & MARKETING

## 4.1 Affiliates

**Route:** `/dashboard/affiliates`  
**Component:** `app/dashboard/affiliates/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Affiliate List | Partner registry | ✅ Active |
| Referral Codes | Unique tracking codes | ✅ Active |
| Commission Tracking | Earnings calculation | ✅ Active |
| Payout Management | Payment processing | 🔄 Planned |
| Performance Stats | Referral metrics | ✅ Active |

---

## 4.2 Marketing

**Route:** `/dashboard/marketing`  
**Component:** `app/dashboard/marketing/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Campaign Manager | Create campaigns | ✅ Active |
| SMS Marketing | Bulk messaging | 🔄 Planned |
| Email Campaigns | Newsletter sending | 🔄 Planned |
| Audience Segments | Target groups | 🔄 Planned |
| Analytics | Campaign performance | 🔄 Planned |

---

## 4.3 Declined Jobs

**Route:** `/dashboard/declined-jobs`  
**Component:** `app/dashboard/declined-jobs/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Declined List | Rejected estimates | ✅ Active |
| Revenue Lost | Potential value | ✅ Active |
| Follow-Up Actions | Re-engagement tasks | 🔄 Planned |
| Conversion Tracking | Won-back jobs | 🔄 Planned |
| Reason Analysis | Why declined | 🔄 Planned |

---

# 5. KNOWLEDGE & AI

## 5.1 Knowledge Base

**Route:** `/dashboard/knowledge-base`  
**Component:** `app/dashboard/knowledge-base/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Article Library | Tech documentation | ✅ Active |
| Category Navigation | Topic grouping | ✅ Active |
| Search | Keyword lookup | ✅ Active |
| Rich Content | Markdown support | ✅ Active |

---

## 5.2 Blog & News

**Route:** `/dashboard/blog`  
**Component:** `components/blog/blog.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Create Post | New article | ✅ Active |
| Edit Post | Modify content | ✅ Active |
| Delete Post | Remove article | ✅ Active |
| Publish/Unpublish | Visibility toggle | ✅ Active |
| Featured Image | Hero image upload | ✅ Active |
| Categories/Tags | Organization | ✅ Active |
| Dynamic Routing | `/blog/[slug]` pages | ✅ Active |

---

## 5.3 AI Assistant

**Route:** `/dashboard/ai-tools`  
**Component:** `app/dashboard/ai-tools/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Chat Interface | Conversational AI | 🔄 Placeholder |
| Technical Q&A | Repair questions | 🔄 Planned |
| Parts Lookup | Find components | 🔄 Planned |
| Diagnostic Help | Fault analysis | 🔄 Planned |

---

## 5.4 AI Diagnostics

**Route:** `/dashboard/diagnostics`  
**Component:** `app/dashboard/diagnostics/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Problem Analyzer | Symptom input | 🔄 Placeholder |
| Fault Suggestions | Possible causes | 🔄 Planned |
| OBD-II Codes | DTC lookup | 🔄 Planned |
| Repair Guides | Fix instructions | 🔄 Planned |

---

# 6. PORTALS

## 6.1 Customer Portal

**Route:** `/dashboard/portal` and `/portal/demo`  
**Component:** Multiple

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Vehicle View | My vehicles | ✅ Active |
| Appointment Booking | Schedule service | ✅ Active |
| Invoice History | Payment records | ✅ Active |
| Repair Status | Track work orders | ✅ Active |
| DVI Reports | Inspection results | 🔄 Planned |

---

## 6.2 Vendor Dashboard

**Route:** `/dashboard/vendor`  
**Component:** `app/dashboard/vendor/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Order Management | Incoming POs | ✅ Active |
| Product Catalog | Offered parts | 🔄 Planned |
| Invoice Submission | Billing portal | 🔄 Planned |
| Performance Metrics | Sales stats | 🔄 Planned |

---

## 6.3 Support Center

**Route:** `/dashboard/support`  
**Component:** `app/dashboard/support/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Ticket System | Support requests | ✅ Active |
| FAQ Access | Common questions | ✅ Active |
| Live Chat | Real-time support | 🔄 Planned |
| Knowledge Search | Article lookup | ✅ Active |

---

# 7. CMS & CONTENT

## 7.1 CMS Control Hub

**Route:** `/dashboard/cms`  
**Component:** `app/dashboard/cms/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Dashboard | Content overview | ✅ Active |
| Quick Stats | Post/FAQ counts | ✅ Active |
| Navigation | Link to sub-modules | ✅ Active |

---

## 7.2 Blog CMS

**Route:** `/dashboard/cms/blog`  
**Component:** `app/dashboard/cms/blog/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Post List | All articles table | ✅ Active |
| Create Post | Rich text editor | ✅ Active |
| Edit Post | Modify content | ✅ Active |
| Delete Post | Remove article | ✅ Active |
| SEO Fields | Meta title/description | ✅ Active |

---

## 7.3 FAQ CMS

**Route:** `/dashboard/cms/faq`  
**Component:** `app/dashboard/cms/faq/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| FAQ List | All Q&A pairs | ✅ Active |
| Create FAQ | Add new Q&A | ✅ Active |
| Edit FAQ | Modify content | ✅ Active |
| Delete FAQ | Remove item | ✅ Active |
| Ordering | Sort by category | ✅ Active |

---

## 7.4 Pages CMS

**Route:** `/dashboard/cms/pages`  
**Component:** `app/dashboard/cms/pages/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Page List | All dynamic pages | ✅ Active |
| Create Page | New content page | ✅ Active |
| Edit Page | Modify content | ✅ Active |
| Slug Management | URL control | ✅ Active |

---

# 8. ADMIN & SETTINGS

## 8.1 Settings

**Route:** `/dashboard/settings`  
**Component:** `app/dashboard/settings/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Company Profile | Business info | ✅ Active |
| Tax Settings | VAT/tax rates | ✅ Active |
| User Management | Staff accounts | ✅ Active |
| Email Templates | Notification content | 🔄 Planned |
| Payment Settings | Gateway config | 🔄 Planned |

---

## 8.2 Locations

**Route:** `/dashboard/locations`  
**Component:** `app/dashboard/locations/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Location List | Multi-location support | ✅ Active |
| Add Location | New branch | ✅ Active |
| Edit Location | Update details | ✅ Active |
| Bay Management | Service bays | 🔄 Planned |

---

## 8.3 Reports

**Route:** `/dashboard/reports`  
**Component:** `app/dashboard/reports/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Revenue Report | Income summary | ✅ Active |
| Technician Report | Tech productivity | ✅ Active |
| Inventory Report | Stock levels | ✅ Active |
| Customer Report | CRM analytics | ✅ Active |
| Date Filtering | Custom ranges | ✅ Active |
| Export | PDF/Excel download | 🔄 Planned |

---

## 8.4 Export Center

**Route:** `/dashboard/export`  
**Component:** `app/dashboard/export/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Data Export | Bulk download | ✅ Active |
| Format Selection | CSV/JSON/Excel | ✅ Active |
| Table Selection | Choose data | ✅ Active |
| Scheduled Export | Automated | 🔄 Planned |

---

# 9. TEMPLATES & SETUP

## 9.1 Canned Jobs

**Route:** `/dashboard/canned-jobs`  
**Component:** `app/dashboard/canned-jobs/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Service Packages | Pre-built services | ✅ Active |
| Quick Add | One-click to estimate | 🔄 Planned |
| Parts Bundles | Included components | 🔄 Planned |
| Labor Hours | Time estimates | 🔄 Planned |

### Sample Canned Jobs
- Oil Change Basic
- Full Service A
- Full Service B
- Brake Pad Replacement
- Timing Belt Kit
- AC Service

---

## 9.2 DVI Templates

**Route:** `/dashboard/inspection-templates`  
**Component:** `app/dashboard/inspection-templates/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Template List | Inspection checklists | ✅ Active |
| Create Template | Custom checklist | 🔄 Planned |
| Edit Template | Modify items | 🔄 Planned |
| Clone Template | Duplicate | 🔄 Planned |

---

## 9.3 Technicians

**Route:** `/dashboard/technicians`  
**Component:** `app/dashboard/technicians/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Technician Profiles | Staff directory | ✅ Active |
| Specialty Tracking | Skills matrix | ✅ Active |
| Availability Status | Online/busy/offline | ✅ Active |
| Performance Metrics | Job count/rating | ✅ Active |

---

## 9.4 Network (Partners)

**Route:** `/dashboard/network`  
**Component:** `app/dashboard/network/page.tsx`

### Features

| Feature | Description | Status |
|---------|-------------|--------|
| Partner Directory | B2B contacts | ✅ Active |
| Category Filter | Type grouping | ✅ Active |
| Contact Info | Phone/email | ✅ Active |
| Partnership Status | Active/prospect | ✅ Active |

---

# 10. Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Active | Feature is fully implemented and working |
| ⚠️ Limited | Feature exists but with restrictions |
| 🔄 Placeholder | UI exists, backend not connected |
| 🔄 Planned | On roadmap, not yet started |

---

**Document Version:** 1.0  
**Last Updated:** January 11, 2026
