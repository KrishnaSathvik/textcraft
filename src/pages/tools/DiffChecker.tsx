import { useState, useMemo } from 'react';
import ToolLayout from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { diffLines, diffWords, generateUnifiedDiff } from '@/lib/text/diff';
import { Trash2, ArrowLeftRight } from 'lucide-react';

export default function DiffCheckerPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffMode, setDiffMode] = useState<'lines' | 'words'>('lines');

  const diffResult = useMemo(() => {
    if (!text1 && !text2) return null;
    return diffMode === 'lines' ? diffLines(text1, text2) : diffWords(text1, text2);
  }, [text1, text2, diffMode]);

  const unifiedDiff = useMemo(() => {
    if (!text1 && !text2) return '';
    return generateUnifiedDiff(text1, text2);
  }, [text1, text2]);

  const handleSwap = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const handleClear = () => {
    setText1('');
    setText2('');
  };

  const renderDiff = () => {
    if (!diffResult) return null;

    return (
      <div className="space-y-2">
        {diffResult.chunks.map((chunk, index) => (
          <div
            key={index}
            className={`px-3 py-1 text-sm font-mono leading-relaxed ${
              chunk.type === 'equal' 
                ? 'text-muted-foreground'
                : chunk.type === 'insert'
                ? 'bg-green-500/20 text-green-400 border-l-2 border-green-500'
                : 'bg-red-500/20 text-red-400 border-l-2 border-red-500'
            }`}
          >
            <span className="inline-block w-6 text-xs text-muted-foreground mr-2">
              {chunk.type === 'insert' ? '+' : chunk.type === 'delete' ? '-' : ' '}
            </span>
            {chunk.content || ' '}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts and highlight differences with side-by-side or unified diff views."
      related={[
        { href: '/tools/word-counter', label: 'Word Counter' },
        { href: '/tools/case-converter', label: 'Case Converter' },
        { href: '/tools/line-breaks', label: 'Line Breaks Remover' }
      ]}
    >
      <div className="space-y-6">
        {/* Diff Mode Selection */}
        <div className="flex items-center justify-between">
          <Tabs value={diffMode} onValueChange={(value) => setDiffMode(value as 'lines' | 'words')}>
            <TabsList>
              <TabsTrigger value="lines">Line Diff</TabsTrigger>
              <TabsTrigger value="words">Word Diff</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSwap}
              disabled={!text1 && !text2}
              className="gap-2"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text1 && !text2}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Original Text (A)</h3>
            <TextArea
              value={text1}
              onValueChange={setText1}
              placeholder="Paste your original text here..."
              rows={12}
              variant="code"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Modified Text (B)</h3>
            <TextArea
              value={text2}
              onValueChange={setText2}
              placeholder="Paste your modified text here..."
              rows={12}
              variant="code"
            />
          </div>
        </div>

        {/* Diff Results */}
        {diffResult && (
          <>
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Diff Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">+{diffResult.additions}</div>
                    <div className="text-sm text-muted-foreground">Additions</div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">-{diffResult.deletions}</div>
                    <div className="text-sm text-muted-foreground">Deletions</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <div className="text-2xl font-bold text-yellow-400">{diffResult.changes}</div>
                    <div className="text-sm text-muted-foreground">Changes</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(((diffResult.chunks.filter(c => c.type === 'equal').length) / diffResult.chunks.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Similarity</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diff Views */}
            <Tabs defaultValue="visual">
              <TabsList>
                <TabsTrigger value="visual">Visual Diff</TabsTrigger>
                <TabsTrigger value="unified">Unified Diff</TabsTrigger>
              </TabsList>

              <TabsContent value="visual" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Visual Differences</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    {renderDiff()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unified" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Unified Diff Format</CardTitle>
                    <div className="flex gap-2">
                      <CopyButton text={unifiedDiff} disabled={!unifiedDiff} size="sm" />
                      <DownloadButton 
                        content={unifiedDiff} 
                        filename="diff.patch" 
                        disabled={!unifiedDiff}
                        size="sm"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm bg-code-bg p-4 rounded border overflow-x-auto font-mono">
                      {unifiedDiff || 'No differences found'}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Help Text */}
        {!text1 && !text2 && (
          <Card className="bg-secondary/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Paste text in both areas above to see the differences highlighted in real-time.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Use <strong>Line Diff</strong> for comparing documents or <strong>Word Diff</strong> for detailed text analysis.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}