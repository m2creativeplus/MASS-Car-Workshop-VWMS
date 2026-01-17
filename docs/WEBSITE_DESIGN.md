# MASS OSS Website Design Specification

> Complete wireframes and section layouts

---

## Homepage Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ NAVBAR (Fixed, transparent → black on scroll)                      │
│ [Logo]           [Home] [Services] [About] [Contact]    [Login] [→]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  HERO SECTION (100vh, Full-screen)                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Background: Workshop photo with dark overlay                │   │
│  │                                                              │   │
│  │ Premium Automotive Excellence (eyebrow)                      │   │
│  │                                                              │   │
│  │ ██ PROFESSIONAL                                              │   │
│  │ ██ CAR REPAIR  (orange)                                      │   │
│  │ ██ AND MAINTENANCE                                           │   │
│  │                                                              │   │
│  │ Experience world-class automotive...                         │   │
│  │                                                              │   │
│  │ [Get an Appointment →]  [Our Services]                       │   │
│  │                                                              │   │
│  │              ▼ (scroll indicator)                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ TRUST MARQUEE (Brands bar)                                          │
│ TOYOTA | NISSAN | HONDA | MITSUBISHI | SUZUKI | ISUZU | BOSCH      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PROCESS SECTION                                                    │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │      01       │  │      02       │  │      03       │          │
│  │  [Gauge Icon] │→ │  [Cog Icon]   │→ │ [Wrench Icon] │          │
│  │  Inspection   │  │  Diagnostic   │  │    Repair     │          │
│  │  50-point...  │  │  AI-powered.. │  │  Expert...    │          │
│  └───────────────┘  └───────────────┘  └───────────────┘          │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SERVICES GRID (3x2)                                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                            │
│  │ Engine   │ │ Painting │ │Diagnostic│                            │
│  │ Repair   │ │          │ │          │                            │
│  └──────────┘ └──────────┘ └──────────┘                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                            │
│  │Electrical│ │ AC Svc   │ │ Tire Svc │                            │
│  │          │ │          │ │          │                            │
│  └──────────┘ └──────────┘ └──────────┘                            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ STATS SECTION (Orange background)                                   │
│     15+ Years  |  500+ Customers  |  50+ Mechanics  |  24/7        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WHY CHOOSE US (Two-column)                                         │
│  ┌─────────────────────────┐  ┌─────────────────────────────────┐  │
│  │ • 900+ Five Star Reviews│  │                                 │  │
│  │ • Professional Team     │  │    [Workshop image]             │  │
│  │ • Fast Turnaround       │  │    ┌───────────────────────┐    │  │
│  │ • Quality Guaranteed    │  │    │ Join 500+ Customers   │    │  │
│  └─────────────────────────┘  │    └───────────────────────┘    │  │
│                                │                                 │  │
│                                └─────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ CTA SECTION (Centered)                                              │
│                                                                     │
│     READY TO GET YOUR CAR SERVICED?                                 │
│                                                                     │
│     [Book Appointment →]  [📞 Call Us Now]                          │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER (4-column)                                                   │
│ [Logo/About] | [Quick Links] | [Services] | [Contact]              │
│                                                                     │
│ © 2026 MASS OSS | Privacy | Terms                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (w-64, dark blue)  │  HEADER                              │
│ ┌─────────────────────────┐│  ┌──────────────────────────────────┐│
│ │ [Logo] MASS OSS         ││  │ Breadcrumb    [Search] [🔔] [👤] ││
│ ├─────────────────────────┤│  └──────────────────────────────────┘│
│ │ 📊 Dashboard        ← ● ││                                      │
│ │ 📅 Appointments         ││  MAIN CONTENT AREA                   │
│ │ 🔧 Work Orders          ││  ┌──────────────────────────────────┐│
│ │ 🔍 Inspections          ││  │                                  ││
│ │ 📄 Estimates            ││  │  KPI Cards (4-col grid)          ││
│ │ ───────────────────     ││  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐   ││
│ │ 🚗 Vehicles             ││  │  │ WO │ │ $$ │ │🔧 │ │📦 │   ││
│ │ 👥 Customers            ││  │  └────┘ └────┘ └────┘ └────┘   ││
│ │ 📦 Inventory            ││  │                                  ││
│ │ ───────────────────     ││  │  Work Orders Kanban             ││
│ │ 💰 POS                  ││  │  ┌──────┐┌──────┐┌──────┐       ││
│ │ 📈 Reports              ││  │  │Check-││In-   ││Comp- │       ││
│ │ ───────────────────     ││  │  │In    ││gress ││lete  │       ││
│ │ ⚙️ Settings             ││  │  └──────┘└──────┘└──────┘       ││
│ └─────────────────────────┘│  │                                  ││
│                             │  └──────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

---

## Mobile Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| < 640px | Single column, hamburger nav, stacked cards |
| < 768px | 2-column grids become 1, sidebar hidden |
| < 1024px | Sidebar collapsible, 3-col → 2-col |
| ≥ 1024px | Full desktop layout |

---

## Page Templates

### 1. List Page Template
```
[Header] + [Breadcrumb]
[Page Title]          [Action Button]
[Search] [Filters]
┌────────────────────────────────────┐
│ Table / Card Grid                  │
│                                    │
│ Row 1 | Data | Data | Actions     │
│ Row 2 | Data | Data | Actions     │
│                                    │
└────────────────────────────────────┘
[Pagination]
```

### 2. Detail Page Template
```
[Header] + [Breadcrumb]
[← Back] [Title]      [Edit] [Delete]
┌───────────────────┬────────────────┐
│ Main Info Card    │ Status Card    │
│                   │                │
├───────────────────┴────────────────┤
│ Tab Navigation                     │
│ [Details] [History] [Documents]   │
├────────────────────────────────────┤
│ Tab Content                        │
│                                    │
└────────────────────────────────────┘
```

### 3. Form Page Template
```
[Header] + [Breadcrumb]
[Page Title]
┌────────────────────────────────────┐
│ Form Card                          │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Field 1      │ │ Field 2      │ │
│ └──────────────┘ └──────────────┘ │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Field 3      │ │ Field 4      │ │
│ └──────────────┘ └──────────────┘ │
│                                    │
│             [Cancel] [Save]        │
└────────────────────────────────────┘
```

---

## Component States

### Button States
```
Default  → [Button]     (bg-orange-500)
Hover    → [Button]     (bg-orange-600)
Active   → [Button]     (bg-orange-700, scale-95)
Disabled → [Button]     (bg-gray-400, cursor-not-allowed)
Loading  → [⟳ Loading]  (spinner + text)
```

### Input States
```
Default  → ┌────────────┐ (border-gray-200)
Focus    → ┌────────────┐ (border-orange-500 + ring)
Error    → ┌────────────┐ (border-red-500)
           ⚠️ Error message
Success  → ┌────────────┐ (border-green-500)
           ✓ Valid
```
