import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between mt-8 max-w-6xl mx-auto px-4 sm:px-2">
      <a href="/" className="flex items-center gap-2">
        <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center">
          <LuGraduationCap className='text-white w-7 h-7'/>
        </div>
        <span className="font-semibold text-lg">GenAi Learning</span>
      </a>

      <div className="hidden sm:flex flex-1 justify-center items-center gap-4 md:gap-10 lg:gap-14">
        <a href="/learn" className="text-gray-600 hover:text-gray-900">
          Learn
        </a>
        <a href="/tests" className="text-gray-600 hover:text-gray-900">
          Tests
        </a>
        <a href="/jobs" className="text-gray-600 hover:text-gray-900">
          Jobs
        </a>
        <a href="/leaderboard" className="text-gray-600 hover:text-gray-900">
          Leaderboard
        </a>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        <MdOutlineShoppingCart className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 text-sm sm:text-base">
          Sign in
        </button>
      </div>
    </nav>
  );
}
