import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { TextArea } from '@/components/ui/TextArea';
import { CopyButton } from '@/components/ui/CopyButton';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Button } from '@/components/ui/button';
import { ToolPanel } from '@/components/tools/ToolPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { diffLines, diffWords, generateUnifiedDiff } from '@/lib/text/diff';
import { useSEO } from '@/hooks/useSEO';
import { RelatedTools } from '@/components/RelatedTools';
import { SITE_URL } from '@/config/site';
import { Trash2, ArrowLeftRight } from 'lucide-react';
import { ToolHelpAccordion } from '@/components/tools/ToolHelpAccordion';
import { ToolActionBar } from '@/components/tools/ToolActionBar';
import { TOOL_GUIDES } from '@/lib/toolGuides';
import { TOOL_HELP_CONTENT } from '@/lib/toolHelpContent';
import { TOOL_EXAMPLES } from '@/lib/toolExamples';
import type { ToolExample } from '@/types/tool';

export default function DiffCheckerPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffMode, setDiffMode] = useState<'lines' | 'words'>('lines');

  useSEO({
    title: 'Text Diff Checker - Compare Two Texts Online | TextCraft',
    description:
      'Compare two texts side by side with line or word diff highlighting. Free online text diff checker with unified diff export.',
    keywords: 'text diff, compare text, diff checker, text comparison',
    canonical: `${SITE_URL}/diff-checker`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Text Diff Checker',
      description: 'Compare two texts and highlight differences',
      url: `${SITE_URL}/diff-checker`,
      applicationCategory: 'Text Processing Tool',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

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

  const guide = TOOL_GUIDES['diff-checker'];
  const help = TOOL_HELP_CONTENT['diff-checker'];

  const handleFillExample = (example: ToolExample) => {
    setText1(example.input);
    setText2(example.input2 ?? '');
  };

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts and highlight differences with side-by-side or unified diff views."
      examples={TOOL_EXAMPLES['diff-checker']}
      onFillExample={handleFillExample}
    >
      <div className="space-y-5 px-3 sm:px-6 pb-4">
        <div className="space-y-4">
        {/* Diff Mode + actions */}
        <div className="flex flex-col gap-3">
          <Tabs value={diffMode} onValueChange={(value) => setDiffMode(value as 'lines' | 'words')}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="lines" className="flex-1 sm:flex-none">Line Diff</TabsTrigger>
              <TabsTrigger value="words" className="flex-1 sm:flex-none">Word Diff</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-medium">Line Diff</strong> compares whole lines — best for documents and drafts.
            {' '}<strong className="text-foreground font-medium">Word Diff</strong> highlights word-level edits within lines.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleSwap}
              disabled={!text1 && !text2}
              size="sm"
              className="gap-2"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!text1 && !text2}
              size="sm"
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">Original Text (A)</h3>
            <TextArea
              value={text1}
              onValueChange={setText1}
              label="Original text (A)"
              placeholder="Paste your original text here..."
              rows={12}
              variant="code"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">Modified Text (B)</h3>
            <TextArea
              value={text2}
              onValueChange={setText2}
              label="Modified text (B)"
              placeholder="Paste your modified text here..."
              rows={12}
              variant="code"
            />
          </div>
        </div>

        {/* Empty state */}
        {!text1 && !text2 && (
          <div className="tool-surface border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Paste text in both areas above to compare versions side by side.
            </p>
            <p className="text-xs text-muted-foreground">
              Differences highlight in real time as you type.
            </p>
          </div>
        )}

        {/* Diff Results */}
        {diffResult && (
          <>
            {/* Stats */}
            <ToolPanel title="Diff summary">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                  <div className="bg-green-500/10 rounded-lg p-2 sm:p-3 border border-green-500/20">
                    <div className="text-lg sm:text-2xl font-bold text-green-400">+{diffResult.additions}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Additions</div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-2 sm:p-3 border border-red-500/20">
                    <div className="text-lg sm:text-2xl font-bold text-red-400">-{diffResult.deletions}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Deletions</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3 border border-yellow-500/20">
                    <div className="text-lg sm:text-2xl font-bold text-yellow-400">{diffResult.changes}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Changes</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-2 sm:p-3 border border-blue-500/20">
                    <div className="text-lg sm:text-2xl font-bold text-blue-400">
                      {Math.round(((diffResult.chunks.filter(c => c.type === 'equal').length) / diffResult.chunks.length) * 100)}%
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Similarity</div>
                  </div>
                </div>
            </ToolPanel>

            {/* Diff Views */}
            <Tabs defaultValue="visual">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="visual" className="flex-1 sm:flex-none">Visual Diff</TabsTrigger>
                <TabsTrigger value="unified" className="flex-1 sm:flex-none">Unified Diff</TabsTrigger>
              </TabsList>

              <TabsContent value="visual" className="space-y-4">
                <ToolPanel title="Visual differences" bodyClassName="max-h-96 overflow-y-auto">
                    {renderDiff()}
                </ToolPanel>
              </TabsContent>

              <TabsContent value="unified" className="space-y-4">
                <ToolPanel
                  title="Unified diff format"
                  headerExtra={
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <CopyButton text={unifiedDiff} disabled={!unifiedDiff} size="sm" />
                      <DownloadButton 
                        content={unifiedDiff} 
                        filename="diff.patch" 
                        disabled={!unifiedDiff}
                        size="sm"
                      />
                    </div>
                  }
                >
                    <pre className="text-sm bg-code-bg p-4 rounded border border-border overflow-x-auto font-mono">
                      {unifiedDiff || 'No differences found'}
                    </pre>
                </ToolPanel>
              </TabsContent>
            </Tabs>
          </>
        )}

        </div>


        <RelatedTools
          tools={[{ name: 'Word Counter', path: '/word-counter' }]}
          blogPost={{ title: guide.title, slug: guide.slug }}
        />

        <ToolHelpAccordion
          toolName="Text Diff Checker"
          howToSteps={help.howToSteps}
          whyUseItems={help.whyUseItems}
          keyFeatures={help.keyFeatures}
        />
      </div>
    </ToolLayout>
  );
}