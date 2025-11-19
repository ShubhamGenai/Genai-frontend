import React from 'react';

import { Check } from 'lucide-react';

const plans = [
  {
    id: 1,
    name: 'Get Started',
    price: 'Free',
    description: 'Perfect for trying out',
    features: [
      '5 courses access',
      'Basic AI assistance',
      'Community support',
      'Mobile app access'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
    popular: false
  },
  {
    id: 2,
    name: 'Get Plus',
    price: '₹499/mo',
    description: 'Best for regular learners',
    features: [
      'Unlimited courses',
      'Advanced AI tutor',
      'Priority support',
      'Offline downloads',
      'Certificates'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'bg-blue-600 text-white hover:bg-black',
    popular: true
  },
  {
    id: 3,
    name: 'Get Max',
    price: '₹999/mo',
    description: 'For serious professionals',
    features: [
      'Everything in Plus',
      '1-on-1 mentorship',
      'Career guidance',
      'Job placement support',
      'Lifetime updates'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
    popular: false
  }
];

export default function PricingPlans() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
            Test your skills,{' '}
            <span className="text-blue-600">own your future</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Choose the perfect plan for your learning journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-xl p-6 lg:p-8 transition-all duration-300 cursor-pointer group ${
                plan.popular 
                  ? 'border-2 border-gray-900 shadow-lg hover:shadow-xl' 
                  : 'border border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-900 text-white px-4 py-1 rounded-md text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {plan.name}
                </h3>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {plan.price}
                </div>
                <p className="text-sm text-gray-600 font-light">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{transitionDelay: `${index * 50}ms`}}>
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 active:scale-95 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              {/* Hover Effect Overlay */}
              {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-50/0 to-blue-50/0 group-hover:from-green-50/20 group-hover:to-blue-50/20 transition-all duration-500 pointer-events-none" /> */}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-500">
            All plans include 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
