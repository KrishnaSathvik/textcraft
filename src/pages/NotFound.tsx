import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { SITE_URL } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const popularTools = [
  { name: 'Word Counter', path: '/word-counter' },
  { name: 'Case Converter', path: '/case-converter' },
  { name: 'Text Diff Checker', path: '/diff-checker' },
  { name: 'Text Sorter', path: '/text-sorter' },
];

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: 'Page Not Found - TextCraft',
    description: 'The page you requested could not be found on TextCraft.',
    canonical: `${SITE_URL}${location.pathname}`,
    robots: 'noindex, nofollow',
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex-1 flex items-center justify-center bg-background px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">404</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Page not found</h1>
          <p className="text-muted-foreground">
            We could not find <span className="font-mono text-foreground">{location.pathname}</span>.
            Try one of our text tools instead.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/word-counter">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Word Counter
            </Link>
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <h2 className="text-sm font-semibold text-foreground mb-3">Popular tools</h2>
          <ul className="space-y-2">
            {popularTools.map((tool) => (
              <li key={tool.path}>
                <Link to={tool.path} className="text-sm text-primary hover:underline">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
