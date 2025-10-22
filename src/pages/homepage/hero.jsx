// HeroSection.jsx
import '@fontsource/inter'; // Import the Inter font
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mainContext } from '../../context/MainContext';
const HeroSection = () => {
  const {user,token}= useContext(mainContext)
  const navigate = useNavigate();
 

  const handleGetStarted = () => {
    if (token) {
      navigate("/learn"); // user is logged in
    } else {
      navigate("/login-landing"); // not logged in
    }
  };
  return (
    <div className="">
      {/* Wave background */}
      <div className="absolute inset-0 lg:mt-[20px] overflow-hidden">
        <div className="top-0 left-0 w-screen overflow-hidden z-0 mr-40">
          <img
            src="Hero.png"
            alt="Description"
            className="w-screen h-screen object-cover transform scale-100"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-24 px-4 ">
        {/* Logo/Title */}
        <div className="text-center mt-14" id="font">
        <h1 className="text-5xl sm:text-6xl font-sfu font-bold px-2 mb-3 py-2 tracking-wide">
  Gen{' '}
  <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
    Ai
  </span>
</h1>

          <p
            className="text-lg sm:text-2xl text-gray-700 mt-2 opacity-80 tracking-widest font-semibold mb-4 py-4"
            style={{ fontFamily: 'SF Pro Display, sans-serif' }}
          >
            The future of learning
          </p>
        </div>

        {/* Get Started Button */}
      
       
        <button className="bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-12" onClick={handleGetStarted}>
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
        <p className="text-xs sm:text-sm text-gray-600 mt-4 tracking-wide uppercase font-semibold text-center">
          OVER 5000 STUDENTS AND 1000 EMPLOYERS ARE ALREADY USING GEN AI LEARNING.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;










// import '@fontsource/inter'; // Import the Inter font
// import { Link } from 'react-router-dom';
// import Threads from '../../component/ui/styles/Thread';

// const HeroSection = () => {
//   return (
//     <div className="">
//       {/* Threads background replacing wave background */}
//       <div className="absolute inset-0 lg:mt-[100px] overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden z-0 h-100vh bottom-[200px] height-[600px]">
//         <Threads
//           amplitude={2.5}
//           distance={0.2}
//           enableMouseInteraction={true}
//           color={ [
//             [59 / 255, 130 / 255, 246 / 255] 

         
//           ]}
//         />
//       </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center mt-24 px-4">
//         {/* Logo/Title */}
//         <div className="text-center mt-14">
//           <h1 className="text-4xl sm:text-6xl font-bold mb-3 ">
//             Gen{' '}
//             <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
//               Ai
//             </span>
//           </h1>

//           <p
//             className="text-lg sm:text-xl text-gray-600 mt-2 opacity-80 tracking-widest font-semibold mb-4"
//             style={{ fontFamily: 'SF Pro Display, sans-serif' }}
//           >
//             The future of learning
//           </p>
//         </div>

//         {/* Get Started Button */}
//         <Link to="/login-landing">
//         <button className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-12">
//           Get Started
//         </button>
//         </Link>

//         {/* Avatar Group */}
//         <div className="flex -space-x-2 mt-10 sm:mt-[70px]">
//               <img
//             src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png"
//             alt="User"
//             className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
//           />
          
//           <img
//             src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNS0zODUucG5n.png"
//             alt="User"
//             className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
//           />
//           <img
//             src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtZWxlbWVudC0xOS5wbmc.png"
//             alt="User"
//             className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
//           />
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU"
//             alt="User"
//             className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-white"
//           />
//         </div>

//         {/* Stats Text */}
//         <p className="text-xs sm:text-sm text-gray-600 mt-4 tracking-wide uppercase font-medium text-center">
//           OVER 5000 STUDENTS AND 1000 EMPLOYERS ARE ALREADY USING GEN AI LEARNING.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;