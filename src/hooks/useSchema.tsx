import { useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { ServiceDetails, ArticleDetails, Service, Article, QuestionAnswer, Domain } from '../types';
import { SERVICES, ARTICLES, DOMAINS } from '../constants';

interface SchemaProps {
    view: string;
    serviceId?: number | null;
    articleId?: string | null;
}

const ORG_SCHEMA = {
    "@type": "Organization",
    "name": "TWFIK Digital",
    "url": window.location.origin,
    "logo": `${window.location.origin}/vite.svg`,
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+20-101-037-3331",
        "contactType": "Customer Service"
    },
    "sameAs": []
};

export const useSchema = ({ view, serviceId, articleId }: SchemaProps) => {
    const { t, language } = useTranslation();

    useEffect(() => {
        const scriptId = 'schema-ld';
        let schema: object | null = null;
        
        const mainUrl = window.location.origin;

        // Utility to safely access translation object
        const getTranslationObject = (key: string) => {
            const result = t(key);
            return typeof result === 'object' && result !== null ? result : {};
        };
        

        switch (view) {
            case 'main':
                schema = {
                    "@context": "https://schema.org",
                    "@graph": [
                        ORG_SCHEMA,
                        {
                            "@type": "WebSite",
                            "url": mainUrl,
                            "name": "TWFIK Digital Services",
                            "publisher": {
                                "@id": `${mainUrl}/#organization`
                            }
                        }
                    ]
                };
                break;
            
            case 'serviceDetail':
                if (serviceId) {
                    const service: Service | undefined = SERVICES.find(s => s.id === serviceId);
                    const details: ServiceDetails = getTranslationObject(`items.${serviceId}`) as ServiceDetails;
                    if (service && details && details.title) {
                        schema = {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": details.title,
                            "description": details.longDescription,
                            "image": service.cardImage,
                            "brand": {
                                "@type": "Organization",
                                "name": "TWFIK Digital"
                            },
                            "offers": details.pricing.map(p => ({
                                "@type": "Offer",
                                "priceCurrency": p.price.includes('$') ? "USD" : p.price.includes('€') ? "EUR" : "EGP",
                                "price": p.price.replace(/[^0-9.]/g, ''),
                                "name": p.type
                            }))
                        };
                    }
                }
                break;
            
            case 'articleDetail':
                if (articleId) {
                    const article: Article | undefined = ARTICLES.find(a => a.id === articleId);
                    const details: ArticleDetails = getTranslationObject(`articles.${articleId}`) as ArticleDetails;
                    if (article && details && details.title) {
                        schema = {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": window.location.href
                            },
                            "headline": details.title,
                            "description": details.excerpt,
                            "image": article.image,
                            "author": {
                                "@type": "Person",
                                "name": article.author
                            },
                            "publisher": ORG_SCHEMA,
                            "datePublished": article.date,
                            "articleBody": details.content
                        };
                    }
                }
                break;
             
             case 'bodyWeightCalculator':
                const calculatorContent: any = getTranslationObject('bodyWeightCalculator');
                if (calculatorContent && calculatorContent.title) {
                    schema = {
                        "@context": "https://schema.org",
                        "@graph": [
                            ORG_SCHEMA,
                            {
                                "@type": "WebApplication",
                                "name": calculatorContent.title,
                                "description": calculatorContent.subtitle,
                                "applicationCategory": "HealthApplication",
                                "operatingSystem": "Any",
                                "browserRequirements": "Requires HTML5 support",
                                "provider": ORG_SCHEMA
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": (calculatorContent.faq as QuestionAnswer[]).map(item => ({
                                    "@type": "Question",
                                    "name": item.question,
                                    "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.answer
                                    }
                                }))
                            }
                        ]
                    };
                }
                break;
            
            case 'about':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "url": `${mainUrl}/about`,
                    "name": (getTranslationObject('about.seo') as any).title,
                    "description": (getTranslationObject('about.seo') as any).description,
                    "publisher": ORG_SCHEMA
                };
                break;
            
            case 'blog':
                schema = {
                     "@context": "https://schema.org",
                    "@type": "Blog",
                    "url": `${mainUrl}/blog`,
                    "name": (getTranslationObject('blog.seo') as any).title,
                    "description": (getTranslationObject('blog.seo') as any).description,
                    "publisher": ORG_SCHEMA,
                    "blogPost": ARTICLES.map(article => {
                         const details: ArticleDetails = getTranslationObject(`articles.${article.id}`) as ArticleDetails;
                         return {
                            "@type": "BlogPosting",
                            "mainEntityOfPage": `${mainUrl}/blog/${article.id}`,
                            "headline": details.title,
                         }
                    })
                };
                break;
            
            case 'seo':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "SEO Strategy & Analysis",
                    "description": (getTranslationObject('seo.seo') as any).description,
                    "provider": ORG_SCHEMA,
                    "serviceType": "Search engine optimization service"
                };
                break;
            
            case 'domains':
                const domainsPageDetails: any = getTranslationObject(`domains.seo`);
                schema = {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "url": `${mainUrl}/domains`,
                    "name": domainsPageDetails.title,
                    "description": domainsPageDetails.description,
                    "publisher": ORG_SCHEMA,
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": DOMAINS.map((domain: Domain, index: number) => ({
                            "@type": "Product",
                            "name": domain.name,
                            "description": domain.tagline,
                            "url": `${mainUrl}/domains#${domain.id}`,
                            "position": index + 1,
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "USD",
                                "price": domain.price.replace(/[^0-9.]/g, '')
                            }
                        }))
                    }
                };
                break;

             case 'websites':
             case 'tools':
             case 'prompts':
                const pageDetails: any = getTranslationObject(`${view}.seo`);
                schema = {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "url": `${mainUrl}/${view}`,
                    "name": pageDetails.title,
                    "description": pageDetails.description,
                    "publisher": ORG_SCHEMA
                };
                break;
        }

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }

        if (schema) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema, null, 2);
            document.head.appendChild(script);
        }

        return () => {
            const scriptToRemove = document.getElementById(scriptId);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };

    }, [view, serviceId, articleId, t, language]);
};