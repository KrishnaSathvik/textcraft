import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
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
import { Shuffle, Copy, Target, Zap, CheckCircle, FileText, BarChart3, Lightbulb } from 'lucide-react';

export default function LoremIpsumPage() {
  const [loremType, setLoremType] = useState<LoremType>('classic');
  const [format, setFormat] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState([3]);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlFormat, setHtmlFormat] = useState(false);
  const [regenerateKey, setRegenerateKey] = useState(0);

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
  }, [loremType, format, count, startWithLorem, htmlFormat, regenerateKey]);

  const handleGenerate = () => {
    // Trigger re-generation by incrementing the regenerate key
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

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your projects with customizable options and different content types."
    >
      <div className="space-y-8">
        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to Use Lorem Ipsum Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Content Type</h3>
                <p className="text-sm text-muted-foreground">Select from Classic, Modern, Tech, or Business lorem ipsum variants.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Set Format & Length</h3>
                <p className="text-sm text-muted-foreground">Choose words, sentences, or paragraphs and adjust the length with the slider.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Generate & Copy</h3>
                <p className="text-sm text-muted-foreground">Generate your placeholder text and copy or download it for your project.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Logic */}
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
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-semibold text-foreground">Generated Text</h3>
            <Button
              variant="outline"
              onClick={handleGenerate}
              size="sm"
              className="gap-2 w-full sm:w-auto"
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
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="text-sm text-muted-foreground">
            Generated {generatedText.split(/\s+/).filter(Boolean).length} words, {generatedText.length} characters
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
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

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Lorem Ipsum Generator?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Design Mockups</p>
                  <p className="text-sm text-muted-foreground">Create realistic placeholder text for website designs, wireframes, and prototypes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Content Testing</p>
                  <p className="text-sm text-muted-foreground">Test layouts, typography, and spacing without waiting for real content.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Client Presentations</p>
                  <p className="text-sm text-muted-foreground">Show clients how their content will look with realistic placeholder text.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Development Testing</p>
                  <p className="text-sm text-muted-foreground">Test text rendering, overflow handling, and responsive design with various text lengths.</p>
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
                <span className="text-sm">Multiple content types (Classic, Modern, Tech, Business)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Flexible formats (words, sentences, paragraphs)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Customizable length with slider control</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">HTML formatting options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time generation and preview</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Copy and download functionality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Professional placeholder text</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </ToolLayout>
  );
}