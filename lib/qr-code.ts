/**
 * QR Code Generator Utility
 * 
 * Generate QR codes for vehicle passports and work orders
 */

/**
 * Generate a QR code URL using a free service
 * @param data - The data to encode in the QR code
 * @param size - Size in pixels (default 200)
 */
export function getQRCodeUrl(data: string, size: number = 200): string {
  const encodedData = encodeURIComponent(data);
  // Using QR Server API (free, no key required)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`;
}

/**
 * Generate vehicle passport URL
 */
export function getVehiclePassportUrl(passportId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mass-car-workshop-vwms.vercel.app";
  return `${baseUrl}/verify/${passportId}`;
}

/**
 * Generate QR code for vehicle passport
 */
export function getVehiclePassportQR(passportId: string, size: number = 200): string {
  const url = getVehiclePassportUrl(passportId);
  return getQRCodeUrl(url, size);
}

/**
 * Generate a unique passport ID
 */
export function generatePassportId(): string {
  const prefix = "MASS-VP";
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

/**
 * Generate work order QR code
 */
export function getWorkOrderQR(workOrderId: string, size: number = 150): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mass-car-workshop-vwms.vercel.app";
  const url = `${baseUrl}/dashboard/work-orders/${workOrderId}`;
  return getQRCodeUrl(url, size);
}

/**
 * Generate invoice QR code
 */
export function getInvoiceQR(invoiceId: string, size: number = 150): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mass-car-workshop-vwms.vercel.app";
  const url = `${baseUrl}/invoice/${invoiceId}`;
  return getQRCodeUrl(url, size);
}

/**
 * QR code data types
 */
export type QRCodeType = "passport" | "work-order" | "invoice" | "appointment" | "custom";

/**
 * Generate QR code based on type
 */
export function generateQRCode(type: QRCodeType, id: string, size: number = 200): string {
  switch (type) {
    case "passport":
      return getVehiclePassportQR(id, size);
    case "work-order":
      return getWorkOrderQR(id, size);
    case "invoice":
      return getInvoiceQR(id, size);
    case "appointment":
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mass-car-workshop-vwms.vercel.app";
      return getQRCodeUrl(`${baseUrl}/appointments/${id}`, size);
    case "custom":
    default:
      return getQRCodeUrl(id, size);
  }
}
