import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./routes/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router> {/* Router should be the outermost wrapper */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick draggable />
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
