import { Article, NewsResponse } from '@/types/news';
import { mockArticles, mockNewsResponse } from './mockData';

export async function getNews(): Promise<NewsResponse> {
  try {
    const response = await fetch('/api/news?pageSize=20');

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data as fallback
    return mockNewsResponse;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { articles } = await getNews();
  const article = articles.find(article => article.id === id);
  return article || null;
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const { articles } = await getNews();
  return articles[0] || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const response = await fetch(`/api/news?category=${category}&pageSize=20`);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    // Return filtered mock data as fallback
    return mockArticles.filter(article => article.category === category || category === 'all');
  }
}
