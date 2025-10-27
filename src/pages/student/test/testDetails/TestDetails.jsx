import React, { useState, useEffect, useContext } from 'react';
import { Clock, FileText, Award, BarChart2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestById } from '../../../../redux/DataSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import { addToCart, checkItemInCart } from '../../../../redux/CartSlice';
import { USERENDPOINTS } from '../../../../constants/ApiConstants';
import { mainContext } from "../../../../context/MainContext";

const TestDetailsPage = () => {
  const navigate = useNavigate();
  const {token,user} = useContext(mainContext)
 
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  const { testDetails, loading, error } = useSelector((state) => state.data);
  const { isInCart } = useSelector((state) => state.cartData);
  
  const isEnrolled = testDetails?.enrolledStudents?.some(
    (student) =>
      student === user?._id || // if just ID (non-populated)
      student?._id === user?._id // if populated
  );
  

  // Format test data with proper structure
  const formatTestData = (data) => {
    if (!data) return {
      title: '',
      company: '',
      duration: '0 minutes',
      questions: 0,
      hasCertificate: false,
      level: '',
      rating: 0,
      reviews: 0,
      price: 0,
      originalPrice: 0,
      discount: '0% OFF',
      benefits: [],
      skills: [],
      description: '',
      totalTests: 0,
    };
    
    // Safely access nested price object
    const price = data.price || {};
    const discountedPrice = price.discounted || 0;
    const actualPrice = price.actual || 0;
    
    return {
      title: data.title || '',
      company: data.company || '',
      duration: `${data.duration || 0} minutes`,
      questions: data.numberOfQuestions || 0,
      hasCertificate: data.certificate !== undefined ? data.certificate : true,
      level: data.level || '',
      rating: data.averageRating || 0,
      reviews: data.totalReviews || 0,
      price: discountedPrice,
      originalPrice: actualPrice,
      discount: `${Math.round((1 - (discountedPrice / (actualPrice || 1))) * 100)}% OFF`,
      benefits: Array.isArray(data.features) ? data.features : [],
      skills: Array.isArray(data.skills) ? data.skills : [],
      description: data.description || '',
      totalTests: 350,
    };
  };

  const testData = formatTestData(testDetails);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchTestById(id));
  }, [dispatch, id]);


 

  const handleAddToCart = () => {
    dispatch(addToCart({ itemId: id, itemType: "test" }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
        dispatch(checkItemInCart({ itemId: id, itemType: "test" })); // ✅ Re-check
      })
      .catch((err) => {
        toast.error(err || "Failed to add to cart.");
      });
  };

  useEffect(() => {
    dispatch(checkItemInCart({ itemId: id, itemType: "test" }));
  }, [dispatch, id]);


  const handleBuyNow = async (testId) => {
    try {
      if (!token){
        return toast.error("Please login to continue.");
      }
      // 1️⃣ Create Razorpay order
      const { data } = await axios.post(USERENDPOINTS.CREATE_PAYMENT, { testId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const { order, paymentId } = data;
  
      // 2️⃣ Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // or process.env.REACT_APP_RAZORPAY_KEY
        amount: order.amount,
        currency: "INR",
        name: "Test Purchase",
        description: "Buying a test",
        order_id: order.id,
        handler: async function (response) {
          const verifyBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId,
          };
  
          // 3️⃣ Verify payment on backend
          const verifyRes = await axios.post(USERENDPOINTS.VERIFY_PAYMENT, verifyBody, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          if (verifyRes.data.success) {
            toast.success("Payment successful! Test enrolled ✅");
            dispatch(fetchTestById(id));
          } else {
            toast.error("Payment verification failed ❌");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#6366f1",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed or cancelled.");
    }
  };
  



  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Invalid Test ID</p>
          <p className="text-gray-600">Please select a valid test to view details.</p>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-red-500 text-center">
        <p className="text-xl font-semibold mb-2">Error Loading Test Details</p>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  if (!testDetails) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-gray-500 text-center">
        <p className="text-xl font-semibold mb-2">No Test Details Found</p>
        <p className="text-gray-600">The requested test could not be found.</p>
      </div>
    </div>
  );

  const relatedTests = [
    {
      id: 1,
      title: "CSS Advanced level Test One",
      questions: 40,
      duration: "60 Minutes",
      rating: 4.8,
      reviews: 790
    },
    {
      id: 2,
      title: "CSS Advanced level Test Two",
      questions: 40,
      duration: "60 Minutes",
      rating: 4.8,
      reviews: 790
    },
    {
      id: 3,
      title: "CSS Advanced level Test Three",
      questions: 30,
      duration: "45 Minutes",
      rating: 4.7,
      reviews: 750
    },
    {
      id: 4,
      title: "CSS Advanced level Test Four",
      questions: 35,
      duration: "55 Minutes",
      rating: 4.8,
      reviews: 750
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? "★" : star - 0.5 <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left section - Test details */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-1">{testData.title}</h1>
              <p className="text-gray-600">{testData.company}</p>
              
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>{testData.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText size={18} className="mr-2" />
                  <span>{testData.questions} Questions</span>
                </div>
                {testData.hasCertificate && (
                  <div className="flex items-center text-gray-600">
                    <Award size={18} className="mr-2" />
                    <span>Certificate</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <BarChart2 size={18} className="mr-2" />
                  <span>{testData.level}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{testData.rating}</span>
                  <span className="text-gray-600">({testData.reviews})</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">What You'll Get</h2>
              <ul className="space-y-3">
                {testData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-600">✓</span>
                    </div>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {testData.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-3">About this test</h2>
              <p className="text-gray-600 leading-relaxed">{testData.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-6 flex justify-between items-center">
                <span>More CSS Tests</span>
                <span className="text-sm text-gray-600">{testData.totalTests} Tests</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedTests.map((test) => (
                  <div key={test.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-2">{test.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>{test.questions} Questions</span>
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <StarRating rating={test.rating} />
                      <span className="text-sm text-gray-600 ml-2">
                        {test.rating} ({test.reviews})
                      </span>
                    </div>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
                      Get Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right section - Pricing */}
          <div className="lg:w-80">
            <div className="bg-white border rounded-lg p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold">₹{testData.price}</span>
                  <span className="text-gray-400 text-sm line-through ml-2">₹{testData.originalPrice}</span>
                </div>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md">{testData.discount}</span>
              </div>


 {user.name ? (
  isEnrolled ? (
    // ✅ User is logged in AND enrolled — Show Take Test
    <Link to={`/course-player?id=${courseDetails._id}`}>
      <button className="w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium mt-3">
       Go To Course
      </button>
    </Link>
  ) : (
    <>
      {/* 🛒 Cart Logic for logged-in but not enrolled */}
      {isInCart ? (
        <button
          onClick={() => navigate("/student/cart")}
          className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium"
        >
          Go to Cart
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart(id)}
          className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      )}

      {/* 💳 Buy Now for logged-in user */}
      <button
        className="w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
        onClick={() => handleBuyNow(courseDetails._id)}
      >
        Buy Now
      </button>
    </>
  )
) : (
  <>
    {/* 🚫 Not logged in — allow Add to Cart & Buy Now */}
    <button
      onClick={() => handleAddToCart(id)}
      className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium"
    >
      Add to Cart
    </button>

    <button
      className="w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
      onClick={() => handleBuyNow(courseDetails._id)}
    >
      Buy Now
    </button>
  </>
)}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPage;