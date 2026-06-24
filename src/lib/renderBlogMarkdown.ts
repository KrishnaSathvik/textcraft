/** Inline markdown for authored in-repo blog content (not user-supplied). */
function formatInline(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\((\/[^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline font-medium">$1</a>'
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|[-:\s|]+\|$/.test(line.trim());
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|', 1);
}

function renderTable(lines: string[]): string {
  const headerCells = parseTableRow(lines[0]);
  const bodyLines = lines.slice(2);

  const headerHtml = headerCells
    .map((cell) => `<th>${formatInline(cell)}</th>`)
    .join('');

  const bodyHtml = bodyLines
    .map((line) => {
      const cells = parseTableRow(line);
      const cellsHtml = cells.map((cell) => `<td>${formatInline(cell)}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    })
    .join('');

  return (
    '<div class="blog-table-wrap overflow-x-auto my-4 -mx-1 px-1">' +
    '<table><thead><tr>' +
    headerHtml +
    '</tr></thead><tbody>' +
    bodyHtml +
    '</tbody></table></div>'
  );
}

function parseMarkdownTables(content: string): string {
  const lines = content.split('\n');
  const output: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const next = lines[index + 1];

    if (line && isTableRow(line) && next && isTableSeparator(next)) {
      const tableLines: string[] = [];
      while (index < lines.length && isTableRow(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    output.push(line);
    index += 1;
  }

  return output.join('\n');
}

function isBlockElement(block: string): boolean {
  return /^<(h[1-6]|ul|ol|div|table|pre|li|blockquote)\b/i.test(block);
}

function wrapParagraphs(content: string): string {
  return content
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (isBlockElement(trimmed) || trimmed.includes('<table')) return trimmed;
      if (trimmed.startsWith('<li')) {
        return `<ul class="list-disc pl-5 mb-4 space-y-1">${trimmed}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

/**
 * Renders blog post markdown-like content stored as plain text.
 * Content is authored in-repo (not user-supplied).
 */
export function renderBlogMarkdown(content: string): string {
  const codeBlocks: string[] = [];

  let html = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code: string) => {
    const index = codeBlocks.length;
    codeBlocks.push(`<pre><code>${code}</code></pre>`);
    return `@@CODE_BLOCK_${index}@@`;
  });

  html = parseMarkdownTables(html);

  html = html
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-base font-medium mt-4 mb-2 text-foreground">$1</h4>')
    .replace(/^- (.*$)/gm, '<li class="mb-1">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="mb-1">$1</li>');

  html = formatInline(html);
  html = wrapParagraphs(html);

  html = html.replace(/@@CODE_BLOCK_(\d+)@@/g, (_match, index: string) => codeBlocks[Number(index)] ?? '');

  return html;
}
