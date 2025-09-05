import { useState, useMemo } from 'react';
import ToolLayout from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { StatsPill, StatsGrid } from '@/components/ui/StatsPill';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { countStats, formatReadingTime } from '@/lib/text/counters';
import { Trash2 } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const stats = useMemo(() => countStats(text), [text]);

  const handleClear = () => {
    setText('');
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs with live reading time estimates. Free and instant analysis."
      related={[
        { href: '/tools/case-converter', label: 'Case Converter' },
        { href: '/tools/line-breaks', label: 'Remove Line Breaks' },
        { href: '/tools/lorem-ipsum', label: 'Lorem Ipsum Generator' }
      ]}
    >
      <div className="space-y-6">
        {/* Stats Pills */}
        <StatsGrid>
          <StatsPill label="Words" value={stats.words} variant="accent" />
          <StatsPill label="Characters" value={stats.chars} />
          <StatsPill label="Characters (no spaces)" value={stats.charsNoSpaces} />
          <StatsPill label="Sentences" value={stats.sentences} />
          <StatsPill label="Paragraphs" value={stats.paragraphs} />
          <StatsPill label="Lines" value={stats.lines} />
        </StatsGrid>

        {/* Reading Time Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2">📖 Reading Time</h3>
            <p className="text-2xl font-bold text-primary">
              {formatReadingTime(stats.readingTimeMin)}
            </p>
            <p className="text-sm text-muted-foreground">
              Average 225 words per minute
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2">🎤 Speaking Time</h3>
            <p className="text-2xl font-bold text-primary">
              {formatReadingTime(stats.speakingTimeMin)}
            </p>
            <p className="text-sm text-muted-foreground">
              Average 130 words per minute
            </p>
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-4">
          <TextArea
            value={text}
            onValueChange={setText}
            placeholder="Paste or type your text here to get instant word count, character count, and reading time estimates..."
            rows={14}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-between">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            
            <div className="flex gap-2">
              <CopyButton text={text} disabled={!text} />
              <DownloadButton 
                content={text} 
                filename="word-count.txt" 
                disabled={!text}
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        {text && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-card-foreground mb-2">💡 Quick Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p>• Average sentence length: <strong>{stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words</strong></p>
                <p>• Average paragraph length: <strong>{stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0} words</strong></p>
              </div>
              <div>
                <p>• Character density: <strong>{stats.chars > 0 ? Math.round((stats.charsNoSpaces / stats.chars) * 100) : 0}% non-space</strong></p>
                <p>• Words per line: <strong>{stats.lines > 0 ? Math.round(stats.words / stats.lines) : 0}</strong></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}