import React from "react";
import { Save, Loader } from "lucide-react";

const AddressInfo = ({ 
  profileData, 
  handleProfileChange, 
  saveProfile, 
  loading 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Address Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <textarea
              name="address.street"
              value={profileData.address.street}
              onChange={handleProfileChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="address.city"
              value={profileData.address.city}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
            <input
              type="text"
              name="address.pincode"
              value={profileData.address.pincode}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PIN code"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
            <input
              type="text"
              name="address.state"
              value={profileData.address.state}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your state"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="address.country"
              value={profileData.address.country}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your country"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Complete Address Preview</h4>
            <p className="text-sm text-gray-600">
              {profileData.address.street && `${profileData.address.street}, `}
              {profileData.address.city && `${profileData.address.city}, `}
              {profileData.address.state && `${profileData.address.state} `}
              {profileData.address.pincode && `- ${profileData.address.pincode}, `}
              {profileData.address.country}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveProfile}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressInfo;