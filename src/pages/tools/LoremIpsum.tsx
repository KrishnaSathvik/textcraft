import { useState, useMemo } from 'react';
import ToolLayout from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { genWords, genSentences, genParagraphs, loremTypes, LoremType } from '@/lib/text/lorem';
import { Shuffle, Copy } from 'lucide-react';

export default function LoremIpsumPage() {
  const [loremType, setLoremType] = useState<LoremType>('classic');
  const [format, setFormat] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState([3]);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlFormat, setHtmlFormat] = useState(false);

  const generatedText = useMemo(() => {
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

    // Add "Lorem ipsum" at the beginning if requested and using classic type
    if (startWithLorem && loremType === 'classic' && result && !result.toLowerCase().startsWith('lorem')) {
      if (format === 'words') {
        result = 'Lorem ipsum ' + result;
      } else {
        result = result.replace(/^[a-z]/i, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. $&');
      }
    }

    // Format as HTML if requested
    if (htmlFormat && format === 'paragraphs') {
      result = result
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('\n\n');
    } else if (htmlFormat && format === 'sentences') {
      result = `<p>${result}</p>`;
    }

    return result;
  }, [loremType, format, count, startWithLorem, htmlFormat]);

  const handleGenerate = () => {
    // Trigger re-generation by slightly changing count
    setCount([count[0]]);
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

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your projects with customizable options and different content types."
      related={[
        { href: '/tools/word-counter', label: 'Word Counter' },
        { href: '/tools/case-converter', label: 'Case Converter' },
        { href: '/tools/line-breaks', label: 'Line Breaks Remover' }
      ]}
    >
      <div className="space-y-6">
        {/* Generator Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generator Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Content Type */}
              <div className="space-y-3">
                <Label>Content Type</Label>
                <Select value={loremType} onValueChange={(value) => setLoremType(value as LoremType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loremTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Output Format */}
              <div className="space-y-3">
                <Label>Output Format</Label>
                <Select value={format} onValueChange={(value) => setFormat(value as typeof format)}>
                  <SelectTrigger>
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

            {/* Count Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>
                  {format === 'words' ? 'Number of Words' : 
                   format === 'sentences' ? 'Number of Sentences' : 
                   'Number of Paragraphs'}
                </Label>
                <span className="text-sm text-muted-foreground">{count[0]}</span>
              </div>
              <Slider
                value={count}
                onValueChange={setCount}
                max={getMaxCount()}
                min={1}
                step={getSliderStep()}
                className="w-full"
              />
            </div>

            {/* Additional Options */}
            <div className="flex flex-wrap gap-6">
              {loremType === 'classic' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="startWithLorem"
                    checked={startWithLorem}
                    onCheckedChange={(checked) => setStartWithLorem(checked === true)}
                  />
                  <Label htmlFor="startWithLorem" className="text-sm">
                    Start with "Lorem ipsum"
                  </Label>
                </div>
              )}
              
              {(format === 'paragraphs' || format === 'sentences') && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="htmlFormat"
                    checked={htmlFormat}
                    onCheckedChange={(checked) => setHtmlFormat(checked === true)}
                  />
                  <Label htmlFor="htmlFormat" className="text-sm">
                    HTML format
                  </Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Text */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Generated Text</h3>
            <Button
              variant="outline"
              onClick={handleGenerate}
              size="sm"
              className="gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Regenerate
            </Button>
          </div>
          
          <TextArea
            value={generatedText}
            onValueChange={() => {}} // Read-only
            rows={16}
            className="font-normal"
            readOnly
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="text-sm text-muted-foreground">
            Generated {generatedText.split(/\s+/).filter(Boolean).length} words, {generatedText.length} characters
          </div>
          
          <div className="flex gap-2">
            <CopyButton text={generatedText} disabled={!generatedText} />
            <DownloadButton 
              content={generatedText} 
              filename={`lorem-ipsum.${htmlFormat ? 'html' : 'txt'}`} 
              disabled={!generatedText}
            />
          </div>
        </div>

        {/* Preview */}
        {generatedText && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {htmlFormat ? (
                <div 
                  className="prose prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: generatedText }}
                />
              ) : (
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {generatedText.length > 500 
                    ? `${generatedText.substring(0, 500)}...` 
                    : generatedText
                  }
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}