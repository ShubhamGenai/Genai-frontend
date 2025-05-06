import React from 'react';
export const CourseHeader = ({courseDetails}) => {

  if (!courseDetails) return null;

  const {
    title,
    description,
    imageUrl,
    duration,
    level,
    features,
  
    ratings,
  } = courseDetails;

  const enrolledCount = courseDetails?.enrolledStudents?.length || 0;

    const rating = courseDetails?.ratings || [];
const totalReviews = ratings.length;
const averageRating = ratings.length
  ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
  : "0.0";



    return (
      <div  className="w-full bg-cover bg-center  -mt-20 py-20 md:py-24"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
         
     
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{courseDetails.title}</h1>
        
        <p className="text-gray-700 mb-4 text-sm">
        {courseDetails.description}
        </p>
        
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm font-medium">Rahul Chouhan</span>
          <span className="text-gray-500 text-xs ml-2">Instructor</span>
        </div>
        
       <div className="space-y-2 mb-4 text-sm">
  {courseDetails.features?.map((feature, index) => (
    <div key={index} className="flex items-center">
      <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
      <span>{feature}</span>
    </div>
  ))}
</div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Duration</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">2 Hours</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
  <p className="text-gray-500 text-xs mb-1">Reviews</p>
  <div className="flex items-center">
    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
    <span className="text-sm">{averageRating} ({totalReviews})</span>
  </div>
</div>

          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Level</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">{level}</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
  <p className="text-gray-500 text-xs mb-1">Students</p>
  <div className="flex items-center">
    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
    <span className="text-sm">{enrolledCount}</span>
  </div>
</div>

        </div>
      </div>
      </div>
    );
  };