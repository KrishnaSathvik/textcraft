import { useState, useMemo } from 'react';
import ToolLayout from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cleanupText, CleanupOptions } from '@/lib/text/cleanup';
import { Trash2, RotateCcw } from 'lucide-react';

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
      related={[
        { href: '/tools/word-counter', label: 'Word Counter' },
        { href: '/tools/case-converter', label: 'Case Converter' },
        { href: '/tools/diff-checker', label: 'Text Diff Checker' }
      ]}
    >
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
              disabled={!text || !hasChanges}
              variant="default"
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
              <div className="text-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-muted-foreground">Original lines:</span>
                  <div className="font-semibold">{text.split('\n').length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cleaned lines:</span>
                  <div className="font-semibold">{cleanedText.split('\n').length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Original chars:</span>
                  <div className="font-semibold">{text.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cleaned chars:</span>
                  <div className="font-semibold">{cleanedText.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}