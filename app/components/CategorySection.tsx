import { Article } from '@/types/news';
import NewsCard from './NewsCard';

interface CategorySectionProps {
  category: string;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  const categoryNames: { [key: string]: string } = {
    sports: 'खेल',
    health: 'स्वास्थ्य',
    business: 'व्यापार',
    entertainment: 'मनोरंजन',
    weather: 'मौसम',
    education: 'शिक्षा',
    all: 'सभी खबरें'
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-6 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="bg-red-600 text-white px-4 py-2 rounded-lg mr-3">
            {categoryNames[category] || category}
          </span>
          समाचार
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} size="small" />
          ))}
        </div>
        
        {articles.length > 4 && (
          <div className="text-center mt-6">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
              और देखें
            </button>
          </div>
        )}
      </div>
    </section>
  );
}