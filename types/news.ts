export interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    imageUrl?: string;
    category: string;
    publishedAt: string;
    author: string;
    isFeatured?: boolean;
  }
  
  export interface NewsResponse {
    articles: Article[];
    total: number;
  }