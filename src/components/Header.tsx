import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import { Theme } from '../types';
import { NAV_LINKS } from '../constants';
import { TwfikLogo, SunIcon, MoonIcon, LightbulbIcon } from './icons';

interface HeaderProps {
    onNavClick: (id: string, type: 'section' | 'page') => void;
    currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, currentView }) => {
    const { theme, toggleTheme } = useTheme();
    const { t, language, changeLanguage } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setisLangMenuOpen] = useState(false);

    const languages = {
        en: 'EN',
        ar: 'AR',
        es: 'ES',
        fr: 'FR'
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClasses = "px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 font-heading tracking-wider uppercase";

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView !== 'main' || isMenuOpen ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse cursor-pointer" onClick={() => onNavClick('index', 'section')}>
                        <TwfikLogo className="text-primary h-8 w-8 sm:h-9 sm:w-9"/>
                        <span className="text-xl sm:text-2xl font-bold text-white font-heading tracking-wider animate-text-glow">TWFIK<span className="text-primary">.</span></span>
                        <div className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse border border-primary rounded-md px-2 py-0.5 text-xs text-primary font-semibold">
                            <span>BETA</span>
                            <LightbulbIcon className="w-3 h-3 text-primary animate-blink" />
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                        {NAV_LINKS.map(link => (
                            <button key={link.id} onClick={() => onNavClick(link.id, link.type as any)} className={navLinkClasses}>
                                {t(`nav.${link.id}`)}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                         <div className="relative">
                            <button
                                onClick={() => setisLangMenuOpen(!isLangMenuOpen)}
                                className="p-2 w-16 rounded-md text-gray-400 hover:text-white bg-gray-800/50 transition-colors duration-300 focus:outline-none font-semibold flex justify-center"
                                aria-label="Toggle language"
                            >
                                {languages[language]}
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-32 bg-dark-card rounded-md shadow-lg py-1">
                                    {Object.entries(languages).map(([langCode, langName]) => (
                                        <button
                                            key={langCode}
                                            onClick={() => {
                                                changeLanguage(langCode as any);
                                                setisLangMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-white"
                                        >
                                            {langName}
                                        </button>
                                    ))}
                                </div>
                            )}
                         </div>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors duration-300 focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            {theme === Theme.Dark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                        <button className="hidden md:block bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => onNavClick('contact', 'section')}>
                            {t('nav.getQuote')}
                        </button>
                        <div className="md:hidden">
                             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                     <div className="md:hidden pb-4">
                        <nav className="flex flex-col items-center space-y-2">
                             {NAV_LINKS.map(link => (
                                <button key={link.id} onClick={() => { onNavClick(link.id, link.type as any); setIsMenuOpen(false); }} className={navLinkClasses}>
                                    {t(`nav.${link.id}`)}
                                </button>
                            ))}
                            <button className="bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full" onClick={() => { onNavClick('contact', 'section'); setIsMenuOpen(false); }}>
                                {t('nav.getQuote')}
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;