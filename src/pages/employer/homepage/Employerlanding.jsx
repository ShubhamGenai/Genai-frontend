const EmployerLanding = () => {
    const features = [
      { title: "Post Jobs", description: "Create and manage job postings to find the right candidates." },
      { title: "View Applications", description: "Review applications and shortlist candidates efficiently." },
      { title: "Schedule Interviews", description: "Set up interviews with potential hires seamlessly." },
      { title: "Manage Company Profile", description: "Keep your company's profile and job listings up to date." },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Employer Dashboard</h1>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default EmployerLanding;
  