export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
  publishedAt: string;
  readTime: string;
}