# Spyne.ai Clone Blueprint for MASS OSS

**Goal:** Achieve 100% parity with Spyne.ai's features, design, and product catalog using open-source alternatives.

---

## 🎨 Design System (Spyne v2)

### Color Palette
- **Primary Blue:** `#2563EB` (Spyne Blue)
- **Secondary Dark:** `#0F172A` (Slate 900)
- **Accent:** `#F97316` (Orange - kept from MASS identity or switch to Spyne's teal/purple if desired)
- **Backgrounds:** Clean White (`#FFFFFF`) / Light Grey (`#F8FAFC`)

### Typography
- **Headings:** `Inter` or `Plus Jakarta Sans` (Bold, Tight tracking)
- **Body:** `Inter` (Clean, readable)

### UI Patterns
- **Cards:** White bg, subtle shadow (`shadow-lg`), rounded corners (`rounded-xl`).
- **Buttons:** Pill-shaped or soft rounded (`rounded-lg`), gradients for primary actions.
- **Gradients:** Subtle blue-to-purple backgrounds for "AI" sections.

---

## 📦 Product Catalog (Scraped & Mapped)

We will map Spyne's products to MASS OSS modules:

| Spyne Product | MASS OSS Equivalent | Status |
|---------------|---------------------|--------|
| **Virtual Studio** | `VehiclePhotoStudio` | ✅ Partial (Needs Shadows/BG) |
| **360 Car Tour** | `Vehicle360Viewer` | ✅ Implemented |
| **Video Tour** | *New Module Needed* | ❌ Pending |
| **Vini AI (Chat)** | `TawkToChat` + AI Bot | ⚠️ Basic (Chat works) |
| **Inspection** | `DVI Inspections` | ✅ Implemented |
| **Marketplace** | `DealerNetwork` | ✅ Implemented |

---

## 💰 Pricing Tiers (Replicated Strategy)

| Plan | Price (Monthly) | Features Included |
|------|-----------------|-------------------|
| **Essential** | $299 | Images, App, Web Console, API |
| **Growth** | $499 | + Video, 360 View, BG Replacement |
| **Comprehensive** | $699 | + 4K, Marketing Banners, Hotspots |
| **Enterprise** | Custom | Custom AI Models, SLAs |

---

## 🛠️ Implementation Roadmap

### Phase 1: The "Face" Lift (Web Design)
1. **Landing Page Overhaul:** Rewrite `app/page.tsx` to match Spyne's structure:
   - Hero: "Transform Car Photography with AI"
   - Social Proof: "Trusted by 5,000+ Dealerships"
   - Feature Grid: 360, Studio, Inspection
2. **Navigation:** Update accessible public routes to match Spyne (`/solutions`, `/pricing`, `/resources`).

### Phase 2: Feature Parity
1. **Upgrade Photo Studio:** Add "Shadow Generation" and "Smart Backgrounds" (Spyne's killer feature).
2. **Upgrade 360 Viewer:** Add "Hotspots" (clickable points of interest on the car).
3. **New: Video Tour:** Simple video upload + AI stabilization (using `ffmpeg.wasm` if possible or Cloudinary).
4. **New: Vini AI Clone:** Rename our AI Assistant to "MASS AI" and give it a dedicated page.

### Phase 3: Content & Copy
1. **Scrape & Rewrite:** Adapt Spyne's blog/guides ("Complete Guide to Car Photography") for MASS OSS.
2. **SEO:** Copy meta tags structure.

---

## 🚀 Execution Commands

```bash
# 1. Update Landing Page
gt.rewrite(file="app/page.tsx", source="spyne_landing_clone")

# 2. Styles
gt.update_css(theme="spyne_modern")

# 3. Create Pricing Page
gt.create_page(route="/pricing", content="spyne_pricing_table")
```
