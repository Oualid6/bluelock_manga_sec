import { Arc, Chapter, Character, Comment } from "./types";

export const MOCK_CHAPTERS: Chapter[] = Array.from({ length: 344 }, (_, i) => {
  const number = i + 1;
  return {
    id: String(number),
    number: number,
    title: `Blue Lock Chapter ${number}`,
    releaseDate: new Date().toISOString(), // Mock date, normally would vary
    pages: number === 344 ? [] : Array.from({ length: 80 }, (_, p) =>
      `https://images.mangafreak.me/mangas/blue_lock/blue_lock_${number}/blue_lock_${number}_${p + 1}.jpg`
    )
  };
}).reverse(); // Latest chapters first

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
    chapterEnd: 344,
    image: "https://picsum.photos/600/300?random=22"
  }
];

// Pools of realistic comments based on story progression
const GENERIC_COMMENTS = [
  "Peak fiction right here.",
  "The art quality is consistently insane. Nomura is a beast.",
  "I've read this 5 times and it still gives me chills.",
  "Can't wait for the next update!",
  "Is it just me or is the pacing getting even better?",
  "Found this manga today and already binged 50 chapters.",
  "The 'aura' in these panels is just next level.",
  "I need this animated with a huge budget.",
];

const EARLY_ARC_COMMENTS = [
  "Isagi finally finding his 'monster' is so satisfying.",
  "Bachira's backstory really makes you feel for him.",
  "The idea of a striker-only facility is so unique.",
  "Don't sleep on Team Z, they have so much potential.",
  "Ego Jinpachi is creepy but his philosophy makes sense.",
  "Just started this, the survival element is crazy.",
];

const SECOND_SELECTION_COMMENTS = [
  "Nagi is such a cheat code, how is he so good without trying?",
  "The 3v3 format is so much more intense than the 11v11.",
  "Barou really thinks he's the King... and honestly, he might be.",
  "Isagi's adaptability is his true weapon. Devour them all!",
  "Reo's character development after the split is painful to watch.",
  "Seeing the top 3 in action is humbling. Rin is on another level.",
];

const U20_ARC_COMMENTS = [
  "Sae Itoshi is actually cracked. The gap between him and Blue Lock is huge.",
  "The stadium atmosphere in these chapters is incredible.",
  "Shidou and Ryusei is pure chaos, I love it.",
  "Isagi and Rin's chemical reaction is what I live for.",
  "This is peak sports manga. The stakes have never been higher.",
  "That last goal was actually impossible. I had to re-read it three times.",
];

const NEL_ARC_COMMENTS = [
  "Kaiser is the perfect antagonist for Isagi right now.",
  "The bidding system adds such a cool professional layer to the story.",
  "Kunigami coming back as a 'Wild Card' is NOT what I expected.",
  "Bastard Munchen's internal rivalry is more intense than the actual matches.",
  "Hiori's development in this match was so well written.",
  "Isagi's Metavision is finally letting him see the whole field like a pro.",
];

export const getCommentsForChapter = (chapterNum: number): Comment[] => {
  const users = ["Striker99", "Egoist_Kun", "BachiraFan", "BlueLockDevotee", "MangaMaster", "NagiProdigy", "RinSimp", "GoalHunter", "IsagiEgo", "FootballFanatic"];
  
  // Select appropriate pool based on chapter range
  let pool = [...GENERIC_COMMENTS];
  if (chapterNum <= 40) pool = [...pool, ...EARLY_ARC_COMMENTS];
  else if (chapterNum <= 90) pool = [...pool, ...SECOND_SELECTION_COMMENTS];
  else if (chapterNum <= 150) pool = [...pool, ...U20_ARC_COMMENTS];
  else pool = [...pool, ...NEL_ARC_COMMENTS];

  // Seeded-ish selection based on chapter number to keep it consistent
  const result: Comment[] = [];
  const count = 3 + (chapterNum % 3); // 3 to 5 comments
  
  for (let i = 0; i < count; i++) {
    const userIdx = (chapterNum + i) % users.length;
    const commentIdx = (chapterNum * (i + 1)) % pool.length;
    
    result.push({
      id: `${chapterNum}-${i}`,
      user: users[userIdx],
      content: pool[commentIdx],
      date: `${(i + 1) * 2} hours ago`,
      likes: Math.floor(((chapterNum + i) * 17) % 500) + 10
    });
  }

  return result;
};
