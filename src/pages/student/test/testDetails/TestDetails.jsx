import React, { useState, useEffect } from 'react';
import { Clock, FileText, Award, BarChart2 } from 'lucide-react';

const TestDetailsPage = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Demo data
  const testData = {
    title: "CSS Advance level Test One",
    company: "Company Name Product Limited",
    duration: "60 minutes",
    questions: 40,
    hasCertificate: true,
    level: "Intermediate to Advanced",
    rating: 4.8,
    reviews: 2356,
    price: 620,
    originalPrice: 1250,
    discount: "50% OFF",
    benefits: [
      "Real-world CSS challenges",
      "Instant results & score breakdown",
      "Certificate upon passing",
      "One free retake if failed"
    ],
    skills: [
      "CSS Animation",
      "CSS Effects",
      "CSS Text Styling",
      "CSS Centering",
      "CSS vertical-align",
      "CSS object-fit"
    ],
    description: "This comprehensive front-end test course is designed for students beginning to work as professionals wanting to enhance their skills. By the end of this course, you will be able to analyze data, visualize insights, and make data-driven decisions using industry-standard tools.",
    totalTests: 300
  };

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
      title: "CSS Advanced level Test One",
      questions: 40,
      duration: "60 Minutes",
      rating: 4.8,
      reviews: 790
    },
    {
      id: 3,
      title: "CSS Advanced level Test One",
      questions: 30,
      duration: "45 Minutes",
      rating: 4.7,
      reviews: 750
    },
    {
      id: 4,
      title: "CSS Advanced level Test One",
      questions: 35,
      duration: "55 Minutes",
      rating: 4.8,
      reviews: 750
    },
    {
      id: 5,
      title: "CSS Advanced level Test One",
      questions: 25,
      duration: "40 Minutes",
      rating: 4.8,
      reviews: 730
    },
    {
      id: 6,
      title: "CSS Advanced level Test One",
      questions: 30,
      duration: "50 Minutes",
      rating: 4.7,
      reviews: 720
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


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header that appears on scroll */}
      {isSticky && (
        <div className="fixed top-15 p-4 left-0 w-full bg-gray-700 text-white z-50 shadow-md transition-all duration-300">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <h2 className="text-lg font-medium mr-6">{testData.title}</h2>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center text-xs">
                  <Clock size={14} className="mr-1" />
                  <span>{testData.duration}</span>
                </div>
                <div className="flex items-center text-xs">
                  <FileText size={14} className="mr-1" />
                  <span>{testData.questions} Questions</span>
                </div>
                {testData.hasCertificate && (
                  <div className="flex items-center text-xs">
                    <Award size={14} className="mr-1" />
                    <span>Certificate</span>
                  </div>
                )}
                <div className="flex items-center text-xs">
                  <BarChart2 size={14} className="mr-1" />
                  <span>{testData.level}</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="font-medium mr-1">{testData.rating}</span>
                  <span>({testData.reviews})</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-baseline mr-2">
                <span className="font-medium">₹{testData.price}</span>
                <span className="text-gray-300 text-xs line-through ml-1">₹{testData.originalPrice}</span>
                <span className="bg-gray-500 text-white text-xs px-1.5 py-0.5 ml-2 rounded">{testData.discount}</span>
              </div>
              <button className="bg-white text-gray-800 text-sm px-3 py-1 rounded hover:bg-gray-100">
                Add To Cart
              </button>
              <button className="hidden md:block bg-gray-800 text-white text-sm px-3 py-1 rounded border border-gray-600 hover:bg-gray-900">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left section - Test details */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-xl font-semibold">{testData.title}</h1>
              <p className="text-gray-600 text-sm">{testData.company}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-700">
                  <Clock size={16} className="mr-2" />
                  <span>{testData.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FileText size={16} className="mr-2" />
                  <span>{testData.questions} Questions</span>
                </div>
                {testData.hasCertificate && (
                  <div className="flex items-center text-sm text-gray-700">
                    <Award size={16} className="mr-2" />
                    <span>Certificate</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-700">
                  <BarChart2 size={16} className="mr-2" />
                  <span>{testData.level}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-semibold mr-2">{testData.rating}</span>
                  <span>({testData.reviews.toLocaleString()})</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">What You'll Get</h2>
              <ul className="space-y-2">
                {testData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {testData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">About this test</h2>
              <p className="text-sm text-gray-700">{testData.description}</p>
            </div>
          <div>
            <h2 className="text-lg font-semibold mb-4 flex justify-between">
              <span>More CSS Tests</span>
              <span className="text-sm text-gray-600">{testData.totalTests} Tests</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTests.map((test) => (
                <div key={test.id} className="border rounded p-4 bg-white">
                  <h3 className="font-medium mb-1">{test.title}</h3>
                  <div className="flex gap-4 text-xs text-gray-600 mb-2">
                    <span>{test.questions} Questions</span>
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <StarRating rating={test.rating} />
                    <span className="text-xs text-gray-600 ml-1">
                      {test.rating} ({test.reviews})
                    </span>
                  </div>
                  <button className="bg-gray-800 text-white text-sm px-4 py-1 rounded hover:bg-gray-700">
                    Get Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
          
          {/* Right section - Pricing */}
          <div className="lg:w-72">
            <div className={`bg-white border rounded p-4 sticky top-24 transition-opacity duration-300 ${isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline">
                  <span className="text-lg font-semibold">₹{testData.price}</span>
                  <span className="text-gray-400 text-sm line-through ml-2">₹{testData.originalPrice}.00</span>
                </div>
                <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{testData.discount}</span>
              </div>
              
              <button className="w-full bg-gray-800 text-white py-2 rounded mb-3 hover:bg-gray-700">
                Add to Cart
              </button>
              
              <button className="w-full bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-50">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPage;