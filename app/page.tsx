import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import NewsGrid from './components/NewsGrid';
import CategorySection from './components/CategorySection';
import { getNews, getFeaturedArticle, getArticlesByCategory } from '@/lib/api';

export default async function Home() {
  // Fetch data using Next.js data fetching
  const [newsData, featuredArticle, sportsArticles, businessArticles, entertainmentArticles] = await Promise.all([
    getNews(),
    getFeaturedArticle(),
    getArticlesByCategory('sports'),
    getArticlesByCategory('business'),
    getArticlesByCategory('entertainment')
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Featured News */}
      {featuredArticle && <HeroSection featuredArticle={featuredArticle} />}
      
      {/* Latest News Grid */}
      <NewsGrid 
        articles={newsData.articles.slice(0, 6)} 
        title="ताजा खबरें"
        layout="featured"
      />
      
      {/* Sports Category */}
      <CategorySection category="sports" articles={sportsArticles} />
      
      {/* Business Category */}
      <CategorySection category="business" articles={businessArticles} />
      
      {/* Entertainment Category */}
      <CategorySection category="entertainment" articles={entertainmentArticles} />
      
      {/* More News Grid */}
      <NewsGrid 
        articles={newsData.articles.slice(3)} 
        title="और खबरें"
      />
      
      <Footer />
    </main>
  );
}

// Add metadata for SEO
export async function generateMetadata() {
  return {
    title: 'LIVE हिन्दुस्तान - भारत का विश्वसनीय हिंदी न्यूज पोर्टल',
    description: 'ताजा समाचार, ब्रेकिंग न्यूज, राजनीति, खेल, मनोरंजन और विश्लेषण',
  };
}