import { useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Zap, Shield, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const tools = [
  {
    name: 'Word Counter',
    path: '/word-counter',
    description: 'Count words, characters, sentences with reading time estimates',
    keywords: ['word', 'count', 'character', 'sentence', 'reading time']
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    description: 'Transform text between different cases and formats',
    keywords: ['case', 'convert', 'uppercase', 'lowercase', 'camelcase']
  },
  {
    name: 'Line Breaks Remover',
    path: '/line-breaks',
    description: 'Clean up and normalize text whitespace and formatting',
    keywords: ['line', 'breaks', 'whitespace', 'format', 'clean']
  },
  {
    name: 'Text Diff Checker',
    path: '/diff-checker',
    description: 'Compare two texts and highlight differences side by side',
    keywords: ['diff', 'compare', 'text', 'difference', 'highlight']
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem-ipsum',
    description: 'Generate placeholder text for your projects and mockups',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generate']
  },
  {
    name: 'Text Sorter',
    path: '/text-sorter',
    description: 'Sort and organize text lines alphabetically, by length, remove duplicates',
    keywords: ['sort', 'text', 'organize', 'duplicates', 'lines', 'alphabetical']
  }
];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Always Available',
    description: 'Works offline once loaded'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'TextCraft - Professional Text Processing Tools',
    description: 'TextCraft - Professional text processing tools that run entirely in your browser. Word counter, case converter, line breaks remover, text diff checker, and lorem ipsum generator. Fast, secure, and always available.',
    keywords: 'text processing tools, word counter, case converter, line breaks, text diff, lorem ipsum, online text tools, free text utilities',
    canonical: 'https://www.textcraft.dev',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'TextCraft',
      description: 'Professional text processing tools that run entirely in your browser',
      url: 'https://www.textcraft.dev',
      applicationCategory: 'Text Processing Tools',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  });

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            TextCraft
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Craft perfect text with professional tools that run entirely in your browser. Fast, secure, and always available.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30 border-border text-center"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {filteredTools.map((tool) => (
            <div
              key={tool.path}
              className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:border-purple-500/50 transition-colors group"
            >
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">
                {tool.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 sm:mb-4 leading-relaxed">
                {tool.description}
              </p>
              <Link
                to={tool.path}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                Try it now →
              </Link>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-12">
            Why TextCraft?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>


      </main>
    </div>
  );
};

export default Index;
