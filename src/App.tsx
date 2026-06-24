import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useAnalytics } from "@/hooks/useAnalytics";
import { performanceMonitor } from "@/lib/performance";
import { trackWebVitals } from "@/lib/analytics";
import React, { Suspense, lazy } from "react";
import { ToolSkeleton } from "@/components/LazyTool";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WordCounterPage = lazy(() => import("./pages/tools/WordCounter"));
const CaseConverterPage = lazy(() => import("./pages/tools/CaseConverter"));
const LineBreaksPage = lazy(() => import("./pages/tools/LineBreaks"));
const DiffCheckerPage = lazy(() => import("./pages/tools/DiffChecker"));
const LoremIpsumPage = lazy(() => import("./pages/tools/LoremIpsum"));
const TextSorterPage = lazy(() => import("./pages/tools/TextSorter"));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./pages/TermsOfService").then((m) => ({ default: m.TermsOfService })));
const FAQ = lazy(() => import("./pages/FAQ").then((m) => ({ default: m.FAQ })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const Comparisons = lazy(() => import("./pages/Comparisons").then((m) => ({ default: m.Comparisons })));

const queryClient = new QueryClient();

const AppContent = () => {
  useAnalytics();

  React.useEffect(() => {
    performanceMonitor.init();

    const timer = setTimeout(() => {
      const vitals = performanceMonitor.getWebVitals();
      trackWebVitals(vitals);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Suspense fallback={<ToolSkeleton />}>
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/comparisons" element={<Comparisons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
