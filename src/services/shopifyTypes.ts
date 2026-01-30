export interface ArticleImage {
  url?: string;
  cardImageUrl?: string;
  altText?: string;
}

export interface Article {
  id: string;
  title: string;
  onlineStoreUrl: string;
  handle: string;
  excerpt?: string;
  publishedAt: string;
  image?: ArticleImage;
  brand?: Brand;
}

/**
 * Usage: prefer displayUrl for UI rendering; reserve originalUrl for downloads/high-res previews.
 */
export interface BrandLogoImage {
  /**
   * Shopify base image URL. Avoid direct UI rendering (unoptimized for web delivery).
   * Prefer displayUrl in UI; keep for downloads or high-res previews.
   */
  originalUrl?: string;
  /**
   * Transformed/optimized image URL intended for UI rendering.
   */
  displayUrl?: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface BrandLogo {
  image?: BrandLogoImage;
}

export interface BrandColor {
  background?: string;
  foreground?: string;
}

export interface BrandColors {
  primary: BrandColor[];
}

export interface BrandImage {
  image?: {
    url?: string;
    heroUrl?: string;
    altText?: string;
    width?: number;
    height?: number;
  };
}

export interface Brand {
  slogan?: string;
  shortDescription?: string;
  colors: BrandColors;
  // `logo` and `squareLogo` share the same structure, differing only by aspect ratio.
  logo?: BrandLogo;
  squareLogo?: BrandLogo;
  coverImage?: BrandImage;
}

export interface Shop {
  id: string;
  name: string;
  shipsToCountries: string[];
  primaryDomain: {
    url: string;
  };
  brand?: Brand;
}

export interface StorefrontData {
  shop: Shop;
  articles: {
    nodes: Article[];
  };
}

export interface StorefrontResponse {
  data: StorefrontData | null;
  error: Error | null;
  loading: boolean;
  retry: () => Promise<void>;
}
