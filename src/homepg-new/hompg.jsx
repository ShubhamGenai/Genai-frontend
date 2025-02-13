import { useEffect, useState } from 'react';
import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";

export default function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sectionRef, setSectionRef] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      if (sectionRef) {
        const rect = sectionRef.getBoundingClientRect();
        setIsInView(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return (
    <div>
      <div className="text-center text-3xl text-gray-500 mt-24 mb-24">
        Unlocking your Future with <span className="text-black font-medium">AI</span> -
        <span className="font-bold text-black"> Smarter</span>,
        <span className="font-bold text-black"> Faster</span>,
        <span className="font-bold text-black"> Better</span>
      </div>

      {/* Sections Container */}
      <div 
        ref={setSectionRef} 
        className="relative h-[200vh] overflow-hidden"
      >
        {/* Learn Section */}
        <section className="bg-white mx-20 sticky top-0">
          <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-20">
            {/* Learn Section Content */}
            <div className="md:w-1/2">
              <h4 className="text-gray-500 uppercase text-sm tracking-wide">Learn</h4>
              <h2 className="text-4xl mt-7 text-gray-900">
                <span className="font-bold text-black">Learn </span> anything,
                <span className="text-black font-bold"> Achieve </span> <br /> everything
              </h2>
              <p className="text-gray-600 mt-8">
                With 1.8+ Crore Students and one of the best selection rates in<br /> India amongst
                online learning platforms, you can surely rely on <br />us to excel.
              </p>
              <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Start learning now! →
              </button>
            </div>

            {/* Learn Section Cards */}
            <div className="md:w-1/2 flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
              {/* Your existing learn section cards */}
            </div>
          </div>
        </section>

        {/* Test Section */}
        <section 
          className="bg-white mx-20 sticky top-0"
          style={{
            transform: isInView ? `translateY(${Math.min(Math.max(scrollPosition % window.innerHeight - 300, -window.innerHeight), 0)}px)` : 'none',
            zIndex: isInView && scrollPosition % window.innerHeight > 300 ? 20 : 10,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-20">
            {/* Test Section Content */}
            <div className="md:w-1/2">
              <h4 className="text-gray-500 uppercase text-sm tracking-wide">Tests</h4>
              <h2 className="text-4xl mt-7 text-gray-900">
                <span className="font-bold text-black">Test </span>your skills,
                <span className="text-black font-bold"> Ace </span>your <br /> goals!
              </h2>
              <p className="text-gray-600 mt-8">
                With 1.8+ Crore Students and one of the best selection rates in<br /> India amongst
                online learning platforms, you can surely rely on <br />us to excel.
              </p>
              <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Start testing now! →
              </button>
            </div>

            {/* Test Section Cards */}
            <div className="md:w-1/2 flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
              {/* Your existing test section cards */}
            </div>
          </div>
        </section>
      </div>

      {/* Rest of your content */}
    </div>
  );
}