import React from 'react';

const App = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Accept Payments</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">On Website/App</div>
          <div className="bg-gray-100 p-4 rounded-lg">Plugins</div>
          <div className="bg-gray-100 p-4 rounded-lg">On Social Media</div>
          <div className="bg-gray-100 p-4 rounded-lg">In-Store</div>
          <div className="bg-gray-100 p-4 rounded-lg">Cross-Border</div>
          <div className="bg-gray-100 p-4 rounded-lg">With Smart Ad-Orts</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pay using card</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">NO CODE</p>
          <p className="text-gray-700">NO CODE</p>
          <p className="text-gray-700">Seamless In-Store Payments</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Make Payouts</h2>
        <table className="w-full bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Account No.</th>
              <th className="p-4 text-left">PRC code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4">Bing files</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
            </tr>
            <tr>
              <td className="p-4">Bank Payout</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tax Payments</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">GST Payments</p>
          <p className="text-gray-700">TDS Payments</p>
          <p className="text-gray-700">Advance Tax</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Vendor payment received</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">Racing: payment via the link:</p>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">payable</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">payable</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;