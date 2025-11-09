import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface SeoPageProps {
  onBack: () => void;
}

const SeoPage: React.FC<SeoPageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in-up pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {t('common.backToHome')}</button>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">{t('seo.pageTitle')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('seo.pageSubtitle')}</p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
            <form action="https://formspree.io/f/xblpnbep" method="POST">
                <input type="hidden" name="_subject" value="New SEO Analysis Request!" />
                <div className="mb-4">
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('seo.form.keywords')}</label>
                    <input type="text" name="keywords" id="keywords" required placeholder={t('seo.form.keywordsPlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('seo.form.website')}</label>
                    <input type="url" name="website" id="website" placeholder={t('seo.form.websitePlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.email')}</label>
                        <input type="email" name="email" id="email" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('seo.form.phone')}</label>
                        <input type="tel" name="phone" id="phone" required placeholder={t('seo.form.phonePlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-4 rounded-lg transition-colors duration-300">{t('contact.form.submit')}</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SeoPage;