import { useState, useRef } from 'react';
import type { Translations } from '../lib/i18n';

const galleryItems = [
  { id: 1, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/69f89e5cb561f92d0bf4ea0f_E4321A8D-DF74-4114-9549-BD672E0EA8BA_1_201_a.jpeg', alt: 'Kosmetické studio' },
  { id: 2, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/69f46ab0da264991b2a88d25_IMG_0221-EditNat.jpeg', alt: 'Renata Birjukov' },
  { id: 3, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/69f78e2c75b2139aee17107b_IMG_9959-Edit.jpeg', alt: 'Přístrojové ošetření' },
  { id: 4, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/69f78e2cb7fa16b2b89999c8_IMG_9998-Edit.jpeg', alt: 'Ošetření pleti' },
  { id: 5, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/69f89e5c963df61f9f62fe64_D0A5680C-4156-42CD-AEAE-27B8F05E3D54_1_201_a.jpeg', alt: 'Studio interiér' },
  { id: 6, src: 'https://cdn.prod.website-files.com/66a3872ec3af88d823ea480a/67c6150b2ff978bed3aa2017_soins_corps.jpg', alt: 'Péče o tělo' },
];

interface HelixGalleryProps {
  t: Translations;
}

export default function HelixGallery({ t }: HelixGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = galleryItems.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);

  const goToNext = () => {
    if (activeIndex < total - 1) setActiveIndex(activeIndex + 1);
  };

  const goToPrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) goToNext();
    else if (e.deltaY < 0) goToPrev();
  };

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return { transform: 'translateX(0) translateZ(200px) rotateY(0deg)', opacity: 1, filter: 'blur(0px)', zIndex: 5 };
    if (diff === 1 || diff === -total + 1) return { transform: 'translateX(140px) translateZ(50px) rotateY(-30deg)', opacity: 0.6, filter: 'blur(3px)', zIndex: 4 };
    if (diff === -1 || diff === total - 1) return { transform: 'translateX(-140px) translateZ(50px) rotateY(30deg)', opacity: 0.6, filter: 'blur(3px)', zIndex: 4 };
    return { transform: 'translateX(0) translateZ(-200px) rotateY(180deg)', opacity: 0, filter: 'blur(10px)', zIndex: 1 };
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 30) {
      if (deltaX > 0) goToPrev();
      else goToNext();
      isSwiping.current = false;
    }
  };

  const onTouchEnd = () => {
    isSwiping.current = false;
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div className="text-center mb-6">
        <div className="font-monument text-[9px] tracking-[0.3em] text-[#e5d3b3] uppercase">{t.galleryTitle}</div>
      </div>
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: '350px', perspective: '1000px', touchAction: 'none' }}
        onWheel={handleWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {galleryItems.map((item, idx) => (
          <div key={item.id} style={{ position: 'absolute', width: '220px', height: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 32px rgba(0,0,0,0.5)', transition: 'transform 0.6s, filter 0.6s, opacity 0.6s', left: 'calc(50% - 110px)', top: 'calc(50% - 150px)', ...getCardStyle(idx) }}>
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
        <button onClick={goToPrev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <button onClick={goToNext} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
      </div>
      <div className="text-center mt-3">
        <span className="font-montreal text-[10px] text-white/40">{activeIndex + 1} / {total}</span>
      </div>
    </div>
  );
}
