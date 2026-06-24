import type { BlogPost } from '@/types/blog';
import posts from './blogPosts.json';

export const blogPosts = posts as BlogPost[];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogSlugs = (): string[] => blogPosts.map((post) => post.slug);
