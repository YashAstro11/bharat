import { Article } from '@/types/news';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  featuredArticle: Article;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-white py-6 border-b">
      <div className="container mx-auto px-4">
        {/* Breaking News Bar */}
        <div className="bg-red-600 text-white py-2 px-4 mb-6 rounded">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-sm">
              ब्रेकिंग न्यूज़
            </span>
            <marquee behavior="scroll" direction="left" className="flex-1">
              भारत ने विश्व कप जीता | दिल्ली में सर्दी का कहर जारी | स्टॉक मार्केट में तेजी
            </marquee>
          </div>
        </div>

        {/* Featured Article */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <Link href={`/article/${featuredArticle.id}`}>
              <div className="group cursor-pointer">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  {featuredArticle.imageUrl ? (
                    <Image
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">No Image Available</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium mb-3 inline-block">
                      {featuredArticle.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                      {featuredArticle.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-4 opacity-90 line-clamp-2">
                      {featuredArticle.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{formatDate(featuredArticle.publishedAt)}</span>
                      <span>By {featuredArticle.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side News */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-red-600 pb-2">
              ताजा खबरें
            </h2>
            <div className="space-y-4">
              {/* You can add recent news list here */}
              <div className="border-l-4 border-red-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">
                  केंद्र सरकार का बजट सत्र शुरू
                </h3>
                <p className="text-sm text-gray-600">2 घंटे पहले</p>
              </div>
              
              <div className="border-l-4 border-red-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">
                  आईपीएल 2025 की तैयारियां शुरू
                </h3>
                <p className="text-sm text-gray-600">4 घंटे पहले</p>
              </div>
              
              <div className="border-l-4 border-red-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">
                  टेक्नोलॉजी सेक्टर में नई नौकरियां
                </h3>
                <p className="text-sm text-gray-600">6 घंटे पहले</p>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <h3 className="font-bold text-lg mb-2">मौसम</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">18°C</p>
                  <p className="text-sm">दिल्ली</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">आंशिक बादल</p>
                  <p className="text-sm">न्यूनतम: 4°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}