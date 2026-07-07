import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import type { Service } from '../data/services';
import type { Translations } from '../lib/i18n';

interface Props {
  t: Translations;
  onServiceClick: (service: Service) => void;
  onBack: () => void;
}

const ALL_CATEGORIES = [{ id: 'all', title: 'Všechny služby' }, ...SERVICE_CATEGORIES];

export default function ServicesCatalog({ t, onServiceClick, onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filterCategory = hoveredCategory || activeCategory;

  const filteredServices = filterCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === filterCategory);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId === activeCategory ? 'all' : catId);
    setExpandedId(null);
  };

  const handleServiceClick = (service: Service) => {
    if (expandedId === service.id) {
      setExpandedId(null);
    } else {
      setExpandedId(service.id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden" style={{ background: '#0B0B0B' }}>
      {/* Mobile: horizontal category scroll */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-3 shrink-0" style={{ scrollbarWidth: 'none' }}>
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-monument tracking-wider transition-all whitespace-nowrap"
            style={{
              background: activeCategory === cat.id ? '#FFDE00' : '#161616',
              color: activeCategory === cat.id ? '#000' : '#888',
              border: `1px solid ${activeCategory === cat.id ? '#FFDE00' : '#333'}`,
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Desktop: left sidebar categories */}
      <div className="hidden lg:flex flex-col w-[25%] shrink-0 border-r border-white/10 py-6 px-4">
        <div className="font-monument text-[9px] tracking-[0.3em] text-[#FFDE00] mb-6 px-3">KATEGORIE</div>
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            onMouseEnter={() => setHoveredCategory(cat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="text-left px-3 py-3 rounded-lg text-sm font-montreal transition-all mb-1"
            style={{
              color: activeCategory === cat.id ? '#FFDE00' : hoveredCategory === cat.id ? '#fff' : '#888',
              background: activeCategory === cat.id ? 'rgba(255,222,0,0.08)' : 'transparent',
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Right: services grid */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredServices.map(service => {
            const isExpanded = expandedId === service.id;
            const isDimmed = filterCategory !== 'all' && service.category !== filterCategory;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => handleServiceClick(service)}
                className="cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: isExpanded ? '#FFDE00' : '#161616',
                  opacity: isDimmed ? 0.2 : 1,
                  border: `1px solid ${isExpanded ? '#FFDE00' : filterCategory !== 'all' && service.category === filterCategory ? '#FFDE00' : '#222'}`,
                }}
                whileHover={!isExpanded ? { background: '#FFDE00', color: '#000' } : {}}
              >
                <div className="p-4">
                  {!isExpanded ? (
                    <>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-editorial text-base md:text-lg leading-tight" style={{ color: '#fff' }}>
                          {t.services[service.id as keyof typeof t.services]?.title || service.title}
                        </h3>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs font-montreal" style={{ color: '#888' }}>{service.time}</span>
                        <span className="text-sm font-monument" style={{ color: '#FFDE00' }}>{service.price}</span>
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-editorial text-lg mb-2" style={{ color: '#000' }}>
                        {t.services[service.id as keyof typeof t.services]?.title || service.title}
                      </h3>
                      <p className="text-xs font-montreal mb-3 leading-relaxed" style={{ color: '#333' }}>
                        {t.services[service.id as keyof typeof t.services]?.desc || service.desc}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-montreal" style={{ color: '#555' }}>{service.time}</span>
                        <span className="text-sm font-monument" style={{ color: '#000' }}>{service.price}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onServiceClick(service); }}
                        className="w-full py-2.5 rounded-lg font-monument text-[10px] tracking-widest transition-colors"
                        style={{ background: '#000', color: '#FFDE00' }}
                      >
                        REZERVOVAT
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
