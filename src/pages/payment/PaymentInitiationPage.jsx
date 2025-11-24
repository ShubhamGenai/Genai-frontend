import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { mainContext } from '../../context/MainContext';
import { USERENDPOINTS } from '../../constants/ApiConstants';

const PaymentInitiationPage = () => {
  const { itemType, itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(mainContext);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    const initiatePayment = async () => {
      if (!user?.role) {
        // Should not happen if ProtectedRoute is used, but good to double-check
        // Redirect back to login, ensuring current payment details are preserved
        navigate('/login', { replace: true, state: { from: location.pathname, itemId, itemType } });
        return;
      }

      setLoadingPayment(true);
      setPaymentError(null);

      try {
        let paymentEndpoint;
        // For now, we'll assume the amount is passed or can be fetched.
        // In a real app, you'd fetch the item's price from the backend.
        let amountInPaisa = 10000; // Example: 100.00 INR = 10000 paisa

        if (itemType === 'course') {
          paymentEndpoint = USERENDPOINTS.CREATE_COURSE_PAYMENT;
        } else if (itemType === 'test') {
          paymentEndpoint = USERENDPOINTS.CREATE_PAYMENT;
        } else {
          setPaymentError('Invalid item type for payment.');
          setLoadingPayment(false);
          return;
        }

        // Call your backend to create a RazorPay order
        const response = await axios.post(paymentEndpoint, {
          userId: user._id, // Assuming user._id is available from mainContext
          itemId: itemId,
          itemType: itemType,
          amount: amountInPaisa,
          currency: 'INR',
        });

        const { orderId, amount, currency, key } = response.data;

        // Initialize RazorPay Checkout
        const options = {
          key: key, // Your RazorPay API Key from backend
          amount: amount, // Amount in paisa from backend
          currency: currency,
          name: 'GenAI Platform',
          description: `Payment for ${itemType === 'course' ? 'Course' : 'Test'} ID: ${itemId}`,
          order_id: orderId,
          handler: async (response) => {
            // Payment successful, verify on backend
            try {
              let verifyEndpoint;
              if (itemType === 'course') {
                verifyEndpoint = USERENDPOINTS.VERIFY_COURSE_PAYMENT;
              } else {
                verifyEndpoint = USERENDPOINTS.VERIFY_PAYMENT;
              }
              const verifyResponse = await axios.post(verifyEndpoint, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                itemId: itemId,
                itemType: itemType,
                userId: user._id,
              });

              if (verifyResponse.data.success) {
                alert('Payment Successful and Verified!');
                // Redirect to a success page or the purchased item details page
                navigate(`/${itemType === 'course' ? 'learn' : 'test'}/details/${itemId}`, { replace: true });
              } else {
                setPaymentError('Payment verification failed.');
              }
            } catch (error) {
              console.error('Error verifying payment:', error);
              setPaymentError('Payment verification failed.');
            }
          },
          prefill: {
            name: user.name || '',
            email: user.email || '',
            contact: user.phone || '', // Assuming user.phone is available
          },
          theme: {
            color: '#3399CC',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response){
          alert(`Payment failed: ${response.error.description}`);
          setPaymentError(response.error.description);
        });
        rzp.open();

      } catch (error) {
        console.error('Error initiating payment:', error);
        setPaymentError(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
        // Optionally, redirect back to the item details page if payment initiation fails
        // navigate(`/${itemType === 'course' ? 'learn' : 'test'}/details/${itemId}`);
      } finally {
        setLoadingPayment(false);
      }
    };

    if (user?.role) {
      initiatePayment();
    } else {
      // If for some reason user context is not updated, redirect to login
      navigate('/login', { replace: true, state: { from: location.pathname, itemId, itemType } });
    }
  }, [user, itemType, itemId, navigate, location.pathname]);

  if (loadingPayment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading payment details...</p>
      </div>
    );
  }

  if (paymentError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">Error: {paymentError}</p>
          <button
            onClick={() => navigate(`/${itemType === 'course' ? 'learn' : 'test'}/details/${itemId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => navigate(`/${itemType === 'course' ? 'learn' : 'test'}/details/${itemId}`, { replace: true })}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-base font-light text-gray-900 mb-2">Dummy Payment Popup</h3>
        <p className="text-sm text-gray-600 mb-4">
          This is a dummy popup to confirm navigation to PaymentInitiationPage.
          <br />
          Actual RazorPay integration will replace this.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(`/${itemType === 'course' ? 'learn' : 'test'}/details/${itemId}`, { replace: true })}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInitiationPage;
