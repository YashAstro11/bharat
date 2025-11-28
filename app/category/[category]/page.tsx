import { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NewsGrid from '@/app/components/NewsGrid';
import { getArticlesByCategory } from '@/lib/api';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryNames: { [key: string]: string } = {
    sports: 'खेल',
    politics: 'राजनीति',
    business: 'व्यापार',
    entertainment: 'मनोरंजन',
    weather: 'मौसम',
    education: 'शिक्षा',
    health: 'स्वास्थ्य',
    all: 'सभी खबरें'
  };

  const categoryName = categoryNames[params.category] || params.category;

  return {
    title: `${categoryName} समाचार - LIVE हिन्दुस्तान`,
    description: `${categoryName} से संबंधित ताजा खबरें और अपडेट`,
  };
}

export async function generateStaticParams() {
  const categories = ['all', 'sports', 'politics', 'business', 'entertainment', 'weather', 'education', 'health'];

  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const articles = await getArticlesByCategory(params.category);

  const categoryNames: { [key: string]: string } = {
    sports: 'खेल',
    politics: 'राजनीति',
    business: 'व्यापार',
    entertainment: 'मनोरंजन',
    weather: 'मौसम',
    education: 'शिक्षा',
    health: 'स्वास्थ्य',
    all: 'सभी खबरें'
  };

  const categoryName = categoryNames[params.category] || params.category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-red-600">होम</a>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {categoryName} समाचार
          </h1>
          <p className="text-gray-600 text-lg">
            {categoryName} से संबंधित सभी ताजा खबरें और अपडेट
          </p>
        </div>

        {/* News Grid */}
        <NewsGrid
          articles={articles}
          title={`${categoryName} की ताजा खबरें`}
        />

        {articles.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              कोई खबर उपलब्ध नहीं है
            </h2>
            <p className="text-gray-600 mb-8">
              इस श्रेणी में अभी कोई खबर उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः प्रयास करें।
            </p>
            <a
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              होम पेज पर वापस जाएं
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
