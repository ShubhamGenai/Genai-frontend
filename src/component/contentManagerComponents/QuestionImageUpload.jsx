import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CONTENTMANAGER } from "../../constants/ApiConstants";
import { X, Upload, Image as ImageIcon, Loader } from 'lucide-react';

const QuestionImageUpload = ({ questionId, onImageUploaded, onClose, existingImageUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Update preview when existingImageUrl changes
  useEffect(() => {
    if (existingImageUrl && !selectedFile) {
      setPreview(existingImageUrl);
    }
  }, [existingImageUrl, selectedFile]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please drop an image file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('imageFile', selectedFile);
      formData.append('questionId', questionId || '');

      const response = await axios.post(CONTENTMANAGER.UPLOAD_QUESTION_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        console.log('Image uploaded successfully, URL:', response.data.imageUrl);
        // Verify the URL is valid
        if (response.data.imageUrl && response.data.imageUrl.startsWith('http')) {
          onImageUploaded(response.data.imageUrl);
          onClose();
        } else {
          setError('Invalid image URL received from server');
          console.error('Invalid image URL:', response.data.imageUrl);
        }
      } else {
        setError(response.data.error || 'Failed to upload image');
        console.error('Upload failed:', response.data);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.error || err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(existingImageUrl || null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-slate-600/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <h2 className="text-xl font-bold text-white">Upload Question Image/Diagram</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Upload Area */}
          {!preview || (!selectedFile && existingImageUrl) ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-600/60 rounded-xl p-12 bg-slate-700/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-700/60 transition-colors"
              onClick={() => document.getElementById('image-upload-input')?.click()}
            >
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/20 text-indigo-300">
                  <Upload className="w-8 h-8" />
                </div>
              </div>
              <p className="text-slate-200 font-medium mb-2">
                Click to browse or drag & drop image
              </p>
              <p className="text-slate-400 text-xs">
                Supported formats: PNG, JPG, JPEG, GIF (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative border border-slate-600/30 rounded-lg overflow-hidden bg-slate-700/40">
                <div className="flex items-center justify-center bg-slate-800/50 min-h-[200px] p-4 relative">
                  <img
                    src={preview}
                    alt={selectedFile ? "New image preview" : "Current image"}
                    className="max-w-full max-h-96 object-contain rounded"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onLoad={() => {
                      console.log('Preview image loaded successfully');
                    }}
                    onError={(e) => {
                      console.error('Preview image failed to load:', preview);
                      const errorDiv = e.target.parentElement.querySelector('.preview-error');
                      if (errorDiv) {
                        errorDiv.classList.remove('hidden');
                      }
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="hidden preview-error absolute inset-0 flex items-center justify-center text-slate-400 text-sm p-4">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>Failed to load image</p>
                      {preview && typeof preview === 'string' && preview.startsWith('http') && (
                        <p className="text-xs mt-1 text-slate-500 break-all">{preview}</p>
                      )}
                    </div>
                  </div>
                </div>
                {selectedFile && (
                  <button
                    onClick={handleRemove}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                    title="Remove new image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Info text if existing image */}
              {existingImageUrl && !selectedFile && (
                <p className="text-slate-400 text-xs text-center">
                  Current image shown above. Select a new image to replace it.
                </p>
              )}

              {/* Change/Select Image Button */}
              <button
                onClick={() => document.getElementById('image-upload-input')?.click()}
                className="w-full py-2 px-4 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-700/70 transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                {selectedFile ? 'Change Image' : existingImageUrl ? 'Replace Image' : 'Select Image'}
              </button>
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-600/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-700/70 transition-colors"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionImageUpload;

