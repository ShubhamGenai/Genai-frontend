const AdminLandingPage = () => {
    return (
      <div className="admin-dashboard">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
          <p className="text-lg">Manage the platform from your dashboard.</p>
  
          {/* Dashboard Widgets */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { title: "Users Management", description: "View, edit, or delete users." },
              { title: "Content Management", description: "Manage website content easily." },
              { title: "Reports & Analytics", description: "View platform statistics and reports." },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  };
  
  export default AdminLandingPage;
  