import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Code2, Shield, Zap, Users, Heart } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * About page for TextCraft
 * 
 * This page tells the story of TextCraft and builds trust with users.
 * Important for SEO and user engagement.
 */
export const About = () => {
  useSEO({
    title: 'About TextCraft - Privacy-Focused Text Processing Tools | Free Online Utilities',
    description: 'Learn about TextCraft - the privacy-focused text processing tools platform built for writers and developers. Fast, secure, completely free, and runs entirely in your browser.',
    keywords: 'about textcraft, text processing tools, privacy-focused, free tools, online utilities, browser-based tools, writer tools',
    canonical: 'https://www.textcraft.dev/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About TextCraft',
      'description': 'Learn about TextCraft - the privacy-focused text processing tools platform built for writers and developers.',
      'url': 'https://www.textcraft.dev/about',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'TextCraft',
        'description': 'Privacy-focused text processing tools platform providing free online utilities that run entirely in your browser.',
        'url': 'https://www.textcraft.dev',
        'foundingDate': '2025-01-04',
        'slogan': 'Fast, secure, and always available text processing tools'
      }
    }
  });

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              About TextCraft
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn about TextCraft - the privacy-focused text processing tools platform built for writers and developers. Fast, secure, and completely free.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
              <img 
                src="/favicon.svg" 
                alt="TextCraft Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-foreground mb-4">TextCraft</h1>
              <p className="text-xl text-muted-foreground">
                Privacy-focused text processing tools built for the modern web
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              TextCraft was born from a simple idea: writers and developers deserve fast, reliable, and 
              privacy-focused text processing tools that work seamlessly in their browser. We believe that 
              your text data should stay on your device, and your tools should be lightning-fast.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser. Your text data never leaves your device.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Zap className="w-8 h-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Vite and React for maximum performance and instant results.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Heart className="w-8 h-8 text-danger mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Writer Love</h3>
                <p className="text-sm text-muted-foreground">
                  Built by writers and developers, for writers and developers. We understand your workflow.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                TextCraft started as a personal project to solve common text processing problems. 
                As writers and developers, we were frustrated with slow, clunky online tools that required 
                uploading sensitive text to unknown servers.
              </p>
              <p>
                We wanted something different: tools that were fast, secure, and worked entirely 
                in the browser. Tools that respected privacy and didn't require account creation 
                or data uploads. Tools that just worked.
              </p>
              <p>
                So we built TextCraft - a collection of essential text processing tools that process 
                everything locally in your browser. No data leaves your device, no accounts required, 
                and no compromises on speed or functionality.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">🔒 Privacy by Design</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unlike other online tools, TextCraft processes all data locally in your browser. 
                  Your text content, documents, and other sensitive information never leaves your device.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>No data uploads to servers</li>
                  <li>No account creation required</li>
                  <li>No tracking of your text</li>
                  <li>Works offline after first load</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">⚡ Performance Focused</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Built with modern web technologies for maximum speed and responsiveness. 
                  Every tool is optimized for performance and user experience.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Instant results and real-time processing</li>
                  <li>Optimized for large text documents</li>
                  <li>Responsive design for all devices</li>
                  <li>Minimal resource usage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Tools</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              TextCraft includes six essential text processing tools, each designed to solve 
              common text processing problems quickly and securely:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Word Counter', desc: 'Count words, characters, sentences with reading time estimates' },
                { name: 'Case Converter', desc: 'Transform text between different cases and formats' },
                { name: 'Line Breaks Remover', desc: 'Clean up and normalize text whitespace and formatting' },
                { name: 'Text Diff Checker', desc: 'Compare two texts and highlight differences side by side' },
                { name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for your projects and mockups' },
                { name: 'Text Sorter', desc: 'Sort lines alphabetically, by length, and remove duplicates' },
              ].map((tool, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Built With Modern Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              TextCraft is built using the latest web technologies to ensure the best 
              performance, security, and user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>React 18</strong> - Modern UI library</li>
                  <li><strong>TypeScript</strong> - Type-safe development</li>
                  <li><strong>Vite</strong> - Lightning-fast build tool</li>
                  <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li><strong>shadcn/ui</strong> - Beautiful component library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Tools & Testing</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>Vitest</strong> - Fast unit testing</li>
                  <li><strong>ESLint</strong> - Code quality</li>
                  <li><strong>TypeDoc</strong> - Documentation generation</li>
                  <li><strong>Lucide Icons</strong> - Beautiful icon set</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Commercial Product */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Professional Product</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <img 
                  src="/favicon.svg" 
                  alt="TextCraft Logo" 
                  className="w-8 h-8 mt-1"
                />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Commercial Software</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    TextCraft is a professional, commercial product designed for writers and developers 
                    who need reliable, fast, and secure text processing tools for their daily work.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    For licensing inquiries, contact us at textcraftdev@gmail.com<br />
                    Visit us at <a href="https://www.textcraft.dev" className="text-primary hover:underline">www.textcraft.dev</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We'd love to hear from you! Whether you have feedback, suggestions, or just want to say hello, 
              we're always happy to connect with fellow writers and developers.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">💼 Commercial Licensing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Interested in commercial licensing or custom development?
              </p>
              <a 
                href="mailto:textcraftdev@gmail.com" 
                className="text-primary hover:underline text-sm"
              >
                Contact us for licensing
              </a>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Try TextCraft today and experience the difference that privacy-focused, 
                high-performance text processing tools can make.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <img 
                  src="/favicon.svg" 
                  alt="TextCraft Logo" 
                  className="w-4 h-4"
                />
                Start Using Tools
              </a>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
};
