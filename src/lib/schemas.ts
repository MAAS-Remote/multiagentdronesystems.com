export const SITE_URL = 'https://multiagentdronesystems.com';

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Multi-Agent Drone Systems Inc',
  alternateName: 'MADS Inc',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description:
    'Multi-Agent Drone Systems (MADS) builds autonomous multi-drone platforms for surveillance, mapping, and delivery missions.',
  email: 'info@multiagentdronesystems.com',
  telephone: '+1-613-413-2941',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ottawa',
    addressRegion: 'Ontario',
    addressCountry: 'CA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-613-413-2941',
    email: 'info@multiagentdronesystems.com',
    contactType: 'customer service',
  },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function productSchema(drone: {
  id: string | number;
  name: string;
  description: string;
  image_url: string;
  price: number | string | null;
  in_stock: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: drone.name,
    description: drone.description,
    image: drone.image_url,
    brand: {
      '@type': 'Brand',
      name: 'MADS Inc',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Multi-Agent Drone Systems Inc',
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      ...(drone.price && drone.price !== 'N/A' ? { price: String(drone.price) } : {}),
      availability: drone.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/product/${drone.id}`,
    },
  };
}
