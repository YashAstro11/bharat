# LiveHindustan Clone - Next.js News Portal

A simplified clone of the LiveHindustan website built with Next.js, featuring responsive design, dynamic routing, and real-time news integration.

## Part A – Requirements

### Build a front-page clone (or a simplified version) of the LiveHindustan website

This project implements a simplified version of the LiveHindustan news portal with the following key features:

#### Layout & UI
- **Header**: Navigation bar with logo, menu items, and search functionality
- **Hero Section**: Featured article with breaking news marquee and weather widget
- **News Grid**: Responsive grid layout for news articles with different sizes (large, medium, small)
- **Category Sections**: Organized news by categories (Sports, Politics, Business, etc.)
- **Footer**: Site information, quick links, categories, and contact details
- **Article Detail Pages**: Individual article pages with full content

#### Data Source
- **Primary**: NewsAPI integration for real-time news data
- **Fallback**: Comprehensive mock data for development and error scenarios
- **Categories**: Support for multiple news categories with filtering

#### Next.js Features
- **Data Fetching**: Server-side rendering (SSR) for dynamic content with ISR for performance
- **Dynamic Routing**: Article pages using `[id]` dynamic routes
- **Image Optimization**: Next.js `<Image>` component with responsive sizing and lazy loading
- **API Routes**: Custom API endpoints for news data with error handling

#### Styling
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Custom Components**: Reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach with breakpoints for desktop, tablet, and mobile

#### SEO Considerations
- **Metadata**: Dynamic title and description for home and article pages
- **Structured Data**: Proper HTML semantics and meta tags
- **Performance**: Optimized images and efficient data fetching

## Part B – Explanation + Documentation

### Design Document

#### Wireframe / Layout Decisions
```
┌─────────────────────────────────────────────────┐
│ Header (Logo, Nav, Search)                      │
├─────────────────────────────────────────────────┤
│ Hero Section                                    │
│ ┌─────────────────────────────────────────────┐ │
│ │ Breaking News Marquee                      │ │
│ ├─────────────────────────────────────────────┤ │
│ │ Featured Article (2/3 width) │ Side News   │ │
│ │ Large Image + Content       │ (1/3 width) │ │
│ └─────────────────────────────┴─────────────┘ │
├─────────────────────────────────────────────────┤
│ Category Sections                              │
│ ┌─────────────────────────────────────────────┐ │
│ │ Category Header                            │ │
│ │ ┌───┬───┬───┬───┐                         │ │
│ │ │Card│Card│Card│Card│                       │ │
│ │ └───┴───┴───┴───┘                         │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ Footer (Links, Contact, Copyright)              │
└─────────────────────────────────────────────────┘
```

**Layout Decisions:**
- **3-column grid** for main content: Featured article takes 2/3, side content 1/3
- **4-column news grid** for category sections to maximize content visibility
- **Mobile-first responsive** design with stacked layout on smaller screens
- **Breaking news marquee** for immediate attention to urgent news
- **Category-based organization** for better content discoverability

#### Data-fetching Strategy
**Chosen Method: Server-Side Rendering (SSR) with Incremental Static Regeneration (ISR)**

```typescript
// app/page.tsx - Home page with ISR
export default async function Home() {
  const newsData = await getNews(); // Server-side fetch
  const featuredArticle = await getFeaturedArticle();
  // ... render with fetched data
}
```

**Why SSR + ISR:**
- **Real-time content**: News requires fresh data, SSR ensures latest content
- **Performance**: ISR provides caching benefits while keeping content current
- **SEO**: Server-side rendering improves search engine indexing
- **User Experience**: Immediate content loading without client-side fetching delays

**Tradeoffs:**
- **vs Static Generation**: News changes frequently, static generation would show stale data
- **vs Client-side**: SSR provides better initial load performance and SEO
- **ISR Compromise**: Balances freshness with performance through revalidation

### Code Explanation

#### Components Created
1. **Header** (`app/components/Header.tsx`): Navigation with logo, menu, search
2. **HeroSection** (`app/components/HeroSection.tsx`): Featured article with marquee and weather
3. **NewsCard** (`app/components/NewsCard.tsx`): Reusable article card with image optimization
4. **NewsGrid** (`app/components/NewsGrid.tsx`): Flexible grid layout for article lists
5. **CategorySection** (`app/components/CategorySection.tsx`): Category-specific article sections
6. **Footer** (`app/components/Footer.tsx`): Site footer with links and information

#### Data Model Structure
```typescript
// types/news.ts
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  author: string;
  category: string;
  source: string;
}

interface NewsResponse {
  articles: Article[];
  totalResults: number;
}
```

#### Challenges Faced & Solutions

1. **API Rate Limiting & Error Handling**
   - **Challenge**: NewsAPI has rate limits and occasional failures
   - **Solution**: Implemented comprehensive fallback to mock data with proper error logging

2. **Responsive Image Optimization**
   - **Challenge**: Different image sizes for various card layouts
   - **Solution**: Used Next.js Image component with responsive `sizes` prop and fill mode

3. **Source Map Errors**
   - **Challenge**: Console-ninja extension causing invalid source maps
   - **Solution**: Added disable comments for console.error calls

4. **Dynamic Category Routing**
   - **Challenge**: Handling multiple categories with consistent URLs
   - **Solution**: Used Next.js dynamic routes with generateStaticParams for SEO

#### Improvements for More Time
- **Search Functionality**: Implement full-text search with API integration
- **Pagination**: Add infinite scroll or numbered pagination for large article lists
- **User Authentication**: Add user accounts with personalized news feeds
- **Performance**: Implement more aggressive caching and CDN optimization
- **Accessibility**: Add ARIA labels and keyboard navigation
- **PWA Features**: Add service worker for offline reading

## Part C – Testing / Edge Cases

### Test Cases & Scenarios

#### Image Handling
- **No Image Available**: Shows placeholder div with "No Image" text
- **Broken Image URLs**: Gracefully falls back to placeholder
- **Different Aspect Ratios**: Images maintain consistent card heights

#### Content Scenarios
- **Long Titles**: CSS `line-clamp` truncates to 2-3 lines with ellipsis
- **Missing Summary**: Cards adapt by showing only available content
- **Empty Categories**: Shows "No news available" message with navigation

#### API Error States
```typescript
// Error handling in lib/api.ts
try {
  const response = await fetch('/api/news');
  if (!response.ok) throw new Error('API failed');
  return await response.json();
} catch (error) {
  console.error('Error fetching news:', error);
  return mockNewsResponse; // Fallback data
}
```

#### Loading States
- **Skeleton Loading**: Shows animated placeholders during data fetch
- **Progressive Loading**: Content appears as it loads, no full-page spinners

#### Responsive Breakpoints
- **Mobile (< 768px)**: Single column, stacked layout
- **Tablet (768px - 1024px)**: 2-column grids, adjusted spacing
- **Desktop (> 1024px)**: 3-4 column grids, full feature set

### Error Handling Examples

#### Network Failure
```
User visits site → API call fails → Mock data loads → User sees content
```

#### Empty Results
```
Category page → No articles → "No news available" UI → Return home link
```

#### Invalid Article ID
```
Invalid URL → 404 handling → Redirect to home or show error page
```

## Part D – AI Use + Reflection

### AI Usage in Development

#### Components Generated with AI
- **Initial Component Boilerplate**: Used AI to generate basic structure for Header, Footer, and NewsCard components
- **Styling Classes**: AI suggested TailwindCSS classes for responsive layouts
- **TypeScript Interfaces**: AI helped define the Article and NewsResponse types

#### Data Fetching Logic
- **API Integration**: AI provided initial NewsAPI fetch implementation
- **Error Handling**: AI suggested try-catch patterns with fallback logic

#### Where AI Suggestions Were Suboptimal

1. **Hardcoded API Keys**: AI initially suggested embedding API keys directly in code
   - **Correction**: Moved to environment variables with proper validation

2. **Inconsistent Error Handling**: AI provided basic error logging
   - **Correction**: Added comprehensive fallback system and user-friendly error states

3. **Image Optimization**: AI suggested basic Image component usage
   - **Correction**: Added responsive sizes, priority loading, and proper aspect ratios

4. **SEO Metadata**: AI provided static metadata
   - **Correction**: Implemented dynamic metadata generation for articles and categories

### Custom Modifications Made

#### Security Improvements
- Moved API keys to environment variables
- Added input validation for API parameters
- Implemented proper error boundaries

#### Performance Optimizations
- Added ISR for better caching
- Implemented responsive image sizing
- Optimized component re-rendering

#### UX Enhancements
- Added loading states and skeleton screens
- Implemented proper fallback UI for errors
- Created intuitive navigation and breadcrumbs

#### Code Quality
- Added TypeScript strict typing
- Implemented consistent error handling patterns
- Created reusable component library

### AI Verification Process
- **Manual Testing**: Verified each AI-generated component works correctly
- **Cross-browser Testing**: Ensured compatibility across different browsers
- **Performance Testing**: Checked loading times and optimization
- **Accessibility Review**: Verified semantic HTML and keyboard navigation

This project demonstrates a balance of AI assistance for rapid development while ensuring production-ready code through thorough verification and customization.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Add your NewsAPI key to `.env.local`:
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
livehindustan-clone/
├── app/
│   ├── api/news/route.ts      # News API endpoint
│   ├── article/[id]/page.tsx  # Article detail page
│   ├── category/[category]/page.tsx  # Category pages
│   ├── components/            # Reusable components
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── lib/
│   ├── api.ts                 # API functions
│   └── mockData.ts            # Mock data fallback
├── types/
│   └── news.ts                # TypeScript interfaces
└── public/                    # Static assets
