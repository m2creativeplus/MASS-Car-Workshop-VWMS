# MASS OSS - System Integrations & API Reference

**Version:** 1.0  
**Last Updated:** January 11, 2026

---

## 1. Integration Architecture

```
                    ┌─────────────────────────────────────────┐
                    │           MASS OSS CORE                  │
                    │         (Next.js + Convex)              │
                    └──────────────────┬──────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│     PAYMENTS      │    │   COMMUNICATIONS  │    │    DATA APIs      │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ • Stripe (✅)     │    │ • Twilio (🔄)     │    │ • VIN Decode (🔄) │
│ • Zaad (🔄)       │    │ • WhatsApp (🔄)   │    │ • BE FORWARD (🔄) │
│ • eDahab (🔄)     │    │ • Email (🔄)      │    │ • ALLDATA (🔄)    │
│ • Bank (⚙️)       │    │ • Push (🔄)       │    │ • PartsTech (🔄)  │
└───────────────────┘    └───────────────────┘    └───────────────────┘
```

**Legend:**
- ✅ Integrated
- ⚙️ Configured
- 🔄 Planned

---

## 2. Core Backend (Convex)

### 2.1 Connection Setup

**Environment Variable:**
```env
NEXT_PUBLIC_CONVEX_URL=https://YOUR_PROJECT.convex.cloud
```

**Provider Setup:**
```tsx
// app/layout.tsx or providers.tsx
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }) {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}
```

### 2.2 Query Usage

```tsx
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Fetching customers
const customers = useQuery(api.functions.getCustomers, { orgId: "org_123" });

// Fetching vehicles
const vehicles = useQuery(api.functions.getVehicles, { orgId: "org_123" });
```

### 2.3 Mutation Usage

```tsx
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Creating a customer
const addCustomer = useMutation(api.functions.addCustomer);

const handleCreate = async () => {
  await addCustomer({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+252634567890",
    orgId: "org_123"
  });
};
```

---

## 3. API Reference

### 3.1 Users

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getUsers` | Query | `{ orgId }` | `User[]` |
| `getUserByEmail` | Query | `{ email }` | `User \| null` |
| `createUser` | Mutation | `{ email, firstName, lastName, role }` | `Id<"users">` |
| `getUserOrgs` | Query | `{ userId }` | `Organization[]` |

### 3.2 Customers

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getCustomers` | Query | `{ orgId }` | `Customer[]` |
| `getCustomerById` | Query | `{ id }` | `Customer \| null` |
| `addCustomer` | Mutation | `{ firstName, lastName, email?, phone?, address?, city?, country?, orgId }` | `Id<"customers">` |
| `updateCustomer` | Mutation | `{ id, firstName?, lastName?, email?, phone?, address?, city?, isActive? }` | `void` |
| `deleteCustomer` | Mutation | `{ id }` | `void` |

### 3.3 Vehicles

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getVehicles` | Query | `{ orgId }` | `Vehicle[]` |
| `getVehiclesByCustomer` | Query | `{ customerId }` | `Vehicle[]` |
| `addVehicle` | Mutation | `{ make, model, year, vin?, licensePlate?, ... }` | `Id<"vehicles">` |
| `updateVehicle` | Mutation | `{ id, mileage?, status?, lastServiceDate? }` | `void` |
| `deleteVehicle` | Mutation | `{ id }` | `void` |

### 3.4 Work Orders

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getWorkOrders` | Query | `{ orgId }` | `WorkOrder[]` |
| `getWorkOrderById` | Query | `{ id }` | `WorkOrder \| null` |
| `createWorkOrder` | Mutation | `{ vehicleId, customerId, services[], ... }` | `Id<"workOrders">` |
| `updateWorkOrderStatus` | Mutation | `{ id, status }` | `void` |
| `deleteWorkOrder` | Mutation | `{ id }` | `void` |

### 3.5 Inventory

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getInventory` | Query | `{ orgId }` | `InventoryItem[]` |
| `getInventoryByCategory` | Query | `{ orgId, category }` | `InventoryItem[]` |
| `addInventoryItem` | Mutation | `{ partNumber, name, category, costPrice, sellingPrice, stockQuantity, ... }` | `Id<"inventory">` |
| `updateInventoryStock` | Mutation | `{ id, stockQuantity }` | `void` |
| `deleteInventoryItem` | Mutation | `{ id }` | `void` |

### 3.6 Sales (POS)

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getSales` | Query | `{ orgId }` | `Sale[]` |
| `createSale` | Mutation | `{ items[], paymentMethod, totalAmount, ... }` | `Id<"sales">` |

**Auto-Decrement Logic:**
```typescript
export const createSale = mutation({
  args: { /* ... */ },
  handler: async (ctx, args) => {
    // Create the sale record
    const saleId = await ctx.db.insert("sales", { ... });
    
    // Auto-decrement inventory for each item
    for (const item of args.items) {
      const inventoryItem = await ctx.db.get(item.inventoryId);
      if (inventoryItem) {
        const newQuantity = Math.max(0, inventoryItem.stockQuantity - item.quantity);
        await ctx.db.patch(item.inventoryId, { stockQuantity: newQuantity });
      }
    }
    
    return saleId;
  },
});
```

### 3.7 Blog (CMS)

| Function | Type | Arguments | Returns |
|----------|------|-----------|---------|
| `getBlogPosts` | Query | `{}` | `BlogPost[]` |
| `getBlogPostBySlug` | Query | `{ slug }` | `BlogPost \| null` |
| `createBlogPost` | Mutation | `{ title, slug, content, excerpt?, imageUrl?, author, isPublished }` | `Id<"blogPosts">` |
| `updateBlogPost` | Mutation | `{ id, title?, content?, isPublished? }` | `void` |
| `deleteBlogPost` | Mutation | `{ id }` | `void` |

---

## 4. Payment Integrations

### 4.1 Stripe (International)

**Status:** ⚙️ Configured

**Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**Webhook Endpoint:** `/api/stripe/webhook`

**Supported Events:**
- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.updated`

### 4.2 Zaad (Telesom Mobile Money)

**Status:** 🔄 Planned

**Integration Approach:**
1. USSD push request
2. Customer confirms on phone
3. Webhook callback on success
4. Update payment record

**API Endpoint (Expected):**
```
POST https://api.zaad.net/payment
Content-Type: application/json

{
  "merchant_id": "MASS_OSS",
  "phone": "63XXXXXXX",
  "amount": 50.00,
  "reference": "WO-123456"
}
```

### 4.3 eDahab (Dahabshiil Mobile Money)

**Status:** 🔄 Planned

**Integration Approach:**
Similar to Zaad with eDahab's API specifications.

---

## 5. Communication Integrations

### 5.1 Twilio SMS

**Status:** 🔄 Planned

**Use Cases:**
- Appointment reminders
- Service status updates
- Invoice notifications
- Marketing campaigns

**Implementation:**
```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to: string, message: string) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
}
```

### 5.2 WhatsApp Business

**Status:** 🔄 Planned

**Use Cases:**
- Rich media inspection reports
- Estimate approvals with images
- Customer support

### 5.3 Email (Resend/SendGrid)

**Status:** 🔄 Planned

**Use Cases:**
- Invoice delivery
- Estimate PDFs
- Newsletter

---

## 6. Data APIs

### 6.1 VIN Decoder

**Status:** 🔄 Planned

**Purpose:** Auto-populate vehicle details from VIN

**API Options:**
- NHTSA vPIC API (Free, US vehicles)
- CarMD API (Paid, global)
- VinAudit (Paid, comprehensive)

**Expected Usage:**
```typescript
async function decodeVIN(vin: string) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
  );
  const data = await response.json();
  return {
    make: findValue(data.Results, "Make"),
    model: findValue(data.Results, "Model"),
    year: findValue(data.Results, "Model Year"),
    engineType: findValue(data.Results, "Engine Configuration"),
  };
}
```

### 6.2 BE FORWARD API

**Status:** 🔄 Planned

**Purpose:** Japan import vehicle pricing

**Fields:**
- FOB price
- Stock photos
- Vehicle specifications
- Shipping estimates

### 6.3 ALLDATA / Mitchell1

**Status:** 🔄 Planned

**Purpose:** Repair information database

**Features:**
- Labor time guides
- Repair procedures
- Wiring diagrams
- Technical bulletins

### 6.4 PartsTech

**Status:** 🔄 Planned

**Purpose:** Parts ordering and pricing

**Features:**
- Part search
- Real-time pricing
- Availability check
- Direct ordering

---

## 7. Hosting & Infrastructure

### 7.1 Vercel

**Deployment URL:** `mass-car-workshop-vwms.vercel.app`

**Configuration:**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### 7.2 GitHub

**Repository:** Private

**Branch Strategy:**
- `main` - Production
- `develop` - Development
- Feature branches as needed

### 7.3 Convex Cloud

**Dashboard:** `dashboard.convex.dev`

**Project Settings:**
- Automatic schema validation
- Real-time subscriptions enabled
- Function execution logs

---

## 8. Analytics & Monitoring

### 8.1 Plausible (Planned)

**Purpose:** Privacy-focused web analytics

**Tracked Events:**
- Page views
- Appointment bookings
- Sale completions
- User registrations

### 8.2 Error Tracking (Planned)

**Options:**
- Sentry
- LogRocket
- Vercel Analytics

---

## 9. Security

### 9.1 Authentication

**Current:** Demo mode with hardcoded users

**Planned:** Clerk Authentication
- Email/password
- Social login
- Multi-factor authentication
- Organization management

### 9.2 Authorization

**Role-Based Access Control (RBAC):**
```typescript
const userRoleValidator = v.union(
  v.literal("SUPER_ADMIN"),
  v.literal("OWNER"),
  v.literal("GENERAL_MANAGER"),
  v.literal("SERVICE_ADVISOR"),
  v.literal("MASTER_TECH"),
  // ... 50+ roles
);
```

### 9.3 Data Protection

- HTTPS only
- Input validation via Zod
- XSS prevention (React default)
- CORS configured

---

## 10. Webhook Endpoints

### 10.1 Stripe Webhook

**Route:** `POST /api/stripe/webhook`

**Handled Events:**
```typescript
switch (event.type) {
  case 'checkout.session.completed':
    // Handle successful payment
    break;
  case 'invoice.paid':
    // Update subscription status
    break;
  case 'customer.subscription.deleted':
    // Handle cancellation
    break;
}
```

### 10.2 Payment Callbacks (Planned)

**Route:** `POST /api/payments/callback`

**Expected Payload:**
```json
{
  "provider": "zaad",
  "reference": "WO-123456",
  "status": "success",
  "amount": 50.00,
  "transaction_id": "TXN123456"
}
```

---

## 11. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | ✅ | Convex cloud URL |
| `STRIPE_SECRET_KEY` | ⚠️ | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ | Stripe webhook signing |
| `TWILIO_ACCOUNT_SID` | ⚠️ | Twilio account |
| `TWILIO_AUTH_TOKEN` | ⚠️ | Twilio auth |
| `TWILIO_PHONE_NUMBER` | ⚠️ | Outbound SMS number |
| `RESEND_API_KEY` | ⚠️ | Email sending |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ⚠️ | Auth (planned) |
| `CLERK_SECRET_KEY` | ⚠️ | Auth (planned) |

**Legend:**
- ✅ Required for operation
- ⚠️ Required for specific features

---

**Document Version:** 1.0  
**Last Updated:** January 11, 2026
