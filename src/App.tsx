import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { errorReporter } from "@/lib/errorReporting";
import { performanceMonitor } from "@/lib/performance";
import { trackWebVitals } from "@/lib/analytics";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordCounterPage from "./pages/tools/WordCounter";
import CaseConverterPage from "./pages/tools/CaseConverter";
import LineBreaksPage from "./pages/tools/LineBreaks";
import DiffCheckerPage from "./pages/tools/DiffChecker";
import LoremIpsumPage from "./pages/tools/LoremIpsum";
import TextSorterPage from "./pages/tools/TextSorter";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Comparisons } from "./pages/Comparisons";

const queryClient = new QueryClient();

const AppContent = () => {
  useAnalytics(); // Initialize Google Analytics

  // Initialize performance monitoring
  React.useEffect(() => {
    performanceMonitor.init();
    
    // Track Web Vitals after page load
    const timer = setTimeout(() => {
      const vitals = performanceMonitor.getWebVitals();
      trackWebVitals(vitals);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/word-counter" element={<WordCounterPage />} />
        <Route path="/case-converter" element={<CaseConverterPage />} />
        <Route path="/line-breaks" element={<LineBreaksPage />} />
        <Route path="/diff-checker" element={<DiffCheckerPage />} />
        <Route path="/lorem-ipsum" element={<LoremIpsumPage />} />
        <Route path="/text-sorter" element={<TextSorterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/comparisons" element={<Comparisons />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="textcraft-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
