import React from "react";
import { GraduationCap} from "lucide-react";

export default function Part3() {
 

  return (
    <div className="container mx-auto">
    <div className=" mx-auto px-4 py-8 md:ml-40 md:mr-40 lg:mx-[130px] mb-7">
    
      {/* Job Section */}
      <div className="bg-blue-600 text-white p-8 rounded-3xl shadow flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-6 p-10 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            
            <h2 className="text-3xl "><span className="font-bold">Empower</span> Your Learning <br/><span className="">Journey</span></h2>
          </div>
          <p className="mb-4 text-1xl">
          The better your rank, the brighter your career. Top the <br/> leaderboard, showcase your skills, and grab exclusive<br/> job offers from leading recruiters.          </p>
          <button className="px-4 py-2 mt-7  text-white border border-white rounded-lg font-semibold ">
          Start learning now! →
          </button>
        </div>
        <div className="flex-1 lg:-mb-8 flex justify-center">
          {/* <img
            src="./landing/student.png"
            alt="Professional with laptop"
            className="max-w-full h-[270px]"
          /> */}
        </div>
      </div>
    </div>
    </div>
  );
}
