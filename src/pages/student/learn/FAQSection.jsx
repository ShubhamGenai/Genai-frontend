import React, { useState } from "react";

const faqs = [
  {
    question: "What is included in this course?",
    answer: "The course includes video lectures, downloadable resources, quizzes, and a certificate of completion."
  },
  {
    question: "Is this course suitable for beginners?",
    answer: "Yes, the course is designed for beginners with step-by-step guidance and foundational concepts."
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes, upon successful completion of the course and assessments, you’ll receive a verifiable certificate."
  },
  {
    question: "How long will I have access to the course?",
    answer: "Once enrolled, you will have lifetime access to the course materials."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 transition-all flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700 border-t text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
