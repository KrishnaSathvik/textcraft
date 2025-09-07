import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { StatsPill, StatsGrid } from '@/components/ui/StatsPill';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { countStats, formatReadingTime } from '@/lib/text/counters';
import { useSEO } from '@/hooks/useSEO';
import { trackTextProcessing, trackInteraction } from '@/lib/analytics';
import { Trash2, FileText, Clock, BarChart3, Target, Zap, CheckCircle, Lightbulb } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const stats = useMemo(() => countStats(text), [text]);

  useSEO({
    title: 'Word Counter - Free Online Text Analysis Tool | TextCraft',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimates, character density analysis, and text statistics. Perfect for writers, students, and content creators.',
    keywords: 'word counter, character count, text analysis, reading time, word count tool, text statistics, online word counter, free word counter, character counter, sentence counter, paragraph counter, text length, writing tool, content analysis, word frequency, text metrics',
    canonical: 'https://www.textcraft.dev/word-counter',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Word Counter',
      description: 'Free online word counting and text analysis tool',
      url: 'https://www.textcraft.dev/word-counter',
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
    trackInteraction('clear', 'Word Counter');
  };

  // Track text processing when text changes
  useMemo(() => {
    if (text.length > 0) {
      trackTextProcessing('Word Counter', 'word_count', text.length);
    }
  }, [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Professional word counting tool that analyzes text in real-time. Count words, characters, sentences, paragraphs, and get reading time estimates instantly. Perfect for writers, bloggers, students, and content creators who need accurate text analysis."
    >
      <div className="space-y-8">
        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to Use Word Counter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Paste Your Text</h3>
                <p className="text-sm text-muted-foreground">Copy and paste your text into the text area below. You can also type directly.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">View Statistics</h3>
                <p className="text-sm text-muted-foreground">Instantly see word count, character count, reading time, and other metrics.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Export or Copy</h3>
                <p className="text-sm text-muted-foreground">Use the copy or download buttons to save your text and statistics.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Logic */}
        <div className="space-y-6">
        {/* Stats Pills */}
        <StatsGrid>
          <StatsPill label="Words" value={stats.words} variant="accent" />
          <StatsPill label="Characters" value={stats.chars} />
          <StatsPill label="Characters (no spaces)" value={stats.charsNoSpaces} />
          <StatsPill label="Sentences" value={stats.sentences} />
          <StatsPill label="Paragraphs" value={stats.paragraphs} />
          <StatsPill label="Lines" value={stats.lines} />
        </StatsGrid>

        {/* Reading Time Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-card rounded-lg p-3 sm:p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">📖 Reading Time</h3>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {formatReadingTime(stats.readingTimeMin)}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Average 225 words per minute
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-3 sm:p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">🎤 Speaking Time</h3>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {formatReadingTime(stats.speakingTimeMin)}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Average 130 words per minute
            </p>
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-4">
          <TextArea
            value={text}
            onValueChange={setText}
            placeholder="Paste or type your text here to get instant word count, character count, and reading time estimates..."
            rows={14}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text}
              className="gap-2 w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <CopyButton text={text} disabled={!text} />
              <DownloadButton 
                content={text} 
                filename="word-count.txt" 
                disabled={!text}
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        {text && (
          <div className="bg-card rounded-lg p-3 sm:p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">💡 Quick Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div>
                <p>• Average sentence length: <strong>{stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words</strong></p>
                <p>• Average paragraph length: <strong>{stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0} words</strong></p>
              </div>
              <div>
                <p>• Character density: <strong>{stats.chars > 0 ? Math.round((stats.charsNoSpaces / stats.chars) * 100) : 0}% non-space</strong></p>
                <p>• Words per line: <strong>{stats.lines > 0 ? Math.round(stats.words / stats.lines) : 0}</strong></p>
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
                Why Use Word Counter?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Meet Writing Requirements</p>
                  <p className="text-sm text-muted-foreground">Ensure your content meets specific word count requirements for essays, articles, or assignments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Optimize Reading Experience</p>
                  <p className="text-sm text-muted-foreground">Get accurate reading time estimates to help readers understand content length before diving in.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Content Analysis</p>
                  <p className="text-sm text-muted-foreground">Analyze text structure, sentence length, and paragraph distribution for better writing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">SEO Optimization</p>
                  <p className="text-sm text-muted-foreground">Optimize content length for search engines and social media platforms.</p>
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
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time word and character counting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Reading time estimates (225 WPM average)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Speaking time calculations (130 WPM average)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Sentence and paragraph analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Character density and line counting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Instant copy and download options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Privacy-focused (all processing in browser)</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </ToolLayout>
  );
}