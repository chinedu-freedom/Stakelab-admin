'use client';

import { useEffect } from 'react';
import api from '../lib/api';

export default function FaviconGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fetchLogoFavicon = async () => {
      try {
        const res = await api.get('/public/logo-favicon');
        if (res.data && res.data.success && res.data.settings) {
          const { logoUrl: logo, faviconUrl: fav } = res.data.settings;
          const targetFavicon = fav || logo;

          if (targetFavicon) {
            const existingLinks = document.querySelectorAll("link[rel*='icon']");
            if (existingLinks.length > 0) {
              existingLinks.forEach((link) => {
                link.href = targetFavicon;
              });
            } else {
              const link = document.createElement('link');
              link.rel = 'shortcut icon';
              link.href = targetFavicon;
              document.getElementsByTagName('head')[0].appendChild(link);
            }
          }
        }
      } catch (err) {
        // Fallback silently
      }
    };

    fetchLogoFavicon();
  }, []);

  return null;
}
