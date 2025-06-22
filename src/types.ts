export interface Shop {
  id: string;
  name: string;
  shipsToCountries: string[];
  primaryDomain: {
    url: string;
  };
  brand?: {
    logo?: MediaImage;
    slogan?: string;
    coverImage?: MediaImage;
    shortDescription?: string;
    colors: {
      primary: [{
        background?: string;
        foreground?: string;
      }];
    };
  };
}

export interface Article {
  id: string;
  title: string;
  excerptHtml?: string;
  onlineStoreUrl?: string;
  image?: Image;
  publishedAt: string;
}

export interface MediaImage {
  image?: Image;
}

export interface Image {
  altText?: string;
  url: string;
  carouselUrl?: string;
  logoUrl?: string;
  newsUrl?: string;
  width?: number;
  height?: number;
}

