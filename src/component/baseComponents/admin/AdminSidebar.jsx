import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, FileText, Settings, 
  BarChart2, UserCog, ChevronLeft, ChevronRight,
  ChevronDown, ChevronUp, GraduationCap, Building,
  Globe, ShieldCheck, ClipboardList, UserPlus,
  BookOpen, Image, FileVideo, FileAudio, PenTool,
  Bell, Lock, Database, HelpCircle, Languages,
  Calendar, Mail, CreditCard, LucidePackage, Server,
  LogOut, User, Activity, Clock, Cpu
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    students: false,
    employers: false,
    content: false,
    settings: false
  });

  // Mock user data - replace with actual auth context in your app
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    avatar: "https://via.placeholder.com/40"
  };



  const toggleMenu = (menu) => {
    if (collapsed) {
      setCollapsed(false);
      setExpandedMenus(prev => ({ ...prev, [menu]: true }));
    } else {
      setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    }
  };

  const mainMenuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { 
      name: 'Students', 
      icon: <GraduationCap size={20} />, 
      hasSubmenu: true,
      menuKey: 'students'
    },
    { 
      name: 'Employers', 
      icon: <Building size={20} />, 
      hasSubmenu: true,
      menuKey: 'employers'
    },
    { 
      name: 'Content', 
      icon: <FileText size={20} />, 
      hasSubmenu: true,
      menuKey: 'content'
    },
    { name: 'Users', icon: <UserCog size={20} />, path: '/users' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { 
      name: 'Settings', 
      icon: <Settings size={20} />, 
      hasSubmenu: true,
      menuKey: 'settings'
    },
  ];

  const studentSubmenu = [
    { name: 'Manage Students', icon: <Users size={16} />, path: '/student-management' },
    { name: 'Add Student', icon: <UserPlus size={16} />, path: '/student-management/add' },
    { name: 'Student Reports', icon: <ClipboardList size={16} />, path: '/student-management/reports' },
    { name: 'Schedule', icon: <Calendar size={16} />, path: '/student-management/schedule' },
  ];

  const employerSubmenu = [
    { name: 'Manage Employers', icon: <Briefcase size={16} />, path: '/employers' },
    { name: 'Domain Whitelist', icon: <Globe size={16} />, path: '/employers/domain-whitelist' },
    { name: 'Verify Employers', icon: <ShieldCheck size={16} />, path: '/employers/verification' },
    { name: 'Job Listings', icon: <ClipboardList size={16} />, path: '/employers/jobs' },
  ];

  const contentSubmenu = [
    { name: 'Articles', icon: <BookOpen size={16} />, path: '/content/articles' },
    { name: 'Media Gallery', icon: <Image size={16} />, path: '/content/media' },
    { name: 'Videos', icon: <FileVideo size={16} />, path: '/content/videos' },
    { name: 'Audio Resources', icon: <FileAudio size={16} />, path: '/content/audio' },
    { name: 'Editor', icon: <PenTool size={16} />, path: '/content/editor' },
  ];

  const settingsSubmenu = [
    { name: 'General', icon: <Settings size={16} />, path: '/settings/general' },
    { name: 'Notifications', icon: <Bell size={16} />, path: '/settings/notifications' },
    { name: 'Security', icon: <Lock size={16} />, path: '/settings/security' },
    { name: 'Database', icon: <Database size={16} />, path: '/settings/database' },
    { name: 'Integrations', icon: <LucidePackage size={16} />, path: '/settings/integrations' },
    { name: 'API Access', icon: <Server size={16} />, path: '/settings/api' },
    { name: 'Localization', icon: <Languages size={16} />, path: '/settings/localization' },
    { name: 'Billing', icon: <CreditCard size={16} />, path: '/settings/billing' },
    { name: 'Help', icon: <HelpCircle size={16} />, path: '/settings/help' },
  ];

  const renderMenuItem = (item) => (
    <li key={item.name} className="mb-1">
      {item.hasSubmenu ? (
        <div 
          onClick={() => toggleMenu(item.menuKey)}
          className={`flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-blue-700 rounded-md transition-colors ${expandedMenus[item.menuKey] ? 'bg-blue-700' : ''}`}
        >
          <div className="flex items-center">
            <span>{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </div>
          {!collapsed && (
            <span>
              {expandedMenus[item.menuKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}
        </div>
      ) : (
        <Link 
          to={item.path} 
          className={`flex items-center py-2 px-4 ${location.pathname === item.path ? 'bg-blue-800' : 'hover:bg-blue-700'} rounded-md transition-colors`}
        >
          <span>{item.icon}</span>
          {!collapsed && <span className="ml-3">{item.name}</span>}
        </Link>
      )}
      
      {item.hasSubmenu && expandedMenus[item.menuKey] && !collapsed && (
        <ul className="ml-6 mt-1 space-y-1 mb-2">
          {item.menuKey === 'students' && studentSubmenu.map(subItem => (
            <li key={subItem.name}>
              <Link 
                to={subItem.path} 
                className={`flex items-center py-1.5 px-3 ${location.pathname === subItem.path ? 'bg-blue-800' : 'hover:bg-blue-700'} rounded-md transition-colors text-sm`}
              >
                <span>{subItem.icon}</span>
                <span className="ml-3">{subItem.name}</span>
              </Link>
            </li>
          ))}
          
          {item.menuKey === 'employers' && employerSubmenu.map(subItem => (
            <li key={subItem.name}>
              <Link 
                to={subItem.path} 
                className={`flex items-center py-1.5 px-3 ${location.pathname === subItem.path ? 'bg-blue-800' : 'hover:bg-blue-700'} rounded-md transition-colors text-sm`}
              >
                <span>{subItem.icon}</span>
                <span className="ml-3">{subItem.name}</span>
              </Link>
            </li>
          ))}
          
          {item.menuKey === 'content' && contentSubmenu.map(subItem => (
            <li key={subItem.name}>
              <Link 
                to={subItem.path} 
                className={`flex items-center py-1.5 px-3 ${location.pathname === subItem.path ? 'bg-blue-800' : 'hover:bg-blue-700'} rounded-md transition-colors text-sm`}
              >
                <span>{subItem.icon}</span>
                <span className="ml-3">{subItem.name}</span>
              </Link>
            </li>
          ))}
          
          {item.menuKey === 'settings' && settingsSubmenu.map(subItem => (
            <li key={subItem.name}>
              <Link 
                to={subItem.path} 
                className={`flex items-center py-1.5 px-3 ${location.pathname === subItem.path ? 'bg-blue-800' : 'hover:bg-blue-700'} rounded-md transition-colors text-sm`}
              >
                <span>{subItem.icon}</span>
                <span className="ml-3">{subItem.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className={`bg-blue-600 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col h-screen`}>
      {/* User Profile Section */}


         {/* Toggle Button */}
         <div className="px-4 py-2 flex items-center justify-between border-b border-blue-800">
        {!collapsed && (
          <div className="font-bold text-xl">GenAI Admin</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-blue-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      
      <div className="p-4 flex items-center border-b border-blue-800">
        {!collapsed ? (
          <div className="flex items-center w-full">
            <img 
              src={user.avatar} 
              alt="User" 
              className="w-8 h-8 rounded-full mr-3"
            />
            <div className="flex-1 overflow-hidden">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-xs text-indigo-200 truncate">{user.role}</div>
            </div>
            <div className="ml-2">
              <Link to="/profile" className="hover:bg-blue-700 p-1 rounded-md transition-colors">
                <User size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img 
              src={user.avatar} 
              alt="User" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
      
   
    
      
      {/* Main Menu */}
      <div className="flex-1 py-4 overflow-y-auto">
        <ul>
          {mainMenuItems.map(renderMenuItem)}
        </ul>
      </div>
      

      {/* Logout Section */}
      <div className="p-4 border-t border-blue-800">
        <Link 
          to="/logout" 
          className="flex items-center py-2 px-4 hover:bg-blue-800 rounded-md transition-colors text-indigo-200 hover:text-white"
        >
          <LogOut size={18} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Link>
      </div>
      
      {/* Footer Info */}
      <div className="p-3 border-t border-blue-800 bg-blue-700">
        {!collapsed ? (
          <div className="text-xs w-full">
            <div className="font-medium">GenAI Admin Panel</div>
            <div className="text-indigo-300 flex justify-between">
              <span>v1.0.0</span>
              <Link to="/support" className="hover:text-white transition-colors">Help</Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <HelpCircle size={16} className="text-indigo-300 hover:text-white transition-colors" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;