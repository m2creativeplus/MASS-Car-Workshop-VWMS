"use client";

import { VehiclePassport } from "@/components/verify/vehicle-passport";

// Demo data for vehicle passport
const DEMO_VEHICLE = {
  vin: "JTM8R5EV5JD789012",
  make: "Toyota",
  model: "Land Cruiser Prado",
  year: 2023,
  color: "Pearl White",
  mileage: 45230,
  fuelType: "Diesel",
  engineSize: "2.8L Turbo",
  transmission: "Automatic",
  licensePlate: "SL-1234",
};

const DEMO_SERVICE_HISTORY = [
  {
    id: "srv-001",
    date: "Jan 15, 2026",
    type: "Oil Change",
    mileage: 45230,
    description: "Full synthetic oil change, filter replaced",
    provider: "MASS Automotive Center, Hargeisa",
  },
  {
    id: "srv-002",
    date: "Oct 20, 2025",
    type: "Brake Service",
    mileage: 40100,
    description: "Front brake pads and rotors replaced",
    provider: "MASS Automotive Center, Hargeisa",
  },
  {
    id: "srv-003",
    date: "Jul 5, 2025",
    type: "Major Service",
    mileage: 35000,
    description: "35,000 km service - oil, filters, spark plugs, transmission fluid",
    provider: "MATCO Motors, Hargeisa",
  },
  {
    id: "srv-004",
    date: "Mar 12, 2025",
    type: "Tire Replacement",
    mileage: 28500,
    description: "4x new tires - BF Goodrich All-Terrain",
    provider: "MASS Automotive Center, Hargeisa",
  },
];

const DEMO_INSPECTIONS = [
  {
    id: "insp-001",
    date: "Jan 15, 2026",
    type: "Pre-Sale Inspection",
    result: "pass" as const,
    notes: "Vehicle in excellent condition, all systems functional",
  },
  {
    id: "insp-002",
    date: "Oct 20, 2025",
    type: "Safety Inspection",
    result: "warning" as const,
    notes: "Brake pads at 20% - replaced during service",
  },
  {
    id: "insp-003",
    date: "Jul 5, 2025",
    type: "Annual Inspection",
    result: "pass" as const,
    notes: "All components within specification",
  },
];

export default function VehiclePassportPage({
  params,
}: {
  params: { id: string };
}) {
  // In production, fetch vehicle data by params.id
  const passportId = params.id || "MASS-VP-2026-001";

  return (
    <VehiclePassport
      vehicle={DEMO_VEHICLE}
      serviceHistory={DEMO_SERVICE_HISTORY}
      inspections={DEMO_INSPECTIONS}
      passportId={passportId}
      verifiedDate="Jan 17, 2026"
    />
  );
}
