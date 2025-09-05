import { useState, useMemo } from 'react';
import ToolLayout from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transformCase, caseOptions, CaseType } from '@/lib/text/case';
import { Trash2, RotateCcw } from 'lucide-react';

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

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, kebab-case, and more."
      related={[
        { href: '/tools/word-counter', label: 'Word Counter' },
        { href: '/tools/line-breaks', label: 'Remove Line Breaks' },
        { href: '/tools/diff-checker', label: 'Text Diff Checker' }
      ]}
    >
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
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            
            {previousText && (
              <Button
                variant="outline"
                onClick={handleUndo}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Undo
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleApply}
              disabled={!text || convertedText === text}
              variant="default"
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
    </ToolLayout>
  );
}