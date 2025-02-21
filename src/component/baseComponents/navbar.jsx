import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between mt-8 max-w-6xl mx-auto">
      <a href="/" className="flex items-center gap-2">
      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className='text-white w-7 h-7'/>
              </div>
        <span className="font-semibold text-lg">GenAi Learning</span>
      </a>

      <div className="hidden md:flex lg:flex flex-1 justify-center items-center gap-14">
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

      <div className="flex items-center gap-7">
        <MdOutlineShoppingCart className="text-gray-500 w-6 h-6" />
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
          Sign in
        </button>
      </div>
    </nav>
  );
}