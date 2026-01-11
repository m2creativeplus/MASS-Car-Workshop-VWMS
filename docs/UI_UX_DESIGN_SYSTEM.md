# MASS OSS - UI/UX Design System & Guidelines

**Version:** 1.0  
**Last Updated:** January 11, 2026  
**Design Inspiration:** [Mechanic 128](https://mechanic-128.webflow.io)

---

## 1. Design Philosophy

### Design Principles

1. **Bold & Industrial** - Embrace the automotive aesthetic with strong contrasts and industrial elements
2. **Functional First** - Every design element must serve a purpose
3. **Mobile-Responsive** - Design for all screen sizes from the start
4. **Accessible** - WCAG 2.1 AA compliance minimum
5. **Local Relevance** - Respect Somaliland context and cultural preferences

### Design Mood Board

```
┌─────────────────────────────────────────────────────────────┐
│                     MASS OSS MOOD                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔧 Industrial         🚗 Automotive       💪 Bold           │
│  ━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━      ━━━━━━━━━━━━━━    │
│  - Dark backgrounds   - Chrome accents    - High contrast   │
│  - Clean lines        - Speed elements    - Strong CTAs     │
│  - Grid layouts       - Technical icons   - Clear hierarchy │
│                                                              │
│  🔥 Energetic         🎯 Professional     📱 Modern         │
│  ━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━      ━━━━━━━━━━━━━━    │
│  - Orange-red accent  - Trust indicators  - Smooth animate  │
│  - Dynamic motion     - Quality badges    - Glassmorphism   │
│  - Hover effects      - Testimonials      - Card-based UI   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Color System

### Primary Palette

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **MASS Red** | `#FF4D24` | 255, 77, 36 | Primary actions, brand accent |
| **MASS Red Hover** | `#FF6B47` | 255, 107, 71 | Hover states |
| **MASS Red Light** | `rgba(255,77,36,0.1)` | - | Backgrounds, badges |
| **MASS Red Glow** | `rgba(255,77,36,0.3)` | - | Box shadows |

### Neutral Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Pure Black** | `#000000` | Public site backgrounds |
| **Dark Charcoal** | `#0E0E0E` | Alternate sections |
| **Card Dark** | `#1A1A1A` | Card backgrounds |
| **Dashboard Dark** | `#0F172A` | Dashboard sidebar |
| **Border Subtle** | `rgba(255,255,255,0.1)` | Borders on dark |
| **Border Hover** | `rgba(255,255,255,0.2)` | Border hover states |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Text White** | `#FFFFFF` | Headings on dark |
| **Text Gray 400** | `#9CA3AF` | Body text on dark |
| **Text Gray 500** | `#6B7280` | Muted text |
| **Text Gray 300** | `#D1D5DB` | Secondary text |

### Status Colors

| Status | Color | Hex Code |
|--------|-------|----------|
| **Success** | Emerald | `#10B981` |
| **Warning** | Amber | `#F59E0B` |
| **Error** | Red | `#EF4444` |
| **Info** | Blue | `#3B82F6` |
| **Pending** | Purple | `#8B5CF6` |

### Gradient Presets

```css
/* Primary gradient */
.gradient-primary {
  background: linear-gradient(135deg, #FF4D24 0%, #FF6B47 100%);
}

/* Dark gradient */
.gradient-dark {
  background: linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%);
}

/* Hero overlay */
.gradient-hero {
  background: linear-gradient(to right, #000 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 100%);
}

/* Stat card gradients */
.stat-cyan { background: linear-gradient(135deg, #06B6D4, #0891B2); }
.stat-amber { background: linear-gradient(135deg, #F59E0B, #EA580C); }
.stat-emerald { background: linear-gradient(135deg, #10B981, #059669); }
.stat-rose { background: linear-gradient(135deg, #F43F5E, #DC2626); }
```

---

## 3. Typography

### Font Stack

```css
/* Primary headings - Oxanium (Google Font) */
.font-heading {
  font-family: 'Oxanium', 'Inter', system-ui, sans-serif;
}

/* Body text - System stack with Inter fallback */
.font-body {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

/* Monospace - Code elements */
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **H1 Hero** | 72px / 4.5rem | 700 | 1.1 | -0.02em |
| **H1** | 48px / 3rem | 700 | 1.2 | -0.01em |
| **H2** | 36px / 2.25rem | 700 | 1.2 | -0.01em |
| **H3** | 24px / 1.5rem | 600 | 1.3 | 0 |
| **H4** | 20px / 1.25rem | 600 | 1.4 | 0 |
| **Body Large** | 18px / 1.125rem | 400 | 1.6 | 0 |
| **Body** | 16px / 1rem | 400 | 1.6 | 0 |
| **Body Small** | 14px / 0.875rem | 400 | 1.5 | 0 |
| **Caption** | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| **Label** | 10px / 0.625rem | 600 | 1.3 | 0.05em |

### Typography Examples

```html
<!-- Section eyebrow -->
<p class="text-[#FF4D24] font-semibold text-sm uppercase tracking-widest mb-4">
  Premium Automotive Excellence
</p>

<!-- Hero heading -->
<h1 class="text-5xl md:text-7xl font-bold text-white leading-tight font-['Oxanium']">
  PROFESSIONAL<br />
  <span class="text-[#FF4D24]">CAR REPAIR</span><br />
  AND MAINTENANCE
</h1>

<!-- Body paragraph -->
<p class="text-xl text-gray-400 mb-8 max-w-xl">
  Experience world-class automotive service with MASS OSS certified workshops.
</p>
```

---

## 4. Spacing & Layout

### Spacing Scale

| Name | Size | Usage |
|------|------|-------|
| **px** | 1px | Hairline borders |
| **0.5** | 2px | Tight icons |
| **1** | 4px | Micro gaps |
| **2** | 8px | Internal padding |
| **3** | 12px | Small gaps |
| **4** | 16px | Standard gap |
| **5** | 20px | Medium gap |
| **6** | 24px | Section internal |
| **8** | 32px | Section padding |
| **10** | 40px | Large gaps |
| **12** | 48px | Page sections |
| **16** | 64px | Section dividers |
| **20** | 80px | Hero spacing |
| **24** | 96px | Large sections |

### Container Widths

```css
.container-xs { max-width: 480px; }   /* Narrow content */
.container-sm { max-width: 640px; }   /* Small forms */
.container-md { max-width: 768px; }   /* Dialogs */
.container-lg { max-width: 1024px; }  /* Standard content */
.container-xl { max-width: 1280px; }  /* Wide articles */
.container-2xl { max-width: 1536px; } /* Full dashboard */

/* Default page container */
.max-w-7xl { max-width: 1280px; }
```

### Grid System

```css
/* 12-column grid */
.grid-cols-12

/* Common layouts */
.grid-cols-1                    /* Mobile */
.md:grid-cols-2                 /* Tablet 2-col */
.md:grid-cols-3                 /* Tablet 3-col */
.lg:grid-cols-4                 /* Desktop 4-col */

/* Dashboard stat grid */
.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-4.gap-4
```

---

## 5. Components

### 5.1 Buttons

#### Primary Button
```jsx
<Button 
  className="px-8 py-4 bg-[#FF4D24] hover:bg-[#FF6B47] text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-[#FF4D24]/30"
>
  Get an Appointment
  <ArrowRight className="w-5 h-5 ml-2" />
</Button>
```

#### Secondary Button
```jsx
<Button 
  className="px-8 py-4 border-2 border-white/20 hover:border-[#FF4D24] text-white font-bold rounded-lg transition-all duration-300"
>
  Our Services
</Button>
```

#### Dashboard Button
```jsx
<Button className="bg-[#00A65A] hover:bg-[#008d4c] text-white">
  <Plus className="h-4 w-4 mr-2" />
  Add Vehicle
</Button>
```

### 5.2 Cards

#### Service Card
```jsx
<div className="group bg-[#1A1A1A] rounded-xl p-6 border border-white/10 hover:border-[#FF4D24] transition-all duration-300">
  <div className="w-14 h-14 rounded-lg bg-[#FF4D24]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF4D24]">
    <Cog className="w-7 h-7 text-[#FF4D24] group-hover:text-white" />
  </div>
  <h3 className="text-xl font-bold text-white mb-2">Engine Repair</h3>
  <p className="text-gray-400 text-sm mb-4">Complete engine diagnostics and repairs</p>
  <Link className="text-[#FF4D24] text-sm font-semibold inline-flex items-center gap-1">
    Learn More <ChevronRight className="w-4 h-4" />
  </Link>
</div>
```

#### Stat Card
```jsx
<Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-lg">
  <CardContent className="p-5">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm font-medium text-white/80 uppercase tracking-wide">Parts In Stock</p>
        <h3 className="text-3xl font-bold">287</h3>
        <p className="text-xs text-green-200 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> +8.2% this week
        </p>
      </div>
      <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
        <Package className="h-7 w-7 text-white" />
      </div>
    </div>
  </CardContent>
  <div className="bg-black/20 px-5 py-2.5 flex items-center justify-center gap-2 text-sm">
    View Details <ArrowRight className="h-4 w-4" />
  </div>
</Card>
```

### 5.3 Navigation

#### Public Navbar
```jsx
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#FF4D24] flex items-center justify-center">
          <Wrench className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white font-['Oxanium']">
          MASS<span className="text-[#FF4D24]">OSS</span>
        </span>
      </Link>
      {/* Nav items... */}
    </div>
  </div>
</nav>
```

### 5.4 Forms

#### Input Field
```jsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
    Email
  </Label>
  <Input 
    id="email"
    type="email"
    placeholder="you@example.com"
    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF4D24] focus:ring-2 focus:ring-[#FF4D24]/20"
  />
</div>
```

#### Select Field
```jsx
<Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a service" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="engine">Engine Repair</SelectItem>
    <SelectItem value="brakes">Brake Service</SelectItem>
    <SelectItem value="ac">AC Service</SelectItem>
  </SelectContent>
</Select>
```

### 5.5 Data Display

#### Badge Variants
```jsx
// Status badges
<Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
<Badge className="bg-amber-100 text-amber-700">Pending</Badge>
<Badge className="bg-red-100 text-red-700">Urgent</Badge>
<Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
<Badge className="bg-gray-100 text-gray-700">Inactive</Badge>

// Feature badges
<Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">NEW</Badge>
<Badge className="bg-[#FF4D24]/10 text-[#FF4D24]">Featured</Badge>
```

#### Table Row
```jsx
<TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
  <TableCell className="font-medium">{customer.name}</TableCell>
  <TableCell>{customer.email}</TableCell>
  <TableCell>{customer.phone}</TableCell>
  <TableCell>
    <Badge variant={customer.isActive ? "success" : "secondary"}>
      {customer.isActive ? "Active" : "Inactive"}
    </Badge>
  </TableCell>
  <TableCell className="text-right">
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
    </div>
  </TableCell>
</TableRow>
```

---

## 6. Icons

### Icon Library: Lucide React

```jsx
import { 
  // Navigation
  Menu, X, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft,
  
  // Actions
  Plus, Minus, Search, Filter, RefreshCw, Download, Upload,
  
  // Objects
  Car, Wrench, Cog, Package, Users, FileText, Calendar,
  
  // Status
  CheckCircle2, XCircle, AlertCircle, Info, Clock, Ban,
  
  // Communication
  Phone, Mail, MessageSquare, Bell,
  
  // Data
  BarChart3, TrendingUp, TrendingDown, PieChart,
  
  // UI
  Eye, EyeOff, Pencil, Trash2, MoreHorizontal, Settings,
} from "lucide-react";
```

### Icon Sizes

| Size | Class | Usage |
|------|-------|-------|
| **XS** | `w-3 h-3` | Inline text icons |
| **SM** | `w-4 h-4` | Button icons, badges |
| **MD** | `w-5 h-5` | Navigation items |
| **LG** | `w-6 h-6` | Feature icons |
| **XL** | `w-7 h-7` | Card icons |
| **2XL** | `w-8 h-8` | Section icons |
| **Hero** | `w-12 h-12` | Hero feature icons |

---

## 7. Animation

### Transition Presets

```css
/* Fast - micro interactions */
.transition-fast { transition: all 150ms ease; }

/* Default - most elements */
.transition-all { transition: all 300ms ease; }

/* Slow - page transitions */
.transition-slow { transition: all 500ms ease; }

/* Spring - bouncy effects */
.transition-spring {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Framer Motion Variants

```jsx
// Card entrance animation
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: i * 0.08
    }
  }),
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
};

// Page header animation
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};
```

### Hover Effects

```css
/* Button hover glow */
.btn-primary:hover {
  box-shadow: 0 10px 25px -5px rgba(255, 77, 36, 0.3);
}

/* Card lift effect */
.card:hover {
  transform: translateY(-4px) scale(1.02);
}

/* Border highlight */
.card:hover {
  border-color: #FF4D24;
}

/* Icon container fill */
.icon-container:hover {
  background-color: #FF4D24;
  color: white;
}
```

---

## 8. Responsive Design

### Breakpoints

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| **Default** | 0px | Mobile phones |
| **sm** | 640px | Large phones, small tablets |
| **md** | 768px | Tablets |
| **lg** | 1024px | Small laptops |
| **xl** | 1280px | Desktops |
| **2xl** | 1536px | Large monitors |

### Responsive Patterns

#### Mobile-First Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Items */}
</div>
```

#### Sidebar Collapse
```jsx
// Sidebar: visible on lg+, hidden on mobile
<aside className="hidden lg:block w-64">
  {/* Sidebar content */}
</aside>

// Mobile menu: visible on mobile, hidden on lg+
<div className="lg:hidden">
  {/* Mobile menu */}
</div>
```

#### Text Sizing
```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
  Responsive Heading
</h1>
```

#### Spacing Adjustments
```jsx
<section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  {/* Content */}
</section>
```

---

## 9. Accessibility

### Color Contrast
- All text must meet WCAG 2.1 AA contrast ratio (4.5:1 for normal text)
- `#FF4D24` on `#000000` = 5.2:1 ✅
- `#9CA3AF` on `#000000` = 7.5:1 ✅

### Focus States
```css
/* Visible focus outline for keyboard navigation */
*:focus-visible {
  outline: 2px solid #FF4D24;
  outline-offset: 2px;
}

/* Remove outline for mouse clicks */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Support
```jsx
// Hidden but readable
<span className="sr-only">Toggle navigation menu</span>

// Aria labels
<button aria-label="Close dialog">
  <X className="w-6 h-6" />
</button>

// Live regions for updates
<div aria-live="polite" aria-atomic="true">
  Sale completed successfully
</div>
```

---

## 10. Dark/Light Mode

### Theme Variables

```css
/* Light mode */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 11 100% 55%;
  --primary-foreground: 0 0% 100%;
}

/* Dark mode */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 11 100% 55%;
  --primary-foreground: 0 0% 100%;
}
```

### Conditional Classes
```jsx
// Background
<div className="bg-white dark:bg-slate-900">

// Text
<p className="text-slate-900 dark:text-white">

// Borders
<div className="border-slate-200 dark:border-slate-700">

// Hover states
<button className="hover:bg-slate-100 dark:hover:bg-slate-800">
```

---

## 11. Design Tokens Reference

### Complete Token List

```javascript
export const designTokens = {
  colors: {
    brand: {
      primary: '#FF4D24',
      primaryHover: '#FF6B47',
      primaryLight: 'rgba(255, 77, 36, 0.1)',
      primaryGlow: 'rgba(255, 77, 36, 0.3)',
    },
    neutral: {
      black: '#000000',
      charcoal: '#0E0E0E',
      card: '#1A1A1A',
      sidebar: '#0F172A',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
      muted: '#6B7280',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
    glow: '0 10px 25px rgba(255,77,36,0.3)',
  },
  fonts: {
    heading: "'Oxanium', 'Inter', system-ui, sans-serif",
    body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};
```

---

**Document Version:** 1.0  
**Last Updated:** January 11, 2026  
**Design System:** MASS OSS
