import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { experimentsData } from '../data/experiments';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export const InnovationPreview = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const previewExperiments = experimentsData.slice(0, 3);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden font-sans border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-mono text-white/50 mb-3 block">NmoLabs Innovation Labs</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {isEn ? 'We test ideas before they become products' : 'نختبر الأفكار قبل أن تصبح منتجات'}
            </h2>
            <p className="text-lg text-white/60">
              {isEn 
                ? 'From AI to automation and ecommerce analytics, we build prototypes for solutions that could change how work is done.' 
                : 'من الذكاء الاصطناعي إلى الأتمتة وتحليل التجارة الإلكترونية، نبني نماذج أولية لحلول قد تغيّر طريقة العمل.'}
            </p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewExperiments.map((exp, i) => (
            <div 
              key={exp.id}
              onClick={() => { updateConfig({ currentRoute: `innovation-lab/${exp.slug}` }); window.scrollTo(0,0); }}
              className="group relative rounded-3xl p-6 md:p-8 bg-[#0a0a0a] border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all duration-300 h-[320px] flex flex-col"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: exp.brandColor }} />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/20 bg-white/5">
                  {isEn ? 'Prototype' : 'نموذج أولي'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-all group-hover:bg-white/10">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                  {isEn ? exp.titleEn : exp.titleAr}
                </h3>
                <p className="text-sm text-white/50 line-clamp-2">
                  {isEn ? exp.summaryEn : exp.summaryAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
