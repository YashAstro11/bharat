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
