import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Article, ArticleDetails } from '../types';
import AnimateOnScroll from '../components/AnimateOnScroll';
import FaqSection from '../components/FaqSection';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => {
  const { t } = useTranslation();
  const detailsRaw = t(`articles.${article.id}`);

  if (typeof detailsRaw !== 'object' || detailsRaw === null) {
    return (
      <div className="animate-fade-in pt-32 pb-20 text-center container mx-auto">
        <p className="text-red-500">Error: The content for this article could not be loaded.</p>
        <button onClick={onBack} className="text-primary font-semibold mt-4">&larr; {t('blog.backToBlog')}</button>
      </div>
    );
  }
  const details = detailsRaw as ArticleDetails;

  return (
    <div className="animate-fade-in pt-20">
        <div className="w-full h-64 md:h-96 overflow-hidden">
            <img src={article.image} alt={details.title} className="w-full h-full object-cover"/>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {t('blog.backToBlog')}</button>
                
                <AnimateOnScroll>
                    <article>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-heading uppercase">{details.title}</h1>
                        <div className="text-md text-gray-500 dark:text-gray-400 mb-8">
                            <span>By {article.author}</span> &bull; <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {details.content.split(/\\n\\s*\\n/).map((paragraph, index) => (
                            <p key={index}>{paragraph.replace(/\\n/g, ' ')}</p>
                            ))}
                        </div>
                    </article>
                </AnimateOnScroll>

                {details.faq && details.faq.length > 0 && (
                  <AnimateOnScroll delay={200} className="mt-16">
                    <FaqSection faq={details.faq} />
                  </AnimateOnScroll>
                )}
            </div>
        </div>
    </div>
  );
};

export default ArticlePage;