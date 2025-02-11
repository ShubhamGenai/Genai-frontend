import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";


export default function LeaderboardSection() {
  return (
    <section className="bg-white py-16 mr-20 ml-20 ">
      <div className=" flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-20">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h4 className="text-gray-500 uppercase text-sm tracking-wide">JOBS</h4>
          <h2 className="text-4xl mt-7 font-bold text-gray-900">
          Climb the <span className="font-extrabold">Ranks</span>, Unlock<br/> Your <span className="font-extrabold">Future</span>
          </h2>
          <p className="mb-11 mt-6">
              The better your rank, the brighter your career. Top the<br/> leaderboard, showcase your skills, and grab exclusive job offers<br/> from leading recruiters.
            </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Start learning now! →
          </button>
        </div>

        {/* Course Cards Section */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-4 mt-8 md:mt-0">

            <img
              src="./courses/leaderboard.png"
              alt="Data Analytics"
              className=" w-full"
            />
           

        </div>
      </div>
    </section>
  );
}
