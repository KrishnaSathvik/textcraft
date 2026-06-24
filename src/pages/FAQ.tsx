import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useSEO } from '@/hooks/useSEO';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Zap, Code2, Users } from 'lucide-react';

/**
 * FAQ page for TextCraft
 * 
 * This page answers common questions about TextCraft.
 * Important for SEO and user support.
 */
export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "text-blue-500",
      items: [
        {
          question: "What is TextCraft?",
          answer: "TextCraft is a collection of free, privacy-focused text processing tools that run entirely in your browser. It includes word counter, case converter, line breaks remover, text diff checker, lorem ipsum generator, and text sorter. All data processing happens locally on your device."
        },
        {
          question: "Is TextCraft really free?",
          answer: "Yes, TextCraft is completely free to use. There are no hidden costs, subscription fees, or premium tiers. All tools are available to everyone at no charge."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account creation is required. You can use all TextCraft tools immediately without signing up or providing any personal information."
        },
        {
          question: "What browsers are supported?",
          answer: "TextCraft works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your preferred browser for the best experience."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-green-500",
      items: [
        {
          question: "Is my data safe with TextCraft?",
          answer: "Absolutely! All text processing happens locally in your browser. Your data never leaves your device and is never sent to our servers. This ensures maximum privacy and security."
        },
        {
          question: "Do you store any of my data?",
          answer: "No, we don't store any of your data. Everything is processed locally in your browser, and we have no access to your files, text, or any other information you process with our tools."
        },
        {
          question: "Do you use cookies?",
          answer: "We only use essential cookies for functionality (like remembering your theme preference) and analytics (to understand how our tools are used). We don't use tracking cookies or collect personal information."
        },
        {
          question: "Can I use TextCraft offline?",
          answer: "Yes! Once you load TextCraft in your browser, you can use it offline. All tools work without an internet connection after the initial page load."
        }
      ]
    },
    {
      title: "Performance & Features",
      icon: Zap,
      color: "text-yellow-500",
      items: [
        {
          question: "How fast are the tools?",
          answer: "TextCraft tools are extremely fast because they run locally in your browser. There's no network latency, and processing happens instantly as you type or paste text."
        },
        {
          question: "What text sizes are supported?",
          answer: "Text size limits depend on your browser's memory capacity. For most tools, you can paste and process large amounts of text (often 10MB or more) without issues. Larger inputs may require more memory but are generally supported."
        },
        {
          question: "How accurate are the word counts?",
          answer: "Our word counter uses industry-standard algorithms to provide accurate counts. It properly handles different languages, punctuation, and special characters to give you precise statistics."
        },
        {
          question: "Are there keyboard shortcuts?",
          answer: "Yes! TextCraft includes keyboard shortcuts for common actions. Many tools have their own shortcuts for quick access and improved productivity."
        }
      ]
    },
    {
      title: "Technical Details",
      icon: Code2,
      color: "text-primary",
      items: [
        {
          question: "What technologies does TextCraft use?",
          answer: "TextCraft is built with React 18, TypeScript, Vite, and Tailwind CSS. We use modern web technologies and all tools are optimized for performance and user experience."
        },
        {
          question: "Is TextCraft open source?",
          answer: "No. TextCraft is proprietary software. The website and tools are free to use at www.textcraft.dev, but the source code, design, and user interface are protected intellectual property."
        },
        {
          question: "Can I license TextCraft for commercial use?",
          answer: "Personal and commercial use of the hosted tools at www.textcraft.dev is permitted under our Terms of Service. For redistribution, white-labeling, or source licensing, contact us at textcraftdev@gmail.com."
        },
        {
          question: "How accurate are the tools?",
          answer: "Our tools are highly accurate and use industry-standard algorithms. However, we recommend verifying critical results independently, especially for important text processing tasks."
        }
      ]
    },
    {
      title: "Troubleshooting",
      icon: Users,
      color: "text-red-500",
      items: [
        {
          question: "Why is a tool not working?",
          answer: "Try refreshing the page and clearing your browser cache. If the problem persists, check that you're using a supported browser and that JavaScript is enabled. You can also email us at textcraftdev@gmail.com."
        },
        {
          question: "The page is loading slowly. What should I do?",
          answer: "Slow loading is usually due to a poor internet connection or browser issues. Try refreshing the page, clearing your browser cache, or using a different browser. TextCraft should load quickly on most connections."
        },
        {
          question: "Can I use TextCraft on mobile devices?",
          answer: "Yes! TextCraft is fully responsive and works on mobile devices. However, some features may be limited on smaller screens, and we recommend using a desktop browser for the best experience."
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer: "Email us at textcraftdev@gmail.com with as much detail as possible, including your browser version and steps to reproduce any issues."
        }
      ]
    }
  ];

  const allFaqItems = faqCategories.flatMap((category) => category.items);

  useSEO({
    title: 'Frequently Asked Questions - TextCraft Text Processing Tools',
    description: 'Find answers to common questions about TextCraft text processing tools. Learn about our free online tools, security, privacy, and how to get started.',
    keywords: 'TextCraft FAQ, text processing tools questions, free tools help, word counter FAQ, case converter help, text tools support',
    canonical: 'https://www.textcraft.dev/faq',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <ToolLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about TextCraft. Learn about privacy, features, performance, and how to get the most out of our text processing tools."
    >
      <div className="p-6 max-w-4xl mx-auto">

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-border rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:textcraftdev@gmail.com" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
