export default function StatsSection() {
  return (
    <div className="flex justify-center items-center pt-20 pb-20">
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-6 sm:gap-12 md:gap-80 lg:gap-96 xl:gap-40 text-center">
        {[
          { value: "5,000", label: "Courses" },
          { value: "6,500", label: "Tests" },
          { value: "4,000", label: "Jobs" },
          { value: "8,300", label: "Learners" },
          { value: "3,500", label: "Employers" },
        ].map((item, index) => (
          <div key={index}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">{item.value}</p>
            <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
