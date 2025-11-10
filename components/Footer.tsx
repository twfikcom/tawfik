import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { TwfikLogo, TwitterIcon, LinkedInIcon } from './icons';

interface FooterProps {
    onNavClick: (id: string, type: 'section' | 'page') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
    const { t } = useTranslation();

    return (
        <footer className="bg-dark-bg text-gray-400 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                            <TwfikLogo className="text-primary h-8 w-8"/>
                            <span className="text-xl font-bold text-white">TWFIK</span>
                        </div>
                        <p className="max-w-xs text-gray-500">{t('footer.description')}</p>
                        <div className="flex space-x-4 rtl:space-x-reverse mt-6">
                            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary transition-colors">
                                <TwitterIcon className="h-6 w-6" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-primary transition-colors">
                                <LinkedInIcon className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{t('footer.quickLinks')}</h3>
                        <ul className="mt-4 space-y-4">
                            <li><button onClick={() => onNavClick('websites', 'section')} className="hover:text-primary transition-colors">{t('nav.websites')}</button></li>
                            <li><button onClick={() => onNavClick('tools', 'section')} className="hover:text-primary transition-colors">{t('nav.tools')}</button></li>
                             <li><button onClick={() => onNavClick('blog', 'page')} className="hover:text-primary transition-colors">{t('nav.blog')}</button></li>
                            <li><button onClick={() => onNavClick('about', 'page')} className="hover:text-primary transition-colors">{t('nav.about')}</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{t('footer.legal')}</h3>
                         <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
