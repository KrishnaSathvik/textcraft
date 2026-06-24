import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { ToolPanel } from '@/components/tools/ToolPanel';
import { transformCase, caseOptions, CaseType } from '@/lib/text/case';
import { Trash2, RotateCcw } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { RelatedTools } from '@/components/RelatedTools';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';

export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('sentence');
  const [previousText, setPreviousText] = useState('');

  const convertedText = useMemo(() => {
    if (!text) return '';
    return transformCase(text, selectedCase);
  }, [text, selectedCase]);

  const handleApply = () => {
    if (convertedText && convertedText !== text) {
      setPreviousText(text);
      setText(convertedText);
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

  useSEO({
    title: 'Case Converter - Free Online Text Case Tool | TextCraft',
    description: 'Convert text between different cases instantly: UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and more. Free online text case converter for developers and writers.',
    keywords: 'case converter, text case, uppercase, lowercase, title case, camelcase, kebab case, snake case, text transform, case conversion, text formatting, string case, programming case, text tool, online converter',
    canonical: 'https://www.textcraft.dev/case-converter',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Case Converter',
      description: 'Free online text case conversion tool',
      url: 'https://www.textcraft.dev/case-converter',
      applicationCategory: 'Text Processing Tool',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  });

  const guide = TOOL_GUIDES['case-converter'];
  const help = TOOL_HELP_CONTENT['case-converter'];

  const handleFillExample = (example: ToolExample) => {
    setText(example.input);
    setPreviousText('');
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Professional text case conversion tool that transforms text between different cases instantly. Convert to UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and more. Perfect for developers, writers, and content creators."
      examples={TOOL_EXAMPLES['case-converter']}
      onFillExample={handleFillExample}
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="space-y-4">
        {/* Text Input — primary focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">Original Text</h3>
            <TextArea
              value={text}
              onValueChange={setText}
              label="Original text"
              placeholder="Enter your text here to convert between different cases..."
              rows={12}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">Converted Text</h3>
            <TextArea
              value={convertedText}
              onValueChange={() => {}}
              label="Converted text preview"
              rows={12}
              className="bg-code-bg"
              readOnly
            />
          </div>
        </div>

        {/* Case Selection — compact */}
        <ToolPanel title="Conversion type">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {caseOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedCase(option.value)}
                  className={`p-2.5 rounded-md border text-left transition-colors min-h-[44px] ${
                    selectedCase === option.value
                      ? 'border-primary bg-primary/15 text-primary ring-1 ring-primary/30'
                      : 'border-border hover:bg-hover hover:border-primary/20'
                  }`}
                >
                  <div className="font-medium text-xs sm:text-sm">{option.label}</div>
                </button>
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
              disabled={!text || convertedText === text}
              variant="default"
              className="w-full sm:w-auto"
            >
              Apply Changes
            </Button>
            <CopyButton text={convertedText} disabled={!convertedText} />
            <DownloadButton 
              content={convertedText} 
              filename="converted-text.txt" 
              disabled={!convertedText}
            />
          </div>
        </ToolActionBar>
        </div>


        <RelatedTools
          tools={[
            { name: 'Word Counter', path: '/word-counter' },
            { name: 'Line Breaks Remover', path: '/line-breaks' },
          ]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Case Converter"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}