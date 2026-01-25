export interface ArticleImage {
  url?: string;
  newsUrl?: string;
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
  newsUrl?: string;
  brand?: Brand;
}

export interface BrandLogoImage {
  url?: string;
  logoUrl?: string;
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
    carouselUrl?: string;
    altText?: string;
    width?: number;
    height?: number;
  };
}

export interface Brand {
  slogan?: string;
  shortDescription?: string;
  colors: BrandColors;
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
