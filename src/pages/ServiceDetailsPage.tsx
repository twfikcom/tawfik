import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Service, ServiceDetails } from '../types';
import { WhatsappIcon } from '../components/icons';
import FaqSection from '../components/FaqSection';
import AnimateOnScroll from '../components/AnimateOnScroll';

interface ServiceDetailsPageProps {
  service: Service;
  onBack: () => void;
  onNavigateToCalculator?: () => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ service, onBack, onNavigateToCalculator }) => {
  const { t } = useTranslation();
  const detailsRaw = t(`items.${service.id}`);
  const isCalculatorTool = service.id === 4;

  // Guard against missing translations to prevent app crash
  if (typeof detailsRaw !== 'object' || detailsRaw === null) {
    return (
        <div className="animate-fade-in pt-32 pb-20 text-center container mx-auto">
            <p className="text-red-500">Error: The details for this service could not be loaded.</p>
            <button onClick={onBack} className="text-primary font-semibold mt-4">&larr; Go Back</button>
        </div>
    );
  }
  const details = detailsRaw as ServiceDetails;
  
  const isWebsiteService = service.type === 'Website';
  const hasGallery = !isWebsiteService && details.gallery && Array.isArray(details.gallery) && details.gallery.length > 0;
  
  const [currentImage, setCurrentImage] = useState(service.cardImage);

  useEffect(() => {
    const initialImage = hasGallery ? details.gallery[0] : service.cardImage;
    setCurrentImage(initialImage);
  }, [service, details, hasGallery]);

  const categoryTranslations = {
      websites: t('nav.websites'),
      tools: t('nav.tools'),
      prompts: t('nav.prompts'),
  };

  const backToCategoryText = t('common.backToCategory').toString().replace('{category}', categoryTranslations[service.category] as string);


  return (
    <div className="animate-fade-in pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {backToCategoryText}</button>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-3">
            <AnimateOnScroll className="mb-8">
                <img src={currentImage} alt={details.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-4"/>
                {hasGallery && (
                  <div className="grid grid-cols-4 gap-2">
                      {details.gallery.map((img, index) => (
                          <button key={index} onClick={() => setCurrentImage(img)}>
                              <img src={img} alt={`${details.title} thumbnail ${index + 1}`} className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 ${currentImage === img ? 'border-primary' : 'border-transparent'}`}/>
                          </button>
                      ))}
                  </div>
                )}
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading uppercase">{details.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{details.longDescription}</p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 font-heading">{t('servicePage.whatYouGet')}</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  {details.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 me-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span>{feature}</span>
                      </li>
                  ))}
              </ul>
            </AnimateOnScroll>

            {details.faq && details.faq.length > 0 && <AnimateOnScroll delay={300}><FaqSection faq={details.faq} /></AnimateOnScroll>}

          </div>

          {/* Right Column: Pricing & Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <AnimateOnScroll>
                <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
                    <div className="mb-6">
                        {details.pricing.map((p, index) => (
                            <div key={index} className="flex justify-between items-baseline mb-2">
                                <span className="text-lg text-gray-500 dark:text-gray-400">{p.type}</span>
                                <span className="text-2xl font-bold text-primary font-heading">{p.price}</span>
                            </div>
                        ))}
                    </div>

                    { (isCalculatorTool || service.previewUrl) &&
                        <>
                            {isCalculatorTool ? (
                                <button onClick={onNavigateToCalculator} className="w-full text-center block bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 font-bold py-3 px-6 rounded-lg transition-colors duration-300 mb-4">
                                    {t('servicePage.livePreview')}
                                </button>
                            ) : (
                                <a href={service.previewUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 font-bold py-3 px-6 rounded-lg transition-colors duration-300 mb-4">
                                    {t('servicePage.livePreview')}
                                </a>
                            )}
                        </>
                    }

                    <h3 className="text-xl font-bold mb-4 text-center font-heading">{t('servicePage.orderNow')}</h3>

                    <form action={service.formspreeEndpoint} method="POST">
                        <input type="hidden" name="_subject" value={`New Inquiry for: ${details.title}`} />
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('servicePage.form.name')}</label>
                            <input type="text" name="name" id="name" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('servicePage.form.email')}</label>
                            <input type="email" name="email" id="email" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                         <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('servicePage.form.phone')}</label>
                            <input type="tel" name="phone" id="phone" required placeholder={t('servicePage.form.phonePlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="details" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('servicePage.form.details')}</label>
                            <textarea name="details" id="details" rows={3} placeholder={t('servicePage.form.detailsPlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-3">{t('servicePage.form.submit')}</button>
                    </form>

                    <div className="text-center my-4 text-gray-500 dark:text-gray-400 text-sm">OR</div>

                    <a href="https://wa.me/201010373331" target="_blank" rel="noopener noreferrer" className="w-full text-center inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                        <WhatsappIcon className="w-5 h-5 me-2"/>
                        {t('servicePage.contactViaWhatsapp')}
                    </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;