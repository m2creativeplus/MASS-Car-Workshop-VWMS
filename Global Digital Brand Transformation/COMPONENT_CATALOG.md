# 📦 MASS Car Workshop Component Catalog

## Complete UI Component Library Documentation

**Total Components:** 27  
**Design System:** shadcn/ui + Custom MASS Components  
**Framework:** React 19 + TypeScript  
**Styling:** TailwindCSS + CVA (class-variance-authority)

---

## 🎛️ Core Components

### Button

**File:** `components/ui/button.tsx`  
**Based on:** Radix Slot

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `asChild` | `boolean` | `false` | Render as child element |
| `disabled` | `boolean` | `false` | Disable button |

**Variants:**
```
default    → bg-primary, hover:bg-primary/90
destructive → bg-destructive (red)
outline    → border + bg-background
secondary  → bg-secondary (gray)
ghost      → transparent, hover:bg-accent
link       → text-primary, underline on hover
```

**Sizes:**
```
default → h-10 px-4 py-2
sm      → h-9 px-3
lg      → h-11 px-8
icon    → h-10 w-10 (square)
```

---

### Card

**File:** `components/ui/card.tsx`

| Sub-component | Description | Default Style |
|---------------|-------------|---------------|
| `Card` | Container | `rounded-lg border bg-card shadow-sm` |
| `CardHeader` | Header section | `flex flex-col space-y-1.5 p-6` |
| `CardTitle` | Title text | `text-2xl font-semibold` |
| `CardDescription` | Subtitle | `text-sm text-muted-foreground` |
| `CardContent` | Main content | `p-6 pt-0` |
| `CardFooter` | Footer section | `flex items-center p-6 pt-0` |

---

### Badge

**File:** `components/ui/badge.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline"` | `"default"` | Visual style |

**Variants:**
```
default     → bg-primary, text-primary-foreground
secondary   → bg-secondary, text-secondary-foreground
destructive → bg-destructive (red)
outline     → border only, text-foreground
```

---

### Input

**File:** `components/ui/input.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `type` | `string` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | Placeholder text |
| `disabled` | `boolean` | Disable input |

**Style:** `h-10 w-full rounded-md border border-input bg-background px-3 py-2`

---

## 🏆 Premium Components

### PremiumKPICard

**File:** `components/ui/premium-kpi-card.tsx`  
**Custom MASS component for dashboard metrics**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | KPI label |
| `value` | `string \| number` | ✅ | KPI value |
| `icon` | `LucideIcon` | ✅ | Lucide icon component |
| `trend` | `{ value: number, label: string, positive: boolean }` | ❌ | Trend indicator |
| `color` | `"primary" \| "success" \| "warning" \| "danger" \| "info" \| "purple"` | ❌ | Color theme |
| `index` | `number` | ❌ | Animation delay index |

**Color Themes:**
| Color | Gradient | Icon Background |
|-------|----------|-----------------|
| `primary` | orange-500/10 | orange-100 |
| `success` | emerald-500/10 | emerald-100 |
| `warning` | amber-500/10 | amber-100 |
| `danger` | red-500/10 | red-100 |
| `info` | blue-500/10 | blue-100 |
| `purple` | purple-500/10 | purple-100 |

---

## 📋 Form Components

### Select

**File:** `components/ui/select.tsx`  
**Based on:** Radix Select

| Sub-component | Description |
|---------------|-------------|
| `Select` | Root container |
| `SelectTrigger` | Clickable button |
| `SelectValue` | Display selected value |
| `SelectContent` | Dropdown content |
| `SelectGroup` | Option grouping |
| `SelectLabel` | Group label |
| `SelectItem` | Selectable option |
| `SelectSeparator` | Divider line |

---

### Checkbox

**File:** `components/ui/checkbox.tsx`  
**Based on:** Radix Checkbox

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | Change handler |
| `disabled` | `boolean` | Disable checkbox |

---

### Radio Group

**File:** `components/ui/radio-group.tsx`  
**Based on:** Radix RadioGroup

| Sub-component | Description |
|---------------|-------------|
| `RadioGroup` | Container with value state |
| `RadioGroupItem` | Individual radio option |

---

### Switch

**File:** `components/ui/switch.tsx`  
**Based on:** Radix Switch

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Toggle state |
| `onCheckedChange` | `(checked: boolean) => void` | Change handler |

---

### Slider

**File:** `components/ui/slider.tsx`  
**Based on:** Radix Slider

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number[]` | Current value(s) |
| `min` | `number` | Minimum value |
| `max` | `number` | Maximum value |
| `step` | `number` | Step increment |

---

### Textarea

**File:** `components/ui/textarea.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `rows` | `number` | Number of visible rows |

---

## 🪟 Overlay Components

### Dialog

**File:** `components/ui/dialog.tsx`  
**Based on:** Radix Dialog

| Sub-component | Description |
|---------------|-------------|
| `Dialog` | Root (controls open state) |
| `DialogTrigger` | Button to open |
| `DialogPortal` | Portal container |
| `DialogOverlay` | Background overlay (bg-black/80) |
| `DialogContent` | Modal content (max-w-lg) |
| `DialogHeader` | Header section |
| `DialogTitle` | Modal title |
| `DialogDescription` | Subtitle text |
| `DialogFooter` | Action buttons area |
| `DialogClose` | Close button (X icon) |

---

### Sheet (Drawer)

**File:** `components/ui/sheet.tsx`  
**Based on:** Radix Dialog (side panel variant)

| Prop | Type | Description |
|------|------|-------------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | Panel position |

---

## 📊 Data Display

### Table

**File:** `components/ui/table.tsx`

| Sub-component | Description |
|---------------|-------------|
| `Table` | Root table container |
| `TableHeader` | `<thead>` wrapper |
| `TableBody` | `<tbody>` wrapper |
| `TableFooter` | `<tfoot>` wrapper |
| `TableRow` | `<tr>` with hover state |
| `TableHead` | `<th>` header cell |
| `TableCell` | `<td>` data cell |
| `TableCaption` | Table caption |

---

### Tabs

**File:** `components/ui/tabs.tsx`  
**Based on:** Radix Tabs

| Sub-component | Description |
|---------------|-------------|
| `Tabs` | Root container |
| `TabsList` | Tab buttons container |
| `TabsTrigger` | Individual tab button |
| `TabsContent` | Tab panel content |

---

### Avatar

**File:** `components/ui/avatar.tsx`  
**Based on:** Radix Avatar

| Sub-component | Description |
|---------------|-------------|
| `Avatar` | Container with `rounded-full` |
| `AvatarImage` | Profile image |
| `AvatarFallback` | Initials fallback |

---

### Progress

**File:** `components/ui/progress.tsx`  
**Based on:** Radix Progress

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Progress percentage (0-100) |

---

### Skeleton

**File:** `components/ui/skeleton.tsx`

**Style:** `animate-pulse rounded-md bg-muted`

Used for loading states. Apply custom width/height via className.

---

## 🎨 Custom MASS Components

### Before/After Slider

**File:** `components/ui/before-after-slider.tsx`  
**Custom component for image comparison**

| Prop | Type | Description |
|------|------|-------------|
| `beforeImage` | `string` | URL of "before" image |
| `afterImage` | `string` | URL of "after" image |

---

## 🎭 CSS Utility Classes (from globals.css)

### Glassmorphism
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}
```

### Gradients
```css
.gradient-primary  → linear-gradient(135deg, primary → orange)
.gradient-success  → linear-gradient(135deg, emerald → darker)
.gradient-dark     → linear-gradient(135deg, slate → darker)
```

### Status Dots
```css
.status-dot-success → emerald-500 with pulse animation
.status-dot-warning → amber-500 with pulse animation
.status-dot-danger  → red-500 with pulse animation
```

### DVI (Digital Vehicle Inspection)
```css
.dvi-good      → emerald background/border
.dvi-attention → amber background/border
.dvi-urgent    → red background/border
```

### Kanban Board
```css
.kanban-column → bg-gray-50, rounded-xl, min-h-400
.kanban-card   → bg-white, shadow, hover:border-orange
```

### Sidebar
```css
.sidebar-premium     → Gradient background with orange glow
.sidebar-item        → Flex, gap-3, hover:bg-slate-800/50
.sidebar-item-active → Orange border-left, bg-orange/10
```

---

## 📥 Import Examples

```tsx
// Core components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Premium components
import { PremiumKPICard } from "@/components/ui/premium-kpi-card"

// Form components
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Overlay components
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Data display
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```
