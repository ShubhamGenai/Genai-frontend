

import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: 3000, label: "Courses Available" },
    { value: 5000, label: "Expert Instructors" },
    { value: 4000, label: "Students Enrolled" },
    { value: 5000, label: "Success Stories" },
    { value: 3000, label: "Companies Hiring" },
  ];

  return (
    <div className="bg-gray-50 py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              <CountUp end={item.value} duration={2} separator="," />+
            </p>
            <p className="text-gray-500 text-xs xs:text-sm sm:text-base font-medium">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


// export default function StatsSection() {
//   return (
//     <div className="flex justify-center items-center pt-20 pb-20">
//       <div className="flex flex-wrap sm:flex-nowrap justify-center gap-6 sm:gap-12 md:gap-80 lg:gap-96 xl:gap-40 text-center">
//         {[
//           { value: "5,000", label: "Courses" },
//           { value: "6,500", label: "Tests" },
//           { value: "4,000", label: "Jobs" },
//           { value: "8,300", label: "Learners" },
//           { value: "3,500", label: "Employers" },
//         ].map((item, index) => (
//           <div key={index}>
//             <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">{item.value}</p>
//             <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }