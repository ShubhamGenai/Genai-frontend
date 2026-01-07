import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CONTENTMANAGER } from "../../constants/ApiConstants";
import { X, Upload, Image as ImageIcon, Loader } from 'lucide-react';

const TestImageUpload = ({ testId, onImageUploaded, onClose, existingImageUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [existingError, setExistingError] = useState(null);

  // Update preview when existingImageUrl changes
  useEffect(() => {
    if (existingImageUrl && !selectedFile) {
      setPreview(existingImageUrl);
    }
  }, [existingImageUrl, selectedFile]);

  // Fetch existing test images from backend for easy re-use
  useEffect(() => {
    let isMounted = true;
    const fetchExistingImages = async () => {
      setLoadingExisting(true);
      setExistingError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_TEST_IMAGES);
        if (!isMounted) return;
        if (res.data?.success && Array.isArray(res.data.images)) {
          setExistingImages(res.data.images);
        } else {
          setExistingError('Failed to load existing images');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching existing test images:', err);
        setExistingError('Could not load existing images');
      } finally {
        if (isMounted) {
          setLoadingExisting(false);
        }
      }
    };

    fetchExistingImages();
    return () => {
      isMounted = false;
    };
  }, []);

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
      formData.append('testId', testId || '');

      const response = await axios.post(CONTENTMANAGER.UPLOAD_TEST_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        console.log('Test image uploaded successfully, URL:', response.data.imageUrl);
        // Verify the URL is valid
        if (response.data.imageUrl && response.data.imageUrl.startsWith('http')) {
          onImageUploaded({
            imageUrl: response.data.imageUrl,
            imagePublicId: response.data.imagePublicId
          });
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
      console.error('Error uploading test image:', err);
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
          <h2 className="text-xl font-bold text-white">Upload Test Image</h2>
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
              onClick={() => document.getElementById('test-image-input').click()}
            >
              <input
                id="test-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-slate-400 mb-4" />
              <p className="text-slate-300 font-semibold mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-600/30 bg-slate-700/40">
                <img
                  src={preview}
                  alt="Test preview"
                  className="w-full h-auto max-h-96 object-contain"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => {
                    console.error("Failed to load test image:", preview);
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => document.getElementById('test-image-input').click()}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  {selectedFile ? 'Change Image' : 'Change'}
                </button>
                <input
                  id="test-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {selectedFile && (
                  <button
                    onClick={handleRemove}
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Existing images gallery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">
                Or choose from existing test images
              </p>
              {loadingExisting && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Loader className="w-3 h-3 animate-spin" /> Loading...
                </span>
              )}
            </div>
            {existingError && (
              <p className="text-xs text-red-300">{existingError}</p>
            )}
            {existingImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                {existingImages.map((img, idx) => (
                  <button
                    key={`${img.imageUrl}-${idx}`}
                    type="button"
                    onClick={() => {
                      onImageUploaded({
                        imageUrl: img.imageUrl,
                        imagePublicId: img.imagePublicId || null,
                      });
                      onClose();
                    }}
                    className="group bg-slate-700/40 border border-slate-600/40 rounded-lg overflow-hidden hover:border-indigo-500/70 hover:bg-slate-700/70 transition-colors flex flex-col"
                  >
                    <div className="relative w-full pt-[75%] bg-slate-800/60 overflow-hidden">
                      <img
                        src={img.imageUrl}
                        alt={img.title || 'Test image'}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-xs text-slate-200 truncate">
                        {img.title || 'Test image'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : !loadingExisting && !existingError ? (
              <p className="text-xs text-slate-500">
                No existing test images found yet. Upload a new image to use it again later.
              </p>
            ) : null}
          </div>

          {/* Action Buttons */}
          {selectedFile && (
            <div className="flex gap-2 pt-4 border-t border-slate-600/30">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <button
                onClick={onClose}
                disabled={uploading}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestImageUpload;

