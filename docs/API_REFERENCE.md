# MASS OSS API Reference

> Internal APIs, External Integrations, and Convex Functions

---

## API Architecture

```
┌─────────────────────────────────────┐
│         Next.js API Routes          │
│  /api/ai-tools   /api/webhooks     │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│        Convex Functions             │
│  Real-time mutations & queries      │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      External API Integrations      │
│  NHTSA | BE FORWARD | Gemini AI    │
└─────────────────────────────────────┘
```

---

## 1. VIN Decoder API

**File:** `lib/vin-decoder.ts`
**External API:** NHTSA vPIC (free, unlimited)

```typescript
import { decodeVIN, isJapaneseVIN } from '@/lib/vin-decoder';

const result = await decodeVIN('JTM8R5EV5JD789012');
// Returns: { make, model, year, bodyClass, plantCountry, ... }

const isJapan = isJapaneseVIN('JTM...');
// Returns: true (starts with J)
```

---

## 2. OBD-II Code Decoder

**File:** `lib/obd-decoder.ts`
**Type:** Local database (25+ codes)

```typescript
import { decodeDTC, searchDTCByKeyword } from '@/lib/obd-decoder';

const code = decodeDTC('P0300');
// Returns: { code, system, description, possibleCauses, severity, commonParts, laborHours }

const results = searchDTCByKeyword('misfire');
// Returns: DTCResult[]
```

---

## 3. AI Diagnostics

**File:** `lib/ai-diagnostics.ts`
**External API:** Google Gemini

```typescript
import { analyzePart } from '@/lib/ai-diagnostics';

const result = await analyzePart({
  imageBase64: 'data:image/jpeg;base64,...',
  additionalContext: 'Customer reports grinding noise'
});
// Returns: { partIdentified, condition, issues[], recommendations[], estimatedCost }
```

---

## 4. Japan Import Integration

**File:** `lib/beforward-integration.ts`
**External:** BE FORWARD (affiliate links)

```typescript
import { generateVehicleSearchUrl, getPopularImportModels } from '@/lib/beforward-integration';

const url = generateVehicleSearchUrl({
  make: 'toyota',
  model: 'prado',
  year_from: '2015',
  price_to: '8000'
});

const popular = getPopularImportModels();
// Returns: Toyota Hilux, Prado, Land Cruiser, Nissan Patrol...
```

---

## 5. Payment Processing

**File:** `lib/payments.ts`
**Supported:** Cash, Zaad, eDahab, Card, Bank Transfer

```typescript
import { processPayment, getPaymentMethods } from '@/lib/payments';

const methods = getPaymentMethods();
// ['cash', 'zaad', 'edahab', 'card', 'bank-transfer']
```

---

## 6. Notifications

**File:** `lib/notifications.ts`
**Channels:** SMS, Email, WhatsApp, In-App

```typescript
import { sendReminder, scheduleNotification } from '@/lib/notifications';

await sendReminder({
  type: 'service',
  customerId: 'xxx',
  channel: 'sms',
  message: 'Your vehicle service is due'
});
```

---

## Convex Functions

### Queries
| Function | Table | Description |
|----------|-------|-------------|
| `getVehicles` | vehicles | List vehicles by org |
| `getWorkOrders` | workOrders | List work orders by status |
| `getCustomers` | customers | List customers |
| `getInventory` | inventory | List parts with stock levels |

### Mutations
| Function | Table | Description |
|----------|-------|-------------|
| `addVehicle` | vehicles | Create vehicle record |
| `updateVehicle` | vehicles | Update vehicle details |
| `createWorkOrder` | workOrders | Start new job |
| `updateWorkOrderStatus` | workOrders | Change job status |
| `recordSale` | sales | POS transaction (auto-decrements inventory) |

---

## Rate Limits

| API | Limit | Notes |
|-----|-------|-------|
| NHTSA vPIC | Unlimited | Free |
| Gemini | 15 RPM (free) | Use caching |
| Convex | Based on plan | Real-time |

---

## Environment Variables

```env
# Convex
CONVEX_DEPLOYMENT=xxx
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx

# AI
GEMINI_API_KEY=xxx

# Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx
```
