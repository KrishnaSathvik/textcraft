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
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
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
        const fid = (entry as any).processingStart - entry.startTime;
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
          const ttfb = (entry as any).responseStart - (entry as any).requestStart;
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
          const resourceTime = entry.responseEnd - entry.requestStart;
          this.reportMetric('ResourceLoad', resourceTime, 1, {
            name: entry.name,
            type: (entry as any).initiatorType
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  /**
   * Report a performance metric
   */
  private reportMetric(name: string, value: number, delta: number, context?: Record<string, any>) {
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
  private async sendMetric(metric: PerformanceMetric, context?: Record<string, any>) {
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

    this.metrics.forEach(metric => {
      if (metric.name in vitals) {
        (vitals as any)[metric.name] = metric.value;
      }
    });

    return vitals;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring
performanceMonitor.init();
