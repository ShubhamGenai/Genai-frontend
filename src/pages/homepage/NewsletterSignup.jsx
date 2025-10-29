import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="w-full bg-blue-600 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">
          Empower your learning experience
        </h2>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-light">
          Get the latest courses, learning tips, and special offers delivered to your inbox
        </p>
        
        {/* Email Subscription Form */}
        <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4 max-w-sm xs:max-w-md mx-auto">
          <div className="relative w-full xs:w-auto xs:flex-1">
            <Mail className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2.5 xs:py-3 rounded-lg border border-gray-200 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm xs:text-base"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full xs:w-auto bg-gray-200 text-gray-900 px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-semibold text-sm xs:text-base hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
