import { Link } from 'react-router-dom';

/**
 * Footer - The main footer component for TextCraft
 */
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-nav-background border-t border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-3 sm:gap-4 lg:gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link 
                to="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                Guides
              </Link>
              <Link 
                to="/faq" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                FAQ
              </Link>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link 
                to="/comparisons" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                Compare
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-secondary/50 min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                Terms
              </Link>
            </div>
          </div>
          
          {/* Copyright and Description */}
          <div className="text-center lg:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">
              Your text processing toolkit. All tools run locally in your browser.
            </div>
            <div className="text-xs text-muted-foreground">
              © {year} TextCraft. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
