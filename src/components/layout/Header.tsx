import { Link, useLocation } from 'react-router-dom';
import { Search, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const navigation = [
  { name: 'Word Count', href: '/tools/word-counter', short: 'Words' },
  { name: 'Case Convert', href: '/tools/case-converter', short: 'Case' },
  { name: 'Line Breaks', href: '/tools/line-breaks', short: 'Lines' },
  { name: 'Text Diff', href: '/tools/diff-checker', short: 'Diff' },
  { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum', short: 'Lorem' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ByteToolBox
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {item.short}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search ⌘K"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-secondary/50 border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}