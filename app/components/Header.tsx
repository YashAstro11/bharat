'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 'all', name: 'सभी' },
  { id: 'sports', name: 'खेल' },
  { id: 'health', name: 'स्वास्थ्य' },
  { id: 'business', name: 'व्यापार' },
  { id: 'entertainment', name: 'मनोरंजन' },
  { id: 'weather', name: 'मौसम' },
  { id: 'education', name: 'शिक्षा' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-red-600">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-600 text-white px-3 py-2 rounded">
              <span className="font-bold text-xl">LIVE</span>
              <span className="font-light text-xl">हिन्दुस्तान</span>
            </div>
          </Link>

          {/* Date */}
          <div className="hidden md:block text-gray-600">
            {new Date().toLocaleDateString('hi-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-t-0 py-4 md:py-2`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-gray-700 hover:text-red-600 font-medium text-sm md:text-base px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm w-full md:w-64"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  🔍
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
