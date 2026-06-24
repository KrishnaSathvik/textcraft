import { describe, expect, it } from 'vitest';
import { renderBlogMarkdown } from '@/lib/renderBlogMarkdown';

describe('renderBlogMarkdown', () => {
  it('renders markdown tables as HTML tables', () => {
    const input = `Intro line.

| Post type | Typical word count | Why |
|-----------|--------------------|-----|
| News update | 400–800 | Readers want the point fast |
| How-to tutorial | 1,200–2,000 | Room for steps and examples |

After table.`;

    const html = renderBlogMarkdown(input);

    expect(html).toContain('<table>');
    expect(html).toContain('<th>Post type</th>');
    expect(html).toContain('<td>News update</td>');
    expect(html).not.toContain('| Post type |');
    expect(html).not.toContain('whitespace-pre-wrap');
  });

  it('renders reading time table with inline formatting', () => {
    const input = `| Words | Reading time | Speaking time |
|-------|----------------|----------------|
| 500 | ~2 min | ~4 min |`;

    const html = renderBlogMarkdown(input);
    expect(html).toContain('<td>~2 min</td>');
    expect(html).toContain('<thead>');
  });
});
