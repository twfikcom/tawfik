import { useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { ServiceDetails, ArticleDetails } from '../types';

interface SeoProps {
    view: string;
    serviceId?: number | null;
    articleId?: string | null;
}

export const useSeo = ({ view, serviceId, articleId }: SeoProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        let seoData: any;

        if (view === 'serviceDetail' && serviceId) {
            const itemDetails = t(`items.${serviceId}`) as ServiceDetails;
            seoData = itemDetails?.seo;
        } else if (view === 'articleDetail' && articleId) {
            const articleDetails = t(`articles.${articleId}`) as ArticleDetails;
            seoData = articleDetails?.seo;
        } else {
            const seoKey = view === 'main' ? 'home' : view;
            seoData = t(`${seoKey}.seo`) as any;
        }

        if (seoData && typeof seoData === 'object' && seoData.title) {
            document.title = seoData.title;

            const descriptionTag = document.querySelector('meta[name="description"]');
            if (descriptionTag) {
                descriptionTag.setAttribute('content', seoData.description || '');
            }

            const keywordsTag = document.querySelector('meta[name="keywords"]');
            if (keywordsTag) {
                keywordsTag.setAttribute('content', seoData.keywords || '');
            }
        } else {
             const defaultSeo = t('home.seo') as any;
             document.title = defaultSeo.title || 'TWFIK Digital Services';
             const descriptionTag = document.querySelector('meta[name="description"]');
            if (descriptionTag) {
                descriptionTag.setAttribute('content', defaultSeo.description || '');
            }
             const keywordsTag = document.querySelector('meta[name="keywords"]');
            if (keywordsTag) {
                keywordsTag.setAttribute('content', defaultSeo.keywords || '');
            }
        }

    }, [view, serviceId, articleId, t]);
};