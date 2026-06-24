import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { ToolPanel } from '@/components/tools/ToolPanel';
import { Checkbox } from '@/components/ui/checkbox';
import { cleanupText, CleanupOptions } from '@/lib/text/cleanup';
import { useSEO } from '@/hooks/useSEO';
import { RelatedTools } from '@/components/RelatedTools';
import { SITE_URL } from '@/config/site';
import { Trash2, RotateCcw } from 'lucide-react';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';

const cleanupOptionsList = [
  {
    key: 'removeExtraBlankLines' as keyof CleanupOptions,
    label: 'Remove extra blank lines',
    description: 'Convert 3+ consecutive line breaks to just 2'
  },
  {
    key: 'trimTrailingSpaces' as keyof CleanupOptions,
    label: 'Trim trailing spaces',
    description: 'Remove spaces and tabs at the end of lines'
  },
  {
    key: 'joinLines' as keyof CleanupOptions,
    label: 'Join lines with single spaces',
    description: 'Convert line breaks to single spaces'
  },
  {
    key: 'removeExtraSpaces' as keyof CleanupOptions,
    label: 'Remove extra spaces',
    description: 'Convert multiple spaces to single spaces'
  },
  {
    key: 'smartToAsciiQuotes' as keyof CleanupOptions,
    label: 'Convert smart quotes to ASCII',
    description: 'Convert "" to "" and \'\' to \'\''
  },
  {
    key: 'normalizeLineBreaks' as keyof CleanupOptions,
    label: 'Normalize line breaks',
    description: 'Convert \\r\\n and \\r to \\n'
  }
];

export default function LineBreaksPage() {
  const [text, setText] = useState('');
  const [previousText, setPreviousText] = useState('');
  const [options, setOptions] = useState<CleanupOptions>({
    removeExtraBlankLines: false,
    trimTrailingSpaces: false,
    joinLines: false,
    smartToAsciiQuotes: false,
    removeExtraSpaces: false,
    normalizeLineBreaks: false
  });

  useSEO({
    title: 'Line Breaks Remover - Clean & Normalize Text | TextCraft',
    description:
      'Remove extra line breaks, trim trailing spaces, normalize whitespace, and clean pasted text. Free browser-based text cleanup tool.',
    keywords: 'line breaks remover, whitespace cleaner, text normalizer, trim spaces',
    canonical: `${SITE_URL}/line-breaks`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Line Breaks Remover',
      description: 'Clean and normalize text whitespace and line breaks',
      url: `${SITE_URL}/line-breaks`,
      applicationCategory: 'Text Processing Tool',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const cleanedText = useMemo(() => {
    if (!text) return '';
    return cleanupText(text, options);
  }, [text, options]);

  const hasChanges = cleanedText !== text && text.length > 0;

  const handleOptionChange = (key: keyof CleanupOptions, checked: boolean) => {
    setOptions(prev => ({ ...prev, [key]: checked }));
  };

  const handleApply = () => {
    if (cleanedText && cleanedText !== text) {
      setPreviousText(text);
      setText(cleanedText);
    }
  };

  const handleUndo = () => {
    if (previousText) {
      setText(previousText);
      setPreviousText('');
    }
  };

  const handleClear = () => {
    setText('');
    setPreviousText('');
  };

  const guide = TOOL_GUIDES['line-breaks'];
  const help = TOOL_HELP_CONTENT['line-breaks'];

  const handleFillExample = (example: ToolExample) => {
    setText(example.input);
    setPreviousText('');
    setOptions({
      removeExtraBlankLines: true,
      joinLines: true,
      trimTrailingSpaces: false,
      smartToAsciiQuotes: false,
      removeExtraSpaces: false,
      normalizeLineBreaks: true,
    });
  };

  return (
    <ToolLayout
      title="Line Breaks Remover"
      description="Clean up and normalize text whitespace, remove extra line breaks, and fix formatting issues."
      examples={TOOL_EXAMPLES['line-breaks']}
      onFillExample={handleFillExample}
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="space-y-4">
        {/* Text Processing — primary focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">Original Text</h3>
            <TextArea
              value={text}
              onValueChange={setText}
              label="Original text"
              placeholder="Paste your text here to clean up line breaks and whitespace..."
              rows={12}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground text-sm">Cleaned Text</h3>
              {hasChanges && (
                <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded">
                  {cleanedText.length - text.length > 0 ? '+' : ''}{cleanedText.length - text.length} chars
                </span>
              )}
            </div>
            <TextArea
              value={cleanedText}
              onValueChange={() => {}}
              label="Cleaned text preview"
              rows={12}
              className="bg-code-bg"
              readOnly
            />
          </div>
        </div>

        {/* Cleanup Options — compact 2-col */}
        <ToolPanel title="Cleanup options">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cleanupOptionsList.map((option) => (
                <div key={option.key} className="flex items-start space-x-2.5">
                  <Checkbox
                    id={option.key}
                    checked={options[option.key]}
                    onCheckedChange={(checked) => 
                      handleOptionChange(option.key, checked as boolean)
                    }
                    className="mt-0.5"
                  />
                  <div className="grid gap-0.5 leading-none min-w-0">
                    <label
                      htmlFor={option.key}
                      className="text-sm font-medium leading-snug cursor-pointer"
                    >
                      {option.label}
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </ToolPanel>

        {/* Action Buttons */}
        <ToolActionBar>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text}
              className="gap-2 w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            
            {previousText && (
              <Button
                variant="outline"
                onClick={handleUndo}
                className="gap-2 w-full sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" />
                Undo
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button
              onClick={handleApply}
              disabled={!text || !hasChanges}
              variant="default"
              className="w-full sm:w-auto"
            >
              Apply Changes
            </Button>
            <CopyButton text={cleanedText} disabled={!cleanedText} />
            <DownloadButton 
              content={cleanedText} 
              filename="cleaned-text.txt" 
              disabled={!cleanedText}
            />
          </div>
        </ToolActionBar>

        {/* Summary when changes exist */}
        {hasChanges && (
          <div className="tool-surface p-3 text-xs sm:text-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <span className="text-muted-foreground">Original lines:</span>
                <div className="font-semibold text-foreground">{text.split('\n').length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cleaned lines:</span>
                <div className="font-semibold text-foreground">{cleanedText.split('\n').length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Original chars:</span>
                <div className="font-semibold text-foreground">{text.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cleaned chars:</span>
                <div className="font-semibold text-foreground">{cleanedText.length}</div>
              </div>
            </div>
          </div>
        )}
        </div>


        <RelatedTools
          tools={[
            { name: 'Text Sorter', path: '/text-sorter' },
            { name: 'Case Converter', path: '/case-converter' },
          ]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Line Breaks Remover"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}