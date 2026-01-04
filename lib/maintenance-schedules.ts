/**
 * Maintenance Interval Seed Data
 * 
 * Based on international best practices from Toyota, Honda, and industry standards.
 * Source: OEM maintenance schedules for vehicles popular in East Africa.
 */

export interface MaintenanceInterval {
  id: string;
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  service: string;
  category: "oil" | "brakes" | "timing" | "filters" | "fluids" | "inspection" | "tires" | "electrical";
  intervalMiles: number;
  intervalMonths: number;
  estimatedCostUSD: number;
  laborHours: number;
  severity: "routine" | "important" | "critical";
  notes?: string;
}

/**
 * Toyota Maintenance Schedule
 * Based on official Toyota Care Plus recommendations
 */
export const toyotaMaintenanceSchedule: MaintenanceInterval[] = [
  // ENGINE OIL
  {
    id: "TOY-OIL-001",
    make: "Toyota",
    model: "Vitz",
    yearFrom: 2010,
    yearTo: 2020,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 5000,
    intervalMonths: 6,
    estimatedCostUSD: 45,
    laborHours: 0.5,
    severity: "routine",
    notes: "Use 0W-20 synthetic oil for optimal fuel economy"
  },
  {
    id: "TOY-OIL-002",
    make: "Toyota",
    model: "Probox",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 5000,
    intervalMonths: 6,
    estimatedCostUSD: 50,
    laborHours: 0.5,
    severity: "routine",
    notes: "Commercial use may require more frequent changes"
  },
  {
    id: "TOY-OIL-003",
    make: "Toyota",
    model: "Land Cruiser Prado",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 10000,
    intervalMonths: 12,
    estimatedCostUSD: 95,
    laborHours: 0.75,
    severity: "routine",
    notes: "Requires 7-8 quarts of 5W-30 synthetic"
  },
  {
    id: "TOY-OIL-004",
    make: "Toyota",
    model: "Hilux",
    yearFrom: 2015,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 10000,
    intervalMonths: 12,
    estimatedCostUSD: 85,
    laborHours: 0.75,
    severity: "routine",
    notes: "Diesel engines require CD quality oil"
  },
  
  // BRAKES
  {
    id: "TOY-BRK-001",
    make: "Toyota",
    model: "Vitz",
    yearFrom: 2010,
    yearTo: 2020,
    service: "Front Brake Pads Replacement",
    category: "brakes",
    intervalMiles: 25000,
    intervalMonths: 24,
    estimatedCostUSD: 120,
    laborHours: 1.0,
    severity: "important",
    notes: "Inspect at every oil change"
  },
  {
    id: "TOY-BRK-002",
    make: "Toyota",
    model: "Land Cruiser 79",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Front Brake Pads Replacement",
    category: "brakes",
    intervalMiles: 30000,
    intervalMonths: 24,
    estimatedCostUSD: 180,
    laborHours: 1.5,
    severity: "important",
    notes: "Heavy-duty pads recommended for off-road use"
  },
  {
    id: "TOY-BRK-003",
    make: "Toyota",
    model: "Hilux",
    yearFrom: 2015,
    yearTo: 2025,
    service: "Brake Fluid Flush",
    category: "brakes",
    intervalMiles: 30000,
    intervalMonths: 24,
    estimatedCostUSD: 75,
    laborHours: 0.75,
    severity: "important",
    notes: "DOT 3 or DOT 4 brake fluid"
  },
  
  // TIMING BELT/CHAIN
  {
    id: "TOY-TIM-001",
    make: "Toyota",
    model: "Land Cruiser Prado",
    yearFrom: 2010,
    yearTo: 2015,
    service: "Timing Belt & Water Pump Replacement",
    category: "timing",
    intervalMiles: 90000,
    intervalMonths: 84,
    estimatedCostUSD: 650,
    laborHours: 6.0,
    severity: "critical",
    notes: "Replace tensioner and idler pulleys at same time"
  },
  {
    id: "TOY-TIM-002",
    make: "Toyota",
    model: "Hilux",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Timing Chain Inspection",
    category: "timing",
    intervalMiles: 100000,
    intervalMonths: 96,
    estimatedCostUSD: 75,
    laborHours: 1.0,
    severity: "important",
    notes: "Chain usually lasts lifetime of engine if oil changes done on time"
  },
  
  // FILTERS
  {
    id: "TOY-FLT-001",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Air Filter Replacement",
    category: "filters",
    intervalMiles: 15000,
    intervalMonths: 12,
    estimatedCostUSD: 25,
    laborHours: 0.25,
    severity: "routine",
    notes: "Check more frequently in dusty conditions (East Africa)"
  },
  {
    id: "TOY-FLT-002",
    make: "Toyota",
    model: "All Diesel Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Fuel Filter Replacement",
    category: "filters",
    intervalMiles: 20000,
    intervalMonths: 24,
    estimatedCostUSD: 55,
    laborHours: 0.5,
    severity: "important",
    notes: "Critical for diesel engines - dirty fuel common in region"
  },
  
  // FLUIDS
  {
    id: "TOY-FLD-001",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Transmission Fluid Change",
    category: "fluids",
    intervalMiles: 30000,
    intervalMonths: 36,
    estimatedCostUSD: 150,
    laborHours: 1.0,
    severity: "important",
    notes: "Use Toyota WS ATF for automatics"
  },
  {
    id: "TOY-FLD-002",
    make: "Toyota",
    model: "Land Cruiser Prado",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Coolant Flush",
    category: "fluids",
    intervalMiles: 50000,
    intervalMonths: 48,
    estimatedCostUSD: 120,
    laborHours: 1.0,
    severity: "important",
    notes: "Use Toyota Super Long Life Coolant (pink)"
  },
  {
    id: "TOY-FLD-003",
    make: "Toyota",
    model: "Land Cruiser 79",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Differential & Transfer Case Oil",
    category: "fluids",
    intervalMiles: 30000,
    intervalMonths: 36,
    estimatedCostUSD: 180,
    laborHours: 1.5,
    severity: "important",
    notes: "Critical for 4WD vehicles - front and rear differentials"
  },
  
  // INSPECTIONS
  {
    id: "TOY-INS-001",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Suspension Inspection",
    category: "inspection",
    intervalMiles: 15000,
    intervalMonths: 12,
    estimatedCostUSD: 45,
    laborHours: 0.5,
    severity: "routine",
    notes: "Check ball joints, tie rods, bushings"
  },
  {
    id: "TOY-INS-002",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Battery Health Check",
    category: "electrical",
    intervalMiles: 15000,
    intervalMonths: 12,
    estimatedCostUSD: 15,
    laborHours: 0.25,
    severity: "routine",
    notes: "Heat reduces battery life - replace every 2-3 years in hot climates"
  },
  
  // TIRES
  {
    id: "TOY-TIR-001",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Tire Rotation",
    category: "tires",
    intervalMiles: 5000,
    intervalMonths: 6,
    estimatedCostUSD: 25,
    laborHours: 0.5,
    severity: "routine",
    notes: "Rotate front-to-back for even wear"
  },
  {
    id: "TOY-TIR-002",
    make: "Toyota",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Wheel Alignment",
    category: "tires",
    intervalMiles: 15000,
    intervalMonths: 12,
    estimatedCostUSD: 65,
    laborHours: 1.0,
    severity: "routine",
    notes: "Check after hitting potholes or rough roads"
  }
];

/**
 * Honda Maintenance Schedule
 */
export const hondaMaintenanceSchedule: MaintenanceInterval[] = [
  {
    id: "HON-OIL-001",
    make: "Honda",
    model: "Fit",
    yearFrom: 2010,
    yearTo: 2020,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 7500,
    intervalMonths: 12,
    estimatedCostUSD: 45,
    laborHours: 0.5,
    severity: "routine",
    notes: "Maintenance Minder system will indicate when due"
  },
  {
    id: "HON-OIL-002",
    make: "Honda",
    model: "Vezel",
    yearFrom: 2014,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 7500,
    intervalMonths: 12,
    estimatedCostUSD: 55,
    laborHours: 0.5,
    severity: "routine",
    notes: "Uses 0W-20 synthetic oil"
  },
  {
    id: "HON-OIL-003",
    make: "Honda",
    model: "CR-V",
    yearFrom: 2012,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 7500,
    intervalMonths: 12,
    estimatedCostUSD: 60,
    laborHours: 0.5,
    severity: "routine"
  },
  {
    id: "HON-TIM-001",
    make: "Honda",
    model: "Fit",
    yearFrom: 2010,
    yearTo: 2020,
    service: "Timing Chain Inspection",
    category: "timing",
    intervalMiles: 105000,
    intervalMonths: 96,
    estimatedCostUSD: 50,
    laborHours: 0.75,
    severity: "routine",
    notes: "Uses timing chain - no scheduled replacement"
  },
  {
    id: "HON-FLT-001",
    make: "Honda",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Cabin Air Filter Replacement",
    category: "filters",
    intervalMiles: 15000,
    intervalMonths: 12,
    estimatedCostUSD: 35,
    laborHours: 0.25,
    severity: "routine",
    notes: "Behind glove box - easy DIY replacement"
  },
  {
    id: "HON-FLD-001",
    make: "Honda",
    model: "All Models",
    yearFrom: 2010,
    yearTo: 2025,
    service: "CVT Transmission Fluid",
    category: "fluids",
    intervalMiles: 30000,
    intervalMonths: 36,
    estimatedCostUSD: 140,
    laborHours: 1.0,
    severity: "important",
    notes: "Use Honda HCF-2 CVT fluid only"
  }
];

/**
 * Nissan Maintenance Schedule
 */
export const nissanMaintenanceSchedule: MaintenanceInterval[] = [
  {
    id: "NIS-OIL-001",
    make: "Nissan",
    model: "Patrol",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 10000,
    intervalMonths: 12,
    estimatedCostUSD: 95,
    laborHours: 0.75,
    severity: "routine",
    notes: "Large V8 requires 8+ quarts"
  },
  {
    id: "NIS-OIL-002",
    make: "Nissan",
    model: "X-Trail",
    yearFrom: 2014,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 5000,
    intervalMonths: 6,
    estimatedCostUSD: 55,
    laborHours: 0.5,
    severity: "routine"
  },
  {
    id: "NIS-FLD-001",
    make: "Nissan",
    model: "Patrol",
    yearFrom: 2010,
    yearTo: 2025,
    service: "Transfer Case & Differential Fluid",
    category: "fluids",
    intervalMiles: 30000,
    intervalMonths: 36,
    estimatedCostUSD: 200,
    laborHours: 2.0,
    severity: "important",
    notes: "Critical for 4x4 operation"
  }
];

/**
 * Suzuki Maintenance Schedule
 */
export const suzukiMaintenanceSchedule: MaintenanceInterval[] = [
  {
    id: "SUZ-OIL-001",
    make: "Suzuki",
    model: "Jimny",
    yearFrom: 2018,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 5000,
    intervalMonths: 6,
    estimatedCostUSD: 40,
    laborHours: 0.5,
    severity: "routine",
    notes: "Small 1.5L engine - economical maintenance"
  },
  {
    id: "SUZ-OIL-002",
    make: "Suzuki",
    model: "Escudo",
    yearFrom: 2015,
    yearTo: 2025,
    service: "Engine Oil & Filter Change",
    category: "oil",
    intervalMiles: 7500,
    intervalMonths: 12,
    estimatedCostUSD: 50,
    laborHours: 0.5,
    severity: "routine"
  },
  {
    id: "SUZ-FLD-001",
    make: "Suzuki",
    model: "Jimny",
    yearFrom: 2018,
    yearTo: 2025,
    service: "Transfer Case & Differential Fluid",
    category: "fluids",
    intervalMiles: 30000,
    intervalMonths: 36,
    estimatedCostUSD: 120,
    laborHours: 1.5,
    severity: "important",
    notes: "Part-time 4WD system"
  }
];

/**
 * Combined database for all makes
 */
export const allMaintenanceSchedules: MaintenanceInterval[] = [
  ...toyotaMaintenanceSchedule,
  ...hondaMaintenanceSchedule,
  ...nissanMaintenanceSchedule,
  ...suzukiMaintenanceSchedule
];

/**
 * Get maintenance due for a specific vehicle
 */
export function getMaintenanceDue(
  make: string,
  model: string,
  year: number,
  currentMileage: number
): MaintenanceInterval[] {
  return allMaintenanceSchedules.filter(item => {
    const matchesMake = item.make.toLowerCase() === make.toLowerCase() || 
                        item.model.toLowerCase() === "all models" ||
                        item.model.toLowerCase().includes("all");
    const matchesModel = item.model.toLowerCase() === model.toLowerCase() ||
                         item.model.toLowerCase() === "all models" ||
                         item.model.toLowerCase().includes("all");
    const matchesYear = year >= item.yearFrom && year <= item.yearTo;
    
    return (matchesMake || matchesModel) && matchesYear;
  }).sort((a, b) => a.intervalMiles - b.intervalMiles);
}

/**
 * Calculate next service due
 */
export function calculateNextService(
  currentMileage: number,
  intervalMiles: number
): { dueAt: number; milesRemaining: number; isPastDue: boolean } {
  const lastServiceMileage = Math.floor(currentMileage / intervalMiles) * intervalMiles;
  const nextServiceMileage = lastServiceMileage + intervalMiles;
  const milesRemaining = nextServiceMileage - currentMileage;
  
  return {
    dueAt: nextServiceMileage,
    milesRemaining: Math.max(0, milesRemaining),
    isPastDue: milesRemaining < 0
  };
}
