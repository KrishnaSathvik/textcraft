import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { StatsPill, StatsGrid } from '@/components/ui/StatsPill';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sortText, sortOptions, SortOption } from '@/lib/text/sorter';
import { useSEO } from '@/hooks/useSEO';
import { trackTextProcessing, trackInteraction } from '@/lib/analytics';
import { Trash2, FileText, Clock, BarChart3, Target, Zap, CheckCircle, Lightbulb } from 'lucide-react';

export default function TextSorterPage() {
  const [text, setText] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical-asc');

  const sortResult = useMemo(() => {
    if (!text.trim()) {
      return {
        sortedText: '',
        originalLineCount: 0,
        processedLineCount: 0,
        duplicatesRemoved: 0
      };
    }
    return sortText(text, sortOption);
  }, [text, sortOption]);

  useSEO({
    title: 'Text Sorter - Free Online Text Organization Tool | TextCraft',
    description: 'Sort and organize text lines alphabetically, by length, remove duplicates, reverse order, and sort numbers. Free online text sorter for lists, data, and content organization.',
    keywords: 'text sorter, sort text, organize text, remove duplicates, sort lines, text organizer, list sorter, data organizer, text tools, online sorter',
    canonical: 'https://www.textcraft.dev/text-sorter',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Text Sorter',
      description: 'Free online text sorting and organization tool',
      url: 'https://www.textcraft.dev/text-sorter',
      applicationCategory: 'Text Processing Tool',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  });

  const handleClear = () => {
    setText('');
    trackInteraction('clear', 'Text Sorter');
  };

  // Track text processing when text changes
  useMemo(() => {
    if (text.length > 0) {
      trackTextProcessing('Text Sorter', 'text_sort', text.length);
    }
  }, [text]);

  return (
    <ToolLayout
      title="Text Sorter"
      description="Sort and organize text lines alphabetically, by length, remove duplicates, reverse order, and sort numbers. Perfect for cleaning lists and organizing data."
    >
      <div className="space-y-8">
        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to Use Text Sorter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Enter Your Text</h3>
                <p className="text-sm text-muted-foreground">Paste or type your text. Each line will be treated as a separate item to sort.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Sort Option</h3>
                <p className="text-sm text-muted-foreground">Select how you want to sort your text from the available options below.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">View & Copy Results</h3>
                <p className="text-sm text-muted-foreground">See your sorted text and use copy or download buttons to save it.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Logic */}
        <div className="space-y-6">
        {/* Stats Pills */}
        <StatsGrid>
          <StatsPill label="Total Lines" value={sortResult.originalLineCount} variant="accent" />
          <StatsPill label="Processed Lines" value={sortResult.processedLineCount} />
          <StatsPill label="Duplicates Removed" value={sortResult.duplicatesRemoved} />
          <StatsPill label="Sort Type" value={sortOption.replace('-', ' ').toUpperCase()} />
        </StatsGrid>

        {/* Sort Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Sort Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option.value}
                    name="sortOption"
                    value={option.value}
                    checked={sortOption === option.value}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="w-4 h-4 text-primary"
                  />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Tool Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Input Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextArea
                value={text}
                onValueChange={setText}
                placeholder="Enter your text here... Each line will be treated as a separate item to sort."
                rows={12}
                className="resize-none"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Sorted Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextArea
                value={sortResult.sortedText}
                onValueChange={() => {}} // Read-only
                readOnly
                placeholder="Your sorted text will appear here..."
                rows={12}
                className="resize-none bg-muted/50"
              />
              <div className="flex flex-wrap gap-2">
                <CopyButton text={sortResult.sortedText} />
                <DownloadButton 
                  content={sortResult.sortedText} 
                  filename="sorted-text.txt"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        {text && (
          <div className="bg-card rounded-lg p-3 sm:p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">💡 Quick Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div>
                <p>• Duplicate removal: <strong>{sortResult.duplicatesRemoved} lines removed</strong></p>
                <p>• Processing efficiency: <strong>{sortResult.originalLineCount > 0 ? Math.round((sortResult.processedLineCount / sortResult.originalLineCount) * 100) : 0}% lines processed</strong></p>
              </div>
              <div>
                <p>• Sort method: <strong>{sortOption.replace('-', ' ').toUpperCase()}</strong></p>
                <p>• Data organization: <strong>{sortResult.processedLineCount} organized lines</strong></p>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Text Sorter?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Organize Lists & Data</p>
                  <p className="text-sm text-muted-foreground">Sort shopping lists, names, numbers, or any text data alphabetically or by length for better organization.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Remove Duplicates</p>
                  <p className="text-sm text-muted-foreground">Clean up your data by automatically removing duplicate lines while preserving the original order.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Multiple Sort Options</p>
                  <p className="text-sm text-muted-foreground">Choose from alphabetical, length-based, numerical, or reverse sorting to fit your specific needs.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Real-time Processing</p>
                  <p className="text-sm text-muted-foreground">See results instantly as you type or change sort options.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Preserve Original</p>
                  <p className="text-sm text-muted-foreground">Keep your original text safe while viewing sorted results in a separate area.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Export & Share</p>
                  <p className="text-sm text-muted-foreground">Copy results to clipboard or download as a text file for easy sharing.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
