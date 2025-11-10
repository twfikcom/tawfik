import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import AnimateOnScroll from '../components/AnimateOnScroll';
import FaqSection from '../components/FaqSection';
import { QuestionAnswer } from '../types';
import { ShoulderMeasurementIcon, WaistMeasurementIcon, ThighMeasurementIcon } from '../components/icons';

interface BodyWeightCalculatorPageProps {
  onBack: () => void;
}

const BodyWeightCalculatorPage: React.FC<BodyWeightCalculatorPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [waist, setWaist] = useState('');
  const [thigh, setThigh] = useState('');

  const [result, setResult] = useState<{ weight: string; bodyType: string; bellyStatus: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const tSafe = (key: string) => t(key) as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const height_cm = parseFloat(height);
    const shoulder_cm = parseFloat(shoulder);
    const waist_cm = parseFloat(waist);
    const thigh_cm = thigh ? parseFloat(thigh) : null;

    if (!height || !shoulder || !waist) {
      setError(tSafe('bodyWeightCalculator.form.error.incomplete'));
      return;
    }
    if (isNaN(height_cm) || isNaN(shoulder_cm) || isNaN(waist_cm) || (thigh_cm !== null && isNaN(thigh_cm))) {
      setError(tSafe('bodyWeightCalculator.form.error.invalid'));
      return;
    }
     if (height_cm <= 0 || shoulder_cm <= 0 || waist_cm <= 0 || (thigh_cm !== null && thigh_cm <= 0)) {
        setError(tSafe('bodyWeightCalculator.form.error.invalid'));
        return;
    }

    // Algorithm IdealBodyEstimator
    const height_m = height_cm / 100;
    const R1 = shoulder_cm / waist_cm;

    let body_type: string;
    let body_factor: number;
    if (R1 >= 2.4) {
        body_type = "Athletic";
        body_factor = +0.05;
    } else if (R1 >= 1.7 && R1 < 2.4) {
        body_type = "Balanced";
        body_factor = 0;
    } else {
        body_type = "Fatty";
        body_factor = -0.07;
    }

    const gender_correction = gender === "female" ? 0.03 * height_cm : 0.02 * height_cm;

    const BI = thigh_cm ? waist_cm / ((shoulder_cm + thigh_cm) / 2) : waist_cm / shoulder_cm;
    let belly_status: string;
    if (BI > 0.65) {
        belly_status = "Visible belly";
    } else if (BI >= 0.55 && BI <= 0.65) {
        belly_status = "Slight belly";
    } else {
        belly_status = "Flat or toned belly";
    }

    const base_weight = 22 * (height_m ** 2);
    const adjusted_weight = base_weight * (1 + body_factor);
    const final_weight = adjusted_weight + (gender_correction / 10);
    
    setResult({
        weight: `${final_weight.toFixed(1)} kg`,
        bodyType: body_type,
        bellyStatus: belly_status,
    });
  };

  const pageContentRaw = t('bodyWeightCalculator');
  const pageContent = (typeof pageContentRaw === 'object' && pageContentRaw !== null ? pageContentRaw : {}) as any;

  return (
    <div className="animate-fade-in-up pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-primary font-semibold mb-8">&larr; {tSafe('common.backToService')}</button>
        <AnimateOnScroll className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading uppercase">{pageContent.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{pageContent.subtitle}</p>
        </AnimateOnScroll>
        
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
                 <AnimateOnScroll delay={100}>
                    <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{tSafe('bodyWeightCalculator.form.gender.label')}</label>
                                    <div className="flex rounded-lg shadow-sm">
                                        <button type="button" onClick={() => setGender('male')} className={`w-full px-4 py-2 rounded-l-lg transition-colors ${gender === 'male' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{tSafe('bodyWeightCalculator.form.gender.male')}</button>
                                        <button type="button" onClick={() => setGender('female')} className={`w-full px-4 py-2 rounded-r-lg transition-colors ${gender === 'female' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{tSafe('bodyWeightCalculator.form.gender.female')}</button>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                     <div>
                                        <label htmlFor="height" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{tSafe('bodyWeightCalculator.form.height')}</label>
                                        <input type="number" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder={tSafe('bodyWeightCalculator.form.heightPlaceholder')} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                    </div>
                                    <div>
                                        <label htmlFor="shoulder" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{tSafe('bodyWeightCalculator.form.shoulder')}</label>
                                        <input type="number" name="shoulder" id="shoulder" value={shoulder} onChange={(e) => setShoulder(e.target.value)} required placeholder={tSafe('bodyWeightCalculator.form.shoulderPlaceholder')} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                    </div>
                                </div>
                               <div className="grid sm:grid-cols-2 gap-4">
                                     <div>
                                        <label htmlFor="waist" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{tSafe('bodyWeightCalculator.form.waist')}</label>
                                        <input type="number" name="waist" id="waist" value={waist} onChange={(e) => setWaist(e.target.value)} required placeholder={tSafe('bodyWeightCalculator.form.waistPlaceholder')} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                    </div>
                                    <div>
                                        <label htmlFor="thigh" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{tSafe('bodyWeightCalculator.form.thigh')}</label>
                                        <input type="number" name="thigh" id="thigh" value={thigh} onChange={(e) => setThigh(e.target.value)} placeholder={tSafe('bodyWeightCalculator.form.thighPlaceholder')} className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                    </div>
                               </div>
                            </div>
                            <button type="submit" className="w-full mt-6 bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                                {tSafe('bodyWeightCalculator.form.submit')}
                            </button>
                        </form>
                        
                        {(result || error) && (
                            <AnimateOnScroll className="mt-8 text-center p-4 rounded-lg bg-gray-200 dark:bg-gray-700/50">
                                {error && <p className="text-red-500 font-bold text-lg">{error}</p>}
                                {result && (
                                    <div>
                                        <h3 className="text-xl font-bold font-heading mb-4">{tSafe('bodyWeightCalculator.result.title')}</h3>
                                        <div className="space-y-2 text-left rtl:text-right">
                                            <div className="flex justify-between items-baseline"><span className="font-semibold">{tSafe('bodyWeightCalculator.result.idealWeight')}:</span><span className="text-primary font-bold text-xl">{result.weight}</span></div>
                                            <div className="flex justify-between items-baseline"><span className="font-semibold">{tSafe('bodyWeightCalculator.result.bodyType')}:</span><span className="font-medium">{result.bodyType}</span></div>
                                            <div className="flex justify-between items-baseline"><span className="font-semibold">{tSafe('bodyWeightCalculator.result.bellyStatus')}:</span><span className="font-medium">{result.bellyStatus}</span></div>
                                        </div>
                                    </div>
                                )}
                            </AnimateOnScroll>
                        )}
                    </div>
                </AnimateOnScroll>
            </div>

            <div className="lg:col-span-2">
                <AnimateOnScroll delay={200}>
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold font-heading">{tSafe('bodyWeightCalculator.measurementGuide.title')}</h3>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <ShoulderMeasurementIcon className="w-16 h-16 flex-shrink-0 text-primary" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tSafe('bodyWeightCalculator.measurementGuide.shoulder')}</p>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <WaistMeasurementIcon className="w-16 h-16 flex-shrink-0 text-primary" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tSafe('bodyWeightCalculator.measurementGuide.waist')}</p>
                        </div>
                         <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <ThighMeasurementIcon className="w-16 h-16 flex-shrink-0 text-primary" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tSafe('bodyWeightCalculator.measurementGuide.thigh')}</p>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </div>

        <AnimateOnScroll delay={300} className="max-w-4xl mx-auto mt-16">
            <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold font-heading text-center mb-4">{tSafe('bodyWeightCalculator.howItWorks.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">{tSafe('bodyWeightCalculator.howItWorks.content')}</p>
            </div>
        </AnimateOnScroll>

        {pageContent.faq && pageContent.faq.length > 0 && (
          <AnimateOnScroll delay={400} className="max-w-4xl mx-auto mt-16">
            <FaqSection faq={pageContent.faq} />
          </AnimateOnScroll>
        )}

        <AnimateOnScroll delay={500} className="max-w-4xl mx-auto mt-16">
             <div className="bg-primary/10 dark:bg-dark-card/50 p-8 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold font-heading mb-2">{tSafe('bodyWeightCalculator.purchase.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">{tSafe('bodyWeightCalculator.purchase.subtitle')}</p>
                <button onClick={onBack} className="bg-primary hover:bg-primary-hover dark:bg-white dark:hover:bg-gray-200 text-white dark:text-dark-bg font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                    {tSafe('bodyWeightCalculator.purchase.button')}
                </button>
            </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default BodyWeightCalculatorPage;
