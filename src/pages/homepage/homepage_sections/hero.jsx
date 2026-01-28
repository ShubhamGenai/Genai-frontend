// HeroSection.jsx
import '@fontsource/inter'; // Import the Inter font
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles } from 'lucide-react';
import { mainContext } from '../../../context/MainContext';


const HeroSection = () => {
  const {user, token} = useContext(mainContext);
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const handleGetStarted = () => {
    navigate("/learn");
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
  };

  const handleCloseDemo = () => {
    setShowDemo(false);
  };

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="Hero.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 flex flex-col items-center text-center">
        {/* Powered by AI badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium hover:bg-blue-200 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
          Powered by AI
        </div>

        {/* Title */}
        <h1 className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          Gen{' '}
          <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
            AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl px-2">
          11B+ parameters powering your personalized learning experience
        </p>

        {/* CTA buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium 
                     hover:bg-black hover:scale-105 hover:shadow-lg
                     active:scale-95 
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Get Started Free
          </button>
          
          <button
            type="button"
            onClick={handleWatchDemo}
            className="w-full sm:w-auto bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium 
                     inline-flex items-center justify-center gap-2 
                     hover:bg-white hover:border-gray-300 hover:scale-105 hover:shadow-lg
                     active:scale-95
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                     group"
          >
            <span>Watch Demo</span>
            <Play className="w-4 h-4 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300" />
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-8 sm:mt-10 text-gray-500 text-xs sm:text-sm font-medium hover:text-gray-700 transition-colors duration-300">
          Trusted by 100,000+ learners worldwide
        </div>

        {/* Category chips */}
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg sm:max-w-2xl">
          {['NCERT Aligned', 'IIT-JEE', 'NEET', 'SSC', 'Professional'].map((label) => (
            <span 
              key={label} 
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-100/80 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-medium
                       hover:bg-gray-200 hover:scale-105 hover:shadow-md
                       cursor-pointer transition-all duration-300 ease-in-out
                       border border-transparent hover:border-gray-300"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                How GenAI Tests Work
              </h3>
              <button
                onClick={handleCloseDemo}
                className="text-gray-500 hover:text-gray-800 text-xl leading-none px-2"
                aria-label="Close demo video"
              >
                ×
              </button>
            </div>
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Iwc61rgNMCU?autoplay=1&mute=1&vq=hd1080"
                title="How the test works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;