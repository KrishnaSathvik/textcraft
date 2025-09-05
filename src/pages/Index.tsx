import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Type, Scissors, GitCompare, FileText, Zap } from "lucide-react";

const tools = [
  {
    title: "Word Counter",
    description: "Count words, characters, sentences with reading time",
    icon: Calculator,
    href: "/tools/word-counter",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Case Converter", 
    description: "Transform text between different cases and formats",
    icon: Type,
    href: "/tools/case-converter",
    color: "from-purple-500 to-pink-400"
  },
  {
    title: "Line Breaks Remover",
    description: "Clean up and normalize text whitespace",
    icon: Scissors,
    href: "/tools/line-breaks",
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Text Diff Checker",
    description: "Compare two texts and highlight differences",
    icon: GitCompare,
    href: "/tools/diff-checker", 
    color: "from-orange-500 to-red-400"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your projects",
    icon: FileText,
    href: "/tools/lorem-ipsum",
    color: "from-indigo-500 to-blue-400"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              Byte Tool Box
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fast, free, and privacy-focused text processing tools. 
            All processing happens in your browser - no data ever leaves your device.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-sm">
              🚀 <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-sm">
              🔒 <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-sm">
              📱 <span>Mobile Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Choose Your Tool
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.href} className="group hover:shadow-lg transition-all duration-200 border-border bg-card">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">{tool.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={tool.href}>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Use Tool
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Why Choose Byte Tool Box?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Instant Processing</h3>
              <p className="text-sm text-muted-foreground">
                Real-time results as you type. No waiting, no loading screens.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your text never leaves your browser. Complete privacy guaranteed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Mobile Ready</h3>
              <p className="text-sm text-muted-foreground">
                Works perfectly on all devices with touch-friendly interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ for developers, writers, and anyone working with text.
        </p>
      </footer>
    </div>
  );
};

export default Index;
