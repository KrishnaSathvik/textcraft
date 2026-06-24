export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogRelatedLink {
  slug: string;
  title: string;
}

export interface BlogToolLink {
  name: string;
  path: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  updated?: string;
  quickAnswer?: string;
  keyTakeaways?: string[];
  relatedToolSlug?: string;
  relatedTools?: BlogToolLink[];
  relatedPosts?: BlogRelatedLink[];
  faqs?: BlogFaq[];
}
