/**
 * Performance Monitoring
 * 
 * Tracks Core Web Vitals and other performance metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

interface WebVitals {
  CLS: number | null;
  FID: number | null;
  FCP: number | null;
  LCP: number | null;
  TTFB: number | null;
}

type LayoutShiftEntry = PerformanceEntry & { hadRecentInput?: boolean; value?: number };
type FirstInputEntry = PerformanceEntry & { processingStart: number };
type NavigationTimingEntry = PerformanceEntry & { responseStart: number; requestStart: number };
type ResourceTimingEntry = PerformanceEntry & { initiatorType?: string; responseEnd: number; requestStart: number };

class PerformanceMonitor {
  private isProduction = import.meta.env.PROD;
  private metrics: PerformanceMetric[] = [];
  private endpoint = ''; // Disabled - using Google Analytics for performance tracking

  /**
   * Initialize performance monitoring
   */
  init() {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    this.trackCLS();
    this.trackFID();
    this.trackFCP();
    this.trackLCP();
    this.trackTTFB();

    // Track custom metrics
    this.trackPageLoadTime();
    this.trackResourceTiming();
  }

  /**
   * Track Cumulative Layout Shift (CLS)
   */
  private trackCLS() {
    let clsValue = 0;
    const clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as LayoutShiftEntry;
        if (!layoutEntry.hadRecentInput) {
          clsValue += layoutEntry.value ?? 0;
          clsEntries.push(entry);
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Report CLS when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportMetric('CLS', clsValue, clsEntries.length);
      }
    });
  }

  /**
   * Track First Input Delay (FID)
   */
  private trackFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const inputEntry = entry as FirstInputEntry;
        const fid = inputEntry.processingStart - entry.startTime;
        this.reportMetric('FID', fid, 1);
      }
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  /**
   * Track First Contentful Paint (FCP)
   */
  private trackFCP() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.reportMetric('FCP', entry.startTime, 1);
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  /**
   * Track Largest Contentful Paint (LCP)
   */
  private trackLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportMetric('LCP', lastEntry.startTime, 1);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  /**
   * Track Time to First Byte (TTFB)
   */
  private trackTTFB() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as NavigationTimingEntry;
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          this.reportMetric('TTFB', ttfb, 1);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  /**
   * Track page load time
   */
  private trackPageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.reportMetric('PageLoad', loadTime, 1);
    });
  }

  /**
   * Track resource timing
   */
  private trackResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as ResourceTimingEntry;
          const resourceTime = resourceEntry.responseEnd - resourceEntry.requestStart;
          this.reportMetric('ResourceLoad', resourceTime, 1, {
            name: entry.name,
            type: resourceEntry.initiatorType,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  /**
   * Report a performance metric
   */
  private reportMetric(name: string, value: number, delta: number, context?: Record<string, unknown>) {
    const metric: PerformanceMetric = {
      name,
      value,
      delta,
      id: Math.random().toString(36).substr(2, 9),
      navigationType: performance.navigation?.type?.toString() || 'unknown'
    };

    this.metrics.push(metric);

    // Log in development
    if (!this.isProduction) {
      console.log(`Performance Metric [${name}]:`, value, context);
    }

    // Send to analytics in production
    if (this.isProduction) {
      this.sendMetric(metric, context);
    }
  }

  /**
   * Send metric to analytics service
   */
  private async sendMetric(metric: PerformanceMetric, context?: Record<string, unknown>) {
    // Skip if no endpoint is configured
    if (!this.endpoint) {
      return;
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          context
        }),
      });
    } catch (err) {
      console.error('Failed to send performance metric:', err);
    }
  }

  /**
   * Get current Web Vitals
   */
  getWebVitals(): WebVitals {
    const vitals: WebVitals = {
      CLS: null,
      FID: null,
      FCP: null,
      LCP: null,
      TTFB: null
    };

    this.metrics.forEach((metric) => {
      const key = metric.name as keyof WebVitals;
      if (key in vitals) {
        vitals[key] = metric.value;
      }
    });

    return vitals;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring
performanceMonitor.init();
