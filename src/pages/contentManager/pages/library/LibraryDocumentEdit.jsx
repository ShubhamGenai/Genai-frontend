import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const initialClasses = ["Class 11", "Class 12", "Common"];

const LibraryDocumentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [classes, setClasses] = useState(initialClasses);
  const [categories, setCategories] = useState(["Physics", "Biology", "English"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [whatsIncludedText, setWhatsIncludedText] = useState("");
  const [bestFor, setBestFor] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [support, setSupport] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoc = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [docRes, clsRes, catRes] = await Promise.all([
          axios.get(CONTENTMANAGER.GET_LIBRARY_DOCUMENT_BY_ID(id)),
          axios.get(CONTENTMANAGER.GET_LIBRARY_CLASSES).catch(() => ({ data: {} })),
          axios.get(CONTENTMANAGER.GET_LIBRARY_CATEGORIES).catch(() => ({ data: {} })),
        ]);
        const doc = docRes.data;
        setName(doc.name || "");
        setPriceActual(String(doc.price?.actual ?? ""));
        setPriceDiscounted(String(doc.price?.discounted ?? ""));
        setSelectedClass(doc.class || "");
        setSelectedCategory(doc.category || "");
        setDescription(doc.description || "");
        setWhatsIncludedText(
          Array.isArray(doc.whatsIncluded) ? doc.whatsIncluded.join("\n") : ""
        );
        const info = doc.additionalInfo || {};
        setBestFor(info.bestFor || "");
        setPrerequisites(info.prerequisites || "");
        setSupport(info.support || "");
        setIsFree((doc.price?.actual ?? 0) === 0 && (doc.price?.discounted ?? 0) === 0);
        if (clsRes.data?.success && clsRes.data?.classes?.length) {
          setClasses(clsRes.data.classes.map((c) => c.name));
        }
        if (catRes.data?.success && catRes.data?.categories?.length) {
          setCategories(catRes.data.categories.map((c) => c.name));
        }
      } catch (err) {
        setMessage({ type: "error", text: err.response?.data?.error || "Failed to load document." });
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrors({});
    const newErrors = {};
    if (!name || !name.trim()) newErrors.name = "Name is required";
    if (!isFree) {
      if (!priceActual || Number(priceActual) <= 0) newErrors.priceActual = "Actual price must be greater than 0";
      if (!priceDiscounted || Number(priceDiscounted) <= 0) newErrors.priceDiscounted = "Discounted price must be greater than 0";
    }
    if (!selectedClass) newErrors.selectedClass = "Please select a class.";
    if (!selectedCategory) newErrors.selectedCategory = "Please select a category.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const finalPriceActual = isFree ? 0 : priceActual;
      const finalPriceDiscounted = isFree ? 0 : priceDiscounted;
      const whatsIncludedArray = whatsIncludedText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      await axios.put(CONTENTMANAGER.UPDATE_LIBRARY_DOCUMENT(id), {
        name: name.trim(),
        priceActual: finalPriceActual,
        priceDiscounted: finalPriceDiscounted,
        class: selectedClass,
        category: selectedCategory,
        description: description.trim(),
        whatsIncluded: whatsIncludedArray,
        bestFor: bestFor.trim(),
        prerequisites: prerequisites.trim(),
        support: support.trim(),
        icon: "FileText",
        format: "PDF",
      });
      setMessage({ type: "success", text: "Document updated successfully." });
      setTimeout(() => navigate(`/content/library/document/${id}`), 1200);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to update document.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(`/content/library/document/${id}`)}
            className="mr-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Edit Document</h1>
            <p className="text-slate-400 text-base font-light">Update metadata. File is not changed.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-base font-bold text-slate-300 mb-2">Document Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
              className={`block w-full bg-slate-800/40 border ${errors.name ? "border-red-500" : "border-slate-600/30"} rounded-xl py-3 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50`}
              placeholder="e.g. NCERT Physics Class 11"
            />
            {errors.name && <p className="mt-2 text-sm font-semibold text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => {
                  setIsFree(e.target.checked);
                  if (e.target.checked) {
                    setPriceActual("0");
                    setPriceDiscounted("0");
                    setErrors((p) => ({ ...p, priceActual: undefined, priceDiscounted: undefined }));
                  }
                }}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800/40 text-indigo-600 focus:ring-indigo-500/50"
              />
              <span className="text-base font-bold text-slate-300">Make this document free</span>
            </label>
          </div>

          {!isFree && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">Actual Price (₹) <span className="text-red-400">*</span></label>
                <input
                  type="number"
                  value={priceActual}
                  onChange={(e) => { setPriceActual(e.target.value); if (errors.priceActual) setErrors((p) => ({ ...p, priceActual: undefined })); }}
                  className={`block w-full bg-slate-800/40 border ${errors.priceActual ? "border-red-500" : "border-slate-600/30"} rounded-xl py-3 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.priceActual && <p className="mt-2 text-sm font-semibold text-red-400">{errors.priceActual}</p>}
              </div>
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">Discounted Price (₹) <span className="text-red-400">*</span></label>
                <input
                  type="number"
                  value={priceDiscounted}
                  onChange={(e) => { setPriceDiscounted(e.target.value); if (errors.priceDiscounted) setErrors((p) => ({ ...p, priceDiscounted: undefined })); }}
                  className={`block w-full bg-slate-800/40 border ${errors.priceDiscounted ? "border-red-500" : "border-slate-600/30"} rounded-xl py-3 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.priceDiscounted && <p className="mt-2 text-sm font-semibold text-red-400">{errors.priceDiscounted}</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-base font-bold text-slate-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl py-3 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 resize-none"
              placeholder="Brief description (optional)"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-slate-300 mb-2">What's Included (one per line)</label>
            <textarea
              value={whatsIncludedText}
              onChange={(e) => setWhatsIncludedText(e.target.value)}
              rows={4}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl py-3 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 resize-none"
              placeholder="Item 1&#10;Item 2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
              <label className="block text-base font-bold text-slate-300 mb-2">Class <span className="text-red-400">*</span></label>
              <select
                value={selectedClass}
                onChange={(e) => { setSelectedClass(e.target.value); if (errors.selectedClass) setErrors((p) => ({ ...p, selectedClass: undefined })); }}
                className={`block w-full bg-slate-800/40 border ${errors.selectedClass ? "border-red-500" : "border-slate-600/30"} rounded-xl py-3 px-5 text-white focus:ring-2 focus:ring-indigo-500/50`}
              >
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              {errors.selectedClass && <p className="mt-2 text-sm font-semibold text-red-400">{errors.selectedClass}</p>}
            </div>
            <div>
              <label className="block text-base font-bold text-slate-300 mb-2">Category <span className="text-red-400">*</span></label>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); if (errors.selectedCategory) setErrors((p) => ({ ...p, selectedCategory: undefined })); }}
                className={`block w-full bg-slate-800/40 border ${errors.selectedCategory ? "border-red-500" : "border-slate-600/30"} rounded-xl py-3 px-5 text-white focus:ring-2 focus:ring-indigo-500/50`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.selectedCategory && <p className="mt-2 text-sm font-semibold text-red-400">{errors.selectedCategory}</p>}
            </div>
          </div>

          <div className="space-y-4 p-6 bg-slate-800/20 border border-slate-600/20 rounded-xl">
            <h3 className="text-lg font-semibold text-slate-300">Additional info (optional)</h3>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Best For</label>
              <textarea value={bestFor} onChange={(e) => setBestFor(e.target.value)} rows={2} className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl py-2 px-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Who is this for?" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Prerequisites</label>
              <textarea value={prerequisites} onChange={(e) => setPrerequisites(e.target.value)} rows={2} className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl py-2 px-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Required knowledge" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Support</label>
              <textarea value={support} onChange={(e) => setSupport(e.target.value)} rows={2} className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl py-2 px-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Support info" />
            </div>
          </div>

          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${message.type === "error" ? "bg-red-500/10 border border-red-500/40 text-red-200" : "bg-emerald-500/10 border border-emerald-500/40 text-emerald-200"}`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-600/30">
            <button
              type="button"
              onClick={() => navigate(`/content/library/document/${id}`)}
              className="py-3 px-6 rounded-xl border border-slate-600/30 text-white font-semibold hover:bg-slate-700/60 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibraryDocumentEdit;
