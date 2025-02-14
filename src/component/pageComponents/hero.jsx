const HeroSection = () => {
  return (
    <div className="relative isolate ">
      {/* Wave background */}
      <div className="absolute inset-0 lg:mt-[170px] overflow-hidden -z-10">
        <img
          src="Hero.png"
          alt="Description"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-24 px-4">
        {/* Logo/Title */}
        <div className="text-center mt-14">
          <h1 className="text-6xl font-bold mb-3 font-sans">
            Gen{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-700 text-transparent bg-clip-text">
              Ai
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 mt-2 tracking-widest font-medium mb-4"
            style={{ fontFamily: "SF Pro Display, sans-serif" }}
          >
            The future of learning
          </p>
        </div>

        {/* Get Started Button */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-12">
          Get Started
        </button>

        {/* Avatar Group */}
        <div className="flex -space-x-2 mt-24">
          {[
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png",
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNS0zODUucG5n.png",
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtZWxlbWVudC0xOS5wbmc.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU",
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`User ${index + 1}`}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>

        {/* Stats Text */}
        <p className="text-sm text-gray-600 mt-4 tracking-wide uppercase font-medium text-center">
          Over 5000 students and 1000 employers are already using Gen AI Learning.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
