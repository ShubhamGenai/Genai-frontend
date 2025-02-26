const ContentManagerLanding = () => {
    const features = [
      { title: "Manage Articles", description: "Create, edit, and publish articles." },
      { title: "Review Submissions", description: "Approve or reject content submissions." },
      { title: "Analytics Dashboard", description: "Track engagement and performance." },
      { title: "User Feedback", description: "View and respond to user feedback." },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Content Manager Dashboard</h1>
  
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
  
  export default ContentManagerLanding;
  