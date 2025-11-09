import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import AnimateOnScroll from './AnimateOnScroll';

interface SeoBannerProps {
    onGetAnalysis: () => void;
}

const SeoBanner: React.FC<SeoBannerProps> = ({ onGetAnalysis }) => {
    const { t } = useTranslation();

    return (
        <section className="py-20 lg:py-24 bg-primary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll>
                    <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-light-text dark:text-dark-text font-heading uppercase">
                            {t('seo.bannerTitle')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                            {t('seo.bannerSubtitle')}
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={onGetAnalysis}
                                className="bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                {t('seo.bannerButton')}
                            </button>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
};

export default SeoBanner;