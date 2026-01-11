# MASS OSS - Testing & Quality Assurance Guide

**Version:** 1.0  
**Last Updated:** January 11, 2026

---

## 1. Testing Strategy Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    TESTING PYRAMID                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                        ┌─────────┐                               │
│                        │   E2E   │  ← Browser Tests              │
│                       ─┴─────────┴─                              │
│                      ┌─────────────┐                             │
│                      │ Integration │  ← API/Component Tests      │
│                     ─┴─────────────┴─                            │
│                    ┌─────────────────┐                           │
│                    │    Unit Tests   │  ← Functions/Utils        │
│                   ─┴─────────────────┴─                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Testing Tools

| Layer | Tool | Status |
|-------|------|--------|
| Unit | Jest + Testing Library | 🔄 Setup needed |
| Integration | Jest + MSW | 🔄 Setup needed |
| E2E | Playwright | 🔄 Setup needed |
| Component | Storybook | 🔄 Setup needed |
| Visual | Chromatic | 🔄 Setup needed |

---

## 2. Manual Testing Checklists

### 2.1 Authentication Flow

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| Demo Login | 1. Go to /login<br>2. Enter admin@masscar.com<br>3. Enter 123456<br>4. Click Login | Redirect to /dashboard | ✅ Pass |
| Invalid Credentials | 1. Enter wrong email<br>2. Click Login | Show error message | ✅ Pass |
| Logout | 1. Click user menu<br>2. Click Logout | Redirect to /login | ✅ Pass |
| Session Persistence | 1. Login<br>2. Close browser<br>3. Open /dashboard | Remain logged in | ✅ Pass |

### 2.2 Dashboard

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| Stats Load | 1. Login as admin<br>2. View dashboard | 4 stat cards visible with data | ✅ Pass |
| Charts Render | 1. View dashboard | Area chart and donut chart visible | ✅ Pass |
| Quick Actions | 1. Click each quick action | Navigate to correct page | ✅ Pass |
| Owner View | 1. Login as owner@masscar.com | See financial cards | ✅ Pass |
| Responsive | 1. Resize to mobile | Layout adapts, no overflow | ✅ Pass |

### 2.3 Customers Module

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| List Customers | 1. Go to /dashboard/customers | Table with customer data | ✅ Pass |
| Create Customer | 1. Click "Add Customer"<br>2. Fill form<br>3. Submit | Customer added to list | ✅ Pass |
| Edit Customer | 1. Click edit icon<br>2. Modify fields<br>3. Save | Changes saved | ✅ Pass |
| Delete Customer | 1. Click delete icon<br>2. Confirm | Customer removed | ✅ Pass |
| Search | 1. Type in search box | Results filtered | ✅ Pass |
| View Details | 1. Click view icon | Detail modal opens | ✅ Pass |
| Pagination Display | 1. View footer | Shows "1 to X of Y entries" | ✅ Pass (Fixed) |

### 2.4 Vehicles Module

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| List Vehicles | 1. Go to /dashboard/vehicles | Table with vehicle data | ✅ Pass |
| Create Vehicle | 1. Click "Add Vehicle"<br>2. Fill form<br>3. Submit | Vehicle added | ✅ Pass |
| Edit Vehicle | 1. Click edit<br>2. Change mileage<br>3. Save | Mileage updated | ⚠️ Limited |
| Delete Vehicle | 1. Click delete<br>2. Confirm | Vehicle removed | ✅ Pass |
| Status Filter | 1. Select status filter | Results filtered | ✅ Pass |
| No Refresh Button | 1. Check header | No broken refresh button | ✅ Pass (Fixed) |

### 2.5 Work Orders

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| List Work Orders | 1. Go to /dashboard/work-orders | Work order list visible | ✅ Pass |
| Create Work Order | 1. Click "New"<br>2. Select customer/vehicle<br>3. Submit | WO created with job number | ✅ Pass |
| Status Change | 1. Open work order<br>2. Change status | Status updated, UI reflects | ✅ Pass |
| Assign Technician | 1. Edit WO<br>2. Select technician | Tech assigned | ✅ Pass |

### 2.6 Inventory

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| List Parts | 1. Go to /dashboard/inventory | Parts table visible | ✅ Pass |
| Add Part | 1. Click "Add Part"<br>2. Fill form<br>3. Submit | Part added | ✅ Pass |
| Low Stock Alert | 1. Create part with qty < min | Alert badge shown | ✅ Pass |
| Category Filter | 1. Select category | Results filtered | ✅ Pass |

### 2.7 POS

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| Search Product | 1. Type part name | Results appear | ✅ Pass |
| Add to Cart | 1. Click product | Added to cart | ✅ Pass |
| Update Quantity | 1. Change qty in cart | Total updated | ✅ Pass |
| Calculate Total | 1. Add items | Subtotal, tax, total correct | ✅ Pass |
| Complete Sale | 1. Select payment<br>2. Submit | Sale recorded | ✅ Pass |
| Stock Decrement | 1. Complete sale<br>2. Check inventory | Stock reduced | ✅ Pass |

### 2.8 CMS - Blog

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| List Posts | 1. Go to /dashboard/cms/blog | Posts table visible | ✅ Pass |
| Create Post | 1. Click "New Post"<br>2. Fill form<br>3. Publish | Post created | ✅ Pass |
| Edit Post | 1. Edit existing<br>2. Change content<br>3. Save | Changes saved | ✅ Pass |
| View on Site | 1. Create published post<br>2. Go to /dashboard/blog/[slug] | Post renders | ✅ Pass |

### 2.9 Navigation

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| All Sidebar Links | 1. Click each sidebar item | Navigate without 404 | ✅ Pass |
| Breadcrumbs | 1. Navigate to nested page | Breadcrumb visible | ✅ Pass |
| Mobile Menu | 1. Resize to mobile<br>2. Click hamburger | Menu opens | ✅ Pass |
| Collapse Sidebar | 1. Click collapse button | Sidebar collapses | ✅ Pass |

---

## 3. Performance Testing

### 3.1 Load Time Benchmarks

| Page | Target | Current | Status |
|------|--------|---------|--------|
| Landing Page | < 3s | ~1.5s | ✅ Pass |
| Dashboard | < 2s | ~2s | ✅ Pass |
| Customer List | < 1s | ~0.8s | ✅ Pass |
| POS | < 1s | ~0.5s | ✅ Pass |

### 3.2 Core Web Vitals

| Metric | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | 🔄 Measure |
| FID (First Input Delay) | < 100ms | 🔄 Measure |
| CLS (Cumulative Layout Shift) | < 0.1 | 🔄 Measure |

### 3.3 Bundle Size

| Chunk | Size | Notes |
|-------|------|-------|
| Dashboard | 128 kB | Main dashboard component |
| Check-In | 148 kB | Heavy form component |
| POS | 130 kB | Cart functionality |
| Shared | 102 kB | Common dependencies |

---

## 4. Accessibility Testing

### 4.1 WCAG 2.1 Checklist

| Criterion | Level | Status |
|-----------|-------|--------|
| 1.1.1 Non-text Content | A | 🔄 Check |
| 1.2.1 Audio-only/Video-only | A | N/A |
| 1.3.1 Info and Relationships | A | 🔄 Check |
| 1.4.1 Use of Color | A | ✅ Pass |
| 1.4.3 Contrast (Minimum) | AA | ✅ Pass |
| 2.1.1 Keyboard | A | 🔄 Check |
| 2.1.2 No Keyboard Trap | A | 🔄 Check |
| 2.4.1 Bypass Blocks | A | 🔄 Check |
| 2.4.4 Link Purpose | A | 🔄 Check |
| 3.1.1 Language of Page | A | ✅ Pass |
| 4.1.1 Parsing | A | ✅ Pass |
| 4.1.2 Name, Role, Value | A | 🔄 Check |

### 4.2 Screen Reader Testing

| Reader | Platform | Status |
|--------|----------|--------|
| VoiceOver | macOS | 🔄 Test |
| NVDA | Windows | 🔄 Test |
| TalkBack | Android | 🔄 Test |

### 4.3 Keyboard Navigation

| Action | Keys | Status |
|--------|------|--------|
| Navigate Links | Tab | 🔄 Check |
| Activate Button | Enter/Space | 🔄 Check |
| Close Modal | Escape | 🔄 Check |
| Menu Navigation | Arrow Keys | 🔄 Check |

---

## 5. Cross-Browser Testing

### 5.1 Desktop Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Pass |
| Firefox | Latest | 🔄 Test |
| Safari | Latest | 🔄 Test |
| Edge | Latest | 🔄 Test |

### 5.2 Mobile Browsers

| Browser | Platform | Status |
|---------|----------|--------|
| Safari | iOS | 🔄 Test |
| Chrome | Android | 🔄 Test |
| Samsung Internet | Android | 🔄 Test |

---

## 6. Security Testing

### 6.1 OWASP Top 10 Checklist

| Vulnerability | Status | Notes |
|---------------|--------|-------|
| A01 Broken Access Control | ⚠️ Demo mode | Needs production auth |
| A02 Cryptographic Failures | ✅ Pass | HTTPS, no client secrets |
| A03 Injection | ✅ Pass | Convex validates inputs |
| A04 Insecure Design | ✅ Pass | Follows best practices |
| A05 Security Misconfiguration | 🔄 Review | Check headers |
| A06 Vulnerable Components | 🔄 Audit | Run npm audit |
| A07 Auth Failures | ⚠️ Demo mode | Needs Clerk |
| A08 Data Integrity Failures | ✅ Pass | Convex handles |
| A09 Logging Failures | 🔄 Setup | Need logging system |
| A10 SSRF | ✅ Pass | No external fetches |

### 6.2 Security Headers

| Header | Recommended | Status |
|--------|-------------|--------|
| X-Content-Type-Options | nosniff | 🔄 Check |
| X-Frame-Options | DENY | 🔄 Check |
| X-XSS-Protection | 1; mode=block | 🔄 Check |
| Content-Security-Policy | Defined | 🔄 Setup |
| Strict-Transport-Security | max-age=31536000 | 🔄 Check |

### 6.3 Dependency Audit

```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 7. API Testing

### 7.1 Convex Function Tests

| Function | Test | Status |
|----------|------|--------|
| getCustomers | Returns array | ✅ Pass |
| addCustomer | Creates record | ✅ Pass |
| updateCustomer | Modifies record | ✅ Pass |
| deleteCustomer | Removes record | ✅ Pass |
| getVehicles | Returns array | ✅ Pass |
| addVehicle | Creates record | ✅ Pass |
| createSale | Decrements inventory | ✅ Pass |

### 7.2 Error Handling

| Scenario | Expected | Status |
|----------|----------|--------|
| Invalid ID | Return null/error | ✅ Pass |
| Missing required field | Validation error | ✅ Pass |
| Unauthorized access | Reject request | ⚠️ Demo mode |
| Network failure | Show error UI | 🔄 Check |

---

## 8. Regression Testing

### 8.1 Critical Paths

| Path | Steps | Priority |
|------|-------|----------|
| Customer to Work Order | Create customer → Add vehicle → Create WO | High |
| Inspection to Invoice | Create WO → Complete inspection → Generate estimate → Invoice | High |
| POS Sale | Search product → Add to cart → Complete payment → Check inventory | High |
| Appointment to Service | Book appointment → Check-in → Complete WO | Medium |

### 8.2 Known Fixed Issues

| Issue | Fix | Date |
|-------|-----|------|
| `customers.tsx:374` undefined variable | Changed to `activeCustomers.length` | 2026-01-11 |
| `vehicles.tsx:249` broken refresh button | Removed button | 2026-01-11 |

---

## 9. Test Data

### 9.1 Demo Users

| Email | Password | Role |
|-------|----------|------|
| admin@masscar.com | 123456 | SUPER_ADMIN |
| owner@masscar.com | 123456 | OWNER |
| staff@masscar.com | 123456 | SERVICE_ADVISOR |
| tech@masscar.com | 123456 | MASTER_TECH |

### 9.2 Sample Vehicles

| Make | Model | Year | Plate |
|------|-------|------|-------|
| Toyota | Vitz | 2012 | SL-49201-M |
| Toyota | Hilux | 2018 | SL-58913-W |
| Toyota | Land Cruiser 79 | 2017 | SL-82307-T |
| Honda | Fit | 2015 | SL-36731-E |
| Nissan | Patrol | 2019 | SL-47842-P |

### 9.3 Sample Parts

| Part Number | Name | Category | Stock |
|-------------|------|----------|-------|
| 04152-YZZA1 | Oil Filter | Filters | 50 |
| 04465-0K240 | Front Brake Pads | Brakes | 24 |
| 23670-30050 | Fuel Injector Set | Engine | 8 |

---

## 10. Test Reporting

### 10.1 Bug Report Template

```markdown
## Bug Report

**Title:** [Brief description]

**Severity:** Critical / High / Medium / Low

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Screen: Desktop

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. Enter...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Screenshots:**
[Attach if applicable]

**Console Errors:**
[Paste any errors]
```

### 10.2 Test Summary Template

```markdown
## Test Summary

**Date:** 2026-01-11
**Tester:** [Name]
**Build:** 8b6edea9

### Results
- Total Tests: 50
- Passed: 45
- Failed: 3
- Blocked: 2

### Critical Issues
1. [Issue description]

### Notes
[Any additional observations]
```

---

## 11. Continuous Integration

### 11.1 GitHub Actions (Planned)

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### 11.2 Pre-commit Hooks (Planned)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 12. Quality Metrics

### 12.1 Code Coverage Targets

| Metric | Target | Current |
|--------|--------|---------|
| Line Coverage | > 80% | 🔄 Setup |
| Branch Coverage | > 70% | 🔄 Setup |
| Function Coverage | > 80% | 🔄 Setup |

### 12.2 Code Quality

| Metric | Target | Status |
|--------|--------|--------|
| ESLint Errors | 0 | 🔄 Check |
| TypeScript Errors | 0 | ✅ Pass |
| Build Warnings | 0 | ✅ Pass |

---

**Document Version:** 1.0  
**Last Updated:** January 11, 2026
