import { Arc, Chapter, Character, Comment } from "./types";

export const MOCK_CHAPTERS: Chapter[] = Array.from({ length: 227 }, (_, i) => {
  const num = 227 - i; // Descending order
  const isComingSoon = [225, 226, 227].includes(num);

  if (isComingSoon) {
    return {
      id: `ch-${num}`,
      number: num,
      title: `Blue Box Chapter ${num}`,
      releaseDate: new Date(Date.now() - i * 86400000).toISOString(),
      pages: []
    };
  }

  const isNewSource = num >= 184;
  const baseUrl = isNewSource
    ? `https://pic.readkakegurui.com/file/sancdn/ao-no-hako/chapter-${num}`
    : `https://cdn.readkakegurui.com/file/cdnpog/ao-no-hako/chapter-${num}`;

  return {
    id: `ch-${num}`,
    number: num,
    title: `Blue Box Chapter ${num}`,
    releaseDate: new Date(Date.now() - i * 86400000).toISOString(),
    pages: Array.from({ length: 60 }, (_, p) => `${baseUrl}/${p + 1}.webp`)
  };
});

export const CHARACTERS: Character[] = [
  {
    id: "taiki",
    name: "Taiki Inomata",
    role: "Protagonist",
    grade: "Badminton Player",
    description: "A member of the boys' badminton team at Eimei Junior and Senior High. He has a crush on Chinatsu Kano.",
    image: "https://picsum.photos/400/600?random=10"
  },
  {
    id: "chinatsu",
    name: "Chinatsu Kano",
    role: "Protagonist",
    grade: "Basketball Star",
    description: "The star player of the girls' basketball team. She starts living with Taiki's family.",
    image: "https://picsum.photos/400/600?random=11"
  },
  {
    id: "haryu",
    name: "Kengo Haryu",
    role: "Senior",
    grade: "Badminton Ace",
    description: "Taiki's senior and a top-tier badminton player. Strict but caring mentor.",
    image: "https://picsum.photos/400/600?random=12"
  },
  {
    id: "hina",
    name: "Hina Chono",
    role: "Friend",
    grade: "Rhythm Gymnastic",
    description: "Taiki's close friend who is a rhythmic gymnast. She harbors feelings for Taiki.",
    image: "https://picsum.photos/400/600?random=13"
  }
];

export const ARCS: Arc[] = [
  {
    id: "preliminaries",
    title: "District Preliminaries",
    description: "Taiki and Chinatsu strive to reach Nationals to make their wishes come true.",
    chapterStart: 1,
    chapterEnd: 15,
    image: "https://picsum.photos/600/300?random=20"
  },
  {
    id: "nationals",
    title: "National Tournament",
    description: "The intense competition at the National level. Friendships and rivalries are tested.",
    chapterStart: 30,
    chapterEnd: 55,
    image: "https://picsum.photos/600/300?random=21"
  },
  {
    id: "culture-fest",
    title: "Culture Festival",
    description: "A break from sports where romance begins to bloom amidst the school festivities.",
    chapterStart: 60,
    chapterEnd: 75,
    image: "https://picsum.photos/600/300?random=22"
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: '1', user: 'BadmintonPro', content: 'Taiki is working so hard! I hope he makes it to Nationals.', date: '2 hours ago', likes: 45 },
  { id: '2', user: 'ChinatsuFan', content: 'They are so cute together! Just confess already!', date: '5 hours ago', likes: 120 },
  { id: '3', user: 'TeamHina', content: 'Hina deserves happiness too...', date: '1 day ago', likes: 12 },
];
