import React, { useState } from 'react';
import { Service, ServiceDetails } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import AnimateOnScroll from './AnimateOnScroll';
import ImageLoader from './ImageLoader';

interface ServiceCardProps {
  item: Service;
  onClick: (id: number) => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onClick, index }) => {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const detailsRaw = t(`items.${item.id}`);

  if (typeof detailsRaw !== 'object' || detailsRaw === null) {
      return (
        <AnimateOnScroll delay={index * 100}>
            <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
                <p className="text-red-500 text-sm">Error: Service content failed to load.</p>
            </div>
        </AnimateOnScroll>
      );
  }
  const details = detailsRaw as ServiceDetails;


  return (
    <AnimateOnScroll delay={index * 100}>
        <div 
          className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full flex flex-col"
          onClick={() => onClick(item.id)}
        >
          <div className="relative h-48">
            {!isImageLoaded && <ImageLoader />}
            <img 
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={item.cardImage} 
                alt={details.title} 
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
            />
            <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded-full">{item.type}</div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-heading text-light-text dark:text-dark-text mb-2">{details.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{details.shortDescription}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg font-bold text-primary">{details.pricing[0].price}</span>
              <button className="text-sm font-semibold text-primary hover:text-primary-hover">{t('common.viewDetails')} &rarr;</button>
            </div>
          </div>
        </div>
    </AnimateOnScroll>
  );
};

export default React.memo(ServiceCard);