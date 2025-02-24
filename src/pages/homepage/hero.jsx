// HeroSection.jsx
import '@fontsource/inter'; // Import the Inter font
const HeroSection = () => {
  return (
    <div className="">
      {/* Wave background */}
      <div className="absolute inset-0 lg:mt-[100px] overflow-hidden">
        <div className="top-0 left-0 w-screen overflow-hidden z-0 mr-40">
          <img
            src="Hero.png"
            alt="Description"
            className="w-screen h-screen object-cover transform scale-100"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-24 px-4">
        {/* Logo/Title */}
        <div className="text-center mt-14">
          <h1 className="text-4xl sm:text-6xl font-bold mb-3 font-sans">
            Gen{' '}
            <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
              Ai
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-600 mt-2 tracking-widest font-medium mb-4"
            style={{ fontFamily: 'SF Pro Display, sans-serif' }}
          >
            The future of learning
          </p>
        </div>

        {/* Get Started Button */}
        <button className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-12">
          Get Started
        </button>

        {/* Avatar Group */}
        <div className="flex -space-x-2 mt-10 sm:mt-[70px]">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png"
            alt="User"
            className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNS0zODUucG5n.png"
            alt="User"
            className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtZWxlbWVudC0xOS5wbmc.png"
            alt="User"
            className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU"
            alt="User"
            className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
          />
        </div>

        {/* Stats Text */}
        <p className="text-xs sm:text-sm text-gray-600 mt-4 tracking-wide uppercase font-medium text-center">
          OVER 5000 STUDENTS AND 1000 EMPLOYERS ARE ALREADY USING GEN AI LEARNING.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
