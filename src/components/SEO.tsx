import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'Mewoabi Dore - Full Stack Developer',
  description = 'Full Stack Developer and UI/UX Designer creating exceptional digital experiences with modern web technologies.',
  keywords = 'web development, full stack developer, UI/UX design, React, TypeScript',
  image = 'https://your-portfolio-url.com/og-image.jpg',
  url = 'https://your-portfolio-url.com',
}: SEOProps) {
  const siteTitle = title.includes('Mewoabi Dore') ? title : `${title} | Mewoabi Dore`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}