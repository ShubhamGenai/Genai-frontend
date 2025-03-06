import { useContext, useEffect, useState } from 'react';
import LearningSection from './learning-section';
import TestSection from './test-section';
import LeaderboardSection from './leaderboard';


export default function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Z-index logic: Each card gets a higher z-index when activated
  const getZIndex = (threshold) => (scrollPosition > threshold ? 30 : 10);
  
  // TranslateY logic: Negative offsets to move cards up
  const getTranslateY = (threshold, offset = 0) => {
    const start = threshold - 300;
    if (scrollPosition > threshold) return '0%'; // Fully visible
    if (scrollPosition > start) {
      const progress = (scrollPosition - start) / 300;
      return `${-offset * progress}%`; // Apply negative offset based on scroll
    }
    return '50%'; // Initial half-covered state
  };

  // Common class for all sections
  const sectionClass = "sticky top-1/2 bg-white w-[80%] max-w-4xl p-16 border rounded-lg shadow-lg transition-transform duration-300";

  return (
    <div>
      <div className="text-center text-3xl text-gray-500 mt-24 mb-24">
        Unlocking your Future with <span className="text-black font-medium">AI</span> -
        <span className="font-bold text-black"> Smarter</span>,
        <span className="font-bold text-black"> Faster</span>,
        <span className="font-bold text-black"> Better</span>
      </div>

      {/* Sections Container */}
      <div className="relative h-[300vh]">
        {/* Learn Section */}
        <section
          className={sectionClass}
          style={{
            left: '50%',
            transform: `translateX(-50%) translateY(-50%) translateY(${getTranslateY(300, 50)})`,
            zIndex: getZIndex(300),
          }}
        >
          <LearningSection />
        </section>

        {/* Test Section */}
        <section
          className={sectionClass}
          style={{
            left: '50%',
            transform: `translateX(-50%) translateY(-50%) translateY(${getTranslateY(600, 50)})`,
            zIndex: getZIndex(600),
          }}
        >
          <TestSection />
        </section>

        {/* Dash Section */}
        <section
          className={sectionClass}
          style={{
            left: '50%',
            transform: `translateX(-50%) translateY(-50%) translateY(${getTranslateY(900, 50)})`,
            zIndex: getZIndex(900),
          }}
        >
          <LeaderboardSection />
        </section>
      </div>
    </div>
  );
}