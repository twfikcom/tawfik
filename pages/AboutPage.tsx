import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in-up pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {t('common.backToHome')}</button>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('about.title')}</h1>
          <p className="text-xl text-primary font-semibold mb-8">{t('about.subtitle')}</p>
          <div className="prose prose-lg dark:prose-invert mx-auto text-left">
            <p>{t('about.content')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
