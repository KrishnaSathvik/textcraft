import { useState, useMemo, useEffect } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { StatsPill, StatsGrid } from '@/components/ui/StatsPill';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { ToolPanel } from '@/components/tools/ToolPanel';
import { sortText, sortOptions, SortOption } from '@/lib/text/sorter';
import { useSEO } from '@/hooks/useSEO';
import { RelatedTools } from '@/components/RelatedTools';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';
import { trackTextProcessing, trackInteraction } from '@/lib/analytics';
import { Trash2, FileText, Zap, CheckCircle } from 'lucide-react';

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
  useEffect(() => {
    if (text.length > 0) {
      trackTextProcessing('Text Sorter', 'text_sort', text.length);
    }
  }, [text]);

  const guide = TOOL_GUIDES['text-sorter'];
  const help = TOOL_HELP_CONTENT['text-sorter'];

  const handleFillExample = (example: ToolExample) => {
    setText(example.input);
  };

  return (
    <ToolLayout
      title="Text Sorter"
      description="Sort and organize text lines alphabetically, by length, remove duplicates, reverse order, and sort numbers. Perfect for cleaning lists and organizing data."
      examples={TOOL_EXAMPLES['text-sorter']}
      onFillExample={handleFillExample}
      metrics={
        <StatsGrid>
          <StatsPill label="Total lines" value={sortResult.originalLineCount} variant="accent" />
          <StatsPill label="Processed" value={sortResult.processedLineCount} />
          <StatsPill label="Duplicates removed" value={sortResult.duplicatesRemoved} />
        </StatsGrid>
      }
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="space-y-4">
        {/* Input / output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="tool-surface p-4 space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Input Text
            </h3>
            <TextArea
              value={text}
              onValueChange={setText}
              label="Lines to sort"
              placeholder="Enter your text here... Each line will be treated as a separate item to sort."
              rows={12}
              className="resize-none"
            />
          </div>

          <div className="tool-surface p-4 space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Sorted Text
            </h3>
            <TextArea
              value={sortResult.sortedText}
              onValueChange={() => {}}
              label="Sorted output"
              readOnly
              placeholder="Your sorted text will appear here..."
              rows={12}
              className="resize-none bg-code-bg/50"
            />
            <ToolActionBar className="!static !border-0 !py-0 !mt-0">
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={!text}
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <CopyButton text={sortResult.sortedText} />
                <DownloadButton 
                  content={sortResult.sortedText} 
                  filename="sorted-text.txt"
                />
              </div>
            </ToolActionBar>
          </div>
        </div>

        {/* Sort Options — compact */}
        <ToolPanel
          title="Sort options"
          titleIcon={<Zap className="h-4 w-4 text-primary" />}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className={`flex items-start gap-2.5 p-2.5 rounded-md border cursor-pointer transition-colors min-h-[44px] ${
                    sortOption === option.value
                      ? 'border-primary bg-primary/10 ring-1 ring-primary/25'
                      : 'border-border hover:border-primary/20 hover:bg-hover'
                  }`}
                >
                  <input
                    type="radio"
                    id={option.value}
                    name="sortOption"
                    value={option.value}
                    checked={sortOption === option.value}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="w-4 h-4 text-primary mt-0.5 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="font-medium text-sm block">{option.label}</span>
                    <span className="text-xs text-muted-foreground leading-snug">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
        </ToolPanel>

        {text && (
          <div className="tool-surface p-3 text-xs sm:text-sm text-muted-foreground">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p>• Duplicate removal: <strong className="text-foreground">{sortResult.duplicatesRemoved} lines removed</strong></p>
              <p>• Sort method: <strong className="text-foreground">{sortOption.replace('-', ' ')}</strong></p>
            </div>
          </div>
        )}
        </div>


        <RelatedTools
          tools={[
            { name: 'Line Breaks Remover', path: '/line-breaks' },
            { name: 'Word Counter', path: '/word-counter' },
          ]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Text Sorter"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}
