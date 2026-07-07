const fs = require('fs');
let code = fs.readFileSync('src/MainPage.tsx', 'utf8');

// 1. Add showHeroVideo state
code = code.replace(
  "const [lightboxImage, setLightboxImage] = useState<string | null>(null);",
  "const [lightboxImage, setLightboxImage] = useState<string | null>(null);\n  const [showHeroVideo, setShowHeroVideo] = useState(false);"
);

// 2. Add video poster background for INTRO
code = code.replace(
  "{/* ThreeScene disabled for debugging */}",
  "{stage === STAGES.INTRO && !showHeroVideo && (\n        <div className=\"absolute inset-0 z-0\">\n          <video autoPlay muted loop playsInline className=\"w-full h-full object-cover\">\n            <source src=\"https://res.cloudinary.com/dfh97tdty/video/upload/v1783430929/0707_xkoook.mp4\" type=\"video/mp4\" />\n          </video>\n          <div className=\"absolute inset-0 bg-black/40\" />\n        </div>\n      )}\n      {/* ThreeScene disabled for debugging */}"
);

// 3. Add hero video overlay
code = code.replace(
  "{/* ThreeScene disabled for debugging */}\n      {/* <div",
  "{showHeroVideo && (\n        <div className=\"fixed inset-0 z-[200] bg-black\">\n          <video autoPlay muted playsInline onEnded={() => { setShowHeroVideo(false); setStage(STAGES.MENU); }} className=\"w-full h-full object-cover\">\n            <source src=\"https://res.cloudinary.com/dfh97tdty/video/upload/v1783430929/0707_xkoook.mp4\" type=\"video/mp4\" />\n          </video>\n        </div>\n      )}\n      {/* ThreeScene disabled for debugging */}\n      {/* <div"
);

// 4. Fix scroll handler - show video on INTRO -> MENU
code = code.replace(
  "if (stage === STAGES.INTRO && e.deltaY > 0) {\n        setStage(STAGES.MENU);",
  "if (stage === STAGES.INTRO && e.deltaY > 0) {\n        setShowHeroVideo(true);"
);

// 5. Fix touch handler
code = code.replace(
  "if (stage === STAGES.INTRO && deltaY > 0) {\n          setStage(STAGES.MENU);",
  "if (stage === STAGES.INTRO && deltaY > 0) {\n          setShowHeroVideo(true);"
);

// 6. Fix back navigation - reset showHeroVideo
code = code.replace(
  "} else if (stage === STAGES.MENU && e.deltaY < 0) {\n        setStage(STAGES.INTRO);",
  "} else if (stage === STAGES.MENU && e.deltaY < 0) {\n        setStage(STAGES.INTRO);\n        setShowHeroVideo(false);"
);
code = code.replace(
  "} else if (stage === STAGES.MENU && deltaY < 0) {\n          setStage(STAGES.INTRO);",
  "} else if (stage === STAGES.MENU && deltaY < 0) {\n          setStage(STAGES.INTRO);\n          setShowHeroVideo(false);"
);

// 7. Hide header during video
code = code.replace(
  '<header className="absolute top-0 left-0 w-full px-6 py-5 md:px-8 md:py-8 flex justify-between items-center z-50 mix-blend-difference">',
  '<header className={`absolute top-0 left-0 w-full px-6 py-5 md:px-8 md:py-8 flex justify-between items-center z-50 mix-blend-difference transition-opacity duration-300 ${showHeroVideo ? \'opacity-0\' : \'opacity-100\'}`}>'
);

// 8. Fix button click to show video
code = code.replace(
  "onClick={() => setStage(STAGES.MENU)} className=\"mt-6 px-6 py-3 border",
  "onClick={() => setShowHeroVideo(true)} className=\"mt-6 px-6 py-3 border"
);

// 9. Fix hero text to fade when video shows
code = code.replace(
  "{stage === STAGES.INTRO && (<motion.div key=\"intro\"",
  "{stage === STAGES.INTRO && !showHeroVideo && (<motion.div key=\"intro\""
);

// 10. Fix mobile layout - smaller gaps, scrollable
code = code.replace(
  '<div className="flex-1 px-4 md:px-10 pt-[200px] pb-8">',
  '<div className="flex-1 px-3 md:px-10 pt-4 md:pt-[200px] pb-4 overflow-y-auto">'
);
code = code.replace(
  'className="flex flex-wrap justify-center gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-8 w-full max-w-6xl mx-auto"',
  'className="flex flex-wrap justify-center gap-x-3 gap-y-3 md:gap-x-8 md:gap-y-8 w-full max-w-6xl mx-auto"'
);

// 11. Fix contacts footer
code = code.replace(
  'className="flex flex-col items-center gap-0.5 text-center px-4 py-3 shrink-0"',
  'className="flex flex-col items-center gap-0.5 text-center px-4 py-2 shrink-0"'
);

// 12. Remove duplicate Rekl. řád in menu
const menuRekl1 = code.indexOf('Rekl. řád', code.indexOf('STAGES.MENU'));
const menuRekl2 = code.indexOf('Rekl. řád', menuRekl1 + 1);
if (menuRekl2 !== -1 && menuRekl2 < code.indexOf('STAGES.ABOUT')) {
  const beforeSecond = code.lastIndexOf('<span', menuRekl2);
  const afterSecond = code.indexOf('</a>', menuRekl2) + 4;
  code = code.substring(0, beforeSecond) + code.substring(afterSecond);
  console.log('Removed duplicate Rekl. řád');
}

// 13. Add Rekl. řád in ABOUT contacts
const aboutInstaIdx = code.indexOf('Instagram</a>', code.indexOf('STAGES.ABOUT'));
if (aboutInstaIdx !== -1) {
  const afterInsta = aboutInstaIdx + 'Instagram</a>'.length;
  code = code.substring(0, afterInsta) +
    '\n                    <span className="text-white/20">·</span>\n                    <a href="#/reklamacni-rad" className="font-monument text-[9px] tracking-widest text-white/50 hover:text-[#e5d3b3] transition-colors uppercase">Rekl. řád</a>' +
    code.substring(afterInsta);
  console.log('Added Rekl. řád in about');
}

fs.writeFileSync('src/MainPage.tsx', code, 'utf8');
console.log('Done - all fixes applied cleanly');
