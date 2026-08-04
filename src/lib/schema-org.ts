/**
 * GitLegacy JSON-LD Structured Data Schema Generator for Google Search
 * Provides WebSite, Organization, SiteNavigationElement, and SoftwareApplication schemas.
 */

export const BASE_URL = 'https://gitlegacy.co';

/**
 * 1. WebSite Schema - Enables Google to show "GitLegacy" as official site name
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'GitLegacy',
    alternateName: ['Git Legacy', 'gitlegacy.co', 'Git Legacy Studio', 'GitLegacy Badges'],
    description:
      'Design your GitHub contribution legacy before you write code. Custom developer badges, contribution art studio, and commit strategy tools.',
    publisher: {
      '@type': 'Organization',
      name: 'GitLegacy',
      url: BASE_URL,
      logo: `${BASE_URL}/icon.svg`,
    },
  };
}

/**
 * 2. Organization Schema - Establishes brand authority & logo identity for Google Image & Knowledge Graph
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'GitLegacy',
    alternateName: ['Git Legacy'],
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    sameAs: ['https://github.com/Sukhman369/gitlegacy'],
  };
}

/**
 * 3. SiteNavigationElement (ItemList) Schema - Drives Google Sitelinks under main search result
 */
export function getSiteNavigationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/#sitelinks`,
    name: 'GitLegacy Developer Tools',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Badge Studio & Shields',
        description: 'Create SEO-optimized, custom branded GitHub profile badges & shields',
        url: `${BASE_URL}/tools/badges`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Contribution Art Studio',
        description: 'Design 8-bit contribution grid pixel text & custom commit strategies',
        url: `${BASE_URL}/tools/art-studio`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'History Visualizer',
        description: 'Visualize your entire multi-year GitHub contribution calendar poster',
        url: `${BASE_URL}/tools/history-visualizer`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'CLI Script Generator',
        description: 'Generate standalone Bash, Python & PowerShell backdated commit scripts',
        url: `${BASE_URL}/tools/script-generator`,
      },
    ],
  };
}

/**
 * 4. SoftwareApplication Schema for individual sub-tools
 */
export function getSoftwareApplicationSchema(
  name: string,
  description: string,
  urlPath: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${BASE_URL}${urlPath}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'GitLegacy',
      url: BASE_URL,
    },
  };
}
