# MASS OSS Design Patterns

> Reusable patterns and best practices

---

## Layout Patterns

### 1. Dashboard Layout
```
┌─────────────────────────────────────────────────┐
│ Sidebar (w-64)  │  Main Content (flex-1)        │
│                 │                                │
│ ┌─────────────┐ │  ┌─────────────────────────┐  │
│ │ Logo        │ │  │ Header + Breadcrumb     │  │
│ ├─────────────┤ │  ├─────────────────────────┤  │
│ │ Nav Items   │ │  │                         │  │
│ │             │ │  │   Page Content          │  │
│ │             │ │  │                         │  │
│ │             │ │  │                         │  │
│ └─────────────┘ │  └─────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 2. Data Table Page
```tsx
<div className="space-y-4">
  {/* Header with actions */}
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Vehicles</h1>
    <Button>Add Vehicle</Button>
  </div>
  
  {/* Filters */}
  <div className="flex gap-4">
    <Input placeholder="Search..." />
    <Select><SelectTrigger>Status</SelectTrigger></Select>
  </div>
  
  {/* Table */}
  <Card>
    <Table>...</Table>
  </Card>
  
  {/* Pagination */}
  <div className="flex justify-end">...</div>
</div>
```

---

## Component Patterns

### 1. CRUD Dialog
```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

// Open for create
<Button onClick={() => { setSelectedItem(null); setIsOpen(true); }}>
  Add New
</Button>

// Open for edit
<Button onClick={() => { setSelectedItem(item); setIsOpen(true); }}>
  Edit
</Button>

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{selectedItem ? 'Edit' : 'Create'}</DialogTitle>
    </DialogHeader>
    <form>...</form>
  </DialogContent>
</Dialog>
```

### 2. Status Badge Pattern
```tsx
const getStatusBadge = (status: string) => {
  const styles = {
    active: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    urgent: "bg-red-100 text-red-700",
    complete: "bg-blue-100 text-blue-700",
  };
  return <Badge className={styles[status]}>{status}</Badge>;
};
```

### 3. Loading State Pattern
```tsx
const { data, isLoading } = useQuery(api.getData);

if (isLoading) {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

return <DataComponent data={data} />;
```

---

## Form Patterns

### 1. Controlled Form
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

<Input 
  value={formData.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

### 2. Form Validation
```tsx
const validateForm = () => {
  const errors = {};
  if (!formData.name) errors.name = 'Required';
  if (!formData.email.includes('@')) errors.email = 'Invalid email';
  return errors;
};

const handleSubmit = () => {
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  // Submit
};
```

---

## Data Fetching Patterns

### 1. Convex Query
```tsx
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const vehicles = useQuery(api.functions.getVehicles, { orgId });
```

### 2. Convex Mutation
```tsx
import { useMutation } from 'convex/react';

const createVehicle = useMutation(api.functions.addVehicle);

const handleCreate = async () => {
  await createVehicle({
    make: 'Toyota',
    model: 'Prado',
    year: 2020,
    orgId,
  });
};
```

---

## Responsive Patterns

### Mobile-First Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>
```

### Hidden on Mobile
```tsx
<div className="hidden lg:block">Desktop only</div>
<div className="lg:hidden">Mobile only</div>
```

---

## Animation Patterns

### Staggered List
```tsx
{items.map((item, i) => (
  <div 
    key={item.id}
    className={`animate-fade-in-up stagger-${i + 1}`}
  >
    {item.name}
  </div>
))}
```

### Hover Effects
```tsx
<Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  ...
</Card>
```
