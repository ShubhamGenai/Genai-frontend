import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";

const featureData = [
    { title: "Personalized Learning", description: "AI-driven recommendations tailored to your learning style.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_fPg3P9Td2-RXamc-Z5BM4GHc9_W45Z3oRZrfb-vQkyhcSEUTm-xVOifvzEAGKvWY6Fg&usqp=CAU" },
    { title: "Real-time Feedback", description: "Get instant feedback on your quizzes and assignments.", image: "https://dt-website-media.s3.us-west-2.amazonaws.com/bdbdc302_5409_11ec_927a_0242ac110003_jpg_regular_image_6f55563e85.jpeg" },
    { title: "Interactive Courses", description: "Engage with hands-on projects and real-world scenarios.", image: "https://blog.ipleaders.in/wp-content/uploads/2021/05/online-course-blog-header.jpg" },
    { title: "AI Tutors", description: "24/7 AI-powered tutors to assist your learning journey.", image: "https://cdn.prod.website-files.com/65e724856c9bb00e12e26d6a/66695ff27f09a1e7cba713c8_dfasee.webp" }
  ];

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prevIndex) => (prevIndex + 1) % featureData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("https://your-backend.com/api/admin/login", data);
      if (response.data.success) {
        alert("Login successful");
        localStorage.setItem("adminToken", response.data.token);
        window.location.href = "/dashboard";
      } else {
        setErrorMessage(response.data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen p-16">
         
         <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="hidden md:flex w-5/6 max-w-5xl flex-row items-center p-10   overflow-hidden"
    >
        
      {/* Image Section */}
      <motion.div
        key={featureIndex}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.8 }}
        className="w-1/2"
      >
        <img
          src={featureData[featureIndex].image}
          alt={featureData[featureIndex].title}
          className="rounded-lg shadow-lg w-full h-80 object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 px-8"
      >
        <h2 className="text-3xl font-bold text-gray-800">{featureData[featureIndex].title}</h2>
        <p className="mt-3 text-lg text-gray-600">{featureData[featureIndex].description}</p>
      </motion.div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 flex gap-3">
        {featureData.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setFeatureIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              featureIndex === idx ? "bg-blue-600 scale-110" : "bg-gray-400 opacity-50 hover:opacity-80"
            }`}
          />
        ))}
      </div>
    </motion.div>
      {/* Left Side - Login Form */}
      <div className="w-full md:w-2/6 flex flex-col justify-center items-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300"
        >
          {/* Logo Section */}
          <div className="flex justify-center mb-4">
            <img src="../logo.webp" alt="Company Logo" className="h-12" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-black text-center mb-2">Admin Login</h2>
          <p className="text-gray-600 text-center text-sm mb-4">Welcome back! Manage your dashboard easily.</p>

          {errorMessage && <p className="text-red-500 text-center mb-3">{errorMessage}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-black text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 mt-1 border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 text-black"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-black text-sm font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 mt-1 border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 text-black"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col items-center mt-4 space-y-2 text-sm text-black">
            <a href="/student-login" className="hover:text-blue-500">Student Login</a>
            <a href="/employer-login" className="hover:text-blue-500">Employer Login</a>
            <button
              className="mt-2 w-full p-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => window.location.href = "/"}
            >
              Go to Home
            </button>
          </div>
        </motion.div>
      </div>

    
    </div>
  );
};

export default AdminLogin;
