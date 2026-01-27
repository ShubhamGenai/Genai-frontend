import React from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

const AlertPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'info', // 'info', 'success', 'warning', 'error'
  showCancel = false, // If true, shows Cancel and Confirm buttons, otherwise just OK
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmButtonClass = '',
  theme = 'dark' // 'light' for white/blue theme, 'dark' for dark theme
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    const iconClass = "h-6 w-6";
    if (theme === 'light') {
      switch (type) {
        case 'success':
          return <CheckCircle className={`${iconClass} text-green-600`} />;
        case 'warning':
          return <AlertCircle className={`${iconClass} text-yellow-600`} />;
        case 'error':
          return <XCircle className={`${iconClass} text-red-600`} />;
        default:
          return <Info className={`${iconClass} text-blue-600`} />;
      }
    } else {
      switch (type) {
        case 'success':
          return <CheckCircle className={`${iconClass} text-green-400`} />;
        case 'warning':
          return <AlertCircle className={`${iconClass} text-yellow-400`} />;
        case 'error':
          return <XCircle className={`${iconClass} text-red-400`} />;
        default:
          return <Info className={`${iconClass} text-blue-400`} />;
      }
    }
  };

  const getBgColor = () => {
    if (theme === 'light') {
      switch (type) {
        case 'success':
          return 'bg-green-100';
        case 'warning':
          return 'bg-yellow-100';
        case 'error':
          return 'bg-red-100';
        default:
          return 'bg-blue-100';
      }
    } else {
      switch (type) {
        case 'success':
          return 'bg-green-500/20';
        case 'warning':
          return 'bg-yellow-500/20';
        case 'error':
          return 'bg-red-500/20';
        default:
          return 'bg-blue-500/20';
      }
    }
  };

  const getConfirmButtonColor = () => {
    if (confirmButtonClass) return confirmButtonClass;
    
    if (theme === 'light') {
      switch (type) {
        case 'success':
          return 'bg-green-600 hover:bg-green-700 text-white';
        case 'warning':
          return 'bg-yellow-500 hover:bg-yellow-600 text-white';
        case 'error':
          return 'bg-red-600 hover:bg-red-700 text-white';
        default:
          return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    } else {
      switch (type) {
        case 'success':
          return 'bg-green-600 hover:bg-green-700 text-white';
        case 'warning':
          return 'bg-yellow-600 hover:bg-yellow-700 text-white';
        case 'error':
          return 'bg-red-600 hover:bg-red-700 text-white';
        default:
          return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  // Theme-based styles
  const overlayClass = theme === 'light' 
    ? 'fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'
    : 'fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50';
  
  const modalClass = theme === 'light'
    ? 'bg-white w-full max-w-md p-6 rounded-xl shadow-2xl border border-gray-200 relative'
    : 'bg-slate-800/95 backdrop-blur-md w-full max-w-md p-6 rounded-xl shadow-2xl border border-slate-600/50 relative';
  
  const closeButtonClass = theme === 'light'
    ? 'absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
    : 'absolute top-4 right-4 text-slate-400 hover:text-white transition-colors';
  
  const titleClass = theme === 'light'
    ? 'text-lg font-semibold text-gray-900 mb-2'
    : 'text-lg font-semibold text-white mb-2';
  
  const messageClass = theme === 'light'
    ? 'text-sm text-gray-700 whitespace-pre-line'
    : 'text-sm text-slate-300 whitespace-pre-line';
  
  const cancelButtonClass = theme === 'light'
    ? 'flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-300'
    : 'flex-1 px-4 py-2 bg-slate-700/40 text-white text-sm font-medium rounded-lg hover:bg-slate-700/60 transition-colors border border-slate-600/30';

  return createPortal(
    <div className={overlayClass}>
      <div className={modalClass}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={closeButtonClass}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${getBgColor()} mb-4`}>
            {getIcon()}
          </div>

          {/* Title */}
          {title && (
            <h3 className={titleClass}>
              {title}
            </h3>
          )}

          {/* Message */}
          <div className="mb-6">
            <p className={messageClass}>
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            {showCancel && (
              <button
                onClick={onClose}
                className={cancelButtonClass}
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2 ${getConfirmButtonColor()} text-sm font-medium rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertPopup;

