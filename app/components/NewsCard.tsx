import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/news';

interface NewsCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
}

export default function NewsCard({ article, size = 'medium' }: NewsCardProps) {
  const getCardStyles = () => {
    switch (size) {
      case 'large':
        return 'col-span-2';
      case 'small':
        return 'col-span-1';
      default:
        return 'col-span-1';
    }
  };

  const getImageSize = () => {
    switch (size) {
      case 'large':
        return { width: 600, height: 400 };
      case 'medium':
        return { width: 400, height: 250 };
      case 'small':
        return { width: 300, height: 200 };
      default:
        return { width: 400, height: 250 };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/article/${article.id}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${getCardStyles()}`}>
        {/* Image */}
        <div className="relative h-48 md:h-64">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-bold text-gray-900 mb-2 ${
            size === 'large' ? 'text-xl md:text-2xl' : 
            size === 'small' ? 'text-sm md:text-base' : 'text-lg md:text-xl'
          }`}>
            {article.title}
          </h3>
          
          {size !== 'small' && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.summary}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}