import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Wrench, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { loadBlogSearchIndex } from '@/data/blogSearchIndex';

/**
 * Available text tools in the navigation
 */
const tools = [
  { name: 'Word Counter', path: '/word-counter', full: 'Word Counter', keywords: 'word count character reading time speaking time' },
  { name: 'Case Converter', path: '/case-converter', full: 'Case Converter', keywords: 'case converter title case uppercase lowercase camelcase' },
  { name: 'Line Breaks', path: '/line-breaks', full: 'Line Breaks Remover', keywords: 'line breaks remove clean pdf email whitespace' },
  { name: 'Diff Checker', path: '/diff-checker', full: 'Text Diff Checker', keywords: 'diff compare text difference checker' },
  { name: 'Lorem Ipsum', path: '/lorem-ipsum', full: 'Lorem Ipsum Generator', keywords: 'lorem ipsum placeholder generate dummy text' },
  { name: 'Text Sorter', path: '/text-sorter', full: 'Text Sorter', keywords: 'sort text alphabetize list organize duplicates' }
];

const staticPages = [
  { name: 'Guides', path: '/blog', full: 'Guides & Blog', keywords: 'guides blog tutorials writing tips', type: 'page' as const },
  { name: 'About', path: '/about', full: 'About TextCraft', keywords: 'about textcraft team', type: 'page' as const },
  { name: 'FAQ', path: '/faq', full: 'Frequently Asked Questions', keywords: 'faq help questions answers', type: 'page' as const },
  { name: 'Compare', path: '/comparisons', full: 'Tool Comparisons', keywords: 'compare alternatives tools', type: 'page' as const },
];

type SearchResultType = 'tool' | 'guide' | 'page';

interface SearchResult {
  type: SearchResultType;
  name: string;
  path: string;
  searchText: string;
}

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
  const navigate = useNavigate();
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [guideSearchItems, setGuideSearchItems] = useState<SearchResult[]>([]);
  const guidesLoadStarted = useRef(false);

  const staticSearchItems = useMemo<SearchResult[]>(
    () => [
      ...tools.map((tool) => ({
        type: 'tool' as const,
        name: tool.full,
        path: tool.path,
        searchText: `${tool.full} ${tool.keywords}`.toLowerCase(),
      })),
      ...staticPages.map((page) => ({
        type: 'page' as const,
        name: page.full,
        path: page.path,
        searchText: `${page.full} ${page.keywords}`.toLowerCase(),
      })),
    ],
    []
  );

  useEffect(() => {
    if (!isSearchOpen || guidesLoadStarted.current) return;
    guidesLoadStarted.current = true;
    void loadBlogSearchIndex().then((entries) => {
      setGuideSearchItems(
        entries.map((post) => ({
          type: 'guide' as const,
          name: post.title,
          path: `/blog/${post.slug}`,
          searchText: `${post.title} ${post.excerpt} ${post.tags.join(' ')} ${post.category}`.toLowerCase(),
        }))
      );
    });
  }, [isSearchOpen]);

  const allSearchItems = useMemo<SearchResult[]>(
    () => [...staticSearchItems, ...guideSearchItems],
    [staticSearchItems, guideSearchItems]
  );

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
        searchTriggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isBlogActive =
    location.pathname === '/blog' || location.pathname.startsWith('/blog/');

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allSearchItems.slice(0, 12);
    return allSearchItems.filter((item) => item.searchText.includes(q)).slice(0, 12);
  }, [allSearchItems, searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    searchTriggerRef.current?.focus();
  };

  const handleResultSelect = (path: string) => {
    closeSearch();
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const typeLabel: Record<SearchResultType, string> = {
    tool: 'Tool',
    guide: 'Guide',
    page: 'Page',
  };

  const typeIcon: Record<SearchResultType, typeof Wrench> = {
    tool: Wrench,
    guide: BookOpen,
    page: FileText,
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
              <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
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
              <Link
                to="/blog"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isBlogActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                Guides
              </Link>
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Button
                ref={searchTriggerRef}
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2"
                aria-haspopup="dialog"
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
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isBlogActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  Guides
                </Link>

                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search Tools & Guides
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
          onClick={closeSearch}
          role="presentation"
        >
          <div
            className="fixed left-1/2 top-1/4 sm:top-[20%] -translate-x-1/2 w-[95vw] sm:w-[90vw] max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Search tools and guides"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search tools, guides, pages..."
                  aria-label="Search tools and guides"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') closeSearch();
                    if (e.key === 'Enter' && filteredResults[0]) {
                      handleResultSelect(filteredResults[0].path);
                    }
                  }}
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-muted-foreground bg-muted rounded">ESC</kbd>
              </div>
              <div className="max-h-72 overflow-y-auto" role="listbox" aria-label="Search results">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => {
                    const Icon = typeIcon[item.type];
                    return (
                      <button
                        key={`${item.type}-${item.path}`}
                        type="button"
                        role="option"
                        onClick={() => handleResultSelect(item.path)}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0 text-left min-h-[44px]"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm truncate">{item.name}</div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                          {typeLabel[item.type]}
                        </span>
                      </button>
                    );
                  })
                ) : searchQuery && guideSearchItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results for &ldquo;{searchQuery}&rdquo;
                    <span className="block text-xs mt-2">Guide index still loading…</span>
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results for &ldquo;{searchQuery}&rdquo;
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
