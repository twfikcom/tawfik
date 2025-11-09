

import { Service, Article, Domain } from './types';

export const NAV_LINKS = [
  { id: 'index', type: 'section' },
  { id: 'websites', type: 'section' },
  { id: 'domains', type: 'section' },
  { id: 'tools', type: 'page' },
  { id: 'prompts', type: 'page' },
  { id: 'blog', type: 'page' },
  { id: 'about', type: 'page' },
  { id: 'seo', type: 'page' },
  { id: 'contact', type: 'section' },
];

export const SERVICES: Service[] = [
  // Websites
  {
    id: 1,
    type: 'Website',
    category: 'websites',
    cardImage: 'https://twfik.com/Corporate-Business-Website.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
  {
    id: 2,
    type: 'Website',
    category: 'websites',
    cardImage: 'https://twfik.com/E-commerce-Storefront.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
  {
    id: 3,
    type: 'Website',
    category: 'websites',
    cardImage: 'https://twfik.com/Personal-Portfolio-Blog.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
  // Tools
  {
    id: 4,
    type: 'Tool',
    category: 'tools',
    cardImage: 'https://twfik.com/bodyweight.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
    previewUrl: '#',
  },
  // Prompts
  {
    id: 7,
    type: 'Prompt',
    category: 'prompts',
    cardImage: 'https://twfik.com/AIPrompt.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
  {
    id: 8,
    type: 'Prompt',
    category: 'prompts',
    cardImage: 'https://twfik.com/AIPrompt.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
  {
    id: 9,
    type: 'Prompt',
    category: 'prompts',
    cardImage: 'https://twfik.com/AIPrompt.png',
    formspreeEndpoint: 'https://formspree.io/f/xblpnbep',
  },
];

export const DOMAINS: Domain[] = [
  { id: 'd1', name: 'pixelperfect.ai', price: '$2500', tagline: 'Premium domain for AI-powered design tools.', keywords: ['AI', 'Design', 'SaaS'] },
  { id: 'd2', name: 'promptfoundry.com', price: '$1800', tagline: 'Marketplace for high-quality AI prompts.', keywords: ['AI', 'Prompts', 'Marketplace'] },
  { id: 'd3', name: 'devlaunch.io', price: '$3000', tagline: 'The ultimate launchpad for developer tools.', keywords: ['Developer', 'Tools', 'SaaS', 'IO'] },
  { id: 'd4', name: 'seobotify.com', price: '$2200', tagline: 'Automated SEO solutions and analytics.', keywords: ['SEO', 'AI', 'Automation', 'Marketing'] },
  { id: 'd5', name: 'codecanvas.dev', price: '$1500', tagline: 'A creative space for developers to showcase projects.', keywords: ['Code', 'Portfolio', 'Developer'] },
  { id: 'd6', name: 'marketwizard.ai', price: '$4000', tagline: 'AI-driven market analysis and prediction platform.', keywords: ['AI', 'Finance', 'Market', 'SaaS'] }
];


export const ARTICLES: Article[] = [
  {
    id: 'ai-in-digital-production',
    image: 'https://twfik.com/The-Role-of-AI-in-Modern-Digital-Production.png',
    author: 'Admin',
    date: '2024-07-31',
  },
  {
    id: 'seo-for-chatbots',
    image: 'https://twfik.com/Optimizing-for-Chatbots-and-Voice-Search.png',
    author: 'Admin',
    date: '2024-07-28',
  },
  {
    id: 'future-of-communication',
    image: 'https://twfik.com/The-Future-of-Business-Communication.png',
    author: 'Admin',
    date: '2024-07-25',
  },
];