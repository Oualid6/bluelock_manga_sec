import { Arc, Chapter, Character } from "./types";

// Generate integer chapters 1-348
const integerChapters: Chapter[] = Array.from({ length: 348 }, (_, i) => {
  const number = i + 1;
  const paddedChapter = String(number).padStart(3, '0');
  return {
    id: String(number),
    number: number,
    title: `Blue Lock Chapter ${number}`,
    releaseDate: new Date().toISOString(), // Mock date, normally would vary
    pages: number === 348 ? [] : Array.from({ length: number === 347 ? 20 : (number === 346 ? 8 : (number === 345 ? 20 : 80)) }, (_, p) =>
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
    description: "The main protagonist. A striker who aims to become the world's best egoist striker.",
    image: "https://picsum.photos/400/600?random=10"
  },
  {
    id: "bachira",
    name: "Meguru Bachira",
    role: "Main Character",
    grade: "Forward",
    description: "A whimsical striker who plays following his instinct. He seeks a 'monster' to play with.",
    image: "https://picsum.photos/400/600?random=11"
  },
  {
    id: "kunigami",
    name: "Rensuke Kunigami",
    role: "Rival",
    grade: "Forward",
    description: "A passionate striker with a strong sense of justice and powerful left-legged shot.",
    image: "https://picsum.photos/400/600?random=12"
  },
  {
    id: "chigiri",
    name: "Hyoma Chigiri",
    role: "Rival",
    grade: "Forward",
    description: "A speedster who overcomes his fear of injury to run freely on the field again.",
    image: "https://picsum.photos/400/600?random=13"
  },
  {
    id: "nagi",
    name: "Seishiro Nagi",
    role: "Rival",
    grade: "Forward",
    description: "A prodigy with exceptional ball control who plays football half-heartedly until he finds a challenge.",
    image: "https://picsum.photos/400/600?random=14"
  },
  {
    id: "reo",
    name: "Reo Mikage",
    role: "Rival",
    grade: "Midfielder",
    description: "A wealthy heir who is Nagi's partner. He is an all-rounder capable of copying plays.",
    image: "https://picsum.photos/400/600?random=15"
  },
  {
    id: "barou",
    name: "Shoei Barou",
    role: "Villain",
    grade: "Forward",
    description: "The 'King' of the field. A selfish player with a powerful physique and devastating shot.",
    image: "https://picsum.photos/400/600?random=16"
  },
  {
    id: "rin",
    name: "Rin Itoshi",
    role: "Rival",
    grade: "Forward",
    description: "The top player in Blue Lock. Sae Itoshi's younger brother, who plays with cold, calculated precision.",
    image: "https://picsum.photos/400/600?random=17"
  }
];

export const ARCS: Arc[] = [
  {
    id: "selection",
    title: "First Selection",
    description: "The 300 strikers are divided into teams and must compete in a round-robin tournament to survive.",
    chapterStart: 1,
    chapterEnd: 38,
    image: "https://picsum.photos/600/300?random=20"
  },
  {
    id: "second-selection",
    title: "Second Selection",
    description: "Players form teams of three and steal teammates from losing teams to advance.",
    chapterStart: 39,
    chapterEnd: 87,
    image: "https://picsum.photos/600/300?random=21"
  },
  {
    id: "neo-egoist",
    title: "Neo Egoist League",
    description: "Blue Lock players join top European U-20 teams to prove their worth on the world stage.",
    chapterStart: 153,
    chapterEnd: 348, // includes 346.2 (Part 2)
    image: "https://picsum.photos/600/300?random=22"
  }
];


