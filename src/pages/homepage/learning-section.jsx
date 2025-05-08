import { MdOutlineGroup } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLatestCoursesAndTests } from "../../redux/DataSlice";

export default function LearningSection() {
  const dispatch = useDispatch();
  const { latestCourses, latestTests, status, error } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    dispatch(fetchLatestCoursesAndTests());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-[300px]">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <section className="bg-cover bg-center pt-16 w-full flex justify-center">
        <div
          className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-10 mt-5"
          style={{
            backgroundImage: "url('./bgs/bg.png')",
            backgroundPosition: "center",
          }}
        >
          {/* Left Text Section */}
          <div className="md:w-1/2 py-10">
            <h4 className="text-gray-500 uppercase text-sm tracking-wide font-semibold">Learn</h4>
            <h2 className="text-4xl mt-7 text-gray-900">
              <span className="font-bold text-black">Learn </span>
              <span className="font-semibold"> anything, </span>
              <span className="text-black font-bold">Achieve </span>
              <br />
              <span className="font-semibold">everything</span>
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
            {latestCourses?.slice(0, 3).map((course) => (
              <Link
                key={course._id}
                to={`/course-details?id=${course._id}`}
                className="bg-white border border-gray-200 rounded-md shadow-sm h-auto w-full md:w-[417px] transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={course.imageUrl || "/cards/Neet.jpeg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-2">
                  <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
                  <p className="text-gray-500 text-sm flex flex-col gap-1 mt-1">
                    <span className="flex items-center gap-1">
                      <MdOutlineGroup /> {course.enrolledStudents?.length || 0}+ Learners
                    </span>
                    <span className="flex items-center gap-1">
                      <WiTime4 /> {course.duration || "N/A"} hours
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
