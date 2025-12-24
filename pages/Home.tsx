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
        title="Blue Box Manga - Read Online High Quality"
        description="Read Blue Box Manga online in high quality. The best place for Blue Box chapters, character info, and latest updates. All chapters available."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Blue Box Manga",
          "url": "https://readbluebox.com",
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-bb-dark py-20">
        <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
          <img
            src="/blue-box.webp"
            alt=""
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bb-dark via-bb-dark/60 to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-4 drop-shadow-2xl tracking-tighter text-center">
            BLUE <span className="text-bb-blue">BOX MANGA</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
            Read Blue Box Manga Online In High Quality, All Chapters and Volumes in English With HD scans and No Sign-Up Required.
          </p>

          {/* Info Card */}
          <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Column: Stats & Meta */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">

                {/* Rating Block */}
                <div className="col-span-2 sm:col-span-4 flex items-center gap-3 mb-2" aria-label="rated 4.8 out of 5 stars">
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
                  <span className="text-white font-medium">2021</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Status</span>
                  <span className="text-green-400 font-bold">Ongoing</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Type</span>
                  <span className="text-white font-medium">Shounen, Romance, Sports</span>
                </div>

                <div className="col-span-2 sm:col-span-4 flex flex-col gap-3 mt-2">
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Author(s):</span>
                    <span className="text-white hover:text-bb-blue cursor-pointer transition-colors">Kouji Miura</span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Genre(s):</span>
                    {['Romance', 'Sports', 'School Life', 'Slice of Life', 'Drama', 'Badminton'].map(g => (
                      <span key={g} className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {g},
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 items-start border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Synopsis:</span>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <strong className="text-white">Taiki Inomata</strong>, a student at Eimei Junior and Senior High who is on the boys' badminton team, has a crush on the basketball star <strong className="text-white">Chinatsu Kano</strong>, the older girl he trains alongside every morning in the gymnasium.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions/Social Proof */}
              <div className="flex lg:flex-col justify-center items-center gap-8 min-w-[140px]">
                <div className="text-center group w-full">
                  <MessageCircle className="w-8 h-8 text-gray-500 group-hover:text-bb-blue mx-auto mb-2 transition-colors" />
                  <span className="block text-2xl font-bold text-white">256</span>
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
                  <Bookmark className="w-8 h-8 text-bb-blue mx-auto mb-2 fill-bb-blue group-hover:scale-110 transition-transform" />
                  <span className="block text-2xl font-bold text-white">1k</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-bb-blue transition-colors">Bookmark Now</span>
                </button>
              </div>
            </div>
          </div>

          {latestChapter && (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to={`/chapter/${latestChapter.number}`}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-bb-blue hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
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
              <BookOpen className="text-bb-blue" /> Latest Releases
            </h2>
            <Link to="/manga" className="text-bb-blue hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chapters.slice(0, 12).map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.number}`}
                className="group relative flex flex-col justify-between h-full bg-[#1a1a1a] backdrop-blur-sm rounded-lg border border-white/10 p-5 hover:border-bb-blue/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-bb-blue/10"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-bb-blue uppercase tracking-wider">
                    Chapter {chapter.number}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-bb-blue transition-colors line-clamp-2">
                    {chapter.title}
                  </h3>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Read Now</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-bb-blue group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">About Blue Box</h2>
            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-4">
              <p>
                <strong className="text-gray-900 dark:text-white">Blue Box</strong> (Japanese: アオのハコ), is a Japanese romantic comedy and sports manga series written and illustrated by <strong className="text-gray-900 dark:text-white">Kouji Miura</strong>. Readers who follow the <strong className="text-gray-900 dark:text-white">Blue Box manga</strong> are immersed in a touching coming-of-age story that has been serialized in Shueisha&apos;s <em>Weekly Shōnen Jump</em> since April 2021. The story follows <strong className="text-gray-900 dark:text-white">Taiki Inomata</strong>, a student at Eimei Junior and Senior High who plays badminton and has a crush on the basketball star Chinatsu Kano.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Sports and Romance</h3>
              <p>
                Unlike many shonen series that focus solely on battles, <strong className="text-bb-blue">Blue Box</strong> beautifully blends competitive sports with a delicate romance. When Chinatsu moves into Taiki's house due to family circumstances, their relationship deepens as they both strive to reach the Nationals in their respective sports.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Key Characters</h3>
              <p>
                The series features a lovable cast including the hardworking <strong className="text-gray-900 dark:text-white">Taiki Inomata</strong>, the talented and focused <strong className="text-gray-900 dark:text-white">Chinatsu Kano</strong>, and the rhythmic gymnast <strong className="text-gray-900 dark:text-white">Hina Chono</strong>. Together they navigate the complexities of high school life, sports training, and first loves.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Why Read Blue Box?</h3>
              <p>
                As a standout title in the modern shonen genre, <strong className="text-gray-900 dark:text-white">Blue Box</strong> offers a refreshing change of pace with its grounded storytelling and relatable characters. It captures the essence of youth, the drive to improve oneself, and the sweetness of falling in love. Whether you are a fan of sports manga or romance, this series delivers heartwarming moments and exciting tournament arcs.
              </p>
            </div>
          </div>
        </section>

        {/* Major Story Arcs */}
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="text-bb-blue" />
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why Read Blue Box Manga on this Site?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Experience <strong>Blue Box manga</strong> like never before with high-quality scans and regularly updated chapters. Dive into the heartwarming storyline at your own pace—without delays. Our user-friendly interface makes it easy to navigate through all chapters and follow your favorite characters seamlessly. Whether you’re a first-time reader or picking up where you left off, this is the best place to read Blue Box manga online.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Differences between Blue Box Manga and Anime?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The <strong>Blue Box manga</strong> offers the original vision of Kouji Miura. While the anime adaptation brings the sports action to life, the manga allows for more detailed inner monologues and pacing that perfectly captures the subtle romantic tensions. Some side stories and extra panels are also exclusive to the manga release.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Is the Blue Box Manga Finished?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                No, the <strong>Blue Box manga</strong> is currently ongoing. New chapters are released weekly in Weekly Shonen Jump, following Taiki and Chinatsu's journey towards the Nationals and their evolving relationship. We update our library immediately so you can say up to date.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Where should I start reading?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                If you are new to the series, start with <Link to="/chapter/1" className="text-bb-blue hover:underline">Chapter 1</Link>. The story builds progressively, so starting from the beginning is highly recommended to fully appreciate the character development and relationships.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;