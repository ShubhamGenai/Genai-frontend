import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Clock, FileText, Award, BarChart2, PlayCircle, CheckCircle, Star, Users } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestById } from '../../../../redux/DataSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addToCart, checkItemInCart } from '../../../../redux/CartSlice';
import { USERENDPOINTS } from '../../../../constants/ApiConstants';
import { mainContext } from '../../../../context/MainContext';
import { MOCK_TESTS } from '../mockTestCatalog';

const TestDetailsPage = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(mainContext);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const queryId = query.get('id');
  const paramsId = params?.id;

  const { testDetails, loading, error } = useSelector((state) => state.data);
  const { isInCart } = useSelector((state) => state.cartData);

  // Prefer navigation state then id
  const stateTest = useMemo(() => {
    const s = location.state || {};
    return s.test || s.item || s.data || null;
  }, [location.state]);

  const effectiveId = useMemo(() => {
    return (stateTest?.id != null && String(stateTest.id)) || queryId || paramsId || null;
  }, [stateTest, queryId, paramsId]);

  // Load from backend if id exists; also have mock fallback
  useEffect(() => {
    if (effectiveId && !stateTest) {
      dispatch(fetchTestById(effectiveId));
    }
  }, [dispatch, effectiveId, stateTest]);

  const mockTest = useMemo(() => {
    if (!effectiveId) return null;
    return MOCK_TESTS.find((t) => String(t.id) === String(effectiveId)) || null;
  }, [effectiveId]);

  const base = stateTest || testDetails || mockTest;

  const formatted = useMemo(() => {
    if (!base) return null;
    const price = base.price || {};
    const discountedPrice = price.discounted ?? base.discountedPrice ?? 0;
    const actualPrice = price.actual ?? base.actualPrice ?? 0;
    return {
      id: base.id,
      title: base.title || '',
      company: base.company || '',
      duration: `${base.durationMinutes ?? base.duration ?? 0} minutes`,
      durationRaw: base.durationMinutes ?? base.duration ?? 0,
      questions: base.numberOfQuestions ?? base.questions ?? 0,
      hasCertificate: base.certificate !== undefined ? base.certificate : true,
      level: base.level || 'Beginner',
      rating: Array.isArray(base.ratings) && base.ratings.length
        ? (base.ratings.reduce((s, r) => s + (r.rating || 0), 0) / base.ratings.length).toFixed(1)
        : 0,
      reviews: Array.isArray(base.ratings) ? base.ratings.length : 0,
      price: discountedPrice,
      originalPrice: actualPrice,
      discount: actualPrice ? `${Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)}% OFF` : '0% OFF',
      benefits: Array.isArray(base.features) ? base.features : [],
      skills: Array.isArray(base.skills) ? base.skills : [],
      description: base.description || '',
      includes: Array.isArray(base.includes) ? base.includes : [
        'Instant results',
        'Detailed solutions',
        'Topic-wise analytics',
        '1 free reattempt',
      ],
    };
  }, [base]);

  const [activeTab, setActiveTab] = useState('Tests');

  useEffect(() => {
    if (effectiveId) {
      dispatch(checkItemInCart({ itemId: effectiveId, itemType: 'test' }));
    }
  }, [dispatch, effectiveId]);

  const handleAddToCart = () => {
    if (!effectiveId) return;
    dispatch(addToCart({ itemId: effectiveId, itemType: 'test' }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart!');
        dispatch(checkItemInCart({ itemId: effectiveId, itemType: 'test' }));
      })
      .catch((err) => {
        toast.error(err || 'Failed to add to cart.');
      });
  };

  const handleBuyNow = async (testId) => {
    try {
      if (!token) {
        return toast.error('Please login to continue.');
      }
      const { data } = await axios.post(
        USERENDPOINTS.CREATE_PAYMENT,
        { testId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { order, paymentId } = data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Test Purchase',
        description: 'Buying a test',
        order_id: order.id,
        handler: async function (response) {
          const verifyBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId,
          };
          const verifyRes = await axios.post(USERENDPOINTS.VERIFY_PAYMENT, verifyBody, { headers: { Authorization: `Bearer ${token}` } });
          if (verifyRes.data.success) {
            toast.success('Payment successful! Test enrolled ✅');
            if (effectiveId) dispatch(fetchTestById(effectiveId));
          } else {
            toast.error('Payment verification failed ❌');
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: '#6366f1' },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      toast.error('Payment failed or cancelled.');
    }
  };

  if (!formatted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-center">
          <p className="text-xl font-semibold mb-2">No Test Details Found</p>
          <p className="text-gray-600">The requested test could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 h-12">
            <button onClick={() => setActiveTab('Courses')} className={`relative text-sm font-medium ${activeTab === 'Courses' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Courses <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">{0} courses</span>
              {activeTab === 'Courses' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button onClick={() => setActiveTab('Jobs')} className={`relative text-sm font-medium ${activeTab === 'Jobs' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Jobs <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">45 jobs</span>
              {activeTab === 'Jobs' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button onClick={() => setActiveTab('Tests')} className={`relative text-sm font-medium ${activeTab === 'Tests' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Tests <span className="ml-2 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full align-middle">{MOCK_TESTS.length} tests</span>
              {activeTab === 'Tests' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-2">
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{formatted.level}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{formatted.title}</h1>
              <p className="text-blue-100 text-sm mb-4">{formatted.company}</p>

              <div className="flex flex-wrap gap-6 items-center text-xs lg:text-sm mb-2">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span className="font-semibold">{formatted.duration}</span></div>
                <div className="flex items-center gap-2"><FileText className="w-4 h-4" /><span className="font-semibold">{formatted.questions} Questions</span></div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4" /><span className="font-semibold">Certificate</span></div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /><span className="font-semibold">{formatted.rating}</span><span>({formatted.reviews} rated)</span></div>
              </div>

              {/* Compact lists */}
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">What you'll get</h3>
                    <div className="space-y-2">
                      {(formatted.benefits.slice(0, 6).length ? formatted.benefits.slice(0, 6) : ['Analytics report', 'Solutions', 'Auto grading']).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-blue-100 leading-5">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">This test includes</h3>
                    <div className="space-y-2">
                      {formatted.includes.slice(0, 4).map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-blue-100 leading-5">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky purchase card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 md:top-20 bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-semibold">₹{formatted.price}</span>
                      {formatted.originalPrice ? (
                        <span className="text-gray-400 text-sm line-through ml-2">₹{formatted.originalPrice}</span>
                      ) : null}
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">{formatted.discount}</span>
                  </div>

                  {user?.name ? (
                    isInCart ? (
                      <button onClick={() => navigate('/student/cart')} className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium">Go to Cart</button>
                    ) : (
                      <button onClick={handleAddToCart} className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium">Add to Cart</button>
                    )
                  ) : (
                    <button onClick={handleAddToCart} className="w-full bg-gray-800 text-white py-3 rounded-md mb-3 hover:bg-gray-700 transition-colors font-medium">Add to Cart</button>
                  )}

                  <button className="w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium" onClick={() => handleBuyNow(formatted.id)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formatted.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this test</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{formatted.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Test Stats</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{formatted.duration}</div>
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4" />{formatted.questions} Qs</div>
                  <div className="flex items-center gap-2"><BarChart2 className="w-4 h-4" />{formatted.level}</div>
                  <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />{formatted.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPage;