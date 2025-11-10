import React, { useState } from 'react';
import { Article, ArticleDetails } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import AnimateOnScroll from './AnimateOnScroll';
import ImageLoader from './ImageLoader';

interface ArticleCardProps {
  article: Article;
  onClick: (id: string) => void;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, index }) => {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const detailsRaw = t(`articles.${article.id}`);

  if (typeof detailsRaw !== 'object' || detailsRaw === null) {
    return (
      <AnimateOnScroll delay={index * 100}>
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
          <p className="text-red-500 text-sm">Error: Article content failed to load.</p>
        </div>
      </AnimateOnScroll>
    );
  }
  const details = detailsRaw as ArticleDetails;

  return (
    <AnimateOnScroll delay={index * 100}>
        <div 
          className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col"
        >
          <div className="relative h-56">
            {!isImageLoaded && <ImageLoader />}
            <img 
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={article.image} 
              alt={details.title} 
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-heading text-light-text dark:text-dark-text mb-2 line-clamp-2">{details.title}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>By {article.author}</span> &bull; <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{details.excerpt}</p>
            <button onClick={() => onClick(article.id)} className="text-sm font-semibold text-primary hover:text-primary-hover mt-auto self-start">
                {t('blog.readMore')} &rarr;
            </button>
          </div>
        </div>
    </AnimateOnScroll>
  );
};

export default React.memo(ArticleCard);