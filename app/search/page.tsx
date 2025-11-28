'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NewsCard from '@/app/components/NewsCard';
import { Article } from '@/types/news';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      fetchArticles(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const fetchArticles = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to load search results');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            खोज परिणाम
          </h1>
          <p className="text-gray-600">
            "{query}" के लिए खोज परिणाम
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">खोज परिणाम लोड हो रहे हैं...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Link
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              होम पेज पर वापस जाएं
            </Link>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && (
          <>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  "{query}" के लिए कोई परिणाम नहीं मिला
                </p>
                <p className="text-gray-500 mb-6">
                  कृपया अपनी खोज शब्दों को जांचें या अलग शब्दों का प्रयास करें
                </p>
                <Link
                  href="/"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  होम पेज पर वापस जाएं
                </Link>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {articles.length} परिणाम मिले
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <NewsCard key={article.id} article={article} size="medium" />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
