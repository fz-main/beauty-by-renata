export const STAGES = { INTRO: 0, MENU: 1, SERVICE_DETAIL: 2, ABOUT: 3 };

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  desc: string;
  price: string;
  time: string;
  category: string;
  video: string;
  transition: string;
  position: [number, number, number];
  color: string;
  bookingUrl?: string;
}

export const SERVICE_CATEGORIES = [
  { id: 'microneedling', title: 'Mikrojehličkování' },
  { id: 'chemical-peel', title: 'Chemický peeling' },
  { id: 'cosmetic', title: 'Kosmetická ošetření' },
  { id: 'maderotherapy', title: 'Maderoterapie' },
  { id: 'device', title: 'Přístrojová ošetření' },
  { id: 'other', title: 'Ostatní služby' }
];

export const SERVICES: Service[] = [
  {
    id: 'microneedling-face',
    title: 'Mikrojehličkování (obličej, krk)',
    shortTitle: 'Mikrojehličkování',
    subtitle: 'Omlazení pleti',
    desc: 'Mikrojehličkování je účinné ošetření zaměřené především na omlazení pleti.',
    price: '2 050 Kč',
    time: '60 min',
    category: 'microneedling',
    video: 'https://res.cloudinary.com/dfh97tdty/video/upload/v1781508873/5181757454069876099_f9xf25.mov',
    transition: '',
    position: [-10, 0, -10],
    color: '#e5d3b3',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'microneedling-peel',
    title: 'Mikrojehličkování + chemický peeling',
    shortTitle: 'Mikro + Peeling',
    subtitle: 'Kombinovaný protokol',
    desc: 'Kombinovaný protokol pro maximální výsledky omlazení pleti.',
    price: '2 500 Kč',
    time: '75 min',
    category: 'microneedling',
    video: '',
    transition: '',
    position: [-10, 0, 10],
    color: '#d4c5b0',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'salmon-dna',
    title: 'Salmon DNA Microneedling (PDRN)',
    shortTitle: 'Salmon DNA',
    subtitle: 'Biostimulace',
    desc: 'Pokročilé biostimulační mikrojehličkování nové generace.',
    price: '2 890 Kč',
    time: '75 min',
    category: 'microneedling',
    video: '',
    transition: '',
    position: [10, 0, -10],
    color: '#c4a77d',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'peel-first',
    title: 'Chemický peeling - první návštěva',
    shortTitle: 'Chem. peeling',
    subtitle: '2 vrstvy kyseliny',
    desc: 'Účinky peelingu: Rozjasnění a sjednocení tónu pleti, vyhlazení vrásek.',
    price: '1 850 Kč',
    time: '45 min',
    category: 'chemical-peel',
    video: '',
    transition: '',
    position: [10, 0, 10],
    color: '#f8f5f2',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'peel-three',
    title: 'Chemický peeling - 3 vrstvy',
    shortTitle: 'Peeling 3 vrstvy',
    subtitle: 'Intenzivní ošetření',
    desc: 'Intenzivnější ošetření pro pokročilé výsledky.',
    price: '2 050 Kč',
    time: '50 min',
    category: 'chemical-peel',
    video: '',
    transition: '',
    position: [0, 0, -15],
    color: '#e5d3b3',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'first-visit',
    title: 'První návštěva',
    shortTitle: 'První návštěva',
    subtitle: 'Konzultace',
    desc: 'Při první návštěvě si společně vyplníme klientskou kartu.',
    price: '1 600 Kč',
    time: '60 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [0, 0, 15],
    color: '#d4c5b0',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'refresh',
    title: 'Refresh pleti',
    shortTitle: 'Refresh pleti',
    subtitle: 'Osvěžení',
    desc: 'Ošetření přizpůsobené aktuálním potřebám vaší pleti.',
    price: '1 500 Kč',
    time: '50 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [-10, 0, -10],
    color: '#c4a77d',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'lifting',
    title: 'Omlazující lifting',
    shortTitle: 'Omlaz. lifting',
    subtitle: 'Zpevnění',
    desc: 'Intenzivní ošetření zaměřené na zpevnění, vypnutí a omlazení pleti.',
    price: '1 700 Kč',
    time: '60 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [-10, 0, 10],
    color: '#e5d3b3',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'massage-face',
    title: 'Liftingová masáž pleti - ANTI-AGE',
    shortTitle: 'Lifting. masáž',
    subtitle: 'Masáž',
    desc: 'Tato liftingová masáž stimuluje mikrocirkulaci, aktivuje pokožku.',
    price: '790 Kč',
    time: '40 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [10, 0, -10],
    color: '#d4c5b0',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'deep-clean',
    title: 'Hloubkové čistění pleti',
    shortTitle: 'Hloubk. čistění',
    subtitle: 'Čištění',
    desc: 'Ošetření určené pro problematickou pleť, ucpané póry.',
    price: '1 200 Kč',
    time: '60 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [10, 0, 10],
    color: '#f8f5f2',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'salmon-booster',
    title: 'Omlazující skin booster s lososí DNA',
    shortTitle: 'Skin Booster',
    subtitle: 'Biostimulace',
    desc: 'Pokročilé bezjehlové ošetření inspirované korejskými skin boostery.',
    price: '2 000 Kč',
    time: '50 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [0, 0, -15],
    color: '#c4a77d',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'lymph',
    title: 'Lymfatická masáž obličeje - RELAX',
    shortTitle: 'Lymfo masáž',
    subtitle: 'Relaxace',
    desc: 'Jemná manuální technika podporující přirozený tok lymfy.',
    price: '790 Kč',
    time: '40 min',
    category: 'cosmetic',
    video: '',
    transition: '',
    position: [0, 0, 15],
    color: '#e5d3b3',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  },
  {
    id: 'madero',
    title: 'Maderoterapie s prvky lymfomodelingu',
    shortTitle: 'Maderoterapie',
    subtitle: 'Problémové partie',
    desc: 'Maderoterapie s prvky lymfomodelingu je moderní metoda péče o tělo.',
    price: 'od 990 Kč',
    time: '60 min',
    category: 'maderotherapy',
    video: '',
    transition: '',
    position: [-10, 0, -10],
    color: '#d4c5b0',
    bookingUrl: 'https://beauty-by-renata.reservio.com'
  }
];

export const getServicesByCategory = (categoryId: string) =>
  SERVICES.filter(s => s.category === categoryId);
