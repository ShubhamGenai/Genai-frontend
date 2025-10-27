import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { mainContext } from "../context/MainContext";
import AdminNavBar from "../component/baseComponents/admin/AdminNavbar";
import ContentManagerNavBar from "../component/baseComponents/contentManager/ContentManager";
import EmployerNavBar from "../component/baseComponents/employer/EmployerNavbar";
import { NavBar } from "../component/baseComponents/navbar";
import AdminFooter from "../component/baseComponents/admin/AdminFooter";
import ContentManagerFooter from "../component/baseComponents/contentManager/ContentManagerFooter";
import EmployerFooter from "../component/baseComponents/employer/EmployerFooter";
import Footer from "../component/baseComponents/footer";
import { Header } from "../component/dashboard/Dash_Header";


const Layout = ({ children }) => {
  const { user } = useContext(mainContext);
  const location = useLocation();

  const hideNavAndFooterRoutes = ["/signup", "/login","/employer-signup","/employer-signin","/admin","/test-player","/content-login", ];
  const hideOnlyFooterRoutes = ["/login-landing",];
  const hideNavForStudentRoutes = location.pathname.startsWith("/student");
  
  // Hide navbar and footer for guest layout pages (only show on home screen)
  const hideNavForGuestLayoutRoutes = location.pathname.startsWith("/learn") || 
                                     location.pathname.startsWith("/jobs") || 
                                     location.pathname.startsWith("/tests") || 
                                     location.pathname.startsWith("/test-details") || 
                                     location.pathname.startsWith("/course-details") || 
                                     location.pathname.startsWith("/job-details");

  const hideNavAndFooter = hideNavAndFooterRoutes.includes(location.pathname);
  const hideFooter = hideOnlyFooterRoutes.includes(location.pathname);

  const getNavBar = () => {
    if (hideNavAndFooter || hideNavForStudentRoutes || hideNavForGuestLayoutRoutes) return null;
    if (user) {
      switch (user.role) {
        case "admin": return <AdminNavBar />;
        case "content": return <ContentManagerNavBar />;
        case "employer": return <EmployerNavBar />;
        case "student": return <Header />;
        default: return <NavBar />;
      }
    }
    return <NavBar />;
  };

  const getFooter = () => {
    if (hideNavAndFooter || hideFooter || hideNavForGuestLayoutRoutes) return null;
    if (user) {
      switch (user.role) {
        case "admin": return <AdminFooter />;
        case "content": return <ContentManagerFooter />;
        case "employer": return <EmployerFooter />;
        case "student": return null;
        default: return <Footer />;
      }
    }
    return <Footer />;
  };

  return (
    <>
      {getNavBar()}
      {children}
      {getFooter()}
    </>
  );
};

export default Layout;
