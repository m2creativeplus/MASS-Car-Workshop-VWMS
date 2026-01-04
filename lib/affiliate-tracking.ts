/**
 * Affiliate Tracking Library
 * Based on AutoZone's 30-day cookie tracking system
 */

const AFFILIATE_STORAGE_KEY = "mass_affiliate_ref";
const AFFILIATE_EXPIRY_DAYS = 30;

interface AffiliateReferral {
  code: string;
  capturedAt: number; // Unix timestamp
  source?: string;
}

/**
 * Capture a referral code from URL (e.g., ?ref=CODE)
 * Stores in localStorage with 30-day expiry
 */
export function captureReferralCode(code: string, source?: string): void {
  if (typeof window === "undefined" || !code) return;

  const referral: AffiliateReferral = {
    code: code.toUpperCase(),
    capturedAt: Date.now(),
    source: source || window.location.pathname,
  };

  localStorage.setItem(AFFILIATE_STORAGE_KEY, JSON.stringify(referral));
}

/**
 * Get the current referral code if valid (within 30-day window)
 */
export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(AFFILIATE_STORAGE_KEY);
  if (!stored) return null;

  try {
    const referral: AffiliateReferral = JSON.parse(stored);
    
    // Check if within 30-day window
    if (isReferralValid(referral.capturedAt)) {
      return referral.code;
    } else {
      // Clear expired referral
      clearReferralCode();
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Get full referral data including capture timestamp
 */
export function getReferralData(): AffiliateReferral | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(AFFILIATE_STORAGE_KEY);
  if (!stored) return null;

  try {
    const referral: AffiliateReferral = JSON.parse(stored);
    if (isReferralValid(referral.capturedAt)) {
      return referral;
    }
    clearReferralCode();
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if referral is still within the 30-day attribution window
 */
export function isReferralValid(capturedAt?: number): boolean {
  if (!capturedAt) {
    const data = getReferralData();
    capturedAt = data?.capturedAt;
  }
  
  if (!capturedAt) return false;

  const expiryMs = AFFILIATE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - capturedAt < expiryMs;
}

/**
 * Clear the stored referral code
 */
export function clearReferralCode(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AFFILIATE_STORAGE_KEY);
}

/**
 * Get days remaining in attribution window
 */
export function getDaysRemaining(): number {
  const data = getReferralData();
  if (!data) return 0;

  const expiryMs = AFFILIATE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - data.capturedAt;
  const remaining = expiryMs - elapsed;

  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
}

/**
 * Hook to capture referral from URL params
 * Use in shop pages: useReferralCapture()
 */
export function captureFromUrl(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const refCode = params.get("ref");

  if (refCode) {
    captureReferralCode(refCode);
  }
}
