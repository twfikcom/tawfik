import React from 'react';
import { Domain } from '../types';
import AnimateOnScroll from './AnimateOnScroll';
import { useTranslation } from '../hooks/useTranslation';

interface DomainListingProps {
  domain: Domain;
  onInquire: (domainName: string) => void;
  index: number;
}

const DomainListing: React.FC<DomainListingProps> = ({ domain, onInquire, index }) => {
  const { t } = useTranslation();
  return (
    <AnimateOnScroll delay={index * 100}>
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-6 h-full flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold font-heading text-light-text dark:text-dark-text mb-2 break-all">{domain.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{domain.tagline}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {domain.keywords.map(keyword => (
              <span key={keyword} className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">{keyword}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-primary">{domain.price}</span>
          <button onClick={() => onInquire(domain.name)} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            {t('domains.inquire')}
          </button>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

export default DomainListing;