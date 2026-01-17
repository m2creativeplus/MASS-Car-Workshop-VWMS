"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToProps {
  propertyId?: string;
  widgetId?: string;
}

/**
 * Tawk.to Live Chat Widget
 * 
 * Free 100% live chat solution
 * 
 * Setup:
 * 1. Create account at https://tawk.to
 * 2. Get your Property ID and Widget ID from Dashboard > Administration > Channels > Chat Widget
 * 3. Pass them as props or set in environment variables:
 *    - NEXT_PUBLIC_TAWKTO_PROPERTY_ID
 *    - NEXT_PUBLIC_TAWKTO_WIDGET_ID
 * 
 * Usage:
 * Add <TawkToChat /> to your layout.tsx
 */
export function TawkToChat({ 
  propertyId = process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID 
}: TawkToProps) {
  
  useEffect(() => {
    // Skip if no credentials
    if (!propertyId || !widgetId) {
      console.log('Tawk.to: Missing propertyId or widgetId');
      return;
    }

    // Skip if already loaded
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(
        `script[src*="embed.tawk.to"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [propertyId, widgetId]);

  return null;
}

/**
 * Customize Tawk.to widget appearance and behavior
 */
export function useTawkTo() {
  const setVisitorInfo = (name: string, email: string, hash?: string) => {
    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({
        name,
        email,
        hash,
      }, (error: any) => {
        if (error) console.error('Tawk.to setAttributes error:', error);
      });
    }
  };

  const showWidget = () => {
    if (window.Tawk_API) window.Tawk_API.showWidget();
  };

  const hideWidget = () => {
    if (window.Tawk_API) window.Tawk_API.hideWidget();
  };

  const openChat = () => {
    if (window.Tawk_API) window.Tawk_API.maximize();
  };

  const closeChat = () => {
    if (window.Tawk_API) window.Tawk_API.minimize();
  };

  return {
    setVisitorInfo,
    showWidget,
    hideWidget,
    openChat,
    closeChat,
  };
}
