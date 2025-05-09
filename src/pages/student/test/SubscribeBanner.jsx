import React, { useState } from 'react';

const SubscribeBanner = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscribe logic here
    alert(`Subscribed with: ${email}`);
  };

  return (
    <section className="bg-white p-8  my-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Don't miss out on the latest courses & career trends!</h2>
        <p className="text-gray-600 text-base">Never miss an opportunity to learn and grow—subscribe to get instant updates on new courses!</p>
      </div>
      <form className="flex gap-2 w-full md:w-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Get Updates!
        </button>
      </form>
    </section>
  );
};

export default SubscribeBanner; 