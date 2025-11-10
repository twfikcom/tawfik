import React, { useState, useRef, createRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import Footer from './components/Footer';
import SeoBanner from './components/SeoBanner';
import WebsitesPage from './pages/WebsitesPage';
import ToolsPage from './pages/ToolsPage';
import PromptsPage from './pages/PromptsPage';
import SeoPage from './pages/SeoPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import BodyWeightCalculatorPage from './pages/BodyWeightCalculatorPage';
import DomainsPage from './pages/DomainsPage';
import DomainListing from './components/DomainListing';
import Modal from './components/Modal';
import DomainInquiryForm from './components/DomainInquiryForm';
import Loader from './components/Loader';
import AnimateOnScroll from './components/AnimateOnScroll';
import AnimatedBackground from './components/AnimatedBackground';
import { useSeo } from './hooks/useSeo';
import { useSchema } from './hooks/useSchema';
import { NAV_LINKS, SERVICES, ARTICLES, DOMAINS } from './constants';
import { useTranslation } from './hooks/useTranslation';
import { LightbulbIcon, ToolsIcon, BrowserIcon, GlobeIcon } from './components/icons';

type View = 'main' | 'websites' | 'tools' | 'prompts' | 'domains' | 'seo' | 'serviceDetail' | 'about' | 'blog' | 'articleDetail' | 'bodyWeightCalculator';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiredDomain, setInquiredDomain] = useState<string | null>(null);
  const { t } = useTranslation();
  const [view, setView] = useState<View>('main');

  useSeo({ view, serviceId: currentServiceId, articleId: currentArticleId });
  useSchema({ view, serviceId: currentServiceId, articleId: currentArticleId });
  
  useEffect(() => {
      const handleLoad = () => {
          setTimeout(() => setLoading(false), 500); 
      };

      if (document.readyState === 'complete') {
          handleLoad();
      } else {
          window.addEventListener('load', handleLoad);
          const fallback = setTimeout(() => {
              handleLoad();
          }, 3000);

          return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(fallback);
          }
      }
  }, []);

  const sectionRefs = useRef(NAV_LINKS.reduce((acc, value) => {
    if (value.type === 'section') {
      acc[value.id] = createRef<HTMLDivElement>();
    }
    return acc;
  }, {} as { [key: string]: React.RefObject<HTMLDivElement> }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, currentServiceId, currentArticleId]);
  
  const handleDomainInquire = useCallback((domainName: string) => {
    setInquiredDomain(domainName);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setInquiredDomain(null);
  };

  const navigateToService = useCallback((id: number) => {
    setCurrentServiceId(id);
    setView('serviceDetail');
  }, []);

  const navigateToArticle = useCallback((id: string) => {
    setCurrentArticleId(id);
    setView('articleDetail');
  }, []);

  const handleNavigateToCalculator = useCallback(() => {
      setView('bodyWeightCalculator');
  }, []);
  
  const handleBackToMain = useCallback(() => {
    setView('main');
    setCurrentServiceId(null);
    setCurrentArticleId(null);
  }, []);
  
  const handleBackToCategory = useCallback((category: 'websites' | 'tools' | 'prompts') => {
      setView(category);
      setCurrentServiceId(null);
  }, []);

  const handleBackToBlog = useCallback(() => {
    setView('blog');
    setCurrentArticleId(null);
  }, []);

  const handleNavClick = useCallback((id: string, type: 'section' | 'page') => {
    setCurrentServiceId(null);
    setCurrentArticleId(null);

    if (type === 'page') {
      setView(id as View);
    } else {
      if (view !== 'main') {
        setView('main');
        setTimeout(() => {
          sectionRefs.current[id]?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      } else {
        sectionRefs.current[id]?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
     if (id === 'index') {
        setView('main');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'serviceDetail':
        const service = SERVICES.find(s => s.id === currentServiceId);
        if (!service) return null;
        return <ServiceDetailsPage service={service} onBack={() => handleBackToCategory(service.category)} onNavigateToCalculator={handleNavigateToCalculator} />;
      case 'articleDetail':
        const article = ARTICLES.find(a => a.id === currentArticleId);
        if (!article) return null;
        return <ArticlePage article={article} onBack={handleBackToBlog} />;
      case 'bodyWeightCalculator':
        return <BodyWeightCalculatorPage onBack={() => navigateToService(4)} />;
      case 'websites':
        return <WebsitesPage onBack={handleBackToMain} onItemClick={navigateToService} />;
      case 'tools':
        return <ToolsPage onBack={handleBackToMain} onItemClick={navigateToService} />;
      case 'prompts':
        return <PromptsPage onBack={handleBackToMain} onItemClick={navigateToService} />;
      case 'domains':
        return <DomainsPage onBack={handleBackToMain} onDomainInquire={handleDomainInquire} />;
      case 'seo':
        return <SeoPage onBack={handleBackToMain} />;
      case 'about':
        return <AboutPage onBack={handleBackToMain} />;
      case 'blog':
        return <BlogPage onBack={handleBackToMain} onArticleClick={navigateToArticle} />;
      case 'main':
      default:
        return (
          <main>
            {/* Home Section */}
            <section
                ref={sectionRefs.current.index}
                className="relative bg-dark-bg text-white min-h-screen flex items-center justify-center text-center overflow-hidden"
            >
                <div className="absolute inset-0 bg-black"></div>
                <div className="z-10 px-4 flex flex-col items-center">
                    <AnimateOnScroll>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white uppercase tracking-tighter leading-tight" style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}>
                            <div>{t('home.title.line1')}</div>
                            <div className="text-primary animate-text-glow">{t('home.title.line2')}</div>
                        </h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={200}>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6">
                           {t('home.subtitle')}
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={400}>
                        <div className="mt-12 flex justify-center items-start space-x-6 md:space-x-12 lg:space-x-16 rtl:space-x-reverse">
                            <div
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => handleNavClick('websites', 'section')}
                            >
                                <BrowserIcon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
                                <span className="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">{t('nav.websites')}</span>
                            </div>
                            <div
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => handleNavClick('domains', 'section')}
                            >
                                <GlobeIcon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
                                <span className="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">{t('nav.domains')}</span>
                            </div>
                            <div
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => setView('tools')}
                            >
                                <ToolsIcon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
                                <span className="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">{t('nav.tools')}</span>
                            </div>
                            <div
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => setView('prompts')}
                            >
                                <LightbulbIcon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
                                <span className="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">{t('nav.prompts')}</span>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Websites Section */}
            <section 
              ref={sectionRefs.current.websites}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <AnimateOnScroll className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{t('websites.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('websites.subtitle')}</p>
                    </AnimateOnScroll>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {SERVICES.filter(s => s.category === 'websites').slice(0, 3).map((item, index) => 
                          <ServiceCard key={item.id} item={item} onClick={navigateToService} index={index} />
                        )}
                    </div>
                    <AnimateOnScroll className="text-center">
                        <button onClick={() => setView('websites')} className="bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-8 rounded-lg transition-colors duration-300">{t('common.viewAll')}</button>
                    </AnimateOnScroll>
                </div>
            </section>
            
            {/* Domains Section */}
            <section ref={sectionRefs.current.domains} className="bg-light-bg dark:bg-dark-card/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <AnimateOnScroll className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{t('domains.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('domains.subtitle')}</p>
                    </AnimateOnScroll>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {DOMAINS.slice(0, 3).map((domain, index) => 
                            <DomainListing key={domain.id} domain={domain} onInquire={handleDomainInquire} index={index} />
                        )}
                    </div>
                    <AnimateOnScroll className="text-center">
                        <button onClick={() => setView('domains')} className="bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-8 rounded-lg transition-colors duration-300">{t('common.viewAll')}</button>
                    </AnimateOnScroll>
                </div>
            </section>


            {/* Other Services Section */}
            <section>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <AnimateOnScroll className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{t('home.otherServices.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('home.otherServices.subtitle')}</p>
                    </AnimateOnScroll>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <AnimateOnScroll delay={0}>
                            <div onClick={() => setView('tools')} className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg h-full text-center transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center">
                                <ToolsIcon className="w-12 h-12 text-primary mb-4"/>
                                <h3 className="text-2xl font-bold font-heading mb-2">{t('tools.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('tools.subtitle')}</p>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={100}>
                            <div onClick={() => setView('prompts')} className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg h-full text-center transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center">
                                <LightbulbIcon className="w-12 h-12 text-primary mb-4"/>
                                <h3 className="text-2xl font-bold font-heading mb-2">{t('prompts.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('prompts.subtitle')}</p>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
            
            {/* SEO Banner Section */}
            <SeoBanner onGetAnalysis={() => setView('seo')} />

            {/* Contact Section */}
            <section ref={sectionRefs.current.contact} className="py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{t('contact.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                    </AnimateOnScroll>
                    <AnimateOnScroll className="max-w-4xl mx-auto">
                        <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-center font-heading">{t('contact.form.title')}</h3>
                            <form action="https://formspree.io/f/xblpnbep" method="POST">
                                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.name')}</label>
                                        <input type="text" name="name" id="name" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.email')}</label>
                                        <input type="email" name="email" id="email" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.phone')}</label>
                                    <input type="tel" name="phone" id="phone" required placeholder={t('contact.form.phonePlaceholder') as string} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.message')}</label>
                                    <textarea name="message" id="message" rows={4} required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-4 rounded-lg transition-colors duration-300">{t('contact.form.submit')}</button>
                            </form>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col">
      <AnimatedBackground />
      <Loader loading={loading} />
      <Header onNavClick={handleNavClick} currentView={view} />
      <div className="flex-grow">
        {renderContent()}
      </div>
      <Footer onNavClick={(id, type) => handleNavClick(id, type)} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {inquiredDomain && <DomainInquiryForm domainName={inquiredDomain} />}
      </Modal>
    </div>
  );
};

export default App;