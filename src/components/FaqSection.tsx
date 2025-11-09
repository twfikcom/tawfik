import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { QuestionAnswer } from '../types';

interface FaqSectionProps {
  faq: QuestionAnswer[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ faq }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const scriptId = 'faq-schema';
    // Remove existing script to prevent duplicates on re-render
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create new script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faq]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">{t('servicePage.faqTitle')}</h2>
      <div className="space-y-4">
        {faq.map((item, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left py-4"
            >
              <span className="font-semibold text-lg">{item.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className="py-4 text-gray-600 dark:text-gray-400">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;