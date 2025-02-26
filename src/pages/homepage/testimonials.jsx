// src/App.jsx
import React from 'react';


const TestimonialCard = ({ title, content, name, role, image, style }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-6" style={style}>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{content}</p>
    <hr className='mb-4 text-gray-300'/>
    <div className="flex items-center">
      <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);


const TestimonialsSection = () => {
  return (
    <div className="flex justify-center items-center py-20 ">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png" alt="User" className="w-8 h-8 rounded-full" />
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNS0zODUucG5n.png" alt="User" className="w-8 h-8 rounded-full" />
            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtZWxlbWVudC0xOS5wbmc.png" alt="User" className="w-8 h-8 rounded-full" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU  " alt="User" className="w-8 h-8 rounded-full" />

          </div>
          <p className="text-sm text-gray-500">5000+ HAPPY GEN AI LEARNING USERS</p>
          <h2 className="text-4xl  mt-3 mb-16">
            <span className='font-bold'>Trusted</span><span className='font-semibold'> by Learners, </span><span className="font-bold">Loved</span><span className='font-semibold'> by Employers</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            title="Upskilled and Certified"
            content="As a working professional, I wanted to upskill but struggled with time management. GenAi’s personalized learning paths allowed me to learn at my own pace, and the community support was amazing. I’m now certified in data analytics and have already started applying for roles."
            name="Shikha Soni"
            role="UI/UX Designer"
            image="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNS0zODUucG5n.png"
            className="h-64"
           
          />
          <TestimonialCard
            title="Exam Success Made Easy"
            content="GenAi Learning made my exam prep stress-free and effective! The AI-driven recommendations helped me focus on my weak areas, and the practice tests mirrored the real exam perfectly. I cracked my competitive exam on the first attempt!"
            name="Aman Jain"
            role="Front-end Developer"
            image="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png"
            style={{ height: '300px' }}
          />
          <TestimonialCard
            title="Hiring Made Effortless"
            content="Finding the right talent has always been challenging, but GenAi Learning changed the game for us. The pre-assessment tests saved us hours of screening time, and the AI-matched candidates were spot on. We hired two exceptional team members through this platform, and we’ll definitely use it again."
            name="Sumit Nema"
            role="Founder"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU "
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;