import { useState, useMemo, useEffect } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { StatsPill, StatsGrid } from '@/components/ui/StatsPill';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { countStats, formatReadingTime } from '@/lib/text/counters';
import { useSEO } from '@/hooks/useSEO';
import { trackTextProcessing, trackInteraction } from '@/lib/analytics';
import { Trash2, BookOpen, Mic } from 'lucide-react';
import { RelatedTools } from '@/components/RelatedTools';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';

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

  useEffect(() => {
    if (text.length > 0) {
      trackTextProcessing('Word Counter', 'word_count', text.length);
    }
  }, [text]);

  const guide = TOOL_GUIDES['word-counter'];
  const help = TOOL_HELP_CONTENT['word-counter'];

  const handleFillExample = (example: ToolExample) => {
    setText(example.input);
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Professional word counting tool that analyzes text in real-time. Count words, characters, sentences, paragraphs, and get reading time estimates instantly. Perfect for writers, bloggers, students, and content creators who need accurate text analysis."
      examples={TOOL_EXAMPLES['word-counter']}
      onFillExample={handleFillExample}
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="space-y-4">
        {/* Text Input — primary focus */}
        <div className="space-y-3">
          <TextArea
            value={text}
            onValueChange={setText}
            label="Text to analyze"
            placeholder="Paste or type your text here to get instant word count, character count, and reading time estimates..."
            rows={16}
          />

          <ToolActionBar>
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
          </ToolActionBar>
        </div>

        {/* Stats */}
        <StatsGrid className="mb-1">
          <StatsPill label="Words" value={stats.words} variant="accent" />
          <StatsPill label="Characters" value={stats.chars} />
          <StatsPill label="No spaces" value={stats.charsNoSpaces} />
          <StatsPill label="Sentences" value={stats.sentences} />
          <StatsPill label="Paragraphs" value={stats.paragraphs} />
          <StatsPill label="Lines" value={stats.lines} />
        </StatsGrid>

        {/* Reading Time Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="tool-surface p-3 sm:p-4">
            <h3 className="font-medium text-card-foreground mb-1.5 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Reading Time
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {formatReadingTime(stats.readingTimeMin)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Average 225 words per minute
            </p>
          </div>
          
          <div className="tool-surface p-3 sm:p-4">
            <h3 className="font-medium text-card-foreground mb-1.5 text-sm flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              Speaking Time
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {formatReadingTime(stats.speakingTimeMin)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Average 130 words per minute
            </p>
          </div>
        </div>

        {/* Tips */}
        {text && (
          <div className="tool-surface p-3 sm:p-4">
            <h3 className="font-medium text-card-foreground mb-2 text-sm">Quick facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
              <div>
                <p>• Average sentence length: <strong className="text-foreground">{stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words</strong></p>
                <p>• Average paragraph length: <strong className="text-foreground">{stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0} words</strong></p>
              </div>
              <div>
                <p>• Character density: <strong className="text-foreground">{stats.chars > 0 ? Math.round((stats.charsNoSpaces / stats.chars) * 100) : 0}% non-space</strong></p>
                <p>• Words per line: <strong className="text-foreground">{stats.lines > 0 ? Math.round(stats.words / stats.lines) : 0}</strong></p>
              </div>
            </div>
          </div>
        )}
        </div>


        <RelatedTools
          tools={[
            { name: 'Case Converter', path: '/case-converter' },
            { name: 'Text Sorter', path: '/text-sorter' },
          ]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Word Counter"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}