/**
 * Analytics Configuration
 */

const envId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const fallbackId = 'G-LS5PL30GQK';

export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: envId?.trim() || fallbackId,
  ENABLED:
    import.meta.env.PROD ||
    import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  DEBUG: import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
};

export const ERROR_REPORTING_CONFIG = {
  ENDPOINT: '',
  ENABLED: false,
};

export const PERFORMANCE_CONFIG = {
  ENDPOINT: '',
  ENABLED: false,
};

export const getGoogleAnalyticsId = (): string | null => {
  if (!ANALYTICS_CONFIG.ENABLED) return null;
  const id = ANALYTICS_CONFIG.GOOGLE_ANALYTICS_ID;
  return id && id !== 'G-XXXXXXXXXX' ? id : null;
};

export const isAnalyticsConfigured = (): boolean => {
  return ANALYTICS_CONFIG.ENABLED && getGoogleAnalyticsId() !== null;
};
