import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getArticleById, getNews } from '@/lib/api';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleById(params.id);
  
  if (!article) {
    return {
      title: 'Article Not Found - LIVE हिन्दुस्तान',
    };
  }

  return {
    title: `${article.title} - LIVE हिन्दुस्तान`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const news = await getNews();
  
  return news.articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">खबर नहीं मिली</h1>
          <p className="text-gray-600 mb-8">माफ़ कीजिए, यह खबर उपलब्ध नहीं है।</p>
          <Link 
            href="/" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            होम पेज पर वापस जाएं
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">होम</Link>
          <span className="mx-2">›</span>
          <span className="capitalize">{article.category}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">खबर</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              {article.category}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>By {article.author}</span>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-semibold">
              {article.summary}
            </p>
            
            <div className="text-gray-800 leading-8 text-lg">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-6 border-t border-gray-300">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>टैग: {article.category}</span>
              <span>पब्लिश: {formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              ← सभी खबरें देखें
            </Link>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}