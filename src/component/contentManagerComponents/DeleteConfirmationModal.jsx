import { ExclamationCircleIcon } from '@heroicons/react/outline';
import React from 'react';


const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, itemName, isDeleting = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-800/95 backdrop-blur-md w-full max-w-md p-6 rounded-xl shadow-2xl border border-slate-600/50 relative">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
            <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2">
            {title || 'Delete Confirmation'}
          </h3>

          {/* Message */}
          <div className="mb-6">
            <p className="text-sm text-slate-300">
              {message || `Are you sure you want to delete "${itemName}"?`}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              This action cannot be undone.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-slate-700/40 text-white text-sm font-medium rounded-lg hover:bg-slate-700/60 transition-colors border border-slate-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
