import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { LuNotebookText } from "react-icons/lu";

export default function TestSection() {
  return (
    <div className="w-full">
      <section className="bg-white pt-16 w-full flex justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10"
         style={{
          backgroundImage: "url('./bgs/bg.png')",
         
          backgroundPosition: "center",
          
        }}>
          {/* Left Text Section */}
          <div className="md:w-1/2 py-10">
            <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">Tests</h4>
            <h2 className="text-4xl mt-7 text-gray-900">
              <span className="font-bold text-black">Test </span><span className='font-semibold'>your skills,{" "}</span>
              <span className="text-black font-bold">Ace </span><span className='font-semibold'>your <br /> goals!</span>
            </h2>
            <p className="text-gray-600 mt-8">
              With 1.8+ Crore Students and one of the best selection rates in
              <br /> India amongst online learning platforms, you can surely rely on{" "}
              <br />us to excel.
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Start learning now! →
            </button>
          </div>

          {/* Course Cards Section */}
          <div className="w-full md:w-[670px] flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px]">
              <img
                src="./courses/jee.png"
                alt="Data Analytics"
                className="w-full"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold mt-3">Data Analytics</h3>
                <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
                  <span className="flex items-center gap-1">
                    <LuNotebookText /> 5K+ Learners
                  </span>
                  <span className="flex items-center gap-1">
                    <WiTime4 /> 2 hours
                  </span>
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px]">
              <img
                src="./courses/jee.png"
                alt="Prompt Engineering"
                className="w-full"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold mt-3">Data Analytics</h3>
                <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
                  <span className="flex items-center gap-1">
                    <LuNotebookText /> 5K+ Learners
                  </span>
                  <span className="flex items-center gap-1">
                    <WiTime4 /> 2 hours
                  </span>
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px]">
              <img
                src="./courses/jee.png"
                alt="Design with AI"
                className="w-full"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold mt-3">Data Analytics</h3>
                <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
                  <span className="flex items-center gap-1">
                    <LuNotebookText /> 5K+ Learners
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
