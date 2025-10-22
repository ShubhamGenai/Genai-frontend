import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const Notification = ({ message }) => {
  if (!message.text) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 ${
      message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message.text}
    </div>
  );
};

export default Notification;