/**
 * VIN Decoder Utility using NHTSA vPIC API (FREE, Unlimited)
 * Decodes Vehicle Identification Numbers and returns vehicle specs
 */

export interface VINDecodeResult {
  success: boolean;
  make: string;
  model: string;
  year: number;
  bodyClass: string;
  vehicleType: string;
  driveType: string;
  engineCylinders: string;
  engineDisplacement: string;
  fuelType: string;
  transmission: string;
  doors: string;
  plantCountry: string;
  errorMessage?: string;
}

interface NHTSAVariable {
  Variable: string;
  Value: string | null;
  ValueId: string | null;
  VariableId: number;
}

interface NHTSAResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: NHTSAVariable[];
}

/**
 * Decode a VIN using the free NHTSA vPIC API
 * @param vin - 17-character Vehicle Identification Number
 * @returns VINDecodeResult with vehicle specifications
 */
export async function decodeVIN(vin: string): Promise<VINDecodeResult> {
  // Validate VIN format (17 characters, alphanumeric excluding I, O, Q)
  const cleanVIN = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
  
  if (cleanVIN.length !== 17) {
    return {
      success: false,
      make: '',
      model: '',
      year: 0,
      bodyClass: '',
      vehicleType: '',
      driveType: '',
      engineCylinders: '',
      engineDisplacement: '',
      fuelType: '',
      transmission: '',
      doors: '',
      plantCountry: '',
      errorMessage: 'VIN must be exactly 17 characters'
    };
  }

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${cleanVIN}?format=json`
    );

    if (!response.ok) {
      throw new Error(`NHTSA API error: ${response.status}`);
    }

    const data: NHTSAResponse = await response.json();

    if (data.Count === 0 || !data.Results || data.Results.length === 0) {
      return {
        success: false,
        make: '',
        model: '',
        year: 0,
        bodyClass: '',
        vehicleType: '',
        driveType: '',
        engineCylinders: '',
        engineDisplacement: '',
        fuelType: '',
        transmission: '',
        doors: '',
        plantCountry: '',
        errorMessage: 'No vehicle data found for this VIN'
      };
    }

    // NHTSA returns results as a flat object with Variable names as keys
    const result = data.Results[0] as unknown as Record<string, string>;

    return {
      success: true,
      make: result.Make || '',
      model: result.Model || '',
      year: parseInt(result.ModelYear) || 0,
      bodyClass: result.BodyClass || '',
      vehicleType: result.VehicleType || '',
      driveType: result.DriveType || '',
      engineCylinders: result.EngineCylinders || '',
      engineDisplacement: result.DisplacementL ? `${result.DisplacementL}L` : '',
      fuelType: result.FuelTypePrimary || '',
      transmission: result.TransmissionStyle || '',
      doors: result.Doors || '',
      plantCountry: result.PlantCountry || '',
    };
  } catch (error) {
    console.error('VIN decode error:', error);
    return {
      success: false,
      make: '',
      model: '',
      year: 0,
      bodyClass: '',
      vehicleType: '',
      driveType: '',
      engineCylinders: '',
      engineDisplacement: '',
      fuelType: '',
      transmission: '',
      doors: '',
      plantCountry: '',
      errorMessage: error instanceof Error ? error.message : 'Failed to decode VIN'
    };
  }
}

/**
 * Validate VIN format without API call
 */
export function isValidVIN(vin: string): boolean {
  const cleanVIN = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
  return cleanVIN.length === 17;
}

/**
 * Get VIN origin country from first character (WMI)
 */
export function getVINOriginCountry(vin: string): string {
  if (!vin || vin.length < 1) return 'Unknown';
  
  const wmi = vin[0].toUpperCase();
  const countryMap: Record<string, string> = {
    '1': 'United States',
    '2': 'Canada',
    '3': 'Mexico',
    '4': 'United States',
    '5': 'United States',
    'J': 'Japan',        // Common for Somaliland imports
    'K': 'South Korea',
    'L': 'China',
    'S': 'United Kingdom',
    'V': 'France/Spain',
    'W': 'Germany',
    'Y': 'Sweden/Finland',
    'Z': 'Italy',
    '6': 'Australia',
    '9': 'Brazil',
  };
  
  return countryMap[wmi] || 'Other';
}

/**
 * Check if VIN is from a Japanese vehicle (common in Somaliland)
 */
export function isJapaneseVIN(vin: string): boolean {
  return vin.length > 0 && vin[0].toUpperCase() === 'J';
}
