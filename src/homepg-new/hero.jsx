// HeroSection.jsx
const HeroSection = () => {
  return (
    <div className="  ">
      {/* Wave background */}
      <div className="absolute inset-0 lg:mt-[170px] overflow-hidden">
        <div className="absolute w-full h-full">
          <img
            src="Hero.png"
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-40 px-4">
        {/* Logo/Title */}
        <div className="text-center  mb-4">
          <h1 className="text-6xl font-bold mb-3">
            Gen <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
              Ai
            </span>

          </h1>
          <p className="text-xl text-gray-600 mt-2 tracking-widest font-medium mb-4" style={{ fontFamily: 'SF Pro Display, sans-serif' }}>
            The future of learning
          </p>


        </div>

        {/* Get Started Button */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-12">
          Get Started
        </button>

        {/* Avatar Group */}
        <div className="flex -space-x-2 mt-[85px] ">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
            />
          ))}
        </div>

        {/* Stats Text */}
        <p className="text-sm text-gray-600 mt-4 tracking-wide uppercase font-medium">
          OVER 5000 STUDENTS AND 1000 EMPLOYERS ARE ALREADY USING GEN AI LEARNING.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;