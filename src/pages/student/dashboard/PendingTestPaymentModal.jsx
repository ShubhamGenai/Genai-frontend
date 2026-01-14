import React from "react";

const PendingTestPaymentModal = ({
  open,
  pendingTest,
  loading,
  onClose,
  onGoToPayment,
}) => {
  if (!open || !pendingTest) return null;

  const questionsCount =
    pendingTest.numberOfQuestions || pendingTest.questions || 0;
  const duration =
    pendingTest.duration || pendingTest.durationMinutes || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Complete Your Test Purchase
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          You previously selected this test. Complete the payment to enroll and start taking the test.
        </p>

        <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {pendingTest.title || "Test"}
          </h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {pendingTest.description || "No description available."}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-700">
            <span>Questions: {questionsCount}</span>
            <span>Duration: {duration} min</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Maybe Later
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            disabled={loading}
            onClick={onGoToPayment}
          >
            {loading ? "Loading..." : "Go to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingTestPaymentModal;

