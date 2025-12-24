import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MangaProvider } from './context/MangaContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MangaList from './pages/MangaList';
import ChapterReader from './pages/ChapterReader';
import Characters from './pages/Characters';
import About from './pages/About';
import Legal from './pages/Legal';
// Wrapper to conditionally render layout based on path
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MangaProvider>
      <ThemeProvider>
        <Router>
          {/* Helps scroll to top on navigation */}
          <div className="font-sans antialiased text-gray-100 bg-[#121212] transition-colors duration-200 min-h-screen">
            <Routes>
              <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
              <Route path="/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
              <Route path="/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
              <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
              <Route path="/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />

              <Route path="/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
              <Route path="/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
              <Route path="/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />

              {/* Reader often needs less layout distraction, but keeping Nav for consistency. 
                  Could make a dedicated ReaderLayout here. */}
              <Route path="/chapter/:chapterId" element={
                <>
                  <ChapterReader />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </MangaProvider>
  );
};

export default App;