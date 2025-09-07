import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cleanupText, CleanupOptions } from '@/lib/text/cleanup';
import { Trash2, RotateCcw, Target, Zap, CheckCircle, FileText, BarChart3, Lightbulb } from 'lucide-react';

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

  return (
    <ToolLayout
      title="Line Breaks Remover"
      description="Clean up and normalize text whitespace, remove extra line breaks, and fix formatting issues."
    >
      <div className="space-y-8">
        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to Use Line Breaks Remover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Paste Your Text</h3>
                <p className="text-sm text-muted-foreground">Copy and paste your messy text into the left text area. The tool will show a live preview.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Select Options</h3>
                <p className="text-sm text-muted-foreground">Choose which cleanup options to apply: remove extra lines, trim spaces, join lines, etc.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Apply & Export</h3>
                <p className="text-sm text-muted-foreground">Apply the changes, copy the cleaned text, or download it as a file.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Logic */}
        <div className="space-y-6">
        {/* Cleanup Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cleanup Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cleanupOptionsList.map((option) => (
                <div key={option.key} className="flex items-start space-x-3">
                  <Checkbox
                    id={option.key}
                    checked={options[option.key]}
                    onCheckedChange={(checked) => 
                      handleOptionChange(option.key, checked as boolean)
                    }
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={option.key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text Processing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Original Text</h3>
            <TextArea
              value={text}
              onValueChange={setText}
              placeholder="Paste your text here to clean up line breaks and whitespace..."
              rows={12}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Cleaned Text</h3>
              {hasChanges && (
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                  {cleanedText.length - text.length > 0 ? '+' : ''}{cleanedText.length - text.length} chars
                </span>
              )}
            </div>
            <TextArea
              value={cleanedText}
              onValueChange={() => {}} // Read-only
              rows={12}
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
        </div>

        {/* Preview Summary */}
        {hasChanges && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Original lines:</span>
                  <div className="font-semibold text-sm sm:text-base">{text.split('\n').length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Cleaned lines:</span>
                  <div className="font-semibold text-sm sm:text-base">{cleanedText.split('\n').length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Original chars:</span>
                  <div className="font-semibold text-sm sm:text-base">{text.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Cleaned chars:</span>
                  <div className="font-semibold text-sm sm:text-base">{cleanedText.length}</div>
                </div>
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
                Why Use Line Breaks Remover?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Clean Text Formatting</p>
                  <p className="text-sm text-muted-foreground">Remove inconsistent line breaks, extra spaces, and formatting issues from copied text.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Improve Readability</p>
                  <p className="text-sm text-muted-foreground">Normalize text structure for better reading experience and professional appearance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Data Processing</p>
                  <p className="text-sm text-muted-foreground">Prepare text for databases, APIs, and data analysis by standardizing format.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Code Preparation</p>
                  <p className="text-sm text-muted-foreground">Clean up text before processing in code, removing unwanted whitespace and line breaks.</p>
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
                <span className="text-sm">Remove extra blank lines and normalize spacing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Trim trailing spaces and tabs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Join lines with single spaces</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Convert smart quotes to ASCII</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Normalize line break formats</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time preview and character count</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Customizable cleanup options</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </ToolLayout>
  );
}