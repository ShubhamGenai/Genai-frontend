import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartTests, removeFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartTests, loading } = useSelector((state) => state.cartData);
  
  // Demo course data (to be replaced with actual data fetching later)
  const [cartCourses, setCartCourses] = useState([
    {
      _id: "course1",
      title: "Complete Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript, React and Node.js in this comprehensive course designed for beginners to advanced learners.",
      lessons: 120,
      duration: "40 hours",
      price: {
        actual: 4999,
        discounted: 1999
      }
    },
    {
      _id: "course2",
      title: "Advanced React & Redux",
      description: "Take your React skills to the next level with advanced patterns, state management with Redux, and performance optimization techniques.",
      lessons: 85,
      duration: "25 hours",
      price: {
        actual: 3499,
        discounted: 1699
      }
    },
    {
      _id: "course3",
      title: "Data Structures & Algorithms",
      description: "Learn essential DSA concepts and improve your problem-solving skills for technical interviews and competitive programming.",
      lessons: 90,
      duration: "32 hours",
      price: {
        actual: 2999,
        discounted: 1499
      }
    }
  ]);

  useEffect(() => {
    dispatch(getCartTests());
    // Future implementation: dispatch(getCartCourses());
  }, [dispatch]);

  const handleRemove = (id, type) => {
    if (type === "test") {
      dispatch(removeFromCart({ itemId: id, itemType: "test" }))
        .unwrap()
        .then(() => toast.success("Removed test from cart"))
        .catch((err) => toast.error(err));
    } else if (type === "course") {
      // Demo implementation for courses (to be replaced later)
      setCartCourses(cartCourses.filter(course => course._id !== id));
      toast.success("Removed course from cart");
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    const testTotal = cartTests.reduce((sum, test) => sum + test.price.discounted, 0);
    const courseTotal = cartCourses.reduce((sum, course) => sum + course.price.discounted, 0);
    return testTotal + courseTotal;
  };

  const calculateSavings = () => {
    const testSavings = cartTests.reduce((sum, test) => sum + (test.price.actual - test.price.discounted), 0);
    const courseSavings = cartCourses.reduce((sum, course) => sum + (course.price.actual - course.price.discounted), 0);
    return testSavings + courseSavings;
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const totalItems = cartTests.length + cartCourses.length;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : totalItems === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content - Tests and Courses */}
          <div className="w-full lg:w-2/3">
            {/* Tests Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Tests ({cartTests.length})</h2>
              {cartTests.length === 0 ? (
                <p className="text-gray-500">No tests in your cart.</p>
              ) : (
                <div className="space-y-4">
                  {cartTests.map((test) => (
                    <div key={test._id} className="border p-4 rounded-lg shadow-sm bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{test.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Duration: {test.duration} mins
                          </p>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{test.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{test.price.discounted}
                            <span className="line-through text-gray-400 text-sm ml-2">
                              ₹{test.price.actual}
                            </span>
                          </div>
                          <button
                            className="text-red-500 hover:underline text-sm mt-2"
                            onClick={() => handleRemove(test._id, "test")}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Courses Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Courses ({cartCourses.length})</h2>
              {cartCourses.length === 0 ? (
                <p className="text-gray-500">No courses in your cart.</p>
              ) : (
                <div className="space-y-4">
                  {cartCourses.map((course) => (
                    <div key={course._id} className="border p-4 rounded-lg shadow-sm bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.lessons} lessons • {course.duration}
                          </p>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{course.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{course.price.discounted}
                            <span className="line-through text-gray-400 text-sm ml-2">
                              ₹{course.price.actual}
                            </span>
                          </div>
                          <button
                            className="text-red-500 hover:underline text-sm mt-2"
                            onClick={() => handleRemove(course._id, "course")}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Summary Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 border sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span>₹{subtotal + savings}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{savings}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition">
                  Proceed to Checkout
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-md font-medium transition">
                  Continue Shopping
                </button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;