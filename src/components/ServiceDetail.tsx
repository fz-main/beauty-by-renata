import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '../data/services';
import type { Lang, Translations } from '../lib/i18n';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

interface ServiceDetailProps {
  activeService: Service;
  onBack: () => void;
  lang?: Lang;
  t: Translations;
}

export default function ServiceDetail({ activeService, onBack, lang: _lang, t }: ServiceDetailProps) {
  const srvT = t.services[activeService.id as keyof typeof t.services];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 pointer-events-auto overflow-y-auto"
      style={{ touchAction: 'pan-y' }}
    >
      <button
        onClick={onBack}
        className="fixed top-16 md:top-20 left-4 md:left-8 font-monument text-[10px] md:text-xs tracking-widest hover:text-[#e5d3b3] transition-colors z-50 flex items-center gap-3 group bg-black/60 px-3 py-2 rounded-full backdrop-blur-sm pointer-events-auto"
      >
        <span className="w-4 h-[1px] bg-white group-hover:bg-[#e5d3b3] transition-colors" />
        {t.back}
      </button>

      <div className="min-h-full px-4 md:px-16 pt-24 pb-16 flex flex-col gap-8 max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className="font-monument text-[10px] md:text-xs tracking-[0.25em] text-[#e5d3b3] mb-3">
            {srvT?.subtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-editorial mb-4 leading-[0.9]">
            {srvT?.title || activeService.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-white/10 pt-5">
            <div>
              <div className="font-monument text-[8px] text-[#a3a3a3] mb-1 tracking-widest">{t.duration}</div>
              <div className="font-editorial text-lg md:text-2xl">{activeService.time}</div>
            </div>
            <div>
              <div className="font-monument text-[8px] text-[#a3a3a3] mb-1 tracking-widest">{t.investment}</div>
              <div className="font-editorial text-lg md:text-2xl text-[#e5d3b3]">{activeService.price}</div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto mt-2 md:mt-0 md:ml-auto px-8 py-3 bg-white text-black font-monument text-[10px] tracking-widest rounded-full hover:bg-[#e5d3b3] transition-colors"
            >
              {t.reserve}
            </button>
          </div>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-panel rounded-3xl p-6 md:p-10">
          <p className="font-montreal text-base md:text-lg text-white/80 leading-relaxed">
            {srvT?.desc || activeService.desc}
          </p>
        </motion.div>

        {/* BENEFITS */}
        {activeService.benefits && activeService.benefits.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel rounded-3xl p-6 md:p-10">
            <div className="font-monument text-[10px] tracking-[0.25em] text-[#e5d3b3] mb-5">{t.benefitsTitle || 'Co vám přinese'}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeService.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#e5d3b3] mt-1 shrink-0">✦</span>
                  <span className="font-montreal text-sm text-white/70">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PROCESS */}
        {activeService.process && activeService.process.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-panel rounded-3xl p-6 md:p-10">
            <div className="font-monument text-[10px] tracking-[0.25em] text-[#e5d3b3] mb-5">{t.processTitle || 'Průběh ošetření'}</div>
            <div className="flex flex-col gap-4">
              {activeService.process.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-editorial text-sm" style={{ background: 'rgba(229,211,179,0.15)', color: '#e5d3b3' }}>
                    {i + 1}
                  </div>
                  <span className="font-montreal text-sm text-white/70 pt-1">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center py-6">
          <p className="font-montreal text-sm text-white/50 mb-4">Máte zájem o toto ošetření?</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 bg-white text-black font-monument text-[11px] tracking-widest rounded-full hover:bg-[#e5d3b3] transition-colors"
          >
            {t.reserve}
          </button>
        </motion.div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceId={activeService.id}
        serviceName={srvT?.title || activeService.title}
        durationMinutes={activeService.durationMinutes || 60}
      />

      <AnimatePresence />
    </motion.div>
  );
}
