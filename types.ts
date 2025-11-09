// Fix: Removed self-import of 'Theme' which was causing a conflict.
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface PricingOption {
  type: string;
  price: string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface Service {
  id: number;
  type: 'Website' | 'Tool' | 'Prompt';
  category: 'websites' | 'tools' | 'prompts';
  cardImage: string;
  formspreeEndpoint: string;
  previewUrl?: string;
}

export interface Domain {
    id: string;
    name: string;
    price: string;
    tagline: string;
    keywords: string[];
}

export interface ServiceDetails {
    title: string;
    shortDescription: string;
    longDescription: string;
    pricing: PricingOption[];
    features: string[];
    gallery: string[];
    faq: QuestionAnswer[];
    seo: {
      title: string;
      description: string;
      keywords: string;
    }
}

export interface Article {
  id: string;
  image: string;
  author: string;
  date: string;
}

export interface ArticleDetails {
  title: string;
  excerpt: string;
  content: string;
  faq?: QuestionAnswer[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  }
}