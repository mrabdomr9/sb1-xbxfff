// SEO utility functions for better search engine optimization

export const generatePageTitle = (pageTitle: string, includeCompany = true): string => {
  const companyName = "Active Soft";
  const separator = " | ";
  
  if (includeCompany) {
    return `${pageTitle}${separator}${companyName}`;
  }
  
  return pageTitle;
};

export const generateMetaDescription = (content: string, maxLength = 160): string => {
  if (content.length <= maxLength) {
    return content;
  }
  
  return content.substring(0, maxLength - 3).trim() + '...';
};

export const generateKeywords = (primary: string[], secondary: string[] = []): string => {
  const baseKeywords = [
    'Active Soft',
    'Oracle ERP',
    'custom software',
    'enterprise solutions',
    'Egypt software company'
  ];
  
  return [...primary, ...secondary, ...baseKeywords].join(', ');
};

export const generateStructuredData = (type: string, data: any) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return baseData;
};

// Common structured data templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Active Soft",
  "url": "https://activesoft.com",
  "logo": "https://activesoft.com/Untitled designfdfdsd.jpg",
  "description": "Leading Oracle ERP implementation and custom desktop application development company in Egypt",
  "foundingDate": "2008",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sadat City",
    "addressCountry": "Egypt"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+20-1225077433",
      "contactType": "customer support"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+20-1006467081", 
      "contactType": "sales"
    }
  ],
  "email": "support@activesoft.com",
  "serviceType": [
    "Oracle ERP Implementation",
    "Custom Desktop Application Development",
    "Enterprise Software Solutions",
    "Business Intelligence Solutions",
    "Supply Chain Management",
    "Healthcare Management Systems"
  ],
  "areaServed": "Worldwide",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});