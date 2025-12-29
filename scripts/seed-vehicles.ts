/**
 * MASS Car Workshop - Vehicle Seed Script
 * Operation "INSTANT FLEET"
 * 
 * Generates 50 realistic vehicle records based on BE FORWARD imports to Somaliland
 * Run with: npx tsx scripts/seed-vehicles.ts
 */

import { config } from "dotenv"
import { createClient } from "@supabase/supabase-js"

// Load environment variables from .env.local
config({ path: ".env.local" })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================================================
// VEHICLE DATA - Based on BE FORWARD popular exports to East Africa/Somaliland
// ============================================================================

// Toyota (60%) - Most popular in Somaliland via BE FORWARD
const toyotaModels = [
  { model: "Vitz", years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015], colors: ["White", "Silver", "Black"] },
  { model: "Probox", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016], colors: ["White", "Silver"] },
  { model: "Land Cruiser 79", years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019], colors: ["White", "Beige", "Gray"] },
  { model: "Land Cruiser Prado", years: [2010, 2012, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Black", "Pearl"] },
  { model: "Hilux", years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], colors: ["White", "Silver", "Gray"] },
  { model: "Harrier", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020], colors: ["Black", "White", "Silver"] },
  { model: "Noah", years: [2010, 2012, 2014, 2015, 2016, 2017], colors: ["White", "Silver", "Black"] },
  { model: "Corolla Axio", years: [2012, 2013, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Silver", "Black"] },
  { model: "Succeed", years: [2010, 2012, 2014, 2015, 2016], colors: ["White", "Silver"] },
  { model: "RAV4", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020], colors: ["White", "Black", "Silver"] },
]

// Honda (20%)
const hondaModels = [
  { model: "Fit", years: [2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Silver", "Blue"] },
  { model: "Vezel", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020], colors: ["Black", "White", "Silver"] },
  { model: "CR-V", years: [2012, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Black", "Silver"] },
  { model: "Freed", years: [2012, 2014, 2015, 2016, 2017], colors: ["White", "Silver", "Black"] },
]

// Nissan (10%)
const nissanModels = [
  { model: "Patrol", years: [2012, 2014, 2015, 2016, 2017, 2018, 2019], colors: ["White", "Black", "Gold"] },
  { model: "Juke", years: [2012, 2014, 2015, 2016, 2017, 2018], colors: ["Red", "White", "Black"] },
  { model: "X-Trail", years: [2014, 2015, 2016, 2017, 2018, 2019], colors: ["White", "Black", "Silver"] },
  { model: "Note", years: [2012, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Silver", "Blue"] },
]

// Suzuki (10%)
const suzukiModels = [
  { model: "Escudo", years: [2012, 2014, 2015, 2016, 2017, 2018], colors: ["White", "Silver", "Black"] },
  { model: "Swift", years: [2012, 2014, 2015, 2016, 2017, 2018, 2019], colors: ["White", "Red", "Blue"] },
  { model: "Every", years: [2012, 2014, 2015, 2016, 2017], colors: ["White", "Silver"] },
  { model: "Jimny", years: [2015, 2016, 2017, 2018, 2019, 2020], colors: ["White", "Green", "Black"] },
]

// Somali names for owners (50 common names)
const somaliNames = [
  "Ahmed Hassan", "Mohamed Abdi", "Fatima Omar", "Halima Ibrahim", "Ali Yusuf",
  "Sahra Ahmed", "Abdirahman Farah", "Khadija Mohamed", "Hussein Nur", "Amina Adan",
  "Ismail Jama", "Hodan Elmi", "Yasmin Osman", "Abdullahi Warsame", "Maryam Ali",
  "Omar Said", "Fardowsa Hirsi", "Hassan Mohamud", "Sagal Abdi", "Jibril Ahmed",
  "Zahra Hassan", "Abdikadir Yusuf", "Nasra Mohamed", "Mahad Farah", "Ifrah Nur",
  "Said Ibrahim", "Nimco Adan", "Mustafa Osman", "Habiba Elmi", "Guled Warsame",
  "Ayan Jama", "Cabdi Hirsi", "Faadumo Mohamud", "Jamal Abdi", "Maryan Ahmed",
  "Yusuf Hassan", "Sadia Mohamed", "Abdiweli Farah", "Hafsa Nur", "Liban Adan",
  "Ubax Osman", "Dalmar Elmi", "Rahma Warsame", "Sharif Jama", "Zamzam Hirsi",
  "Awil Mohamud", "Ikran Abdi", "Bile Ahmed", "Suad Hassan", "Cabdirashid Yusuf"
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateLicensePlate(): string {
  const digits = Math.floor(10000 + Math.random() * 90000)
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return `SL-${digits}-${letter}`
}

function generateVIN(): string {
  const chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789" // VIN excludes I, O, Q
  let vin = ""
  // World Manufacturer Identifier (positions 1-3) - use realistic prefixes
  const wmiPrefixes = ["JTM", "JTE", "JHM", "JN1", "JS3", "2T1", "5TD"]
  vin = randomItem(wmiPrefixes)
  // Rest of VIN (positions 4-17)
  for (let i = 0; i < 14; i++) {
    vin += chars[Math.floor(Math.random() * chars.length)]
  }
  return vin
}

function generateMileage(year: number): number {
  const currentYear = 2025
  const age = currentYear - year
  // Average 12,000-18,000 km per year
  const baseKm = age * (12000 + Math.floor(Math.random() * 6000))
  // Add some variation
  return Math.floor(baseKm * (0.8 + Math.random() * 0.4))
}

function getStatus(): string {
  const rand = Math.random()
  if (rand < 0.7) return "active"
  if (rand < 0.9) return "in-service"
  return "completed"
}

// ============================================================================
// VEHICLE GENERATION
// ============================================================================

interface Vehicle {
  make: string
  model: string
  year: number
  vin: string
  license_plate: string
  color: string
  mileage: number
  owner_name?: string
  status?: string
}

function generateVehicles(count: number): Vehicle[] {
  const vehicles: Vehicle[] = []
  const usedPlates = new Set<string>()
  const usedVINs = new Set<string>()
  
  // Distribution: 60% Toyota, 20% Honda, 10% Nissan, 10% Suzuki
  const distribution = [
    { make: "Toyota", models: toyotaModels, count: Math.floor(count * 0.6) },
    { make: "Honda", models: hondaModels, count: Math.floor(count * 0.2) },
    { make: "Nissan", models: nissanModels, count: Math.floor(count * 0.1) },
    { make: "Suzuki", models: suzukiModels, count: Math.floor(count * 0.1) },
  ]
  
  for (const { make, models, count: makeCount } of distribution) {
    for (let i = 0; i < makeCount; i++) {
      const modelData = randomItem(models)
      const year = randomItem(modelData.years)
      const color = randomItem(modelData.colors)
      
      // Generate unique license plate
      let plate: string
      do {
        plate = generateLicensePlate()
      } while (usedPlates.has(plate))
      usedPlates.add(plate)
      
      // Generate unique VIN
      let vin: string
      do {
        vin = generateVIN()
      } while (usedVINs.has(vin))
      usedVINs.add(vin)
      
      vehicles.push({
        make,
        model: modelData.model,
        year,
        vin,
        license_plate: plate,
        color,
        mileage: generateMileage(year),
        owner_name: randomItem(somaliNames),
        status: getStatus(),
      })
    }
  }
  
  return vehicles
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function seedVehicles() {
  console.log("🚗 OPERATION INSTANT FLEET - Starting...")
  console.log("=" .repeat(50))
  
  const vehicles = generateVehicles(50)
  
  console.log(`📦 Generated ${vehicles.length} vehicles`)
  console.log("")
  
  // First, get or create customers to link vehicles
  let customerIds: string[] = []
  
  // Check if customers exist
  const { data: existingCustomers } = await supabase
    .from("customers")
    .select("id")
    .limit(50)
  
  if (existingCustomers && existingCustomers.length > 0) {
    customerIds = existingCustomers.map(c => c.id)
    console.log(`✅ Found ${customerIds.length} existing customers`)
  } else {
    console.log("⚠️  No customers found. Vehicles will be inserted without customer_id")
  }
  
  // Insert vehicles
  let successCount = 0
  let errorCount = 0
  
  for (const vehicle of vehicles) {
    const insertData: any = {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      vin: vehicle.vin,
      license_plate: vehicle.license_plate,
      color: vehicle.color,
      mileage: vehicle.mileage,
    }
    
    // Assign random customer if available
    if (customerIds.length > 0) {
      insertData.customer_id = randomItem(customerIds)
    }
    
    const { data, error } = await supabase
      .from("vehicles")
      .insert(insertData)
      .select()
    
    if (error) {
      console.log(`❌ Error: ${vehicle.year} ${vehicle.make} ${vehicle.model} - ${error.message}`)
      errorCount++
    } else {
      console.log(`✅ Added: ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.license_plate})`)
      successCount++
    }
  }
  
  console.log("")
  console.log("=" .repeat(50))
  console.log(`🏁 OPERATION COMPLETE`)
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log("=" .repeat(50))
}

// Run the seed function
seedVehicles()
  .then(() => {
    console.log("\n🎉 Seed script finished")
    process.exit(0)
  })
  .catch((err) => {
    console.error("\n💥 Fatal error:", err)
    process.exit(1)
  })
