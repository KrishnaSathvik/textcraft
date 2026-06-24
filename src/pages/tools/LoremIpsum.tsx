import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { genWords, genSentences, genParagraphs, loremTypes, LoremType } from '@/lib/text/lorem';
import { useSEO } from '@/hooks/useSEO';
import { RelatedTools } from '@/components/RelatedTools';
import { SITE_URL } from '@/config/site';
import { Shuffle } from 'lucide-react';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';

export default function LoremIpsumPage() {
  const [loremType, setLoremType] = useState<LoremType>('classic');
  const [format, setFormat] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState([3]);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlFormat, setHtmlFormat] = useState(false);
  const [regenerateKey, setRegenerateKey] = useState(0);

  useSEO({
    title: 'Lorem Ipsum Generator - Placeholder Text | TextCraft',
    description:
      'Generate lorem ipsum placeholder text by words, sentences, or paragraphs. Free online lorem ipsum generator with HTML output.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text',
    canonical: `${SITE_URL}/lorem-ipsum`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups',
      url: `${SITE_URL}/lorem-ipsum`,
      applicationCategory: 'Text Processing Tool',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const generatedText = useMemo(() => {
    void regenerateKey;
    const countValue = count[0];
    let result = '';

    switch (format) {
      case 'words':
        result = genWords(countValue, loremType);
        break;
      case 'sentences':
        result = genSentences(countValue, loremType);
        break;
      case 'paragraphs':
        result = genParagraphs(countValue, loremType);
        break;
    }

    if (startWithLorem && loremType === 'classic' && result && !result.toLowerCase().startsWith('lorem')) {
      if (format === 'words') {
        result = 'Lorem ipsum ' + result;
      } else {
        result = result.replace(/^[a-z]/i, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. $&');
      }
    }

    if (htmlFormat && format === 'paragraphs') {
      result = result
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('\n\n');
    } else if (htmlFormat && format === 'sentences') {
      result = `<p>${result}</p>`;
    }

    return result;
  }, [loremType, format, count, startWithLorem, htmlFormat, regenerateKey]);

  const handleGenerate = () => {
    setRegenerateKey(prev => prev + 1);
  };

  const getMaxCount = () => {
    switch (format) {
      case 'words':
        return 500;
      case 'sentences':
        return 50;
      case 'paragraphs':
        return 20;
      default:
        return 10;
    }
  };

  const getSliderStep = () => {
    switch (format) {
      case 'words':
        return 10;
      case 'sentences':
        return 1;
      case 'paragraphs':
        return 1;
      default:
        return 1;
    }
  };

  const guide = TOOL_GUIDES['lorem-ipsum'];
  const help = TOOL_HELP_CONTENT['lorem-ipsum'];

  const handleFillExample = (example: ToolExample) => {
    const [formatPart, countPart] = example.input.split(':');
    if (formatPart === 'paragraphs' || formatPart === 'words' || formatPart === 'sentences') {
      setFormat(formatPart);
      setCount([parseInt(countPart, 10) || 3]);
      setRegenerateKey((prev) => prev + 1);
    }
  };

  const formatLabel =
    format === 'words' ? 'words' : format === 'sentences' ? 'sentences' : 'paragraphs';

  const wordCount = generatedText.split(/\s+/).filter(Boolean).length;

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your projects with customizable options and different content types."
      examples={TOOL_EXAMPLES['lorem-ipsum']}
      onFillExample={handleFillExample}
      attachWorkspace
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="tool-surface overflow-hidden rounded-t-none border-t-0">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] xl:grid-cols-[minmax(0,260px)_1fr]">
            {/* Options */}
            <aside className="border-b border-border md:border-b-0 md:border-r bg-secondary/10 md:bg-transparent p-4 sm:p-5 space-y-4">
              <h2 className="text-sm font-medium text-foreground">Options</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <div className="space-y-2 min-w-0">
                  <Label className="text-xs">Content type</Label>
                  <Select value={loremType} onValueChange={(value) => setLoremType(value as LoremType)}>
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {loremTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 min-w-0">
                  <Label className="text-xs">Output format</Label>
                  <Select value={format} onValueChange={(value) => setFormat(value as typeof format)}>
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="words">Words</SelectItem>
                      <SelectItem value="sentences">Sentences</SelectItem>
                      <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs capitalize">Number of {formatLabel}</Label>
                  <span className="text-xs font-medium tabular-nums text-primary">{count[0]}</span>
                </div>
                <Slider
                  value={count}
                  onValueChange={setCount}
                  max={getMaxCount()}
                  min={1}
                  step={getSliderStep()}
                  className="w-full touch-none"
                />
              </div>

              <div className="space-y-2.5">
                {loremType === 'classic' && (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="startWithLorem"
                      checked={startWithLorem}
                      onCheckedChange={(checked) => setStartWithLorem(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="startWithLorem" className="text-xs font-normal leading-snug cursor-pointer">
                      Start with &ldquo;Lorem ipsum&rdquo;
                    </Label>
                  </div>
                )}
                {(format === 'paragraphs' || format === 'sentences') && (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="htmlFormat"
                      checked={htmlFormat}
                      onCheckedChange={(checked) => setHtmlFormat(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="htmlFormat" className="text-xs font-normal leading-snug cursor-pointer">
                      HTML format
                    </Label>
                  </div>
                )}
              </div>

              <Button onClick={handleGenerate} className="w-full gap-2" size="sm">
                <Shuffle className="h-4 w-4" />
                Generate
              </Button>
            </aside>

            {/* Output */}
            <div className="flex min-w-0 flex-col p-4 sm:p-5">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-medium text-foreground">Generated text</h2>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {wordCount} words · {generatedText.length} chars
                </span>
              </div>

              <TextArea
                value={generatedText}
                onValueChange={() => {}}
                label="Generated placeholder text"
                rows={12}
                className="min-h-[200px] flex-1 font-normal sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]"
                readOnly
              />

              <ToolActionBar className="mt-3 pb-1 md:static md:pb-0">
                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Shuffle className="h-4 w-4" />
                  Regenerate
                </Button>
                <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:ml-auto [&_button]:w-full sm:[&_button]:w-auto">
                  <CopyButton text={generatedText} disabled={!generatedText} />
                  <DownloadButton
                    content={generatedText}
                    filename={`lorem-ipsum.${htmlFormat ? 'html' : 'txt'}`}
                    disabled={!generatedText}
                  />
                </div>
              </ToolActionBar>
            </div>
          </div>
        </div>

        <RelatedTools
          tools={[{ name: 'Word Counter', path: '/word-counter' }]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Lorem Ipsum Generator"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}
