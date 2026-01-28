import { UserCircleIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon, SearchIcon } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { mainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import DashboardNotifications from "./DashboardNotifications";
import { USERENDPOINTS } from "../../constants/ApiConstants";

export const Header = () => {
  const { user, signOut, token } = useContext(mainContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ tests: [], courses: [], library: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults({ tests: [], courses: [], library: [] });
      setIsSearching(false);
      setShowSearchDropdown(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery.trim());
    }, 400);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const performSearch = async (query) => {
    try {
      setIsSearching(true);
      setShowSearchDropdown(true);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [testsRes, coursesRes, libraryRes] = await Promise.all([
        axios.get(USERENDPOINTS.GETTESTS, { headers }),
        axios.get(USERENDPOINTS.GETCOURSES, { headers }),
        axios.get(USERENDPOINTS.GET_LIBRARY_DOCUMENTS, { headers }),
      ]);

      const tests = (Array.isArray(testsRes.data) ? testsRes.data : testsRes.data?.tests || [])
        .filter((t) =>
          String(t.title || t.name || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 5);

      const courses = (Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data?.courses || [])
        .filter((c) =>
          String(c.title || c.name || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 5);

      const libraryDocs = (Array.isArray(libraryRes.data) ? libraryRes.data : libraryRes.data?.documents || [])
        .filter((d) =>
          String(d.title || d.name || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 5);

      setSearchResults({ tests, courses, library: libraryDocs });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults({ tests: [], courses: [], library: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchResultClick = (item, type) => {
    setShowSearchDropdown(false);
    if (type === "test") {
      const id = item._id || item.id;
      if (id) {
        navigate(`/student/test-details?id=${id}`, { state: { testId: id } });
      }
    } else if (type === "course") {
      const id = item._id || item.id;
      if (id) {
        navigate(`/student/learn/details/${id}`);
      }
    } else if (type === "library") {
      navigate("/student/library", {
        state: { search: searchQuery },
      });
    }
  };

  const hasResults =
    searchResults.tests.length > 0 ||
    searchResults.courses.length > 0 ||
    searchResults.library.length > 0;

  const goToFullResults = () => {
    if (!searchQuery.trim()) return;
    setShowSearchDropdown(false);
    navigate(`/student/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/student/profile');
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    // Navigate to settings page when implemented
    setIsDropdownOpen(false);
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-3 md:px-4 py-1.5 md:py-1.5">
      <div className="flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex items-center space-x-1.5 md:space-x-2 min-w-0 flex-1">
          <h2 className="text-lg sm:text-md lg:text-lg font-normal text-black truncate">
            <span className="hidden sm:inline">Welcome back, </span>
            <span className="sm:hidden">Hi, </span>
            {user?.name || user?.firstName || 'Student'}!
          </h2>
        </div>
        
        {/* Right Section - Actions */}
        <div className="flex items-center space-x-1.5 md:space-x-2">
          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <FaMagnifyingGlass className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses, tests, library..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSearchDropdown(true)}
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 text-xs"
            />

            {/* Search dropdown */}
            {showSearchDropdown && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-40 max-h-80 overflow-y-auto">
                {isSearching && (
                  <div className="px-3 py-2 text-[11px] text-gray-500">
                    Searching...
                  </div>
                )}
                {!isSearching && !hasResults && (
                  <div className="px-3 py-2 text-[11px] text-gray-500">
                    No results found.
                  </div>
                )}

                {!isSearching && hasResults && (
                  <div className="py-1">
                    {searchResults.tests.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Tests
                        </div>
                        {searchResults.tests.map((t) => (
                          <button
                            key={t._id || t.id}
                            type="button"
                            onClick={() => handleSearchResultClick(t, "test")}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {t.title}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {t.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.courses.length > 0 && (
                      <div className="mt-1 border-t border-gray-100">
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Courses
                        </div>
                        {searchResults.courses.map((c) => (
                          <button
                            key={c._id || c.id}
                            type="button"
                            onClick={() => handleSearchResultClick(c, "course")}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {c.title}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {c.instructor || c.subject}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.library.length > 0 && (
                      <div className="mt-1 border-t border-gray-100">
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Library
                        </div>
                        {searchResults.library.map((d) => (
                          <button
                            key={d._id || d.id}
                            type="button"
                            onClick={() => handleSearchResultClick(d, "library")}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {d.title || d.name}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {d.category || d.type}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={goToFullResults}
                      className="w-full mt-1 border-t border-gray-100 px-3 py-1.5 text-[11px] text-blue-600 hover:bg-gray-50 text-left"
                    >
                      View all results
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
          
          {/* Notifications */}
          <DashboardNotifications />
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1.5 md:space-x-2 p-1 md:p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              {/* Desktop Profile Info */}
              <div className="hidden md:block text-right">
                <p className="text-xxs font-normal text-black">
                  {user?.name || user?.firstName || 'Student'}
                </p>
                <p className="text-[0.6rem] text-gray-700">
                  {user?.email || 'student@example.com'}
                </p>
              </div>
              
              {/* Mobile Profile Info */}
              <div className="md:hidden text-right">
                <p className="text-xxs font-normal text-black">
                  {user?.name || user?.firstName || 'Student'}
                </p>
              </div>
              
              <div className="flex items-center space-x-0.5">
                <UserCircleIcon className="w-3.5 h-3.5 md:w-4 h-4 text-gray-700" />
                <ChevronDownIcon className={`w-1.5 h-1.5 md:w-2 h-2 text-gray-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {/* User Info */}
                <div className="px-2.5 py-1.5 border-b border-gray-100">
                  <p className="text-xxs font-normal text-black">
                    {user?.name || user?.firstName || 'Student'}
                  </p>
                  <p className="text-[0.6rem] text-gray-700 truncate">
                    {user?.email || 'student@example.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-0.5">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <UserIcon className="w-2.5 h-2.5 mr-1" />
                    View Profile
                  </button>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <SettingsIcon className="w-2.5 h-2.5 mr-1" />
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-100 my-0.5"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOutIcon className="w-2.5 h-2.5 mr-1" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden mt-2.5 pt-2.5 border-t border-gray-200">
          <div className="relative">
            <FaMagnifyingGlass className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, tests, library..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSearchDropdown(true)}
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
              autoFocus
            />

            {/* Mobile search dropdown */}
            {showSearchDropdown && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-40 max-h-80 overflow-y-auto">
                {isSearching && (
                  <div className="px-3 py-2 text-[11px] text-gray-500">
                    Searching...
                  </div>
                )}
                {!isSearching && !hasResults && (
                  <div className="px-3 py-2 text-[11px] text-gray-500">
                    No results found.
                  </div>
                )}

                {!isSearching && hasResults && (
                  <div className="py-1">
                    {searchResults.tests.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Tests
                        </div>
                        {searchResults.tests.map((t) => (
                          <button
                            key={t._id || t.id}
                            type="button"
                            onClick={() => {
                              handleSearchResultClick(t, "test");
                              setIsMobileSearchOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {t.title}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {t.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.courses.length > 0 && (
                      <div className="mt-1 border-t border-gray-100">
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Courses
                        </div>
                        {searchResults.courses.map((c) => (
                          <button
                            key={c._id || c.id}
                            type="button"
                            onClick={() => {
                              handleSearchResultClick(c, "course");
                              setIsMobileSearchOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {c.title}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {c.instructor || c.subject}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.library.length > 0 && (
                      <div className="mt-1 border-t border-gray-100">
                        <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase">
                          Library
                        </div>
                        {searchResults.library.map((d) => (
                          <button
                            key={d._id || d.id}
                            type="button"
                            onClick={() => {
                              handleSearchResultClick(d, "library");
                              setIsMobileSearchOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50"
                          >
                            <div className="text-gray-900 truncate">
                              {d.title || d.name}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {d.category || d.type}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        goToFullResults();
                        setIsMobileSearchOpen(false);
                      }}
                      className="w-full mt-1 border-t border-gray-100 px-3 py-1.5 text-[11px] text-blue-600 hover:bg-gray-50 text-left"
                    >
                      View all results
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};