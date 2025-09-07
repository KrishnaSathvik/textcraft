/**
 * Analytics Configuration
 * 
 * Centralized configuration for Google Analytics and other tracking services.
 * Update the measurement IDs here when you get them from Google Analytics.
 */

// Google Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Replace with your actual Google Analytics Measurement ID
  // Get this from: https://analytics.google.com/
  GOOGLE_ANALYTICS_ID: 'G-LS5PL30GQK', // Replace with your actual ID
  
  // Enable/disable analytics (useful for development)
  ENABLED: import.meta.env.PROD, // Only track in production
  
  // Debug mode (logs events to console)
  DEBUG: import.meta.env.DEV, // Debug in development
};

// Error Reporting Configuration
export const ERROR_REPORTING_CONFIG = {
  // Disabled - using Google Analytics for error tracking
  ENDPOINT: '',
  ENABLED: false,
};

// Performance Monitoring Configuration
export const PERFORMANCE_CONFIG = {
  // Disabled - using Google Analytics for performance tracking
  ENDPOINT: '',
  ENABLED: false,
};

/**
 * Get the Google Analytics ID for the current environment
 */
export const getGoogleAnalyticsId = (): string | null => {
  if (!ANALYTICS_CONFIG.ENABLED) return null;
  return ANALYTICS_CONFIG.GOOGLE_ANALYTICS_ID === 'G-XXXXXXXXXX' ? null : ANALYTICS_CONFIG.GOOGLE_ANALYTICS_ID;
};

/**
 * Check if analytics is properly configured
 */
export const isAnalyticsConfigured = (): boolean => {
  return ANALYTICS_CONFIG.ENABLED && getGoogleAnalyticsId() !== null;
};
