import { ToolLayout } from '@/components/layouts/ToolLayout';
import { CheckCircle, XCircle, Star, Zap, Shield, DollarSign, Users, Code2 } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Tool Comparisons page for TextCraft
 * 
 * This page compares TextCraft with other popular text processing tool websites.
 * Helps users understand the advantages of choosing TextCraft.
 */
export const Comparisons = () => {
  useSEO({
    title: 'TextCraft vs Other Text Processing Tools | Feature Comparison & Reviews',
    description: 'Compare TextCraft with other popular text processing tool websites. See why users choose TextCraft for privacy, speed, and comprehensive text processing.',
    keywords: 'text processing tools comparison, word counter comparison, case converter comparison, text diff comparison, lorem ipsum comparison, tool reviews, text utilities comparison',
    canonical: 'https://www.textcraft.dev/comparisons',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'TextCraft vs Other Text Processing Tools',
      'description': 'Comprehensive comparison of TextCraft with other popular text processing tool websites.',
      'url': 'https://www.textcraft.dev/comparisons',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'TextCraft',
        'url': 'https://www.textcraft.dev'
      },
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const competitors = [
    {
      name: 'WordCounter.net',
      url: 'https://wordcounter.net',
      description: 'Popular online word counting tool',
      features: {
        wordCounter: true,
        caseConverter: false,
        lineBreaks: false,
        diffChecker: false,
        loremIpsum: false
      },
      pros: ['Simple interface', 'Basic word counting', 'Free to use'],
      cons: ['Requires internet', 'Data sent to servers', 'Limited features', 'No offline mode', 'Single tool only'],
      rating: 3.0
    },
    {
      name: 'TextFixer.com',
      url: 'https://textfixer.com',
      description: 'Text processing and formatting tools',
      features: {
        wordCounter: true,
        caseConverter: true,
        lineBreaks: true,
        diffChecker: false,
        loremIpsum: false
      },
      pros: ['Multiple tools', 'Free to use', 'No registration', 'Good variety'],
      cons: ['Data sent to servers', 'Requires internet', 'Outdated design', 'No offline mode', 'Cluttered interface'],
      rating: 3.5
    },
    {
      name: 'Online-Utility.org',
      url: 'https://online-utility.org',
      description: 'Collection of online text and utility tools',
      features: {
        wordCounter: true,
        caseConverter: true,
        lineBreaks: true,
        diffChecker: true,
        loremIpsum: true
      },
      pros: ['Many tools', 'Free to use', 'No registration', 'Comprehensive'],
      cons: ['Data sent to servers', 'Requires internet', 'Cluttered interface', 'No offline mode', 'Outdated design'],
      rating: 3.5
    },
    {
      name: 'DiffChecker.com',
      url: 'https://diffchecker.com',
      description: 'Text diff and comparison tool',
      features: {
        wordCounter: false,
        caseConverter: false,
        lineBreaks: false,
        diffChecker: true,
        loremIpsum: false
      },
      pros: ['Excellent diff features', 'Side-by-side comparison', 'Free to use'],
      cons: ['Single tool only', 'Data sent to servers', 'Requires internet', 'No offline mode'],
      rating: 4.0
    },
    {
      name: 'LoremIpsumGenerator.com',
      url: 'https://loremipsumgenerator.com',
      description: 'Lorem ipsum text generator',
      features: {
        wordCounter: false,
        caseConverter: false,
        lineBreaks: false,
        diffChecker: false,
        loremIpsum: true
      },
      pros: ['Good lorem ipsum features', 'Multiple options', 'Free to use'],
      cons: ['Single tool only', 'Data sent to servers', 'Requires internet', 'No offline mode'],
      rating: 3.5
    }
  ];

  const textcraftFeatures = {
    wordCounter: true,
    caseConverter: true,
    lineBreaks: true,
    diffChecker: true,
    loremIpsum: true
  };

  const comparisonFeatures = [
    {
      name: 'Privacy & Security',
      description: 'All processing happens locally in your browser',
      textcraft: '✅ Complete privacy',
      competitors: '❌ Data sent to servers'
    },
    {
      name: 'Tool Selection',
      description: 'Comprehensive collection of text processing tools',
      textcraft: '✅ 5 essential tools',
      competitors: '❌ Limited selection'
    },
    {
      name: 'Performance',
      description: 'Fast, responsive tools with modern technology',
      textcraft: '✅ Lightning fast',
      competitors: '❌ Varies by site'
    },
    {
      name: 'User Experience',
      description: 'Consistent, modern interface across all tools',
      textcraft: '✅ Unified design',
      competitors: '❌ Inconsistent UI'
    },
    {
      name: 'File Support',
      description: 'Upload and process files directly',
      textcraft: '✅ Full file support',
      competitors: '❌ Limited file support'
    },
    {
      name: 'Mobile Friendly',
      description: 'Works perfectly on all devices',
      textcraft: '✅ Fully responsive',
      competitors: '❌ Varies by site'
    },
    {
      name: 'Offline Support',
      description: 'Works without internet connection',
      textcraft: '✅ Works offline',
      competitors: '❌ Requires internet'
    },
    {
      name: 'No Registration',
      description: 'Use all tools without creating an account',
      textcraft: '✅ No account needed',
      competitors: '❌ Some require registration'
    }
  ];

  return (
    <ToolLayout
      title="TextCraft vs Competitors"
      description="Compare TextCraft with other popular text processing tool websites. See why TextCraft is the best choice for privacy-focused, comprehensive text processing tools."
    >
      <div className="p-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Why Choose TextCraft?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the key advantages that make TextCraft the preferred choice for 
            users who value privacy, performance, and comprehensive text processing functionality.
          </p>
        </div>

        {/* Key Advantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">All processing happens locally in your browser. Your data never leaves your device.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Code2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">5 Essential Tools</h3>
              <p className="text-sm text-muted-foreground">Complete collection of text processing tools in one place. No need to visit multiple sites.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Built with modern technology for maximum performance and responsiveness.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-info mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No Registration</h3>
              <p className="text-sm text-muted-foreground">Use all tools immediately without creating an account or providing personal information.</p>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Feature Comparison</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-4 font-semibold text-foreground">TextCraft</th>
                    <th className="text-left p-4 font-semibold text-foreground">Competitors</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="p-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 text-lg font-bold">✓</span>
                          <span className="text-success font-semibold">{feature.textcraft.replace('✅ ', '')}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 text-lg font-bold">✗</span>
                          <span className="text-muted-foreground">{feature.competitors.replace('❌ ', '')}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Competitor Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Competitor Analysis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{competitor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{competitor.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{competitor.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Available Tools:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(competitor.features).map(([tool, available]) => (
                      <span
                        key={tool}
                        className={`px-2 py-1 rounded text-xs ${
                          available
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tool.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Pros:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Cons:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-danger" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Visit {competitor.name} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose TextCraft */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Choose TextCraft?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">The Complete Solution</h3>
              <p className="text-muted-foreground mb-4">
                Instead of visiting multiple websites for different text processing tools, TextCraft provides 
                everything you need in one place. All tools share the same interface, making 
                your workflow more efficient and consistent.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No need to remember multiple URLs</li>
                <li>Consistent user experience across all tools</li>
                <li>Single source of truth for text processing</li>
                <li>Regular updates and new features</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Privacy & Security</h3>
              <p className="text-muted-foreground mb-4">
                Unlike other tools that send your data to their servers, TextCraft processes 
                everything locally in your browser. This means your sensitive text never leaves 
                your device, ensuring maximum privacy and security.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No data collection or tracking</li>
                <li>Works completely offline</li>
                <li>No account creation required</li>
                <li>Your data stays on your device</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Experience the Difference?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try TextCraft today and see why thousands of users choose us for their 
              daily text processing needs. Fast, secure, and privacy-focused tools that just work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Try TextCraft Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <Users className="w-4 h-4" />
                Learn More About Us
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Contact us at <a href="mailto:textcraftdev@gmail.com" className="text-primary hover:underline">textcraftdev@gmail.com</a><br />
              Visit us at <a href="https://www.textcraft.dev" className="text-primary hover:underline">www.textcraft.dev</a>
            </p>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
};
