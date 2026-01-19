import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Check, Download, Info, BookOpen, Users, Star, Loader, Calculator, Microscope, Atom, Trophy, Code, Layers, Code2, Brain, Bot, Network, Package, Target, Lightbulb } from 'lucide-react';
import axios from 'axios';
import { USERENDPOINTS } from '../../../../constants/ApiConstants';


const IconComponents = {
  FileText: FileText,
  BookOpen: BookOpen,
  Calculator: Calculator,
  Microscope: Microscope,
  Atom: Atom,
  Trophy: Trophy,
  Code: Code,
  Layers: Layers,
  Code2: Code2,
  Brain: Brain,
  Bot: Bot,
  Network: Network,
  Package: Package,
  Target: Target,
  Lightbulb: Lightbulb,
  // Add other icons here if needed
};

const LibraryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default static content when backend doesn't provide data
  const defaultDescription =
    'High-quality study material available for download.';

  const defaultWhatsIncluded = [
    'High-quality PDF format',
    'All chapters/content included',
    'Printable format'
  ];

  const defaultAdditionalInfo = {
    bestFor: 'Students preparing for exams and concept building.',
    prerequisites: 'Basic understanding of the subject.',
    support: 'Support available for any download issues.'
  };

  useEffect(() => {
    fetchResourceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDownload = async () => {
    if (!resource || !resource.isFree || !resource.fileUrl) {
      return;
    }

    try {
      // Fetch the file from Cloudinary URL
      const response = await fetch(resource.fileUrl);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.fileName || `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback: open in new tab
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank');
      }
    }
  };

  const fetchResourceDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch single library document for student
      const res = await axios.get(`${USERENDPOINTS.GET_LIBRARY_DOCUMENT_BY_ID}/${id}`);
      if (!res.data || !res.data.success || !res.data.document) {
        setError('Resource not found.');
        setLoading(false);
        return;
      }

      const doc = res.data.document || {};

      // Safely derive description (fallback to static text if empty)
      const safeDescription =
        doc.description && typeof doc.description === 'string' && doc.description.trim().length > 0
          ? doc.description.trim()
          : defaultDescription;

      // Safely derive whatsIncluded (fallback list if missing/empty)
      const rawWhatsIncluded = Array.isArray(doc.whatsIncluded)
        ? doc.whatsIncluded.filter(item => typeof item === 'string' && item.trim().length > 0)
        : [];
      const safeWhatsIncluded =
        rawWhatsIncluded.length > 0 ? rawWhatsIncluded : defaultWhatsIncluded;

      // Safely derive additional info (fallback texts if missing/empty)
      const rawAdditionalInfo = (doc.additionalInfo && typeof doc.additionalInfo === 'object')
        ? doc.additionalInfo
        : {};

      const safeAdditionalInfo = {
        bestFor:
          rawAdditionalInfo.bestFor && typeof rawAdditionalInfo.bestFor === 'string' && rawAdditionalInfo.bestFor.trim().length > 0
            ? rawAdditionalInfo.bestFor.trim()
            : defaultAdditionalInfo.bestFor,
        prerequisites:
          rawAdditionalInfo.prerequisites && typeof rawAdditionalInfo.prerequisites === 'string' && rawAdditionalInfo.prerequisites.trim().length > 0
            ? rawAdditionalInfo.prerequisites.trim()
            : defaultAdditionalInfo.prerequisites,
        support:
          rawAdditionalInfo.support && typeof rawAdditionalInfo.support === 'string' && rawAdditionalInfo.support.trim().length > 0
            ? rawAdditionalInfo.support.trim()
            : defaultAdditionalInfo.support
      };

      // Map backend document to the shape expected by this UI
      const mappedResource = {
        id: doc._id,
        category: doc.category || 'Library',
        title: doc.name || 'Library Document',
        description: safeDescription,
        whatsIncluded: safeWhatsIncluded,
        additionalInfo: safeAdditionalInfo,
        fileSize: doc.fileSize
          ? `${(doc.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '—',
        format: doc.format || 'PDF',
        downloads: (doc.downloads || 0).toLocaleString(),
        isFree:
          !doc.price || !doc.price.discounted || Number(doc.price.discounted) === 0,
        icon:
          doc.icon && IconComponents[doc.icon]
            ? doc.icon
            : 'FileText',
        price:
          doc.price && Number(doc.price.discounted) > 0
            ? `₹${Number(doc.price.discounted)}`
            : 'Free',
        fileUrl: doc.fileUrl || '',
        fileName: doc.fileName || `${doc.name || 'document'}.pdf`
      };

      setResource(mappedResource);
    } catch (err) {
      setError('Failed to load resource details. Please try again later.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading resource details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchResourceDetails}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-gray-600 text-lg">Resource not found.</p>
          <button
            onClick={() => navigate('/library')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center">
          <button onClick={() => navigate('/library')} className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xs">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="font-normal">Back to Folder</span>
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Details */}
          <div className="flex-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-gray-100 text-gray-800 mb-2">
              {resource.category}
            </span>
            <h1 className="text-xl font-medium text-gray-900 mb-1">{resource.title}</h1>
            <p className="text-gray-600 text-sm mb-6">{resource.description}</p>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                {resource.whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <Check className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-base font-medium text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-0.5">Best For</h3>
                  <p className="text-xs text-gray-700">{resource.additionalInfo.bestFor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-0.5">Prerequisites</h3>
                  <p className="text-xs text-gray-700">{resource.additionalInfo.prerequisites}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-0.5">Support</h3>
                  <p className="text-xs text-gray-700">{resource.additionalInfo.support}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase/Download */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-6 text-center">
              <div className="mb-5 flex justify-center">
                {IconComponents[resource.icon] && React.createElement(IconComponents[resource.icon], { className: "w-20 h-20 text-blue-600" })}
              </div>
              
              {resource.isFree && (
                <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 mb-3">
                  Free Resource
                </span>
              )}

              {resource.isFree ? (
                <button 
                  onClick={handleDownload}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Free
                </button>
              ) : (
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Buy Now {resource.price}
                </button>
              )}
              
              <div className="mt-5 space-y-2 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">File Size:</span>
                  <span>{resource.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Format:</span>
                  <span>{resource.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Category:</span>
                  <span>{resource.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Downloads:</span>
                  <span>{resource.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetailsPage;
