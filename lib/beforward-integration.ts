export const BEFORWARD_BASE_URL = "https://www.beforward.jp"
export const BEFORWARD_AUTOPARTS_URL = "https://autoparts.beforward.jp"

// BFS ID for affiliate tracking (Replace with actual ID when available)
export const BFS_ID = "1546281" 

export interface VehicleSearchParams {
  make?: string
  model?: string
  year_from?: string
  year_to?: string
  price_from?: string
  price_to?: string
  keyword?: string
}

export interface PartsSearchParams {
  make?: string
  model?: string
  category?: string
  q?: string // query/keyword
}

// Mappings for popular makes (BE FORWARD IDs)
export const MAKE_IDS: Record<string, string> = {
  "toyota": "1",
  "nissan": "2",
  "honda": "3",
  "mitsubishi": "4",
  "mazda": "5",
  "subaru": "6",
  "suzuki": "7",
  "isuzu": "8",
  "daihatsu": "9",
  "lexus": "10",
}

// Mappings for popular models (Example IDs - need verification/scraping for full list)
// These are common IDs on BE FORWARD
export const MODEL_IDS: Record<string, string> = {
  // Toyota
  "voxy": "277",
  "probox": "283", 
  "hiace": "17",
  "land_cruiser": "20",
  "corolla": "12",
  "vitz": "26",
  "prius": "21",
  // Nissan
  "note": "119",
  "serena": "127",
  "xtrail": "135",
  // Honda
  "fit": "165",
  "vezel": "576",
}

export const generateVehicleSearchUrl = (params: VehicleSearchParams) => {
  const queryParams = new URLSearchParams()
  
  if (params.make && MAKE_IDS[params.make.toLowerCase()]) {
    queryParams.append("make", MAKE_IDS[params.make.toLowerCase()])
  }
  
  if (params.model && MODEL_IDS[params.model.toLowerCase()]) {
    queryParams.append("model", MODEL_IDS[params.model.toLowerCase()])
  }

  if (params.year_from) queryParams.append("mfg_year_from", params.year_from)
  if (params.year_to) queryParams.append("mfg_year_to", params.year_to)
  if (params.price_from) queryParams.append("price_from", params.price_from)
  if (params.price_to) queryParams.append("price_to", params.price_to)
  if (params.keyword) queryParams.append("keyword", params.keyword)
  
  // Add BFS ID for tracking
  queryParams.append("utm_source", "bfs")
  queryParams.append("utm_medium", "referral")
  queryParams.append("utm_campaign", BFS_ID)

  // Construct URL path based on make/model if possible for cleaner URLs (BE FORWARD style)
  // Example: stocklist/make=1/model=277/
  let path = "/stocklist"
  const pathParts: string[] = []
  
  if (params.make && MAKE_IDS[params.make.toLowerCase()]) {
    pathParts.push(`make=${MAKE_IDS[params.make.toLowerCase()]}`)
  }
  if (params.model && MODEL_IDS[params.model.toLowerCase()]) {
    pathParts.push(`model=${MODEL_IDS[params.model.toLowerCase()]}`)
  }
  
  if (pathParts.length > 0) {
    path += "/" + pathParts.join("/")
  }

  return `${BEFORWARD_BASE_URL}${path}?${queryParams.toString()}`
}

export const generatePartsSearchUrl = (params: PartsSearchParams) => {
  const queryParams = new URLSearchParams()
  
  if (params.q) queryParams.append("keyword", params.q)
  
  // Auto Parts site uses different structure, simpler search usually
  // https://autoparts.beforward.jp/search/results/keywords/toyota%20voxy/
  
  let baseUrl = `${BEFORWARD_AUTOPARTS_URL}/search/results`
  
  if (params.make || params.model || params.q) {
    const keywords = [params.make, params.model, params.q].filter(Boolean).join(" ")
    baseUrl += `/keywords/${encodeURIComponent(keywords)}`
  }
  
  // Append affiliate tracking if parameter supported (Auto Parts usually tracks via cookie/session from main site or specific param)
  // We'll append it just in case
  return `${baseUrl}?bfs=${BFS_ID}`
}

export const getPopularImportModels = () => [
  { id: 'voxy', name: 'Toyota Voxy', make: 'Toyota', image: 'https://images.beforward.jp/be_forward/stock/202401/123456/main.jpg' }, // Placeholder image
  { id: 'probox', name: 'Toyota Probox', make: 'Toyota' },
  { id: 'hiace', name: 'Toyota Hiace Van', make: 'Toyota' },
  { id: 'land_cruiser', name: 'Toyota Land Cruiser', make: 'Toyota' },
  { id: 'fit', name: 'Honda Fit', make: 'Honda' },
  { id: 'note', name: 'Nissan Note', make: 'Nissan' },
]
