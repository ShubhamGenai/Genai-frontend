import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { Link } from "react-router-dom";

export default function LearningSection() {
  return (
    <div className="w-full">
      <section
        className="bg-cover bg-center pt-16 w-full flex justify-center"
       
      >
         <div
    className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10 mt-5 "
    style={{
      backgroundImage: "url('./bgs/bg.png')",
     
      backgroundPosition: "center",
      
    }}
  >
          {/* Left Text Section */}
          <div className="md:w-1/2 py-10">
            <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">Learn</h4>
            <h2 className="text-4xl mt-7 text-gray-900">
              <span className="font-bold text-black">Learn </span><span className='font-semibold'> anything,
              </span><span className="text-black font-bold"> Achieve </span> <br /><span className='font-semibold'> everything</span>
            </h2>
            <p className="text-gray-600 mt-8">
              With 1.8+ Crore Students and one of the best selection rates in
              <br /> India amongst online learning platforms, you can surely rely on
              <br /> us to excel.
            </p>
            <Link to="/learn">
          
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Start learning now! →
            </button>
            </Link>
          </div>

          {/* Course Cards Section */}
          <div className="w-full md:w-[670px] flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
  {[
    {
      title: "Data Analytics",
      img: "/cards/Neet.jpeg",
      learners: "5K+ Learners",
      duration: "2 hours",
    },
    {
      title: "Prompt Engineering",
      img:  "/cards/test1.jpeg",
      learners: "8K+ Learners",
      duration: "3 hours",
    },
    {
      title: "Design with AI",
      img:  "/cards/test2.jpeg",
      learners: "6K+ Learners",
      duration: "2.5 hours",
    },
  ].map((course, index) => (
    <div
      key={index}
      className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px]"
    >
      <img src={course.img} alt={course.title} className="w-full h-48 object-cover rounded-t-md" />
      <div className="p-2">
        <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
        <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
          <span className="flex items-center gap-1">
            <MdOutlineGroup /> {course.learners}
          </span>
          <span className="flex items-center gap-1">
            <WiTime4 /> {course.duration}
          </span>
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
}
