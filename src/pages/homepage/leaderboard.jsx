import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import {Link} from "react-router-dom";
export default function LeaderboardSection() {
  return (
    <div className="w-full">
      <section className="bg-white py-16 w-full flex justify-center ">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10"
         style={{
          backgroundImage: "url('./bgs/bg.png')",
         
          backgroundPosition: "center",
          
        }}>
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 py-10">
            <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">JOBS</h4>
            <h2 className="text-4xl mt-7 font-bold text-gray-900">
            <span className='font-semibold'> Climb the </span><span className="font-extrabold">Ranks</span>, <span className='font-semibold'>Unlock<br /> Your </span><span className="font-extrabold">Future</span>
            </h2>
            <p className="mb-11 mt-6">
              The better your rank, the brighter your career. Top the<br /> leaderboard, showcase your skills, and grab exclusive job offers<br /> from leading recruiters.
            </p>
            <Link>
     
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Start learning now! →
            </button>
            </Link>
          </div>

          {/* Course Cards Section */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
            <img
              src="./courses/leaderboard.png"
              alt="Data Analytics"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
