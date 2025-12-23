import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, MessageCircle, Bookmark } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useManga } from '../context/MangaContext';
import { ARCS } from '../constants';

const Home: React.FC = () => {
  const { chapters } = useManga();
  const latestChapter = chapters[0];

  return (
    <>
      <SEOHead
        title="Jujutsu Kaisen Manga - Read Online High Quality"
        description="Read Jujutsu Kaisen Manga online in high quality. The best place for JJK chapters, character info, and latest updates. All chapters available."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Jujutsu Kaisen Manga",
          "url": "https://rejjk.com",
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-jjk-dark py-20">
        <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
          <img
            src="/hero-bg.png"
            alt="JJK Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-jjk-dark via-jjk-dark/60 to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-4 drop-shadow-2xl tracking-tighter text-center">
            JUJUTSU <span className="text-jjk-red">KAISEN MANGA</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
            Read Jujutsu Kaisen Manga Online In High Quality, All Chapters and Volumes in English With HD scans and No Sign-Up Required.
          </p>

          {/* Info Card */}
          <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Column: Stats & Meta */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">

                {/* Rating Block */}
                <div className="col-span-2 sm:col-span-4 flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map(i => <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />)}
                    <Star className="fill-yellow-400/30 text-yellow-400 w-5 h-5" />
                  </div>
                  <span className="text-3xl font-bold text-white">4.8</span>
                  <span className="text-sm text-gray-400 mt-1 ml-2">Average 4.8 / 5 out of 45k</span>
                </div>

                {/* Info Fields */}
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Rank</span>
                  <span className="text-white font-medium">1st, 11M views</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Release</span>
                  <span className="text-white font-medium">2018</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Status</span>
                  <span className="text-green-400 font-bold">Ongoing</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Type</span>
                  <span className="text-white font-medium">Shounen, Drama</span>
                </div>

                <div className="col-span-2 sm:col-span-4 flex flex-col gap-3 mt-2">
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Author(s):</span>
                    <span className="text-white hover:text-jjk-red cursor-pointer transition-colors">Gege Akutami</span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Genre(s):</span>
                    {['Action', 'Adventure', 'Supernatural', 'Horror', 'School Life', 'Dark Fantasy'].map(g => (
                      <span key={g} className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {g},
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 items-start border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Synopsis:</span>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <strong className="text-white">Yuji Itadori</strong>, a high school student, becomes the host of a powerful Curse named <strong className="text-white">Ryomen Sukuna</strong> after ingesting one of his fingers. He joins a secret organization of <strong className="text-white">Jujutsu Sorcerers</strong> to eliminate Curses and protect humanity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions/Social Proof */}
              <div className="flex lg:flex-col justify-center items-center gap-8 min-w-[140px]">
                <div className="text-center group cursor-pointer w-full">
                  <MessageCircle className="w-8 h-8 text-gray-500 group-hover:text-jjk-red mx-auto mb-2 transition-colors" />
                  <span className="block text-2xl font-bold text-white">1,240</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Comments</span>
                </div>
                <div className="w-px h-12 bg-white/10 lg:w-16 lg:h-px"></div>
                <button
                  onClick={() => {
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                    alert(`Press ${isMac ? 'Cmd' : 'Ctrl'} + D to bookmark this page!`);
                  }}
                  className="text-center group cursor-pointer w-full focus:outline-none"
                  aria-label="Bookmark this page"
                >
                  <Bookmark className="w-8 h-8 text-jjk-red mx-auto mb-2 fill-jjk-red group-hover:scale-110 transition-transform" />
                  <span className="block text-2xl font-bold text-white">45k</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-jjk-red transition-colors">Bookmark Now</span>
                </button>
              </div>
            </div>
          </div>

          {latestChapter && (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to={`/chapter/${latestChapter.number}`}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-jjk-red hover:bg-red-700 shadow-lg shadow-red-900/20 transition-all hover:scale-105"
              >
                Read Chapter {latestChapter.number}
              </Link>
              <Link
                to="/manga"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-lg font-bold rounded-lg text-white hover:bg-white hover:text-black transition-all"
              >
                View Chapter List
              </Link>
            </div>
          )}
        </div>
      </section >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Latest Chapters Grid */}
        {/* Latest Chapters Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="text-jjk-red" /> Latest Releases
            </h2>
            <Link to="/manga" className="text-jjk-red hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chapters.slice(0, 12).map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.number}`}
                className="group relative flex flex-col justify-between h-full bg-white dark:bg-white/5 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-white/10 p-5 hover:border-jjk-red/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-jjk-red/10"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-jjk-red uppercase tracking-wider">
                    Chapter {chapter.number}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-jjk-red transition-colors line-clamp-2">
                    {chapter.title}
                  </h3>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Read Now</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-jjk-red group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About / SEO Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">About Jujutsu Kaisen</h2>
            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-4">
              <p>
                <strong className="text-gray-900 dark:text-white">Jujutsu Kaisen</strong> (Japanese: 呪術廻戦), also widely known as <strong className="text-gray-900 dark:text-white">JJK</strong>, is a critically acclaimed Japanese manga series written and illustrated by <strong className="text-gray-900 dark:text-white">Gege Akutami</strong>. Readers who follow the <strong className="text-gray-900 dark:text-white">Jujutsu Kaisen manga</strong> are immersed in a dark fantasy world that has been serialized in Shueisha&apos;s <em>Weekly Shōnen Jump</em> since March 2018. The story follows high school student <strong className="text-gray-900 dark:text-white">Yuji Itadori</strong> as he joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">The World of Curses</h3>
              <p>
                In this world, all living beings emanate energy called <strong className="text-jjk-red">Cursed Energy</strong>, which arises from negative emotions that naturally flow throughout the body. Ordinary people cannot control this flow in their bodies. As a result, they continually lose Cursed Energy, resulting in the birth of Curses, a race of spiritual beings whose primary desire is to bring harm to humanity.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Key Characters</h3>
              <p>
                The series features a diverse cast of characters including the powerful <strong className="text-gray-900 dark:text-white">Satoru Gojo</strong>, the determined <strong className="text-gray-900 dark:text-white">Megumi Fushiguro</strong>, and the fierce <strong className="text-gray-900 dark:text-white">Nobara Kugisaki</strong>. Together with Yuji, they navigate the dangerous world of Jujutsu High, battling curses and uncovering deep-seated conspiracies.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Why Read Jujutsu Kaisen?</h3>
              <p>
                As a standout title in the modern shonen genre, <strong className="text-gray-900 dark:text-white">Jujutsu Kaisen</strong> strikes a perfect balance between horror, high-octane action, and humor. Its unique power system based on Cursed Energy and complex, morally grey characters have captivated millions. Whether you are searching for the <strong>best new gen manga</strong> or simply want a gripping story, this series delivers unforgettable battles and emotional depth.
              </p>
            </div>
          </div>
        </section>

        {/* Major Story Arcs */}
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="text-jjk-red" />
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why Read Jujutsu Kaisen Manga on this Site?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Experience <strong>Jujutsu Kaisen manga</strong> like never before with high-quality scans and regularly updated chapters. Dive into the thrilling JJK storyline at your own pace—without delays or interruptions. Our user-friendly interface makes it easy to navigate through all chapters and follow your favorite characters seamlessly. Whether you’re a first-time reader or picking up where you left off, this is the best place to read Jujutsu Kaisen manga online—anytime, anywhere in the world.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Differences between JJK Manga and Anime?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The <strong>Jujutsu Kaisen manga</strong> offers a deeper and more detailed experience compared to its anime adaptation. While the anime delivers stunning visuals and fast-paced action, it often condenses major fight scenes and skips certain dialogues for time. In contrast, the manga explores character backstories, motivations, and emotional depth through dedicated chapters. Key plot points and world-building elements are more thoroughly explained in the manga, giving fans a richer understanding of the Jujutsu Kaisen universe.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Is the Jujutsu Kaisen Manga Finished?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                As of late 2024, the <strong>Jujutsu Kaisen manga</strong> is approaching its exciting conclusion. Key arcs like the Shinjuku Showdown are wrapping up the main storyline. New chapters are released weekly in Shonen Jump, and we update our library immediately so you can stay current with the latest plot twists and battles.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Where should I start reading?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                If you are new to the series, start with <Link to="/chapter/1" className="text-jjk-red hover:underline">Chapter 1</Link>. If you have watched the first season of the anime and the movie, you can pick up the manga around <strong>Chapter 64</strong> (Hidden Inventory Arc) or <strong>Chapter 80</strong> (Shibuya Incident). Reading from the beginning is highly recommended to catch all the details the anime might have missed.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;