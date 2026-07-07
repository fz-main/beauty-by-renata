export const STAGES = { INTRO: 0, MENU: 1, SERVICE_DETAIL: 2, ABOUT: 3 };

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  desc: string;
  benefits: string[];
  process: string[];
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
    desc: 'Mikrojehličkování je metoda, která dokáže přirozenou cestou obnovit vaši pleť, viditelně omladit a zredukovat vrásky. Pomocí mikrojehel se otevřou kožní mikrokanálky, kterými se do hlubších vrstev pokožky dopraví aktivní látky z profesionálních sér. Vaše pleť se začne přirozeně regenerovat a produkovat kolagen.',
    benefits: ['Viditelné omlazení a redukce vrásek', 'Sjednocení tónu pleti', 'Zlepšení struktury a elasticity', 'Redukce rozšířených pórů a pigmentových skvrn', 'Podpora přirozené tvorby kolagenu'],
    process: ['Diagnostika pleti a konzultace', 'Aplikace kyseliny hyaluronové Biofor', 'Mikrojehličkování speciálním přístrojem', 'Zapracování aktivních sér', 'Závěrečná péče a doporučení'],
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
    desc: 'Unikátní kombinace dvou nejúčinnějších metod pro omlazení pleti. Nejprve mikrojehličkování otevře mikrokanálky, poté chemický peeling pronikne ještě hlouběji do pokožky. Výsledkem je intenzivní regenerace, rozjasnění a viditelné omlazení již po prvním ošetření.',
    benefits: ['Dvojnásobný efekt omlazení', 'Intenzivní regenerace buněk', 'Rozjasnění a sjednocení pleti', 'Redukce pigmentace a jizev', 'Dlouhotrvající výsledky'],
    process: ['Diagnostika a příprava pleti', 'Mikrojehličkování obličeje a krku', 'Aplikace chemického peelingu Biofor', 'Neutralizace a zklidnění', 'Závěrečná péče s SPF'],
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
    desc: 'Pokročilé biostimulační ošetření nové generace s obsahem DNA lososa (PDRN). Tato inovativní metoda stimuluje hlubokou regeneraci buněk, obnovuje elasticitu pleti a dodává jí mladistvý, zářivý vzhled. Ideální pro unavenou, stárnoucí a dehydrovanou pleť.',
    benefits: ['Hluboká buněčná regenerace', 'Obnovení elasticity a pevnosti', 'Intenzivní hydratace zevnitř', 'Redukce jemných i hlubokých vrásek', 'Zářivý a svěží vzhled pleti'],
    process: ['Aplikace znecitlivujícího krému', 'Příprava pleti na ošetření', 'Mikrojehličkování s PDRN sérem', 'Zapracování lososí DNA do pokožky', 'Závěrečná regenerační péče'],
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
    desc: 'Chemický peeling je neinvazivní metoda, která slouží k projasnění a omlazení pleti. Speciální ovocné kyseliny jemně odstraňují odumřelé buňky a odhalují novou, zdravější pokožku. Vaše pleť bude okamžitě rozjasněná, vyhlazená a svěží.',
    benefits: ['Rozjasnění a sjednocení tónu pleti', 'Vyhlazení jemných vrásek', 'Redukce pigmentových skvrn', 'Zmenšení rozšířených pórů', 'Zlepšení textury pleti'],
    process: ['Odlíčení a tonizace pleti', 'Aplikace 2 vrstev kyseliny Biofor', 'Neutralizace a zklidnění', 'Aplikace zklidňující masky', 'Závěrečný krém s SPF'],
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
    desc: 'Intenzivnější variace chemického peelingu pro klienty, kteří chtějí dosáhnout maximálních výsledků. Tři vrstvy kyseliny pronikají hlouběji do pokožky a zajišťují silnější regenerační efekt. Ideální pro řešení pigmentace, jizev po akné a projevů stárnutí.',
    benefits: ['Intenzivní omlazení pleti', 'Viditelná redukce pigmentace', 'Zlepšení vzhledu jizev', 'Hloubková regenerace buněk', 'Dlouhodobé výsledky'],
    process: ['Diagnostika a příprava pleti', 'Aplikace 3 vrstev kyseliny Biofor', 'Pozorování reakce pleti', 'Neutralizace a zklidnění', 'Regenerační péče a SPF'],
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
    desc: 'Při první návštěvě si společně vyplníme klientskou kartu a probereme vaši dosavadní péči o pleť, vaše přání a očekávání. Díky detailní diagnostice mohu zvolit nejvhodnější ošetření přesně pro vás. Součástí je kompletní kosmetické ošetření.',
    benefits: ['Individuální přístup ke každému klientovi', 'Profesionální diagnostika pleti', 'Poradenství pro domácí péči', 'Kompletní kosmetické ošetření', 'Výplnění klientské karty'],
    process: ['Vyplnění klientské karty', 'Diagnostika pleti', 'Odlíčení a tonizace', 'Peeling a čištění', 'Masáž obličeje a dekoltu', 'Aplikace masky a séra', 'Závěrečný krém'],
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
    desc: 'Ošetření přizpůsobené aktuálním potřebám vaší pleti – ideální jako pravidelný refresh, který udržuje pleť zdravou, svěží a zářivou. Pleť bude hydratovaná, zklidněná a projasněná. Vhodné pro všechny typy pleti.',
    benefits: ['Okamžité rozjasnění pleti', 'Intenzivní hydratace', 'Zklidnění podráždění', 'Sjednocení tónu pleti', 'Relaxace a odpočinek'],
    process: ['Odlíčení a tonizace', 'Peeling a ultrazvukové čištění', 'Úprava obočí a epilace', 'Relaxační masáž obličeje', 'Aplikace koktejlu sér a masky', 'Oční krém a závěrečný krém'],
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
    desc: 'Intenzivní ošetření zaměřené na zpevnění, vypnutí a omlazení pleti. Speciální liftingová masáž v kombinaci s aktivními látkami podporuje pružnost pokožky, vyhlazuje vrásky a pomáhá zpomalit projevy stárnutí. Pleť je po ošetření hladší, pevnější a zářivější.',
    benefits: ['Viditelné vypnutí pleti', 'Redukce mimických i hlubokých vrásek', 'Obnovení elasticity', 'Zpomalení stárnutí', 'Zářivý a mladistvý vzhled'],
    process: ['Odlíčení a tonizace', 'Peeling a ultrazvukové čištění', 'Liftingová masáž obličeje a dekoltu', 'Koktejl sér a anti-age maska', 'Oční krém a liftingový krém'],
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
    desc: 'Nový trend proti času – liftingová masáž, která působí na svaly obličeje, krku a dekoltu. Stimuluje mikrocirkulaci, aktivuje pokožku, zlepšuje elasticitu vláken a okysličuje tkáně. Pokožka je pevnější, vyhlazená a zářivá.',
    benefits: ['Okamžité vyhlazení drobných vrásek', 'Zvýšení pružnosti pokožky', 'Regenerace elastických struktur', 'Zpomalení stárnutí pleti', 'Snížení napětí v obličeji'],
    process: ['Odlíčení a tonizace', 'Liftingová masáž obličeje a dekoltu', 'Aplikace masky', 'Liftingový krém'],
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
    desc: 'Ošetření určené pro problematickou pleť, ucpané póry a černé tečky. Kombinace ultrazvukového čištění, kavitačního peelingu a manuálního dočištění zajistí dokonale čistou, zklidněnou a projasněnou pleť.',
    benefits: ['Dokonale vyčištěné póry', 'Odstranění černých teček', 'Zklidnění zarudnutí', 'Sjednocení tónu pleti', 'Prevence tvorby akné'],
    process: ['Odlíčení a tonizace', 'Enzymatický peeling', 'Napářka a změkčení pórů', 'Kavitační a ultrazvukové čištění', 'Manuální čištění pórů', 'Zklidňující maska a sérum', 'Závěrečný krém s SPF'],
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
    desc: 'Pokročilé bezjehlové ošetření inspirované korejskými skin boostery. Pomocí moderní technologie se aktivní látky včetně lososí DNA zapracují hluboko do pokožky bez použití jehel. Výsledkem je intenzivní hydratace, regenerace a mladistvý vzhled.',
    benefits: ['Intenzivní hydratace zevnitř', 'Regenerace buněk bez jehel', 'Obnovení elasticity', 'Rozjasnění a sjednocení pleti', 'Dlouhotrvající efekt'],
    process: ['Diagnostika pleti', 'Aplikace boost s lososí DNA', 'Zapracování bezjehlovou technologií', 'Aplikace zklidňujícího séra', 'Závěrečná péče'],
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
    desc: 'Jemná manuální technika podporující přirozený tok lymfy. Pomáhá odstranit otoky, toxinů a přebytečnou tekutinu z obličeje. Pleť je svěží, odpočatá a zářivá. Ideální pro unavený vzhled a pocit těžkosti v obličeji.',
    benefits: ['Odstranění otoků a toxinů', 'Zlepšení mikrocirkulace', 'Detoxikace pleti', 'Relaxace a uvolnění', 'Svěží a odpočatý vzhled'],
    process: ['Jemná lymfatická masáž obličeje', 'Masáž krku a dekoltu', 'Aplikace zklidňujícího séra', 'Závěrečná péče'],
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
    desc: 'Moderní metoda péče o tělo, která využívá speciálně tvarované dřevěné pomůcky a lymfodrenážní prvky. Cíleně působí na problematické partie, pomáhá zpevnit křivky, vyhladit pokožku a nastartovat detoxikační procesy v těle.',
    benefits: ['Redukce celulitidy', 'Zpevnění a zeštíhlení postavy', 'Vyhlazení pokožky', 'Detoxikace organismu', 'Zlepšení lymfatického systému'],
    process: ['Úvodní fotografie pro srovnání', 'Bylinný lymfatický čaj', 'Aktivace lymfatického systému', 'Intenzivní modelace problémových partií', 'Závěrečná péče'],
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
