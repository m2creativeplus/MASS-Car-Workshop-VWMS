// Google Analytics + Facebook Pixel + SEO utilities
// Analytics integration for MASS OSS

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''

// Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Facebook Pixel
export const fbPageview = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'PageView')
  }
}

export const fbEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', name, options)
  }
}

// SEO Meta Generator
export const generateSEO = ({
  title,
  description,
  image,
  url,
  type = 'website'
}: {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}) => ({
  title: `${title} | MASS OSS`,
  description,
  openGraph: {
    title,
    description,
    type,
    url,
    images: image ? [{ url: image }] : [],
    siteName: 'MASS OSS',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: image ? [image] : [],
  },
})
