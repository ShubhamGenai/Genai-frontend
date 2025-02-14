import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";


export default function TestSection() {
  return (
    <div className="w-full">
     <section className="bg-white py-16 w-full flex justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-20">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h4 className="text-gray-500 uppercase text-sm tracking-wide">Tests</h4>
          <h2 className="text-4xl mt-7  text-gray-900">
           <span className="font-bold text-black">Test </span>your skills,  <span className="text-black font-bold">Ace </span>your <br/> goals!
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
          <div className="bg-white border border-gray-200  shadow-sm  h-auto w-[417px] ">
            <img
              src="./courses/cat.jpg"
              alt="Data Analytics"
              className=" w-full"
            />
            <div className="p-2">
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
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200  shadow-sm  h-auto w-[417px] ">
            <img
              src="./courses/jee.jpg"
              alt="Prompt Engineering"
              className=" w-full"
            />
             <div className="p-2">
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
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200  shadow-sm  h-auto w-[417px]">
            <img
              src="./courses/neet.jpg"
              alt="Design with AI"
              className=" w-full"
            />
            <div className="p-2">
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
          </div>


        </div>
      </div>
    </section>
    </div>
  );
}
