import { useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";

const tools = [
  {
    title: "Word Counter",
    description: "Count words, characters, sentences with reading time estimates",
    href: "/tools/word-counter"
  },
  {
    title: "Case Converter", 
    description: "Transform text between different cases and formats",
    href: "/tools/case-converter"
  },
  {
    title: "Line Breaks Remover",
    description: "Clean up and normalize text whitespace and formatting",
    href: "/tools/line-breaks"
  },
  {
    title: "Text Diff Checker",
    description: "Compare two texts and highlight differences side by side",
    href: "/tools/diff-checker"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your projects and mockups",
    href: "/tools/lorem-ipsum"
  },
  {
    title: "Text Analyzer",
    description: "Analyze text complexity, readability and structure",
    href: "/tools/text-analyzer"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Text Processing Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional text processing tools that run entirely in your browser. Fast, secure, and always available.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTools.map((tool) => (
            <div
              key={tool.href}
              className="bg-card border border-border rounded-lg p-6 hover:border-purple-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>
              <Link
                to={tool.href}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                Try it now →
              </Link>
            </div>
          ))}
        </div>

        {/* Why ByteToolBox Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-12">
            Why ByteToolBox?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Instant processing with zero server round-trips
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                Your data never leaves your device
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Always Available</h3>
              <p className="text-muted-foreground text-sm">
                Works offline once loaded
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
