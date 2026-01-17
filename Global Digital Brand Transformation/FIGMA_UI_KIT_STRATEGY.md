# 🎨 Figma UI Kit Creation Strategy

## From Code to Professional Design System

**Project:** MASS Car Workshop VWMS  
**Goal:** Create a complete Figma UI Kit & Component Library  
**Approach:** Hybrid (Automated + Manual)

---

## 📊 Current Asset Inventory

### Components Found (27 in `/components/ui/`)

| Component | Type | Figma Priority |
|-----------|------|----------------|
| `button.tsx` | Core | 🔴 HIGH |
| `card.tsx` | Core | 🔴 HIGH |
| `input.tsx` | Core | 🔴 HIGH |
| `dialog.tsx` | Overlay | 🔴 HIGH |
| `dropdown-menu.tsx` | Navigation | 🟡 MED |
| `table.tsx` | Data | 🔴 HIGH |
| `tabs.tsx` | Navigation | 🟡 MED |
| `select.tsx` | Form | 🔴 HIGH |
| `checkbox.tsx` | Form | 🟡 MED |
| `radio-group.tsx` | Form | 🟡 MED |
| `avatar.tsx` | Display | 🟡 MED |
| `badge.tsx` | Display | 🟡 MED |
| `skeleton.tsx` | Loading | 🟢 LOW |
| `premium-kpi-card.tsx` | Custom | 🔴 HIGH |
| `before-after-slider.tsx` | Custom | 🔴 HIGH |

### Design Tokens (from `tailwind.config.ts`)

```
Colors: background, foreground, primary, secondary, muted, accent, destructive
Semantic: card, popover, sidebar (with foreground variants)
Charts: 5 chart colors
Border Radius: lg, md, sm
```

---

## 🛠️ Conversion Strategy

### Option 1: html.to.design Plugin (RECOMMENDED)
**Tool:** divRIOTS html.to.design Figma plugin

**Steps:**
1. Deploy latest version to Vercel
2. Install html.to.design plugin in Figma
3. Import key pages (Landing, Dashboard, Work Orders, Vehicle Details)
4. Clean up auto-generated layers
5. Create Figma components from imported frames

**Pros:** Fast, preserves actual styling  
**Cons:** Requires manual cleanup

---

### Option 2: Design Token Export + Manual Build

**Steps:**
1. Export design tokens to JSON
2. Create Figma variables from tokens
3. Manually build components in Figma

**Pros:** Clean, professional result  
**Cons:** Time-intensive

---

### Option 3: AI-Assisted Mockup Generation

**Steps:**
1. Use Antigravity `generate_image` to create mockups
2. Import mockups into Figma as references
3. Trace and build components

---

## 📋 Immediate Actions

### Step 1: Extract Design Tokens (Now)
I can extract all CSS variables and create a `design_tokens.json` file.

### Step 2: Create Component Catalog (Now)
Document all 27 components with props and variants.

### Step 3: Generate Reference Mockups (Now)
Create high-fidelity mockups of key screens.

### Step 4: Figma Import (User Action)
You run html.to.design on your live site.

---

## Recommendation

**Use Option 1 (html.to.design)** because:
- You already have the plugin page open
- Your site is already deployed on Vercel
- Fastest path to usable Figma assets
