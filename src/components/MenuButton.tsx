import { motion } from 'framer-motion';
import type { Service } from '../data/services';
import type { Translations } from '../lib/i18n';

interface MenuButtonProps {
  service: Service;
  translatedTitle?: string;
  translatedSubtitle?: string;
  onClick: () => void;
  enterLabel?: string;
}

export default function MenuButton({ service, translatedTitle, translatedSubtitle, onClick, enterLabel = '[ ENTER ]' }: MenuButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex flex-col items-center pointer-events-auto"
      whileHover="hover"
      style={{ flex: '1 1 auto', minWidth: '120px', maxWidth: '220px' }}
    >
      <motion.div
        variants={{ hover: { scale: 1.05, color: '#e5d3b3', transition: { duration: 0.3 } } }}
        className="font-editorial text-base sm:text-lg md:text-xl lg:text-2xl italic text-center text-white drop-shadow-2xl"
      >
        {translatedTitle || service.shortTitle}
      </motion.div>
      <motion.div
        variants={{ hover: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
        initial={{ opacity: 0, y: 10 }}
        className="font-montreal text-[9px] md:text-[10px] text-white/50 text-center mt-1 max-w-[180px] leading-tight"
      >
        {translatedSubtitle || service.subtitle}
      </motion.div>
      <motion.div
        variants={{ hover: { opacity: 1, y: 0, transition: { delay: 0.15 } } }}
        initial={{ opacity: 0, y: 10 }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-monument text-[6px] md:text-[7px] tracking-[0.2em] whitespace-nowrap text-[#e5d3b3]"
      >
        {enterLabel}
      </motion.div>
    </motion.button>
  );
}
