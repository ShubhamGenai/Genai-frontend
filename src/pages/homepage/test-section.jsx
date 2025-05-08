import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { LuNotebookText } from "react-icons/lu";
import { Link } from "react-router-dom";
import { testCards } from "../../constants/testData"; 

export default function TestSection() {
  return (
    <div className="w-full">
           <section className="bg-white pt-16 w-full flex justify-center">
            <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10"
             style={{
              backgroundImage: "url('./bgs/bg.png')",
              backgroundPosition: "center",
            }}>
          {/* Left Section */}
          <div className="md:w-1/2 py-10">
            <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">
              Tests
            </h4>
            <h2 className="text-4xl mt-7 text-gray-900">
              <span className="font-bold text-black">Test </span>
              <span className="font-semibold">your skills, </span>
              <span className="text-black font-bold">Ace </span>
              <span className="font-semibold">
                your <br /> goals!
              </span>
            </h2>
            <p className="text-gray-600 mt-8">
              With 1.8+ Crore Students and one of the best selection rates in
              <br /> India amongst online learning platforms, you can surely
              rely on <br />
              us to excel.
            </p>
            <Link to="/tests">
              <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Start learning now! →
              </button>
            </Link>
          </div>

          {/* Right Cards Section */}
          <div className="w-full md:w-[670px] flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
  {testCards.map((test) => (
    <div
      key={test.id}
      className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px] transform transition-transform "
    >
      {/* Title and Tag - Always Positioned Over the Image */}
      <div className="absolute top-4 left-4 z-10 text-black">
        <h3 className="text-lg font-semibold mt-3">{test.title}</h3>
        <button
          className={`inline-block text-xs text-white px-2 py-1 mt-2 rounded ${test.tagColor}`}
        >
          {test.tag}
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={test.image}
          alt="Test Sheet"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>

      <div className="bg-white p-4 rounded-b-lg">
        <h4 className="font-semibold text-gray-800">{test.subject}</h4>
        <div className="text-sm text-gray-600 mt-2 flex flex-col gap-1">
          <span className="flex items-center gap-1">
            <LuNotebookText /> {test.questions}
          </span>
          <span className="flex items-center gap-1">
            <WiTime4 /> {test.duration}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
}



//fetch dat from backend and display it in the test section

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MdOutlineGroup } from "react-icons/md";
// import { WiTime4 } from "react-icons/wi";
// import { LuNotebookText } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { fetchLatestCoursesAndTests } from "../../redux/DataSlice";

// export default function TestSection() {
//   const dispatch = useDispatch();
//   const { latestCourses, latestTests, status, error } = useSelector((state) => state.data);

//   useEffect(() => {
//     dispatch(fetchLatestCoursesAndTests());  // Dispatch to fetch latest courses and tests
//   }, [dispatch]);

//   if (status === "loading") {
//     return <div className="flex justify-center items-center h-[300px]">
//     <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//   </div>;
//   }

//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="w-full">
//       <section className="bg-white pt-16 w-full flex justify-center">
//         <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10"
//          style={{
//           backgroundImage: "url('./bgs/bg.png')",
//           backgroundPosition: "center",
//         }}>
//           {/* Left Text Section */}
//           <div className="md:w-1/2 py-10">
//             <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">Tests</h4>
//             <h2 className="text-4xl mt-7 text-gray-900">
//               <span className="font-bold text-black">Test </span><span className='font-semibold'>your skills,{" "}</span>
//               <span className="text-black font-bold">Ace </span><span className='font-semibold'>your <br /> goals!</span>
//             </h2>
//             <p className="text-gray-600 mt-8">
//               With 1.8+ Crore Students and one of the best selection rates in
//               <br /> India amongst online learning platforms, you can surely rely on{" "}
//               <br />us to excel.
//             </p>
//             <Link to="/tests">
//               <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
//                 Start learning now! →
//               </button>
//             </Link>
//           </div>

//           {/* Test Cards Section */}
//           <div className="w-full md:w-[670px] flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
//             {latestTests.map((test) => (
//               <Link
//                 key={test._id}
//                 to={`/test-details?id=${test._id}`}  // Pass the test ID in the URL query
//                 className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px] transform transition-transform hover:scale-105 hover:shadow-xl"
//               >
//                 <img
//                   src={test.image || "./courses/jee.png"}  // Replace this with the actual image path from the test data
//                   alt={test.title}
//                   className="w-full"
//                 />
//                 <div className="p-2">
//                   <h3 className="text-lg font-semibold mt-3">{test.title}</h3>
//                   <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
//                     <span className="flex items-center gap-1">
//                       <LuNotebookText /> {test.enrolledStudentsCount || "0"}+ Learners
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <WiTime4 /> {test.duration || "N/A"} hours
//                     </span>
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
