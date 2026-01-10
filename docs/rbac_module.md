# MASS OSS - Role-Based Access Control (RBAC) Module

## International Automotive Workshop Standards

**Benchmarked Against:** Tekmetric, Mitchell1, Shop-Ware, AutoVitals, ShopMonkey  
**Designed For:** 300-450 Somaliland Garages

---

## 1. Industry Standard Role Hierarchy

```
ENTERPRISE LEVEL
├── Super Administrator (Platform Owner)
│
ORGANIZATION LEVEL
├── Shop Owner / Dealer Principal
├── General Manager
│   ├── Service Manager
│   │   ├── Service Advisor / Service Writer
│   │   ├── Parts Manager
│   │   │   └── Parts Counter Staff
│   │   └── Warranty Administrator
│   │
│   ├── Shop Foreman / Lead Technician
│   │   ├── Master Technician (A-Tech)
│   │   ├── Journeyman Technician (B-Tech)
│   │   ├── Apprentice Technician (C-Tech)
│   │   └── Lube Technician / Quick Service Tech
│   │
│   └── Administrative Staff
│       ├── Cashier / Accounts Receivable
│       ├── Receptionist / Customer Service Rep
│       └── Marketing Coordinator
│
EXTERNAL LEVEL
├── Customer (Portal Access)
└── Vendor / Supplier (Portal Access)
```

---

## 2. Complete Role Definitions

### 2.1 Enterprise Roles

| Role | Code | Description |
|------|------|-------------|
| **Super Administrator** | `SUPER_ADMIN` | Platform-wide access, manages all organizations, billing, global settings. M2 Creative only. |

### 2.2 Shop Management Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Shop Owner** | `OWNER` | Full access to everything including billing, P&L, staff management. Business owner. | N/A |
| **Dealer Principal** | `DEALER_PRINCIPAL` | Owner of multi-location dealership network. Full network visibility. | N/A |
| **General Manager** | `GENERAL_MANAGER` | Oversees all operations, can access reports, manage staff, but no billing changes. | $800-1,500/mo |
| **Service Manager** | `SERVICE_MANAGER` | Manages service department, assigns work, approves estimates, handles escalations. | $500-900/mo |

### 2.3 Front Office Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Service Advisor** | `SERVICE_ADVISOR` | Customer-facing role. Creates ROs, writes estimates, communicates with customers, upsells services. | $300-600/mo |
| **Service Writer** | `SERVICE_WRITER` | Alternative title for Service Advisor. Writes detailed repair orders. | $300-600/mo |
| **Customer Service Representative** | `CSR` | Answers phones, schedules appointments, handles inquiries. No access to financials. | $150-300/mo |
| **Receptionist** | `RECEPTIONIST` | Front desk greeting, basic scheduling. Limited system access. | $100-200/mo |
| **Cashier** | `CASHIER` | Processes payments, handles cash drawer, issues receipts. | $150-300/mo |

### 2.4 Parts Department Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Parts Manager** | `PARTS_MANAGER` | Manages inventory, ordering, vendor relationships, parts pricing. | $400-700/mo |
| **Parts Counter Staff** | `PARTS_COUNTER` | Sells parts over counter, locates parts for technicians, handles returns. | $200-400/mo |
| **Warranty Administrator** | `WARRANTY_ADMIN` | Processes warranty claims, tracks manufacturer coverage. | $300-500/mo |

### 2.5 Mechanical Department Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Shop Foreman** | `SHOP_FOREMAN` | Lead tech, supervises all technicians, quality control, work assignment. | $500-800/mo |
| **Master Technician (A-Tech)** | `MASTER_TECH` | Highest skill. Complex diagnostics, engine rebuilds, transmission work. ASE Master equivalent. | $400-700/mo |
| **Diagnostic Technician** | `DIAG_TECH` | Specializes in computer diagnostics, electrical systems, check engine lights. | $350-600/mo |
| **Journeyman Technician (B-Tech)** | `TECH_B` | Experienced. Handles brakes, suspension, A/C, general repairs independently. | $250-450/mo |
| **Apprentice Technician (C-Tech)** | `TECH_C` | Learning. Assists senior techs, handles basic oil changes, tire rotations. | $150-250/mo |
| **Lube Technician** | `LUBE_TECH` | Quick service: oil changes, fluid top-offs, filter replacements. | $100-200/mo |
| **Tire Technician** | `TIRE_TECH` | Tire mounting, balancing, rotation, alignment assistance. | $100-200/mo |
| **Alignment Technician** | `ALIGNMENT_TECH` | Wheel alignment, suspension geometry, steering system specialist. | $200-400/mo |
| **Transmission Technician** | `TRANS_TECH` | Automatic/manual transmission repair, clutch replacement, drivetrain. | $350-600/mo |
| **Diesel Technician** | `DIESEL_TECH` | Diesel engine specialist, injectors, turbo systems, heavy equipment. | $350-600/mo |
| **Hybrid/Electric Technician** | `EV_TECH` | High-voltage systems, battery diagnostics, EV-specific repairs. | $400-700/mo |
| **AC/Heating Technician** | `HVAC_TECH` | Climate control systems, refrigerant handling, heater cores. | $250-450/mo |

### 2.6 Body Shop Department Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Body Shop Manager** | `BODY_SHOP_MGR` | Manages collision center, estimates, insurance claims, staff. | $500-900/mo |
| **Body Shop Estimator** | `BODY_ESTIMATOR` | Writes collision estimates, works with insurance adjusters. | $350-600/mo |
| **Master Body Technician** | `BODY_MASTER` | Expert panel repair, structural repair, frame straightening. | $400-700/mo |
| **Body Technician** | `BODY_TECH` | Dent repair, panel replacement, filler work, sanding. | $250-450/mo |
| **Frame Technician** | `FRAME_TECH` | Structural repair, frame machine operation, unibody repair. | $350-550/mo |
| **Metal Fabricator** | `FABRICATOR` | Custom metal work, rust repair, floor pan replacement. | $300-500/mo |
| **PDR Technician** | `PDR_TECH` | Paintless Dent Repair - removes dents without repainting. | $250-500/mo |
| **Glass Technician** | `GLASS_TECH` | Windshield replacement, power window repair, seals. | $200-400/mo |

### 2.7 Paint Shop Department Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Paint Shop Manager** | `PAINT_SHOP_MGR` | Oversees paint department, color matching, quality control. | $450-800/mo |
| **Master Painter** | `PAINTER_MASTER` | Expert refinish work, custom painting, specialty finishes. | $400-700/mo |
| **Painter** | `PAINTER` | Base coat/clear coat application, single stage paint, blending. | $300-500/mo |
| **Prep Technician** | `PREP_TECH` | Surface preparation, masking, sanding, priming. | $200-350/mo |
| **Paint Mixer / Colorist** | `COLORIST` | Color matching, paint mixing, variant formulation. | $250-400/mo |
| **Buffer / Polisher** | `BUFFER` | Final finish work, buffing, polishing, wet sanding. | $150-300/mo |

### 2.8 Specialty Technician Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Upholstery Technician** | `UPHOLSTERY_TECH` | Seat repair, headliner, carpet, leather restoration. | $200-400/mo |
| **Audio/Electronics Installer** | `AUDIO_TECH` | Car audio, alarms, remote start, GPS, camera systems. | $200-400/mo |
| **Tint Technician** | `TINT_TECH` | Window tinting, paint protection film (PPF) installation. | $150-350/mo |
| **Detailer** | `DETAILER` | Interior/exterior cleaning, polishing, waxing, ceramic coating. | $100-250/mo |
| **Wraps Installer** | `WRAP_TECH` | Vinyl wrap installation, graphics, decals, color change. | $250-450/mo |
| **Welder** | `WELDER` | MIG/TIG welding, exhaust fabrication, structural welding. | $250-450/mo |
| **Motorcycle Technician** | `MOTO_TECH` | Motorcycle repair, ATV, small engine specialist. | $200-400/mo |

### 2.9 Support Staff Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Lot Attendant** | `LOT_ATTENDANT` | Moves vehicles, keeps lot organized, basic cleaning. | $80-150/mo |
| **Stock Clerk** | `STOCK_CLERK` | Receives parts, stocks shelves, inventory organization. | $100-200/mo |
| **Shop Helper** | `SHOP_HELPER` | General shop assistance, cleaning, tool organization. | $80-150/mo |
| **Driver / Porter** | `DRIVER` | Shuttle driver, parts runner, customer transport. | $100-200/mo |
| **Tow Truck Operator** | `TOW_OPERATOR` | Vehicle recovery, roadside assistance, flatbed operation. | $200-400/mo |

### 2.10 Administrative Roles

| Role | Code | Description | Typical Salary (SL) |
|------|------|-------------|---------------------|
| **Accounts Receivable Clerk** | `AR_CLERK` | Manages customer payments, follows up on outstanding invoices. | $200-400/mo |
| **Accounts Payable Clerk** | `AP_CLERK` | Pays suppliers, manages expenses, reconciles accounts. | $200-400/mo |
| **Insurance Coordinator** | `INSURANCE_COORD` | Works with insurance companies, processes claims, supplements. | $300-500/mo |
| **Marketing Coordinator** | `MARKETING` | Manages campaigns, social media, customer retention programs. | $300-500/mo |
| **HR Administrator** | `HR_ADMIN` | Manages employee records, time tracking, payroll coordination. | $300-500/mo |
| **Training Coordinator** | `TRAINING` | Staff development, certification tracking, safety training. | $250-450/mo |

### 2.11 External Roles

| Role | Code | Description |
|------|------|-------------|
| **Customer** | `CUSTOMER` | Portal access to view vehicles, history, approve estimates, book appointments. |
| **Fleet Customer** | `FLEET_CUSTOMER` | Business customer managing multiple vehicles, bulk pricing. |
| **Insurance Adjuster** | `ADJUSTER` | External insurance rep with limited view access for claims. |
| **Vendor / Supplier** | `VENDOR` | Supplier portal access to view/fulfill purchase orders, update pricing. |
| **Affiliate Partner** | `AFFILIATE` | Referral partner access to track commissions and referrals. |
| **Manufacturer Rep** | `MFG_REP` | Factory representative with warranty/recall access. |

---

## 3. Permissions Matrix (Industry Standard)

### 3.1 Core Permissions

| Permission | Owner | GM | SM | SA | Tech | Parts | Cashier | Customer |
|------------|-------|----|----|----| -----|-------|---------|----------|
| **Dashboard View** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| **Revenue Metrics** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Profit Margins** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 3.2 Customer Management

| Permission | Owner | GM | SM | SA | Tech | Parts | Cashier | Customer |
|------------|-------|----|----|----| -----|-------|---------|----------|
| **View All Customers** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Create Customer** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Edit Customer** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Delete Customer** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **View Own Profile** | - | - | - | - | - | - | - | ✅ |

### 3.3 Vehicle Management

| Permission | Owner | GM | SM | SA | Tech | Parts | Cashier | Customer |
|------------|-------|----|----|----| -----|-------|---------|----------|
| **View All Vehicles** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **Add Vehicle** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Own Vehicles** | - | - | - | - | - | - | - | ✅ |

### 3.4 Repair Orders / Work Orders

| Permission | Owner | GM | SM | SA | Tech | Parts | Cashier | Customer |
|------------|-------|----|----|----| -----|-------|---------|----------|
| **View All ROs** | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ | ⚠️ | ❌ |
| **View Assigned ROs** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Create RO** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Edit RO** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **Assign Technician** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Close RO** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Void RO** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 3.5 Inspections (DVI)

| Permission | Owner | GM | SM | SA | Foreman | Tech | Customer |
|------------|-------|----|----|----| --------|------|----------|
| **Create Template** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Perform Inspection** | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ |
| **Approve Inspection** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ |

### 3.6 Estimates & Invoicing

| Permission | Owner | GM | SM | SA | Tech | Cashier | Customer |
|------------|-------|----|----|----| -----|---------|----------|
| **Create Estimate** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Approve Estimate (Customer)** | - | - | - | - | - | - | ✅ |
| **Override Pricing** | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **Create Invoice** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Process Payment** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Void Invoice** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Apply Discount** | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |

### 3.7 Inventory / Parts

| Permission | Owner | GM | SM | Parts Mgr | Parts Counter | Tech | Cashier |
|------------|-------|----|----|-----------|---------------|------|---------|
| **View Inventory** | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| **Add Parts** | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ | ❌ |
| **Adjust Stock** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Set Pricing** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Create PO** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| **Receive PO** | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ | ❌ |

### 3.8 Financial / Reports

| Permission | Owner | GM | SM | SA | AR Clerk | Cashier |
|------------|-------|----|----|----| ---------|---------|
| **View P&L** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Expenses** | ✅ | ✅ | ⚠️ | ❌ | ✅ | ❌ |
| **Create Expense** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **View AR Aging** | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| **Export Reports** | ✅ | ✅ | ✅ | ❌ | ⚠️ | ❌ |

### 3.9 System Administration

| Permission | Owner | GM | SM | All Others |
|------------|-------|----|----|------------|
| **Manage Users** | ✅ | ✅ | ⚠️ | ❌ |
| **System Settings** | ✅ | ⚠️ | ❌ | ❌ |
| **Billing/Subscription** | ✅ | ❌ | ❌ | ❌ |
| **CMS Control** | ✅ | ✅ | ⚠️ | ❌ |
| **API Access** | ✅ | ✅ | ❌ | ❌ |
| **Audit Log View** | ✅ | ✅ | ✅ | ❌ |

**Legend:** ✅ Full Access | ⚠️ Limited/Read Only | ❌ No Access

---

## 4. Role Mapping: Somaliland to International

| Somaliland Term | Standard Title | Code |
|-----------------|---------------|------|
| Milkiile (Owner) | Shop Owner | `OWNER` |
| Maamule (Manager) | General Manager | `GENERAL_MANAGER` |
| Qofka Adeega | Service Advisor | `SERVICE_ADVISOR` |
| Makaanikada (Mechanic) | Technician | `TECH_B` |
| Xirfadle Sare | Master Technician | `MASTER_TECH` |
| Xirfadle Cusub | Apprentice | `TECH_C` |
| Lacag Qaade | Cashier | `CASHIER` |
| Macmiil | Customer | `CUSTOMER` |
| Qaybiyaha Spare | Parts Counter | `PARTS_COUNTER` |

---

## 5. Role Assignment Best Practices

### 5.1 Small Shop (1-3 people)

```
RECOMMENDED ROLES:
├── 1 Owner (full access)
├── 1 Tech (work access only)
└── 0-1 Customer Service Rep
```

### 5.2 Medium Shop (4-8 people)

```
RECOMMENDED ROLES:
├── 1 Owner
├── 1 Service Manager
├── 1-2 Service Advisors
├── 2-4 Technicians (mixed levels)
└── 1 Parts Counter
```

### 5.3 Large Shop (9+ people)

```
RECOMMENDED ROLES:
├── 1 Owner (may be absent)
├── 1 General Manager
├── 1 Service Manager
├── 2-3 Service Advisors
├── 1 Shop Foreman
├── 4-6 Technicians
├── 1 Parts Manager
├── 1-2 Parts Counter
├── 1 Cashier
└── 1 Receptionist
```

---

## 6. Security Controls

### 6.1 Authentication Requirements by Role

| Role Level | Password Policy | Session Timeout | 2FA Required |
|------------|-----------------|-----------------|--------------|
| Owner/GM | Strong (12+ chars) | 4 hours | Recommended |
| Manager | Strong | 4 hours | Optional |
| Staff | Standard (8+ chars) | 8 hours | No |
| Technician | Standard | 8 hours | No |
| Customer | Standard | 24 hours | No |

### 6.2 Audit Logging

**All roles logged for:**
- Login/logout
- Data creation/modification/deletion
- Payment processing
- High-value actions (>$500)

---

## 7. Onboarding Templates

### 7.1 New Service Advisor Checklist

```
□ Create account (SERVICE_ADVISOR role)
□ Assign to location
□ Train on:
  □ Customer check-in
  □ Work order creation
  □ Estimate building
  □ Customer communication
  □ Payment processing
□ Shadow senior SA for 1 week
□ Handle supervised customers
□ Full access granted
```

### 7.2 New Technician Checklist

```
□ Create account (TECH_C or TECH_B role)
□ Assign to shop foreman
□ Train on:
  □ Viewing assigned jobs
  □ DVI inspection app
  □ Photo documentation
  □ Time clock
  □ Parts requests
□ Complete first job supervised
□ Skill assessment
□ Appropriate role assigned
```

---

**MASS OSS RBAC** - Enterprise-Grade Access Control 🔐

*Compliant with: ISO 27001 Access Control Principles*
