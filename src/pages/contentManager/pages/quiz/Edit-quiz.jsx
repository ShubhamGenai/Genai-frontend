import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline';
import AlertPopup from '../../../../component/common/AlertPopup';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingQuizImage, setUploadingQuizImage] = useState(false);
  const [uploadingQuestionImages, setUploadingQuestionImages] = useState({});
  
  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info', // 'info', 'success', 'warning', 'error'
    title: '',
    message: '',
    onConfirm: null
  });
  
  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(CONTENTMANAGER.GET_QUIZ);
        const allQuizzes = Array.isArray(res.data) ? res.data : res.data.quizzes || [];
        const found = allQuizzes.find((q) => q._id === id);
        
        if (found) {
          setTitle(found.title || '');
          setDuration(found.duration || '');
          setImageUrl(found.imageUrl || found.image || found.imageURL || '');
          
          // Normalize questions to use imageUrl consistently
          const normalizedQuestions = (found.questions || []).map(q => ({
            ...q,
            imageUrl: q.imageUrl || q.image || q.imageURL || ''
          }));
          setQuestions(normalizedQuestions);
        } else {
          showModal('error', 'Quiz Not Found', 'The quiz you are trying to edit was not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        showModal('error', 'Error Loading Quiz', 'Failed to load quiz. Please try again.');
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], answer: '', imageUrl: '' },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // Show modal helper function
  const showModal = (type, title, message, onConfirm = null) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
      onConfirm
    });
  };

  // Show confirmation modal
  const showConfirm = (message, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      message,
      onConfirm
    });
  };

  // Handle quiz image upload
  const handleQuizImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showModal('warning', 'Invalid File Type', 'Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showModal('warning', 'File Too Large', 'Image size must be less than 10MB.');
      return;
    }

    setUploadingQuizImage(true);
    try {
      const formData = new FormData();
      formData.append('imageFile', file);
      formData.append('questionId', ''); // Empty for quiz-level image

      const response = await axios.post(CONTENTMANAGER.UPLOAD_QUESTION_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
        showModal('success', 'Image Uploaded', 'Quiz image uploaded successfully!');
      } else {
        showModal('error', 'Upload Failed', 'Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading quiz image:', err);
      showModal('error', 'Upload Failed', err.response?.data?.error || err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploadingQuizImage(false);
      // Reset file input
      e.target.value = '';
    }
  };

  // Handle question image upload
  const handleQuestionImageUpload = async (qIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showModal('warning', 'Invalid File Type', 'Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showModal('warning', 'File Too Large', 'Image size must be less than 10MB.');
      return;
    }

    setUploadingQuestionImages({ ...uploadingQuestionImages, [qIndex]: true });
    try {
      const formData = new FormData();
      formData.append('imageFile', file);
      formData.append('questionId', questions[qIndex]._id || '');

      const response = await axios.post(CONTENTMANAGER.UPLOAD_QUESTION_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        handleQuestionChange(qIndex, 'imageUrl', response.data.imageUrl);
        showModal('success', 'Image Uploaded', 'Question image uploaded successfully!');
      } else {
        showModal('error', 'Upload Failed', 'Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading question image:', err);
      showModal('error', 'Upload Failed', err.response?.data?.error || err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploadingQuestionImages({ ...uploadingQuestionImages, [qIndex]: false });
      // Reset file input
      e.target.value = '';
    }
  };

  // Delete quiz image
  const handleDeleteQuizImage = () => {
    showConfirm('Are you sure you want to remove this image?', () => {
      setImageUrl('');
      setConfirmModal({ isOpen: false, message: '', onConfirm: null });
    });
  };

  // Delete question image
  const handleDeleteQuestionImage = (qIndex) => {
    showConfirm('Are you sure you want to remove this image?', () => {
      handleQuestionChange(qIndex, 'imageUrl', '');
      setConfirmModal({ isOpen: false, message: '', onConfirm: null });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Normalize question image fields to imageUrl
      const normalizedQuestions = questions.map(q => {
        const question = { ...q };
        // If image or imageURL exists, use it as imageUrl
        if (question.image && !question.imageUrl) {
          question.imageUrl = question.image;
          delete question.image;
        }
        if (question.imageURL && !question.imageUrl) {
          question.imageUrl = question.imageURL;
          delete question.imageURL;
        }
        // Clean up empty imageUrl
        if (question.imageUrl && !question.imageUrl.trim()) {
          delete question.imageUrl;
        }
        return question;
      });

      await axios.put(`${CONTENTMANAGER.UPDATE_QUIZ}/${id}`, {
        title,
        duration,
        imageUrl: imageUrl.trim() || undefined,
        questions: normalizedQuestions,
      });
      showModal('success', 'Quiz Updated', 'Quiz updated successfully!', () => {
        navigate('/content/quizzes');
      });
    } catch (err) {
      console.error(err);
      showModal('error', 'Update Failed', err.response?.data?.error || err.message || 'Failed to update quiz. Please try again.');
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
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/content/quizzes')}
            className="inline-flex items-center text-slate-300 hover:text-white text-sm mr-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to quizzes
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">Edit Quiz</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Quiz Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Duration (minutes)</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min={1}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Quiz Image (optional)</label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQuizImageUpload}
                    className="hidden"
                    disabled={uploadingQuizImage}
                  />
                  <div className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white hover:bg-slate-800/80 transition-colors flex items-center justify-center gap-2 text-sm">
                    {uploadingQuizImage ? 'Uploading...' : '📷 Upload Image'}
                  </div>
                </label>
                <input
                  type="url"
                  className="flex-1 px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or enter image URL"
                />
              </div>
              {imageUrl && (
                <div className="relative inline-block">
                  <div className="rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-2 max-w-xs">
                    <img
                      src={imageUrl}
                      alt="Quiz preview"
                      className="max-w-full max-h-32 w-auto object-contain rounded mx-auto block"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteQuizImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    title="Delete image"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

        {questions.map((q, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Question {i + 1}</h3>
              <button
                type="button"
                className="text-red-400 hover:text-red-300 text-sm font-medium"
                onClick={() => removeQuestion(i)}
              >
                Remove
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Question Text</label>
              <input
                type="text"
                placeholder="Enter question text"
                className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                value={q.questionText || ''}
                onChange={(e) =>
                  handleQuestionChange(i, 'questionText', e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Question Image (optional)</label>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleQuestionImageUpload(i, e)}
                      className="hidden"
                      disabled={uploadingQuestionImages[i]}
                    />
                    <div className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white hover:bg-slate-800/80 transition-colors flex items-center justify-center gap-2 text-sm">
                      {uploadingQuestionImages[i] ? 'Uploading...' : '📷 Upload Image'}
                    </div>
                  </label>
                  <input
                    type="url"
                    placeholder="Or enter image URL"
                    className="flex-1 px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm"
                    value={q.imageUrl || ''}
                    onChange={(e) => handleQuestionChange(i, 'imageUrl', e.target.value)}
                  />
                </div>
                {q.imageUrl && q.imageUrl.trim() && (
                  <div className="relative inline-block">
                    <div className="rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-2 max-w-xs">
                      <img
                        src={q.imageUrl}
                        alt={`Question ${i + 1} preview`}
                        className="max-w-full max-h-32 w-auto object-contain rounded mx-auto block"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestionImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                      title="Delete image"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Options</label>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    type="text"
                    placeholder={`Option ${j + 1}`}
                    className="px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                    value={opt || ''}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                    required
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Correct Answer</label>
              <select
                className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                value={q.answer || ''}
                onChange={(e) => handleQuestionChange(i, 'answer', e.target.value)}
                required
              >
                <option value="">Select correct answer</option>
                {q.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt || `Option ${idx + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

          <button
            type="button"
            className="bg-slate-600/50 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
            onClick={addQuestion}
          >
            + Add Question
          </button>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Update Quiz'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/content/quizzes')}
              className="bg-slate-600/50 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Alert Modal */}
        <AlertPopup
          isOpen={modal.isOpen}
          onClose={() => setModal({ ...modal, isOpen: false })}
          onConfirm={modal.onConfirm}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          theme="dark"
        />

        {/* Confirmation Modal */}
        <AlertPopup
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, message: '', onConfirm: null })}
          onConfirm={confirmModal.onConfirm}
          type="warning"
          title="Confirm Action"
          message={confirmModal.message}
          showCancel={true}
          confirmText="Yes"
          cancelText="No"
          theme="dark"
        />
      </div>
    </div>
  );
};

export default EditQuiz;
