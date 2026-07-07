const fs = require('fs');
let code = fs.readFileSync('src/MainPage.tsx', 'utf8');

// 1. Fix master photo size on mobile
code = code.replace(
  'className="w-full max-w-md object-cover rounded-3xl shadow-2xl transition-transform hover:scale-105"',
  'className="w-full max-w-[200px] md:max-w-md object-cover rounded-3xl shadow-2xl transition-transform hover:scale-105"'
);

// 2. Add transition video to INTRO - find the motion.div key="intro" and add video before it
const introKey = '<motion.div key="intro"';
const introIdx = code.indexOf(introKey);
if (introIdx !== -1) {
  const videoDiv = '<div className="absolute inset-0 z-0"><video autoPlay muted loop playsInline className="w-full h-full object-cover"><source src="https://res.cloudinary.com/dfh97tdty/video/upload/v1783430929/0707_xoook.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-black/50" /></div>\n';
  code = code.substring(0, introIdx) + videoDiv + code.substring(introIdx);
}

fs.writeFileSync('src/MainPage.tsx', code, 'utf8');
console.log('Done - all fixes applied');
