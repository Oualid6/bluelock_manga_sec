import { Chapter, Character } from "./types";

// Generate integer chapters 1-361
const integerChapters: Chapter[] = Array.from({ length: 361 }, (_, i) => {
  const number = i + 1;
  const paddedChapter = String(number).padStart(3, '0');
  return {
    id: String(number),
    number: number,
    title: `Blue Lock Chapter ${number}`,
    releaseDate: new Date().toISOString(), // Mock date, normally would vary
    pages: number === 361 ? [] : Array.from({ length: number >= 351 ? 20 : (number >= 350 ? 23 : (number >= 347 ? 20 : (number === 346 ? 8 : (number === 345 ? 20 : 80)))) }, (_, p) =>
      `https://images.mangafreak.me/mangas/blue_lock/blue_lock_${number}/blue_lock_${number}_${p + 1}.jpg`
    ),
    pagesEs: number >= 346 ? [] : Array.from({ length: number === 345 ? 20 : 80 }, (_, p) => {
      const paddedPage = String(p + 1).padStart(3, '0');
      return `https://cdn.shadowmanga.es/mangas/s/solo-leveling/${paddedChapter}/${paddedPage}.webp`;
    }),
    pagesFr: number > 342 ? [] : Array.from({ length: 20 }, (_, p) => {
      return `https://s22.anime-sama.me/s1/scans/Blue%20Lock/${number}/${p + 1}.${number > 1 ? 'webp' : 'jpg'}`;
    })
  };
});

// Chapter 346.2 (Part 2) — 12 pages from MangaFreak
const chapter346_2: Chapter = {
  id: '346.2',
  number: 346.2,
  title: 'Blue Lock Chapter 346.2',
  releaseDate: '2026-05-19T00:00:00.000Z',
  pages: Array.from({ length: 12 }, (_, p) =>
    `https://images.mangafreak.me/mangas/blue_lock/blue_lock_346b/blue_lock_346b_${p + 1}.jpg`
  ),
  pagesEs: [],
  pagesFr: []
};

export const MOCK_CHAPTERS: Chapter[] = [...integerChapters, chapter346_2]
  .sort((a, b) => b.number - a.number); // Latest chapters first

export const CHARACTERS: Character[] = [
  {
    id: "isagi",
    name: "Yoichi Isagi",
    role: "Protagonist",
    grade: "Forward",
    description: "The central striker of Blue Lock. Uses spatial awareness and adaptability to devour rivals and become the ultimate egoist striker.",
    image: "https://picsum.photos/400/600?random=10"
  },
  {
    id: "bachira",
    name: "Meguru Bachira",
    role: "Main Character",
    grade: "Forward",
    description: "An intuitive striker guided by his inner 'monster', known for explosive dribbling and creative playmaking.",
    image: "https://picsum.photos/400/600?random=11"
  },
  {
    id: "kunigami",
    name: "Rensuke Kunigami",
    role: "Rival",
    grade: "Forward",
    description: "A powerhouse forward with an unshakeable moral compass and a deadly left-footed strike.",
    image: "https://picsum.photos/400/600?random=12"
  },
  {
    id: "chigiri",
    name: "Hyoma Chigiri",
    role: "Rival",
    grade: "Forward",
    description: "A prodigious sprinter who broke past his fear of re-injury to unleash unmatched top-speed bursts on the wing.",
    image: "https://picsum.photos/400/600?random=13"
  },
  {
    id: "nagi",
    name: "Seishiro Nagi",
    role: "Rival",
    grade: "Forward",
    description: "An effortlessly talented prodigy whose extraordinary ball-trapping skills awaken his dormant passion for victory.",
    image: "https://picsum.photos/400/600?random=14"
  },
  {
    id: "reo",
    name: "Reo Mikage",
    role: "Rival",
    grade: "Midfielder",
    description: "A versatile midfielder and tactician capable of copying high-level plays to complement his strategic mindset.",
    image: "https://picsum.photos/400/600?random=15"
  },
  {
    id: "barou",
    name: "Shoei Barou",
    role: "Villain",
    grade: "Forward",
    description: "The self-proclaimed 'King' of the pitch who dominates matches with physical dominance and powerful curved shots.",
    image: "https://picsum.photos/400/600?random=16"
  },
  {
    id: "rin",
    name: "Rin Itoshi",
    role: "Rival",
    grade: "Forward",
    description: "The top-ranked striker in Blue Lock who controls the field with cold, calculating precision and ruthless efficiency.",
    image: "https://picsum.photos/400/600?random=17"
  }
];




