import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface DomainInquiryFormProps {
  domainName: string;
}

const DomainInquiryForm: React.FC<DomainInquiryFormProps> = ({ domainName }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-2xl font-bold font-heading mb-2">{t('domains.inquiry.title')}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {t('domains.inquiry.subtitle')} <span className="font-bold text-primary">{domainName}</span>
      </p>
      <form action="https://formspree.io/f/xblpnbep" method="POST">
        <input type="hidden" name="_subject" value={`Domain Inquiry: ${domainName}`} />
        <input type="hidden" name="domain_name" value={domainName} />

        <div className="mb-4">
            <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.name')}</label>
            <input type="text" name="name" id="inquiry-name" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="mb-6">
            <label htmlFor="inquiry-email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.form.email')}</label>
            <input type="email" name="email" id="inquiry-email" required className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-4 rounded-lg transition-colors duration-300">
          {t('domains.inquiry.submit')}
        </button>
      </form>
    </div>
  );
};

export default DomainInquiryForm;