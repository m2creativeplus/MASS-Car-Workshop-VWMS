/**
 * New Dashboard Routes Configuration
 * 
 * Add these to your sidebar navigation
 */

export const NEW_DASHBOARD_ROUTES = [
  // AI Tools Section
  {
    category: "AI Tools",
    items: [
      {
        title: "Photo Studio",
        href: "/dashboard/photo-studio",
        icon: "Sparkles",
        description: "AI background removal & enhancement",
        badge: "New",
      },
      {
        title: "3D Configurator",
        href: "/dashboard/configurator",
        icon: "Box",
        description: "Customize vehicle colors & wheels",
        badge: "New",
      },
      {
        title: "AI Diagnostics",
        href: "/dashboard/diagnostics",
        icon: "Cpu",
        description: "OBD codes & image analysis",
      },
    ],
  },
  
  // Marketplace Section
  {
    category: "Marketplace",
    items: [
      {
        title: "EV Marketplace",
        href: "/dashboard/ev-marketplace",
        icon: "Zap",
        description: "Electric vehicles for East Africa",
        badge: "New",
      },
      {
        title: "Japan Imports",
        href: "/dashboard/japan-imports",
        icon: "Ship",
        description: "BE FORWARD vehicle tracker",
      },
      {
        title: "Dealer Network",
        href: "/dashboard/dealer-network",
        icon: "Building2",
        description: "Horn of Africa dealers",
        badge: "New",
      },
    ],
  },
  
  // Settings Section (additions)
  {
    category: "Settings",
    items: [
      {
        title: "SMS Reminders",
        href: "/dashboard/settings/reminders",
        icon: "Bell",
        description: "Automated notifications",
        badge: "New",
      },
    ],
  },
];

/**
 * Icon mapping for Lucide React
 */
export const ICON_MAP = {
  Sparkles: "Sparkles",
  Box: "Box",
  Cpu: "Cpu",
  Zap: "Zap",
  Ship: "Ship",
  Building2: "Building2",
  Bell: "Bell",
} as const;

/**
 * Full sidebar structure with new routes
 */
export const FULL_SIDEBAR_CONFIG = {
  main: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Appointments", href: "/dashboard/appointments", icon: "Calendar" },
    { title: "Work Orders", href: "/dashboard/work-orders", icon: "Wrench" },
    { title: "Inspections", href: "/dashboard/inspections", icon: "ClipboardCheck" },
    { title: "Estimates", href: "/dashboard/estimates", icon: "FileText" },
  ],
  
  assets: [
    { title: "Vehicles", href: "/dashboard/vehicles", icon: "Car" },
    { title: "Customers", href: "/dashboard/customers", icon: "Users" },
    { title: "Inventory", href: "/dashboard/inventory", icon: "Package" },
    { title: "Suppliers", href: "/dashboard/suppliers", icon: "Truck" },
    { title: "Technicians", href: "/dashboard/technicians", icon: "UserCog" },
  ],
  
  aiTools: [
    { title: "Photo Studio", href: "/dashboard/photo-studio", icon: "Sparkles", badge: "New" },
    { title: "3D Configurator", href: "/dashboard/configurator", icon: "Box", badge: "New" },
    { title: "AI Diagnostics", href: "/dashboard/diagnostics", icon: "Cpu" },
    { title: "AI Assistant", href: "/dashboard/ai-tools", icon: "Bot" },
  ],
  
  marketplace: [
    { title: "EV Marketplace", href: "/dashboard/ev-marketplace", icon: "Zap", badge: "New" },
    { title: "Japan Imports", href: "/dashboard/japan-imports", icon: "Ship" },
    { title: "Dealer Network", href: "/dashboard/dealer-network", icon: "Building2", badge: "New" },
    { title: "Market Intel", href: "/dashboard/market", icon: "TrendingUp" },
  ],
  
  finance: [
    { title: "POS", href: "/dashboard/pos", icon: "CreditCard" },
    { title: "Reports", href: "/dashboard/reports", icon: "BarChart3" },
    { title: "Export", href: "/dashboard/export", icon: "Download" },
  ],
  
  settings: [
    { title: "General", href: "/dashboard/settings", icon: "Settings" },
    { title: "SMS Reminders", href: "/dashboard/settings/reminders", icon: "Bell", badge: "New" },
    { title: "CMS", href: "/dashboard/cms", icon: "FileEdit" },
    { title: "Locations", href: "/dashboard/locations", icon: "MapPin" },
  ],
};
