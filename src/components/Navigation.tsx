import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Code2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Available text tools in the navigation
 */
const tools = [
  { name: 'Word Counter', path: '/word-counter', full: 'Word Counter' },
  { name: 'Case Converter', path: '/case-converter', full: 'Case Converter' },
  { name: 'Line Breaks', path: '/line-breaks', full: 'Line Breaks Remover' },
  { name: 'Diff Checker', path: '/diff-checker', full: 'Text Diff Checker' },
  { name: 'Lorem Ipsum', path: '/lorem-ipsum', full: 'Lorem Ipsum Generator' },
  { name: 'Text Sorter', path: '/text-sorter', full: 'Text Sorter' }
];

/**
 * Navigation - The main navigation component for TextCraft
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Command palette search (Ctrl/Cmd + K)
 * - Theme toggle (dark/light mode)
 * - Active route highlighting
 * - Tool search functionality
 * - TextCraft branding with logo
 * 
 * @example
 * ```tsx
 * // Used in ToolLayout or main app layout
 * <Navigation />
 * 
 * // Automatically handles:
 * // - Route highlighting based on current location
 * // - Mobile responsive behavior
 * // - Keyboard shortcuts (Cmd/Ctrl + K for search)
 * // - Theme switching
 * ```
 * 
 * Keyboard Shortcuts:
 * - `Ctrl/Cmd + K` - Open command palette search
 * - `Escape` - Close search palette
 * 
 * Responsive Behavior:
 * - Desktop: Horizontal navigation with all tools visible
 * - Mobile: Hamburger menu with collapsible tool list
 * - Search: Hidden on small screens, visible on sm+
 * 
 * @returns JSX element containing the complete navigation interface
 */
export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Generate breadcrumb data
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.textcraft.dev/'
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const tool = tools.find(t => t.path === currentPath);
      const name = tool ? tool.full : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push({
        '@type': 'ListItem',
        position: index + 2,
        name: name,
        item: `https://www.textcraft.dev${currentPath}`
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    };
  };

  // Add breadcrumb structured data
  useEffect(() => {
    const breadcrumbData = generateBreadcrumbs();
    
    // Remove existing breadcrumb data
    const existingScript = document.querySelector('script[data-breadcrumb]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new breadcrumb data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.full.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToolSelect = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-nav-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/favicon.svg" 
                alt="TextCraft Logo" 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <span className="text-lg sm:text-xl font-semibold text-foreground bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TextCraft
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === tool.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
                  ⌘K
                </kbd>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border bg-card/50 backdrop-blur-sm">
              <div className="space-y-2 px-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === tool.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {tool.full}
                  </Link>
                ))}
                
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search Tools
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>


      {/* Command Palette */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="fixed left-1/2 top-1/4 sm:top-1/3 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] max-w-lg">
            <div className="bg-card border border-border rounded-lg shadow-lg">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-muted-foreground bg-muted rounded">ESC</kbd>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="font-medium text-foreground text-sm sm:text-base">{tool.full}</div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No tools found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
