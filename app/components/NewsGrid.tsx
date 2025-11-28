import { Article } from '@/types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: Article[];
  title?: string;
  layout?: 'default' | 'featured';
}

export default function NewsGrid({ articles, title, layout = 'default' }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">कोई खबर उपलब्ध नहीं है</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2 inline-block">
            {title}
          </h2>
        )}
        
        {layout === 'featured' ? (
          // Featured layout with one large and multiple small cards
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large featured card */}
            {articles[0] && (
              <div className="lg:col-span-2">
                <NewsCard article={articles[0]} size="large" />
              </div>
            )}
            
            {/* Side small cards */}
            <div className="space-y-4">
              {articles.slice(1, 4).map((article) => (
                <NewsCard key={article.id} article={article} size="small" />
              ))}
            </div>
          </div>
        ) : (
          // Default grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard 
                key={article.id} 
                article={article} 
                size={index === 0 ? 'medium' : 'small'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}