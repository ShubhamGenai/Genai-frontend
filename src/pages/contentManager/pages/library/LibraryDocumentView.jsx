import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const LibraryDocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_LIBRARY_DOCUMENT_BY_ID(id));
        setDoc(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load document.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  const formatSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
          <p className="text-red-300 font-semibold">{error || "Document not found."}</p>
          <button
            onClick={() => navigate("/content/library/resources")}
            className="mt-4 text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            ← Back to Library
          </button>
        </div>
      </div>
    );
  }

  const price = doc.price || {};
  const discounted = price.discounted ?? price.actual ?? 0;
  const actual = price.actual ?? 0;
  const showDiscount = actual > discounted;
  const info = doc.additionalInfo || {};

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/content/library/resources")}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-600/30"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {doc.name || doc.fileName || "Untitled"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Class: {doc.class} · Category: {doc.category}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/content/library/document/${id}/edit`)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all"
            >
              Edit
            </button>
            {doc.fileUrl && (
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
              >
                <DocumentTextIcon className="h-5 w-5" />
                Open PDF
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Price</label>
              <div className="flex items-baseline gap-2">
                {showDiscount && (
                  <span className="text-slate-400 line-through">₹{actual.toFixed(2)}</span>
                )}
                <span className="text-lg font-bold text-white">₹{discounted.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">File</label>
              <p className="text-slate-200">{doc.fileName || "—"}</p>
              <p className="text-slate-400 text-sm">{formatSize(doc.fileSize)} · {doc.format || "PDF"}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Uploaded</label>
              <p className="text-slate-200">{formatDate(doc.createdAt)}</p>
              {doc.uploadedBy && (
                <p className="text-slate-400 text-sm">{doc.uploadedBy.name || doc.uploadedBy.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {doc.description && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                <p className="text-slate-200 whitespace-pre-wrap">{doc.description}</p>
              </div>
            )}
            {doc.whatsIncluded && doc.whatsIncluded.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">What's Included</label>
                <ul className="list-disc list-inside text-slate-200 space-y-1">
                  {doc.whatsIncluded.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {(info.bestFor || info.prerequisites || info.support) && (
              <div className="pt-4 border-t border-slate-600/30 space-y-2">
                {info.bestFor && (
                  <div>
                    <span className="text-slate-400 text-sm">Best for: </span>
                    <span className="text-slate-200">{info.bestFor}</span>
                  </div>
                )}
                {info.prerequisites && (
                  <div>
                    <span className="text-slate-400 text-sm">Prerequisites: </span>
                    <span className="text-slate-200">{info.prerequisites}</span>
                  </div>
                )}
                {info.support && (
                  <div>
                    <span className="text-slate-400 text-sm">Support: </span>
                    <span className="text-slate-200">{info.support}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDocumentView;
