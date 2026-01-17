/**
 * OBD-II Diagnostic Trouble Code (DTC) Decoder
 * Local database of common codes + descriptions for workshop use
 * Based on SAE J2012 / ISO 15031-6 standards
 */

export interface DTCResult {
  code: string;
  system: 'powertrain' | 'chassis' | 'body' | 'network';
  description: string;
  possibleCauses: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  commonParts: string[];
  laborHours?: number;
}

// Common OBD-II codes database - focused on Japanese vehicles popular in Somaliland
const dtcDatabase: Record<string, Omit<DTCResult, 'code'>> = {
  // Powertrain - Engine
  'P0300': {
    system: 'powertrain',
    description: 'Random/Multiple Cylinder Misfire Detected',
    possibleCauses: ['Worn spark plugs', 'Faulty ignition coil', 'Vacuum leak', 'Low fuel pressure', 'Dirty fuel injectors'],
    severity: 'high',
    commonParts: ['Spark Plugs', 'Ignition Coils', 'Fuel Injectors'],
    laborHours: 1.5
  },
  'P0301': {
    system: 'powertrain',
    description: 'Cylinder 1 Misfire Detected',
    possibleCauses: ['Faulty spark plug #1', 'Bad ignition coil #1', 'Fuel injector #1 issue', 'Compression problem'],
    severity: 'medium',
    commonParts: ['Spark Plug', 'Ignition Coil'],
    laborHours: 0.5
  },
  'P0302': {
    system: 'powertrain',
    description: 'Cylinder 2 Misfire Detected',
    possibleCauses: ['Faulty spark plug #2', 'Bad ignition coil #2', 'Fuel injector #2 issue'],
    severity: 'medium',
    commonParts: ['Spark Plug', 'Ignition Coil'],
    laborHours: 0.5
  },
  'P0303': {
    system: 'powertrain',
    description: 'Cylinder 3 Misfire Detected',
    possibleCauses: ['Faulty spark plug #3', 'Bad ignition coil #3', 'Fuel injector #3 issue'],
    severity: 'medium',
    commonParts: ['Spark Plug', 'Ignition Coil'],
    laborHours: 0.5
  },
  'P0304': {
    system: 'powertrain',
    description: 'Cylinder 4 Misfire Detected',
    possibleCauses: ['Faulty spark plug #4', 'Bad ignition coil #4', 'Fuel injector #4 issue'],
    severity: 'medium',
    commonParts: ['Spark Plug', 'Ignition Coil'],
    laborHours: 0.5
  },
  'P0171': {
    system: 'powertrain',
    description: 'System Too Lean (Bank 1)',
    possibleCauses: ['Vacuum leak', 'Faulty MAF sensor', 'Weak fuel pump', 'Clogged fuel filter', 'Faulty O2 sensor'],
    severity: 'medium',
    commonParts: ['MAF Sensor', 'Fuel Filter', 'O2 Sensor'],
    laborHours: 1.0
  },
  'P0172': {
    system: 'powertrain',
    description: 'System Too Rich (Bank 1)',
    possibleCauses: ['Leaking fuel injector', 'Faulty fuel pressure regulator', 'Bad O2 sensor', 'Dirty air filter'],
    severity: 'medium',
    commonParts: ['Fuel Injector', 'O2 Sensor', 'Air Filter'],
    laborHours: 1.0
  },
  'P0420': {
    system: 'powertrain',
    description: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    possibleCauses: ['Failed catalytic converter', 'Exhaust leak before catalyst', 'Faulty O2 sensors', 'Engine misfire damaging catalyst'],
    severity: 'high',
    commonParts: ['Catalytic Converter', 'O2 Sensor'],
    laborHours: 2.0
  },
  'P0442': {
    system: 'powertrain',
    description: 'Evaporative Emission Control System Leak Detected (Small Leak)',
    possibleCauses: ['Loose gas cap', 'Cracked EVAP hose', 'Faulty purge valve', 'Leaking charcoal canister'],
    severity: 'low',
    commonParts: ['Gas Cap', 'EVAP Purge Valve'],
    laborHours: 0.5
  },
  'P0455': {
    system: 'powertrain',
    description: 'Evaporative Emission Control System Leak Detected (Large Leak)',
    possibleCauses: ['Missing gas cap', 'Disconnected EVAP hose', 'Cracked filler neck', 'Failed purge valve'],
    severity: 'medium',
    commonParts: ['Gas Cap', 'EVAP Hose', 'Purge Valve'],
    laborHours: 1.0
  },
  'P0500': {
    system: 'powertrain',
    description: 'Vehicle Speed Sensor Malfunction',
    possibleCauses: ['Faulty vehicle speed sensor', 'Damaged wiring', 'Bad speedometer', 'Transmission issue'],
    severity: 'medium',
    commonParts: ['Vehicle Speed Sensor'],
    laborHours: 1.0
  },
  'P0505': {
    system: 'powertrain',
    description: 'Idle Control System Malfunction',
    possibleCauses: ['Dirty idle air control valve', 'Vacuum leak', 'Faulty IAC motor', 'Throttle body carbon buildup'],
    severity: 'medium',
    commonParts: ['Idle Air Control Valve', 'Throttle Body Gasket'],
    laborHours: 1.0
  },
  'P0715': {
    system: 'powertrain',
    description: 'Input/Turbine Speed Sensor Circuit Malfunction',
    possibleCauses: ['Faulty input speed sensor', 'Wiring issue', 'Transmission fluid low', 'Internal transmission problem'],
    severity: 'high',
    commonParts: ['Input Speed Sensor', 'Transmission Fluid'],
    laborHours: 1.5
  },
  
  // Toyota-specific common codes
  'P1135': {
    system: 'powertrain',
    description: 'Air/Fuel Ratio Sensor Heater Circuit Response (Toyota)',
    possibleCauses: ['Faulty A/F sensor', 'Wiring issue', 'ECU problem'],
    severity: 'medium',
    commonParts: ['Air/Fuel Ratio Sensor'],
    laborHours: 1.0
  },
  'P1155': {
    system: 'powertrain',
    description: 'Air/Fuel Ratio Sensor Heater Circuit Response Bank 2 (Toyota)',
    possibleCauses: ['Faulty A/F sensor Bank 2', 'Wiring issue', 'ECU problem'],
    severity: 'medium',
    commonParts: ['Air/Fuel Ratio Sensor'],
    laborHours: 1.0
  },
  
  // Chassis codes
  'C0035': {
    system: 'chassis',
    description: 'Left Front Wheel Speed Sensor Circuit Malfunction',
    possibleCauses: ['Faulty wheel speed sensor', 'Damaged tone ring', 'Wiring damage', 'ABS module issue'],
    severity: 'high',
    commonParts: ['Wheel Speed Sensor', 'ABS Sensor'],
    laborHours: 1.0
  },
  'C0040': {
    system: 'chassis',
    description: 'Right Front Wheel Speed Sensor Circuit Malfunction',
    possibleCauses: ['Faulty wheel speed sensor', 'Damaged tone ring', 'Wiring damage'],
    severity: 'high',
    commonParts: ['Wheel Speed Sensor'],
    laborHours: 1.0
  },
  
  // Body codes
  'B1000': {
    system: 'body',
    description: 'ECU Internal Malfunction (Airbag)',
    possibleCauses: ['Faulty airbag control module', 'Wiring issue', 'Low battery voltage during crash event'],
    severity: 'critical',
    commonParts: ['Airbag Control Module'],
    laborHours: 2.0
  },
  
  // Network codes
  'U0100': {
    system: 'network',
    description: 'Lost Communication with ECM/PCM',
    possibleCauses: ['CAN bus wiring issue', 'Faulty ECM', 'Low battery voltage', 'Corroded connectors'],
    severity: 'critical',
    commonParts: ['ECM Connector', 'CAN Bus Wiring'],
    laborHours: 2.0
  },
  'U0101': {
    system: 'network',
    description: 'Lost Communication with TCM',
    possibleCauses: ['Transmission control module failure', 'CAN bus issue', 'Wiring problem'],
    severity: 'high',
    commonParts: ['TCM', 'CAN Bus Wiring'],
    laborHours: 1.5
  },
};

/**
 * Decode an OBD-II Diagnostic Trouble Code
 */
export function decodeDTC(code: string): DTCResult | null {
  const normalizedCode = code.toUpperCase().trim();
  
  // Validate format (letter + 4 digits)
  if (!/^[PCBU][0-9]{4}$/.test(normalizedCode)) {
    return null;
  }
  
  const data = dtcDatabase[normalizedCode];
  if (data) {
    return { code: normalizedCode, ...data };
  }
  
  // Generate generic info for unknown codes based on first character
  const systemMap: Record<string, DTCResult['system']> = {
    'P': 'powertrain',
    'C': 'chassis', 
    'B': 'body',
    'U': 'network'
  };
  
  return {
    code: normalizedCode,
    system: systemMap[normalizedCode[0]] || 'powertrain',
    description: `Unknown code ${normalizedCode} - Check manufacturer documentation`,
    possibleCauses: ['Requires further diagnosis with scanner', 'Check manufacturer-specific code definitions'],
    severity: 'medium',
    commonParts: [],
  };
}

/**
 * Get system name from DTC prefix
 */
export function getDTCSystem(code: string): string {
  const firstChar = code.charAt(0).toUpperCase();
  const systemNames: Record<string, string> = {
    'P': 'Powertrain (Engine/Transmission)',
    'C': 'Chassis (ABS/Suspension)',
    'B': 'Body (Airbag/Doors/Lights)',
    'U': 'Network (CAN Bus Communication)'
  };
  return systemNames[firstChar] || 'Unknown System';
}

/**
 * Check if code is generic (SAE) or manufacturer-specific
 */
export function isGenericDTC(code: string): boolean {
  if (code.length < 2) return false;
  const secondChar = code.charAt(1);
  return secondChar === '0' || secondChar === '2';
}

/**
 * Get severity color for UI display
 */
export function getSeverityColor(severity: DTCResult['severity']): string {
  const colors = {
    low: '#22c55e',      // green
    medium: '#f59e0b',   // amber
    high: '#ef4444',     // red
    critical: '#dc2626'  // dark red
  };
  return colors[severity] || colors.medium;
}

/**
 * Search codes by keyword
 */
export function searchDTCByKeyword(keyword: string): DTCResult[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.entries(dtcDatabase)
    .filter(([code, data]) => 
      code.toLowerCase().includes(lowerKeyword) ||
      data.description.toLowerCase().includes(lowerKeyword) ||
      data.possibleCauses.some(cause => cause.toLowerCase().includes(lowerKeyword))
    )
    .map(([code, data]) => ({ code, ...data }));
}
