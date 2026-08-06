import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { productsData } from '../data/products';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ProductsPreview = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const previewProducts = productsData.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-10 sm:py-10 md:py-10 md:py-20 bg-[#050505] relative overflow-hidden" id="products">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] to-transparent blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-12 sm:mb-10 lg:mb-20">
          <div className="max-w-2xl">
            <span className="text-[var(--color-primary)] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-4 block">NmoLabs Products</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              {isEn ? 'Products built to transform work' : 'منتجات نبنيها لتغيّر طريقة العمل'}
            </h2>
            <p className="text-base sm:text-xl text-white/60">
              {isEn ? 'From smart assistants to referral and analytics systems, we develop tools that help businesses sell, manage, and grow.' : 'من المساعدات الذكية إلى أنظمة الإحالات والتحليل، نطوّر أدوات تساعد الشركات على البيع والإدارة والنمو.'}
            </p>
          </div>
          <button 
            onClick={() => {
              updateConfig({ currentRoute: 'products' });
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
            className="group flex items-center gap-3 text-white font-bold hover:text-[var(--color-primary)] transition-colors whitespace-nowrap bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 w-full sm:w-auto justify-center"
          >
            {isEn ? 'Explore All Products' : 'استكشف جميع المنتجات'}
            {isEn ? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {previewProducts.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={product.id}
              onClick={() => {
                updateConfig({ currentRoute: `products/${product.slug}` });
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
              className={`group relative rounded-3xl p-4 sm:p-8 bg-[#111] border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col h-full ${idx === 0 ? 'col-span-2 lg:col-span-1 min-h-[220px]' : 'col-span-1 min-h-[200px]'}`}
            >
              {product.coverVisual ? (
                 <>
                   <div className="absolute inset-0 z-0">
                     <img src={product.coverVisual} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" alt={isEn ? product.titleEn : product.titleAr} />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent z-0" />
                 </>
              ) : (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0" style={{ backgroundColor: product.brandColor }} />
              )}
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-2xl text-white group-hover:scale-110 transition-all" style={{ color: product.brandColor }}>
                  {isEn ? product.shortNameEn.charAt(0) : product.shortNameAr.charAt(0)}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors group-hover:bg-white/10">
                  {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                </div>
              </div>

              <div className="relative z-10 flex-grow">
                <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all text-white" style={{ backgroundImage: `linear-gradient(to right, #fff, ${product.brandColor})` }}>
                  {isEn ? product.titleEn : product.titleAr}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 line-clamp-3 text-xs sm:text-base">
                  {isEn ? product.summaryEn : product.summaryAr}
                </p>
              </div>
              
              <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                <span className="text-sm font-bold text-white/40">{product.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
