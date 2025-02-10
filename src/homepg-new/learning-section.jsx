import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";


export default function LearningSection() {
  return (
    <section className="bg-white py-16 mr-20 ml-20 ">
      <div className=" flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-20">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h4 className="text-gray-500 uppercase text-sm tracking-wide">Learn</h4>
          <h2 className="text-4xl mt-7 font-bold text-gray-900">
            Learn anything, <span className="text-black">Achieve</span><br/> everything
          </h2>
          <p className="text-gray-600 mt-8">
            With 1.8+ Crore Students and one of the best selection rates in<br/> India amongst
            online learning platforms, you can surely rely on <br/>us to excel.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Start learning now! →
          </button>
        </div>

        {/* Course Cards Section */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-auto w-[417px] ">
            <img
              src="./courses/dataanalytics.jpg"
              alt="Data Analytics"
              className="rounded-lg w-full"
            />
            <h3 className="text-lg font-semibold mt-3">Data Analytics</h3>
            <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
              <span className="flex items-center gap-1">
                <MdOutlineGroup /> 5K+ Learners
              </span>
              <span className="flex items-center gap-1">
                <WiTime4 /> 2 hours
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-auto w-[417px] ">
            <img
              src="./courses/promptengineering.jpg"
              alt="Prompt Engineering"
              className="rounded-lg w-full"
            />
            <h3 className="text-lg font-semibold mt-3">Prompt Engineering</h3>
            <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
              <span className="flex items-center gap-1">
                <MdOutlineGroup /> 5K+ Learners
              </span>
              <span className="flex items-center gap-1">
                <WiTime4 /> 2 hours
              </span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-auto w-[417px]">
            <img
              src="./courses/designwithai.jpg"
              alt="Design with AI"
              className="rounded-lg w-full"
            />
            <h3 className="text-lg font-semibold mt-3">Design with AI</h3>
            <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
              <span className="flex items-center gap-1">
                <MdOutlineGroup /> 5K+ Learners
              </span>
              <span className="flex items-center gap-1">
                <WiTime4 /> 2 hours
              </span>
            </p>
          </div>


        </div>
      </div>
    </section>
  );
}
