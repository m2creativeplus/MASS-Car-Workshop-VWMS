# MASS OSS - User Management Guidelines

## Role-Based Access Control & Security for 300-450 Garages

---

## 1. User Roles Overview

### 1.1 Role Hierarchy

```
OWNER (Highest)
   ↓
ADMIN
   ↓
STAFF (Service Advisor)
   ↓
TECHNICIAN
   ↓
CUSTOMER (Lowest - Portal Only)
```

### 1.2 Role Definitions

| Role | Description | Typical User |
|------|-------------|--------------|
| **Owner** | Full system access + billing | Business owner |
| **Admin** | All operations, no billing | Manager |
| **Staff** | Front desk operations | Service advisor, receptionist |
| **Technician** | Assigned work only | Mechanic, electrician |
| **Customer** | Self-service portal | Car owner |

---

## 2. Permissions Matrix

### 2.1 Dashboard & Overview

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| View Dashboard | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Revenue Metrics | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Export Reports | ✅ | ✅ | ❌ | ❌ | ❌ |

### 2.2 Customers & Vehicles

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| View Customers | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Create Customer | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit Customer | ✅ | ✅ | ✅ | ❌ | ❌ |
| Delete Customer | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Own Profile | - | - | - | - | ✅ |

### 2.3 Work Orders

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| View All Orders | ✅ | ✅ | ✅ | ❌ | ❌ |
| View Assigned | ✅ | ✅ | ✅ | ✅ | ❌ |
| Create Order | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit Order | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Delete Order | ✅ | ✅ | ❌ | ❌ | ❌ |
| Assign Tech | ✅ | ✅ | ✅ | ❌ | ❌ |

### 2.4 Inspections (DVI)

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| Start Inspection | ✅ | ✅ | ✅ | ✅ | ❌ |
| Complete Inspection | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| Approve Inspection | ✅ | ✅ | ✅ | ❌ | ✅ |
| Create Templates | ✅ | ✅ | ❌ | ❌ | ❌ |

### 2.5 Estimates & Invoices

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| Create Estimate | ✅ | ✅ | ✅ | ❌ | ❌ |
| Send Estimate | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve Estimate | ✅ | ✅ | ❌ | ❌ | ✅ |
| Create Invoice | ✅ | ✅ | ✅ | ❌ | ❌ |
| Process Payment | ✅ | ✅ | ✅ | ❌ | ✅ |
| Void Invoice | ✅ | ✅ | ❌ | ❌ | ❌ |

### 2.6 Inventory

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| View Inventory | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Add Parts | ✅ | ✅ | ✅ | ❌ | ❌ |
| Adjust Stock | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create PO | ✅ | ✅ | ✅ | ❌ | ❌ |
| Receive PO | ✅ | ✅ | ✅ | ❌ | ❌ |

### 2.7 Financial & Admin

| Feature | Owner | Admin | Staff | Tech | Customer |
|---------|-------|-------|-------|------|----------|
| View P&L | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| System Settings | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Billing/Subscription | ✅ | ❌ | ❌ | ❌ | ❌ |
| CMS Control | ✅ | ⚠️ | ❌ | ❌ | ❌ |

**Legend:** ✅ Full | ⚠️ Limited | ❌ None

---

## 3. Organization Structure

### 3.1 Multi-Tenant Architecture

```
MASS OSS PLATFORM
│
├── Organization 1: "Hargeisa Auto Care"
│   ├── Owner: Ahmed (ahmed@shop.com)
│   ├── Admin: Fatima
│   ├── Staff: Mohamed, Hassan
│   └── Technicians: Ali, Omar, Yusuf
│
├── Organization 2: "Burao Motors"
│   ├── Owner: Ibrahim
│   ├── Staff: Abdi
│   └── Technicians: Jama, Samatar
│
└── Organization 3: "Berbera Garage"
    └── Owner: Sahra (solo operation)
```

### 3.2 Data Isolation

| Data Type | Shared Across Orgs | Org-Specific |
|-----------|-------------------|--------------|
| Users | ❌ | ✅ |
| Customers | ❌ | ✅ |
| Vehicles | ❌ | ✅ |
| Work Orders | ❌ | ✅ |
| Inventory | ❌ | ✅ |
| Parts Catalog | ✅ (Master) | ❌ |
| Labor Guide | ✅ (Master) | ❌ |

---

## 4. User Lifecycle Management

### 4.1 Adding New Users

```
1. OWNER/ADMIN: Settings → Users → Add User
2. Enter details:
   ├── Full name
   ├── Email (required)
   ├── Phone (optional)
   ├── Role selection
   └── Initial password (auto-generated)
3. System sends welcome email/SMS
4. User sets own password on first login
```

### 4.2 Modifying Users

| Action | Who Can Do | Process |
|--------|-----------|---------|
| Change role | Owner/Admin | User → Edit → Select role |
| Reset password | Owner/Admin | User → Reset Password |
| Deactivate | Owner/Admin | User → Deactivate |
| Delete | Owner only | User → Delete (with confirmation) |

### 4.3 User Statuses

```
ACTIVE: Can login and work
   ↓
INACTIVE: Cannot login, data preserved
   ↓
DELETED: Account removed (audit log kept)
```

---

## 5. Security Best Practices

### 5.1 Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- Changed every 90 days (configurable)

### 5.2 Session Management

| Setting | Default | Configurable |
|---------|---------|-------------|
| Session timeout | 8 hours | Yes |
| Remember device | 30 days | Yes |
| Concurrent sessions | 3 max | Yes |

### 5.3 Audit Logging

**All actions logged:**
- Login/logout attempts
- Data modifications
- Payment processing
- User management changes
- Settings changes

**Log retention:** 2 years

---

## 6. Onboarding New Staff

### 6.1 Staff Onboarding Checklist

```
□ Create user account
□ Assign appropriate role
□ Share login credentials securely
□ Provide training on:
  □ Customer check-in
  □ Work order creation
  □ Estimate generation
  □ Payment processing
□ Test with dummy transactions
□ Assign to live work
```

### 6.2 Technician Onboarding

```
□ Create user account (Technician role)
□ Assign to work bay/station
□ Train on:
  □ Viewing assigned jobs
  □ DVI inspection process
  □ Taking photos
  □ Marking work complete
□ Test with supervised job
□ Full access granted
```

---

## 7. Multi-Location User Management

### 7.1 Location-Based Access

```
User: Mohamed (Service Advisor)
├── Primary: Hargeisa Main
├── Secondary: Hargeisa Branch 2
└── No Access: Burao Branch

Can see data from: Hargeisa Main + Branch 2 only
```

### 7.2 Transfer Between Locations

```
1. Admin assigns user to new location
2. User's dashboard shows new location
3. Historical work stays at original location
4. New work tagged to new location
```

---

## 8. Customer Portal Users

### 8.1 Customer Registration

```
METHODS:
├── Staff creates during check-in
├── Self-registration on website
└── Import from spreadsheet

REQUIRED INFO:
├── Name
├── Phone (primary identifier in Somaliland)
└── Email (optional)
```

### 8.2 Customer Portal Access

| Feature | Access |
|---------|--------|
| View vehicles | ✅ |
| View service history | ✅ |
| Download invoices | ✅ |
| Book appointments | ✅ |
| Approve estimates | ✅ |
| Make payments | ✅ |
| Message shop | ✅ |

---

## 9. Emergency Procedures

### 9.1 Locked Out Owner

1. Contact MASS OSS support
2. Verify identity via phone
3. Temporary password issued
4. Must reset immediately

### 9.2 Security Breach Response

```
1. Immediately disable compromised account
2. Reset all passwords
3. Review audit log for unauthorized actions
4. Contact MASS OSS security team
5. Document incident
```

---

## 10. Role Configuration Summary

### Quick Reference Table

| Role | Create | Read | Update | Delete | Approve |
|------|--------|------|--------|--------|---------|
| Owner | All | All | All | All | All |
| Admin | Most | All | Most | Limited | Most |
| Staff | Ops | Ops | Ops | None | Own |
| Tech | Jobs | Assigned | Assigned | None | None |
| Customer | None | Own | Own | None | Own |

---

**Secure Access = Trusted Business**

**MASS OSS** - Enterprise Security for Every Garage 🔒
