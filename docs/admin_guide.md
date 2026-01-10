# MASS OSS - System Administration Guide

## Configuration & Setup for 300-450 Garages

---

## 1. Initial System Setup

### 1.1 New Organization Registration

```
REGISTRATION FLOW:
1. Visit: https://mass-car-workshop-vwms.vercel.app
2. Click "Get Started"
3. Enter:
   ├── Business Name
   ├── Owner Name
   ├── Email
   ├── Phone (ZAAD/eDahab number)
   └── City (Hargeisa/Burao/Berbera/etc.)
4. Verify via SMS code
5. Set password
6. Complete setup wizard
```

### 1.2 Setup Wizard Steps

| Step | Action | Time |
|------|--------|------|
| 1 | Business profile | 2 min |
| 2 | Upload logo | 1 min |
| 3 | Add services | 3 min |
| 4 | Set labor rates | 2 min |
| 5 | Add technicians | 2 min |
| 6 | Payment methods | 1 min |

---

## 2. System Configuration

### 2.1 Business Settings (Settings → General)

| Setting | Description | Default |
|---------|-------------|---------|
| Business Name | Displayed on invoices | Required |
| Address | Physical location | Required |
| Phone | Contact number | Required |
| Email | For notifications | Required |
| Logo | 500x500px recommended | Optional |
| Tax Number | For invoices | Optional |

### 2.2 Operational Settings

```
LABOR RATES:
├── Standard Rate: $15/hour (default)
├── Diagnostic Rate: $25/hour
└── Emergency Rate: $30/hour

TAX CONFIGURATION:
├── Tax Name: "VAT" or "Sales Tax"
├── Tax Rate: 5% (configurable)
└── Apply to: Parts / Labor / Both

BUSINESS HOURS:
├── Weekdays: 8:00 AM - 6:00 PM
├── Saturday: 8:00 AM - 2:00 PM
└── Sunday: Closed
```

### 2.3 Payment Configuration

```
ACCEPTED METHODS:
├── Cash: ✅ Enabled (always)
├── ZAAD: ✅ Enabled
│   └── Number: 063-XXX-XXXX
├── eDahab: ✅ Enabled
│   └── Number: 065-XXX-XXXX
├── Card: ⚠️ Coming soon
└── Bank: ✅ Enabled
    └── Account: XXXX-XXXX
```

---

## 3. Pricing & Subscriptions

### 3.1 Available Plans

| Plan | Monthly | Annual | Best For |
|------|---------|--------|----------|
| **Starter** | $19/mo | $180/yr | 1-2 staff, basics |
| **Professional** | $29/mo | $280/yr | 3-5 staff, full features |
| **Enterprise** | $49/mo | $470/yr | 6+ staff, multi-location |

### 3.2 Plan Features Comparison

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Users | 3 | 10 | Unlimited |
| Vehicles | 500 | 2,000 | Unlimited |
| Work Orders | 100/mo | 500/mo | Unlimited |
| DVI Inspections | ✅ | ✅ | ✅ |
| Estimates | ✅ | ✅ | ✅ |
| Invoices | ✅ | ✅ | ✅ |
| Marketing | ❌ | ✅ | ✅ |
| Affiliates | ❌ | ✅ | ✅ |
| Japan Imports | ❌ | ✅ | ✅ |
| Multi-Location | ❌ | ❌ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |

### 3.3 Payment Methods for Subscription

```
ZAAD: *712*MERCHANT#amount#
eDahab: Dial *898*MERCHANT#amount#
Bank: Transfer to MASS OSS account
```

---

## 4. Multi-Location Management

### 4.1 Adding New Location

```
1. Settings → Locations → Add Location
2. Enter:
   ├── Location Name
   ├── Address
   ├── Phone
   └── Manager (user)
3. Configure:
   ├── Inventory (shared or separate)
   ├── Pricing (same or different)
   └── Staff assignments
4. Save & Activate
```

### 4.2 Network Settings

| Setting | Options |
|---------|---------|
| Inventory Mode | Shared / Separate |
| Customer Database | Shared (always) |
| Pricing Rules | Global / Per-Location |
| Staff Access | Location-specific |
| Reporting | Consolidated / Separate |

---

## 5. Data Management

### 5.1 Import Data

**Bulk Import Options:**
- Customers (CSV)
- Vehicles (CSV)
- Inventory (CSV)

**CSV Format Example (Customers):**
```csv
firstName,lastName,phone,email
Ahmed,Mohamed,0631234567,ahmed@email.com
Fatima,Ali,0659876543,fatima@email.com
```

### 5.2 Export Data

**Available Exports:**
- Full database backup (Admin+)
- Customer list (CSV)
- Inventory report (CSV)
- Transaction history (CSV)
- Work order reports (PDF)

### 5.3 Backup Schedule

| Type | Frequency | Retention |
|------|-----------|-----------|
| Full backup | Daily | 30 days |
| Transaction log | Real-time | 1 year |
| Audit log | Continuous | 2 years |

---

## 6. Integration Configuration

### 6.1 Available Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| **ZAAD** | Mobile payments | ✅ Live |
| **eDahab** | Mobile payments | ✅ Live |
| **WhatsApp** | Customer messaging | ✅ Live |
| **SMS Gateway** | Notifications | ✅ Live |
| **Google Analytics** | Website tracking | ✅ Live |
| **QuickBooks** | Accounting | 🔄 Coming |
| **Xero** | Accounting | 🔄 Coming |

### 6.2 WhatsApp Business Setup

```
1. Settings → Integrations → WhatsApp
2. Connect business number
3. Configure templates:
   ├── Appointment reminder
   ├── Estimate notification
   ├── Invoice sent
   └── Service complete
4. Test with sample message
```

---

## 7. Security Configuration

### 7.1 Password Policy

```
SETTINGS → SECURITY → PASSWORD POLICY
├── Minimum length: 8 characters
├── Require uppercase: Yes
├── Require numbers: Yes
├── Expiry: 90 days
└── History: Remember last 5
```

### 7.2 Session Settings

```
├── Timeout after inactivity: 4 hours
├── Max concurrent sessions: 3
├── Remember device: 30 days
└── Force logout all: Available
```

### 7.3 Two-Factor Authentication (Coming)

```
Methods (planned):
├── SMS code
└── WhatsApp code
```

---

## 8. Scaling Guidelines

### 8.1 Growth Stages

| Stage | Users | Vehicles | Recommended |
|-------|-------|----------|-------------|
| Solo | 1-2 | <200 | Starter plan |
| Small | 3-5 | 200-500 | Pro plan |
| Medium | 6-10 | 500-1,000 | Enterprise |
| Large | 11+ | 1,000+ | Enterprise+ |

### 8.2 Performance Tips

```
FOR BEST PERFORMANCE:
├── Keep active work orders < 100
├── Archive completed orders monthly
├── Compress/remove old inspection photos
├── Export and delete old quotes (>6 months)
└── Regular browser cache clearing
```

---

## 9. Troubleshooting Admin Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Slow dashboard | Too much data | Archive old records |
| Login failures | Wrong password | Reset via email |
| Missing data | Sync issue | Refresh page |
| Payment not recorded | Reference mismatch | Check exact reference |

---

## 10. Support & Resources

### 10.1 Getting Help

| Channel | Response Time |
|---------|--------------|
| In-app Support | 24 hours |
| WhatsApp | 2 hours |
| Phone | Immediate |
| Email | 48 hours |

### 10.2 Training Resources

- Video tutorials (Somali)
- PDF user guides
- Live webinars (monthly)
- On-site training (Enterprise)

---

**MASS OSS** - Built for Somaliland Scale 🇸🇱
