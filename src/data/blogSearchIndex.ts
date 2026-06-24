export interface BlogSearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
}

/** Lazy-load guide search metadata without pulling full blog post bodies. */
export async function loadBlogSearchIndex(): Promise<BlogSearchEntry[]> {
  const { default: index } = await import('./blogSearchIndex.json');
  return index as BlogSearchEntry[];
}
