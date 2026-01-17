/**
 * Free Car Image Sources
 * All images are CC0 or free for commercial use
 * 
 * Source: M2 Dev Library registry/automotive/car-image-sources.json
 */

export interface ImageSource {
  name: string;
  url: string;
  license: string;
  commercial: boolean;
  attribution: boolean;
  categories?: Record<string, string>;
}

export const freeCarImageSources: ImageSource[] = [
  {
    name: "Unsplash",
    url: "https://unsplash.com/s/photos/car",
    license: "Unsplash License",
    commercial: true,
    attribution: false,
    categories: {
      vehicles: "https://unsplash.com/s/photos/vehicles",
      sportsCar: "https://unsplash.com/s/photos/sports-car",
      suv: "https://unsplash.com/s/photos/suv",
      luxury: "https://unsplash.com/s/photos/luxury-car",
      classic: "https://unsplash.com/s/photos/classic-car",
      interior: "https://unsplash.com/s/photos/car-interior",
      dashboard: "https://unsplash.com/s/photos/car-dashboard",
    },
  },
  {
    name: "Pexels",
    url: "https://pexels.com/search/car",
    license: "Pexels License",
    commercial: true,
    attribution: false,
    categories: {
      cars: "https://pexels.com/search/cars",
      luxury: "https://pexels.com/search/luxury%20car",
      sports: "https://pexels.com/search/sports%20car",
      vintage: "https://pexels.com/search/vintage%20car",
      interior: "https://pexels.com/search/car%20interior",
    },
  },
  {
    name: "PxHere",
    url: "https://pxhere.com/en/photos?q=car",
    license: "CC0",
    commercial: true,
    attribution: false,
  },
  {
    name: "Pixabay",
    url: "https://pixabay.com/images/search/car",
    license: "Pixabay License",
    commercial: true,
    attribution: false,
  },
  {
    name: "StockSnap",
    url: "https://stocksnap.io/search/car",
    license: "CC0",
    commercial: true,
    attribution: false,
  },
  {
    name: "ISO Republic",
    url: "https://isorepublic.com/category/transportation",
    license: "CC0",
    commercial: true,
    attribution: false,
  },
  {
    name: "Reshot",
    url: "https://reshot.com/search/car",
    license: "Reshot License",
    commercial: true,
    attribution: false,
  },
];

/**
 * Popular vehicle types with example models
 */
export const vehicleTypes = {
  sedan: ["Toyota Camry", "Honda Accord", "BMW 3 Series", "Mercedes C-Class"],
  suv: ["Toyota RAV4", "Honda CR-V", "Ford Explorer", "Range Rover"],
  pickup: ["Toyota Hilux", "Ford Ranger", "Isuzu D-Max", "Nissan Navara"],
  luxury: ["Mercedes S-Class", "BMW 7 Series", "Audi A8", "Lexus LS"],
  sports: ["Porsche 911", "BMW M4", "Ford Mustang", "Chevrolet Corvette"],
  commercial: ["Isuzu trucks", "Fuso", "Hino", "Scania"],
};

/**
 * Popular vehicles in East Africa / Somaliland
 */
export const eastAfricaPopular = [
  "Toyota Hilux",
  "Toyota Land Cruiser",
  "Toyota Prado",
  "Nissan X-Trail",
  "Isuzu D-Max",
  "Honda Fit",
  "Mazda Demio",
  "Subaru Outback",
  "Hyundai Tucson",
  "Suzuki Alto",
];

/**
 * Get search URL for a specific source and query
 */
export function getImageSearchUrl(
  source: ImageSource,
  query: string
): string {
  const encodedQuery = encodeURIComponent(query);
  
  switch (source.name) {
    case "Unsplash":
      return `https://unsplash.com/s/photos/${encodedQuery}`;
    case "Pexels":
      return `https://pexels.com/search/${encodedQuery}`;
    case "PxHere":
      return `https://pxhere.com/en/photos?q=${encodedQuery}`;
    case "Pixabay":
      return `https://pixabay.com/images/search/${encodedQuery}`;
    case "StockSnap":
      return `https://stocksnap.io/search/${encodedQuery}`;
    default:
      return source.url;
  }
}

/**
 * Get random placeholder image URL for a vehicle type
 */
export function getPlaceholderImageUrl(type: keyof typeof vehicleTypes): string {
  const unsplashQueries: Record<string, string> = {
    sedan: "sedan+car",
    suv: "suv+car",
    pickup: "pickup+truck",
    luxury: "luxury+car",
    sports: "sports+car",
    commercial: "truck",
  };
  
  return `https://source.unsplash.com/800x600/?${unsplashQueries[type] || "car"}`;
}
