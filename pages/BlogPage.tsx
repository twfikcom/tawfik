import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ARTICLES } from '../constants';
import ArticleCard from '../components/ArticleCard';
import AnimateOnScroll from '../components/AnimateOnScroll';

interface BlogPageProps {
  onBack: () => void;
  onArticleClick: (id: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onArticleClick }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {t('common.backToHome')}</button>
        <AnimateOnScroll className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{t('blog.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => <ArticleCard key={article.id} article={article} onClick={onArticleClick} index={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;