import React, { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Adaptive Test Available",
    message: "Try the latest AI-powered mock test tailored to your weak areas.",
    time: "2 min ago",
    ctaText: "Start test",
    href: "/tests",
  },
  {
    id: 2,
    title: "Daily Practice Pack Ready",
    message: "20 mixed questions based on your recent performance are waiting.",
    time: "1 hr ago",
    ctaText: "Practice now",
    href: "/tests",
  },
  {
    id: 3,
    title: "Upcoming Scholarship Test",
    message: "Score high and unlock up to 100% fee waiver on premium plans.",
    time: "Yesterday",
    ctaText: "View details",
    href: "/tests",
  },
];

const DashboardNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    MOCK_NOTIFICATIONS.map((n) => ({ ...n, isRead: false }))
  );
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (item) => {
    // Mark this notification as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === item.id ? { ...n, isRead: true } : n
      )
    );
    setIsOpen(false);
    if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-1.5 text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-label="Notifications"
      >
        <BellIcon className="w-4 h-4 md:w-5 md:h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[14px] h-3 px-0.5 rounded-full bg-red-500 text-white text-[9px] leading-3 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-200 z-50"
        >
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              Notifications
            </span>
            <button
              type="button"
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, isRead: true }))
                )
              }
              className="text-[10px] sm:text-[11px] text-blue-600 font-medium hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNotificationClick(item)}
                className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors ${
                  item.isRead ? "bg-white" : "bg-blue-50/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] sm:text-[11px] text-gray-600">
                      {item.message}
                    </p>
                    <span className="mt-1 inline-block text-[10px] text-blue-600 font-medium">
                      {item.ctaText}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate("/notifications");
            }}
            className="w-full px-3 sm:px-4 py-2 border-t border-gray-100 text-center text-[10px] sm:text-[11px] text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardNotifications;

