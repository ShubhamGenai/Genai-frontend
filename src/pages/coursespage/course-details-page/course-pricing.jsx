import React, { useContext, useEffect } from 'react';
import { addToCart, checkItemInCart } from '../../../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { mainContext } from '../../../context/MainContext';
import { useNavigate } from 'react-router-dom';

export const CoursePricing = ({ courseDetails }) => {

    const dispatch = useDispatch();
 const {token} = useContext(mainContext)

 const navigate = useNavigate();

   const { isInCart } = useSelector((state) => state.cartData);

  const actualPrice = courseDetails?.price?.actual || 0;
  const discountedPrice = courseDetails?.price?.discounted || 0;
  const discountPercent = actualPrice
    ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
    : 0;

  const features = courseDetails?.features || [];
  const instructorName = courseDetails?.instructor?.name || "Instructor";

const id= courseDetails?._id || 0; // Assuming you have an ID for the course

  const handleAddToCart = () => {
    if(!token){toast.error("Please login to add items to cart"); return;}
    
        dispatch(addToCart({ itemId: id, itemType: "course" }))
          .unwrap()
          .then(() => {
            toast.success("Added to cart!");
            dispatch(checkItemInCart({ itemId: id, itemType: "course" })); // ✅ Re-check
          })
          .catch((err) => {
            toast.error(err || "Failed to add to cart.");
          });
      };
    
      useEffect(() => {
        dispatch(checkItemInCart({ itemId: id, itemType: "course" }));
      }, [dispatch, id]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 border-t border-gray-300">
      {/* Placeholder image */}
      <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <img
          src={courseDetails?.imageUrl || "/default-course.jpg"}
          alt="Course Thumbnail"
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">₹{discountedPrice}</span>
            <span className="text-gray-500 line-through ml-2 text-sm">₹{actualPrice}</span>
          </div>
          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">{discountPercent}% OFF</span>
        </div>
      </div>

      {/* Course Includes */}
      <h3 className="text-lg font-semibold mb-4">This Course Includes:</h3>
      <div className="space-y-3 mb-6 text-sm">
        {features.map((feature, index) => (
          <div className="flex items-start" key={index}>
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">{feature}</p>
              {/* Optionally show descriptions if you have them */}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      {isInCart ? (
        <button
          onClick={() => navigate("/student/cart")}
          className="w-full bg-gray-700 text-white text-sm font-medium py-2 rounded mb-3"
        >
          Go to Cart
        </button>
      ) : (
      <button className="w-full bg-gray-700 text-white text-sm font-medium py-2 rounded mb-3"  onClick={() => handleAddToCart(id)}>
        Add to Cart
      </button>
    )}
      <button className="w-full border border-gray-300 text-sm font-medium py-2 rounded mb-6">
        Buy Now
      </button>

      {/* GenAI Plus Promo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upgrade to GenAI Plus & Access 100+ Premium Courses!</h3>
        <div className="space-y-3 mb-4 text-sm">
          {["Exclusive AI-powered learning tools", "Advanced career insights & job matching", "Priority support & mentorship"].map((item, i) => (
            <div className="flex items-center" key={i}>
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <button className="w-full border border-gray-300 text-sm font-medium py-2 rounded">
          Subscribe Now
        </button>
      </div>

      {/* Instructor */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Instructor Details</h3>
        <div className="bg-gray-50 rounded-lg p-4 h-48">
          {instructorName}
        </div>
      </div>
    </div>
  );
};
