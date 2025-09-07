import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transformCase, caseOptions, CaseType } from '@/lib/text/case';
import { Trash2, RotateCcw, Target, Zap, CheckCircle, FileText, BarChart3, Lightbulb } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('upper');
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

  return (
    <ToolLayout
      title="Case Converter"
      description="Professional text case conversion tool that transforms text between different cases instantly. Convert to UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and more. Perfect for developers, writers, and content creators."
    >
      <div className="space-y-8">
        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to Use Case Converter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Enter Your Text</h3>
                <p className="text-sm text-muted-foreground">Type or paste your text in the left text area. The tool will show a live preview.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Case Type</h3>
                <p className="text-sm text-muted-foreground">Select from uppercase, lowercase, title case, camelCase, kebab-case, and more.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Apply & Export</h3>
                <p className="text-sm text-muted-foreground">Apply the changes, copy the result, or download it as a text file.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Logic */}
        <div className="space-y-6">
        {/* Case Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Choose Conversion Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {caseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCase(option.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedCase === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-hover'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text Input */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Original Text</h3>
            <TextArea
              value={text}
              onValueChange={setText}
              placeholder="Enter your text here to convert between different cases..."
              rows={10}
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Converted Text</h3>
            <TextArea
              value={convertedText}
              onValueChange={() => {}} // Read-only
              rows={10}
              className="bg-code-bg"
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
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
        </div>

        {/* Preview Info */}
        {text && convertedText && text !== convertedText && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm">
                <span className="text-muted-foreground">Preview: </span>
                <span className="font-mono bg-code-bg px-2 py-1 rounded">
                  {convertedText.length > 100 
                    ? `${convertedText.slice(0, 100)}...` 
                    : convertedText
                  }
                </span>
              </div>
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
                Why Use Case Converter?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Code Formatting</p>
                  <p className="text-sm text-muted-foreground">Convert variable names, function names, and constants to proper coding conventions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Content Standardization</p>
                  <p className="text-sm text-muted-foreground">Ensure consistent text formatting across documents, titles, and headings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">URL and File Naming</p>
                  <p className="text-sm text-muted-foreground">Convert text to URL-friendly formats like kebab-case or snake_case.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Data Processing</p>
                  <p className="text-sm text-muted-foreground">Normalize data formats for databases, APIs, and data analysis.</p>
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
                <span className="text-sm">UPPERCASE and lowercase conversion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Title Case and Sentence case</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">camelCase and PascalCase</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">kebab-case and snake_case</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time preview and conversion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Undo/Redo functionality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Copy and download options</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </ToolLayout>
  );
}