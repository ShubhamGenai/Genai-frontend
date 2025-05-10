import React, { useState } from "react";

const TestimonialCard = ({ name, role, company, quote, imageSrc }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all hover:shadow-lg transform hover:-translate-y-2 h-96 w-64 flex-shrink-0 relative overflow-hidden">
    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-blue-100">
      <img 
        src={imageSrc || "/api/placeholder/100/100"} 
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="mb-3 text-yellow-400 flex">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 italic mb-4 text-sm flex-grow overflow-y-auto">{quote}</p>
    <div className="mt-auto">
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{role}, {company}</p>
    </div>
  </div>
);

const StudentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      company: "DesignHub",
      quote: "The GenAI courses transformed my career. I went from a junior designer to leading my own team in just 8 months after completing the Advanced UI/UX track.",
      imageSrc: "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY="
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      company: "TechAnalytics",
      quote: "The personalized AI learning approach helped me grasp complex concepts that I had struggled with for years. The hands-on projects directly translated to my daily work.",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwr0dotRxNUJjGhXttzIiwqbc2Eew4rl3X18vN9kBFpM6ODtfes_ZNd0Uo_yXbIkCEgXc&usqp=CAU"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Frontend Developer",
      company: "WebSolutions",
      quote: "After completing three GenAI courses, I received multiple job offers. The industry-aligned curriculum gave me exactly the skills employers were looking for.",
      imageSrc: "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg?semt=ais_hybrid&w=740"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Product Manager",
      company: "InnovateTech",
      quote: "The certification I earned through GenAI was recognized immediately by recruiters. The AI-powered learning paths saved me countless hours by focusing on what I actually needed.",
      imageSrc: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
    },
    {
      id: 5,
      name: "Aisha Rahman",
      role: "ML Engineer",
      company: "AI Solutions",
      quote: "The practical, project-based approach prepared me for real-world challenges. Within weeks of finishing my course, I was contributing meaningful work at my new position.",
      imageSrc: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">REAL STORIES</span>
          <h2 className="text-3xl font-bold mt-2 mb-3 text-gray-900">Student Testimonials & Success Stories</h2>
          <p className="text-gray-600">Hear from our students who have transformed their careers with GenAI courses</p>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 272}px)` }} // 256px card + 16px margin
          >
            {testimonials.concat(testimonials).map((t, i) => (
              <div key={i} className="mr-4">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile single testimonial */}
        <div className="md:hidden transition-all duration-700 ease-in-out">
          <TestimonialCard {...testimonials[currentIndex]} />
        </div>

        {/* Controls */}
        <div className="flex justify-between mt-8 px-4 md:px-20 relative z-10">
          <button
            onClick={prevTestimonial}
            className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
