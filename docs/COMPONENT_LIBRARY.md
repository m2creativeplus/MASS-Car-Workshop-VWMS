# MASS OSS Component Library

> 26 shadcn/ui primitives + 15 custom components

---

## UI Primitives (shadcn/ui)

| Component | File | Description |
|-----------|------|-------------|
| `Accordion` | `accordion.tsx` | Collapsible content sections |
| `Alert` | `alert.tsx` | Status notifications |
| `Avatar` | `avatar.tsx` | User profile images |
| `Badge` | `badge.tsx` | Status labels |
| `Button` | `button.tsx` | Action triggers |
| `Calendar` | `calendar.tsx` | Date picker |
| `Card` | `card.tsx` | Content containers |
| `Checkbox` | `checkbox.tsx` | Boolean inputs |
| `Dialog` | `dialog.tsx` | Modal windows |
| `DropdownMenu` | `dropdown-menu.tsx` | Context menus |
| `Input` | `input.tsx` | Text fields |
| `Label` | `label.tsx` | Form labels |
| `Progress` | `progress.tsx` | Loading indicators |
| `RadioGroup` | `radio-group.tsx` | Single selection |
| `ScrollArea` | `scroll-area.tsx` | Custom scrollbars |
| `Select` | `select.tsx` | Dropdown selection |
| `Separator` | `separator.tsx` | Visual dividers |
| `Sheet` | `sheet.tsx` | Slide-out panels |
| `Skeleton` | `skeleton.tsx` | Loading placeholders |
| `Slider` | `slider.tsx` | Range selector |
| `Switch` | `switch.tsx` | Toggle controls |
| `Table` | `table.tsx` | Data tables |
| `Tabs` | `tabs.tsx` | Tab navigation |
| `Textarea` | `textarea.tsx` | Multi-line input |
| `Toast` | `use-toast.tsx` | Notifications |

---

## Custom Components

### Premium KPI Card
```tsx
// components/ui/premium-kpi-card.tsx
<PremiumKPICard 
  title="Total Revenue"
  value="$24,500"
  change="+12.5%"
  trend="up"
  icon={DollarSign}
  gradient="cyan"
/>
```

**Gradient Options:** `cyan`, `amber`, `emerald`, `rose`, `purple`

---

### Kanban Board
```tsx
// Usage in Work Orders
<div className="kanban-column">
  <KanbanCard 
    title="WO-2024-001"
    customer="Ahmed Hassan"
    vehicle="Toyota Prado"
    status="in-progress"
  />
</div>
```

---

### DVI Status Items
```tsx
// Traffic light system
<div className="dvi-good">✅ OK - No action needed</div>
<div className="dvi-attention">⚠️ Monitor - Future service</div>
<div className="dvi-urgent">🔴 Immediate - Safety concern</div>
```

---

### Settings Components
```tsx
// GroceryGo-style settings
<div className="settings-card">
  <div className="settings-header">
    <span>General Settings</span>
    <Settings className="h-4 w-4" />
  </div>
  <div className="settings-body">
    <div className="settings-grid">
      <div className="settings-field">
        <label className="settings-label">Business Name</label>
        <input className="settings-input" />
      </div>
    </div>
  </div>
  <div className="settings-footer">
    <button className="settings-btn settings-btn-secondary">Cancel</button>
    <button className="settings-btn settings-btn-primary">Save</button>
  </div>
</div>
```

---

## Animation Classes

| Class | Effect | Duration |
|-------|--------|----------|
| `.animate-count-up` | Fade + slide up | 0.5s |
| `.animate-slide-in-left` | Slide from left | 0.4s |
| `.animate-slide-in-right` | Slide from right | 0.4s |
| `.animate-fade-in-up` | Fade + rise | 0.5s |
| `.animate-shimmer` | Loading shimmer | 2s loop |

### Stagger Delays
```html
<div class="stagger-1">...</div>  <!-- 0.1s delay -->
<div class="stagger-2">...</div>  <!-- 0.2s delay -->
<div class="stagger-3">...</div>  <!-- 0.3s delay -->
```

---

## Status Indicators

```css
.status-dot-success { /* Green pulsing */ }
.status-dot-warning { /* Amber pulsing */ }
.status-dot-danger  { /* Red pulsing */ }
```

---

## Glassmorphism

```tsx
<div className="glass-card p-6 rounded-xl">
  {/* Frosted glass effect */}
</div>
```
