export default function StatsSection() {
  return (
    <div className="flex justify-center items-center pt-20 pb-20 -ml-10 px-24">
      <div className="grid grid-cols-5 gap-64  text-center">
        {[
          { value: "5,000", label: "Courses" },
          { value: "6,500", label: "Tests" },
          { value: "4,000", label: "Jobs" },
          { value: "8,300", label: "Learners" },
          { value: "3,500", label: "Employers" },
        ].map((item, index) => (
          <div key={index}>
            <p className="text-4xl font-semibold">{item.value}</p>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}