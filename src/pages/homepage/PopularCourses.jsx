import React from 'react';
import { Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'AI Engineering',
    rating: 4.8,
    students: '72K',
    price: '₹449',
    image: 'https://images.unsplash.com/photo-1652696290920-ee4c836c711e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NjEzNTAzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Trending',
    badgeColor: 'bg-yellow-400'
  },
  {
    id: 2,
    title: 'Digital Marketing',
    rating: 4.7,
    students: '45K',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYxNDI1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Popular',
    badgeColor: 'bg-yellow-400'
  },
  {
    id: 3,
    title: 'NEET Preparation',
    rating: 4.9,
    students: '89K',
    price: '₹599',
    image: 'https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBjbGFzc3Jvb218ZW58MXx8fHwxNzYxNDE1NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Bestseller',
    badgeColor: 'bg-yellow-400'
  }
];

export default function PopularCourses() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              Learn anything,{' '}
              <span className="text-blue-600">Achieve everything</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light">
              Explore our most popular courses
            </p>
          </div>
          
          <Link to="/learn" className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 self-start sm:self-auto">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge */}
                <div className={`absolute top-3 right-3 ${course.badgeColor} text-black px-2 py-1 rounded-md text-xs font-semibold`}>
                  {course.badge}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                  {course.title}
                </h3>

                {/* Rating and Students */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{course.students}</span>
                  </div>
                </div>

                {/* Price and Enroll Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{course.price}</span>
                  <Link to="/learn" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors duration-300">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
