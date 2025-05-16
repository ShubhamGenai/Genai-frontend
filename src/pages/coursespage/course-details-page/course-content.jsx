import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModulesByIds } from '../../../redux/DataSlice';



export const CourseContent = ({courseDetails}) => {
  if (!courseDetails) return null;

  const {targetAudience} = courseDetails

  const dispatch = useDispatch();
  const {  moduledata, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (courseDetails?.modules?.length) {
     
      
      dispatch(fetchModulesByIds(courseDetails.modules));
    }
  }, [courseDetails, dispatch]);


  if (loading) return <p>Loading modules...</p>;
  if (error) return <p>Error loading modules: {error}</p>;


  
    return (
      <div>
        <div className="mb-8 ">
          <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">

          {targetAudience?.map((target, index) => (
            <div className="flex items-start">

              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>{target}</span>
            </div>))}
          
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Course Description</h2>
          <p className="text-gray-700 mb-4 text-sm">
            {courseDetails.courseDescription}
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Who should take this course?</h3>

          <ul className="space-y-1 text-sm">
          {courseDetails.learningOutcomes?.map((outcome,index)=>(
        
       
        
            <li className="flex">
              <span className="mr-2">•</span>
              <span>{outcome}</span>
            </li>
         

))}
          </ul>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Requirements</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>No prior experience required</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Basic knowledge of Excel (recommended but not mandatory)</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
          <div className="space-y-4 text-sm">
  {moduledata?.map((module, index) => (
    <div
      key={module._id}
      className="flex items-center justify-between border-b pb-2"
    >
      <span>{`Module ${index + 1}: ${module.title}`}</span>
      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
    </div>
  ))}
</div>

        </div>
      </div>
    );
  };
  