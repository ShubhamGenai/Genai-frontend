import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  const initialQuizRef = useRef(null); // Track original quiz to detect changes
  const questionsRef = useRef(questions); // Ref to track latest questions state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingQuizImage, setUploadingQuizImage] = useState(false);
  const [uploadingQuestionImages, setUploadingQuestionImages] = useState({});
  const [showPassageInput, setShowPassageInput] = useState({}); // Track which questions have passage input visible
  const [savingPassage, setSavingPassage] = useState({}); // Track which question's passage is being saved
  
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
          
          // Normalize questions to use imageUrl consistently and include passage
          // IMPORTANT: Preserve _id for existing questions (needed for updates)
          const normalizedQuestions = (found.questions || []).map(q => {
            const normalized = {
              ...q, // This preserves _id and all other fields
              imageUrl: q.imageUrl || q.image || q.imageURL || '',
              imagePublicId: q.imagePublicId || null, // Explicitly preserve imagePublicId
              passage: q.passage || ''
            };
            
            // Log to verify imagePublicId is preserved when loading
            if (q.imagePublicId) {
              console.log('Loaded question with imagePublicId:', {
                _id: q._id,
                imageUrl: normalized.imageUrl,
                imagePublicId: normalized.imagePublicId
              });
            }
            
            return normalized;
          });
          setQuestions(normalizedQuestions);
          // Save initial snapshot for change detection
          initialQuizRef.current = {
            title: found.title || '',
            duration: found.duration || '',
            questions: normalizedQuestions
          };
          // Show passage input for questions that already have a passage
          const initialPassageState = {};
          normalizedQuestions.forEach((q, index) => {
            if (q.passage && q.passage.trim() !== '') {
              initialPassageState[index] = true;
            }
          });
          setShowPassageInput(initialPassageState);
        } else {
          toast.error('Quiz Not Found: The quiz you are trying to edit was not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        toast.error('Failed to load quiz. Please try again.');
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // Update ref whenever questions state changes
  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  // Debug: Log questions state whenever it changes (to track imageUrl/imagePublicId)
  useEffect(() => {
    console.log('========== QUESTIONS STATE CHANGED ==========');
    console.log('Questions count:', questions.length);
    questions.forEach((q, idx) => {
      if (q.imageUrl || q.imagePublicId) {
        console.log(`Question ${idx + 1} HAS IMAGE DATA:`, {
          imageUrl: q.imageUrl || 'NONE',
          imagePublicId: q.imagePublicId || 'NONE',
          _id: q._id
        });
      }
    });
    console.log('=============================================');
  }, [questions]);

  const handleQuestionChange = (index, field, value) => {
    // Use functional update to ensure we're working with latest state
    setQuestions(prevQuestions => {
      const updated = prevQuestions.map((q, i) => {
        if (i === index) {
          // Create a new object to avoid mutation
          if (field === 'options') {
            return { ...q, options: value };
          } else {
            return { ...q, [field]: value };
          }
        }
        return q; // Return unchanged questions
      });
      
      // Log when imageUrl or imagePublicId is being changed
      if (field === 'imageUrl' || field === 'imagePublicId') {
        console.log(`[handleQuestionChange] Updated Question ${index + 1} ${field}:`, {
          'new value': value,
          'question after update': updated[index]
        });
      }
      
      return updated;
    });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', passage: '', options: ['', '', '', ''], answer: '', imageUrl: '' },
    ]);
    // New questions don't show passage input by default
  };

  const togglePassageInput = (questionIndex) => {
    setShowPassageInput(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
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
      toast.warning('Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.warning('Image size must be less than 10MB.');
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
console.log(response.data,"image");

      if (response.data.success && response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
        toast.success('Quiz image uploaded successfully!');
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading quiz image:', err);
      toast.error(err.response?.data?.error || err.message || 'Failed to upload image. Please try again.');
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
      toast.warning('Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.warning('Image size must be less than 10MB.');
      return;
    }

    setUploadingQuestionImages({ ...uploadingQuestionImages, [qIndex]: true });
    try {
      const formData = new FormData();
      formData.append('imageFile', file);
      formData.append('questionId', questions[qIndex]._id || '');

      console.log('Uploading question image:', formData);

      const response = await axios.post(CONTENTMANAGER.UPLOAD_QUESTION_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      
      // Log ONLY the upload response
      console.log('========== UPLOAD QUESTION IMAGE RESPONSE ==========');
      console.log('Question Index:', qIndex);
      console.log('Response Data:', JSON.stringify(data, null, 2));
      console.log('imageUrl:', data.imageUrl || 'NOT PROVIDED');
      console.log('imagePublicId:', data.imagePublicId || 'NOT PROVIDED');
      console.log('success:', data.success);
      console.log('width:', data.width);
      console.log('height:', data.height);
      console.log('format:', data.format);
      console.log('bytes:', data.bytes);
      console.log('====================================================');

      if (data.success && data.imageUrl) {
        // CRITICAL: Use functional update to ensure we're working with latest state
        setQuestions(prevQuestions => {
          const updatedQuestions = prevQuestions.map((q, idx) => {
            if (idx === qIndex) {
              // Create new object with all existing fields + new image data
              const updated = {
                ...q, // Preserve ALL existing fields (questionText, options, answer, passage, marks, _id, etc.)
                imageUrl: data.imageUrl, // Set from upload response
                imagePublicId: data.imagePublicId || null, // Set from upload response
                imageWidth: data.width || null,
                imageHeight: data.height || null,
                imageFormat: data.format || null,
                imageBytes: data.bytes || null
              };
              
              // Log immediately after creating updated object
              console.log('========== AFTER STATE UPDATE ==========');
              console.log('Question Index:', qIndex);
              console.log('Upload response imageUrl:', data.imageUrl);
              console.log('Upload response imagePublicId:', data.imagePublicId);
              console.log('Updated question imageUrl:', updated.imageUrl);
              console.log('Updated question imagePublicId:', updated.imagePublicId);
              console.log('Full updated question:', JSON.stringify(updated, null, 2));
              console.log('=========================================');
              
              return updated;
            }
            return q; // Return unchanged questions
          });
          
          return updatedQuestions;
        });

        toast.success('Question image uploaded successfully!');
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading question image:', err);
      toast.error(err.response?.data?.error || err.message || 'Failed to upload image. Please try again.');
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
      // Clear both imageUrl and imagePublicId when deleting
      handleQuestionChange(qIndex, 'imageUrl', '');
      handleQuestionChange(qIndex, 'imagePublicId', null);
      // Also clear metadata fields
      handleQuestionChange(qIndex, 'imageWidth', null);
      handleQuestionChange(qIndex, 'imageHeight', null);
      handleQuestionChange(qIndex, 'imageFormat', null);
      handleQuestionChange(qIndex, 'imageBytes', null);
      setConfirmModal({ isOpen: false, message: '', onConfirm: null });
    });
  };

  // Save passage for a specific question
  const handleSavePassage = async (qIndex) => {
    console.log(`[Save Passage] Button clicked for Question ${qIndex + 1}`);
    
    // Use latest questions state
    const currentQuestions = questionsRef.current || questions;
    const question = currentQuestions[qIndex];
    
    if (!question) {
      toast.error('Question not found.');
      return;
    }

    // Validate that question has an _id (must be an existing question)
    if (!question._id) {
      toast.warning('Please save the quiz first before updating individual passages.');
      return;
    }

    console.log(`[Save Passage] Question ${qIndex + 1} has _id: ${question._id}`);
    console.log(`[Save Passage] Current passage value:`, question.passage);

    setSavingPassage({ ...savingPassage, [qIndex]: true });
    
    try {
      // Get the current passage value from state
      const passageValue = question.passage || '';
      
      console.log(`[Save Passage] Preparing to save passage for Question ${qIndex + 1}`);
      console.log(`[Save Passage] Passage to save:`, passageValue);

      const endpoint = `${CONTENTMANAGER.UPDATE_QUESTION_PASSAGE}/${id}/question/${question._id}/passage`;
      console.log(`[Save Passage] Calling PATCH endpoint:`, endpoint);

      // Send minimal payload to backend: only the passage for this question
      const response = await axios.patch(endpoint, { passage: passageValue });

      console.log(`[Save Passage] ========== BACKEND RESPONSE ==========`); 
      console.log(`[Save Passage] Response status:`, response.status);
      console.log(`[Save Passage] Response data:`, response.data);
      console.log(`[Save Passage] ======================================`); 
      
      // Update local state to reflect the saved passage
      setQuestions(prevQuestions => {
        return prevQuestions.map((q, idx) => {
          if (idx === qIndex) {
            return { ...q, passage: passageValue };
          }
          return q;
        });
      });

      toast.success(`Passage saved successfully for Question ${qIndex + 1}!`);
    } catch (err) {
      console.error(`[Save Passage] ========== BACKEND ERROR ==========`);
      console.error(`[Save Passage] Question Index: ${qIndex + 1}`);
      console.error(`[Save Passage] Error:`, err);
      console.error(`[Save Passage] Error response:`, err.response?.data);
      console.error(`[Save Passage] Error status:`, err.response?.status);
      console.error(`[Save Passage] ===================================`);
      
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.details?.join?.('\n') || 
                          err.message || 
                          'Failed to save passage. Please try again.';
      toast.error(typeof errorMessage === 'string' ? errorMessage : 'Failed to save passage. Please check the console for details.');
    } finally {
      setSavingPassage({ ...savingPassage, [qIndex]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // CRITICAL: Use ref to get the latest questions state (avoid closure issues)
      const currentQuestions = questionsRef.current || questions;
      const initialQuiz = initialQuizRef.current;
      
      console.log('========== HANDLE SUBMIT - IMAGE DATA LOG ==========');
      console.log('Using questionsRef.current (latest state):');
      console.log('Total questions:', currentQuestions.length);
      currentQuestions.forEach((q, idx) => {
        console.log(`Question ${idx + 1} RAW STATE:`, {
          _id: q._id,
          'q.imageUrl': q.imageUrl,
          'q.imagePublicId': q.imagePublicId,
          'q.imageUrl type': typeof q.imageUrl,
          'q.imagePublicId type': typeof q.imagePublicId,
          'q.imageUrl truthy': !!q.imageUrl,
          'q.imagePublicId truthy': !!q.imagePublicId,
          'q.imageUrl length': q.imageUrl ? q.imageUrl.length : 0,
          'q.imagePublicId length': q.imagePublicId ? q.imagePublicId.length : 0,
          'All question keys': Object.keys(q),
          'Full question object': JSON.stringify(q, null, 2)
        });
      });

      // CRITICAL CHECK: Verify questions state has image data before normalization
      console.log('========== BEFORE NORMALIZATION - STATE CHECK ==========');
      console.log('Using questionsRef.current (latest state)');
      currentQuestions.forEach((q, idx) => {
        console.log(`Question ${idx + 1} STATE CHECK:`, {
          'q.imageUrl exists': 'imageUrl' in q,
          'q.imageUrl value': q.imageUrl,
          'q.imagePublicId exists': 'imagePublicId' in q,
          'q.imagePublicId value': q.imagePublicId,
          'All keys in q': Object.keys(q)
        });
      });
      console.log('======================================================');

      // Normalize and sanitize questions for backend - USE currentQuestions from ref
      const normalizedQuestions = currentQuestions.map((q, index) => {
        // Preserve _id if it exists (needed for Mongoose to update existing questions)
        const question = {
          ...(q._id && { _id: q._id }), // Only include _id if it exists
        };

        // Normalize imageUrl - DIRECTLY use q.imageUrl from state
        // Don't use fallbacks that might mask the real value
        let imageUrlValue = '';
        if (q.imageUrl !== null && q.imageUrl !== undefined && q.imageUrl !== '') {
          imageUrlValue = String(q.imageUrl).trim();
        }

        // Normalize imagePublicId - DIRECTLY use q.imagePublicId from state
        let imagePublicIdValue = null;
        if (q.imagePublicId !== null && q.imagePublicId !== undefined && q.imagePublicId !== '') {
          if (typeof q.imagePublicId === 'string') {
            imagePublicIdValue = q.imagePublicId.trim() || null;
          } else {
            imagePublicIdValue = String(q.imagePublicId).trim() || null;
          }
        }

        // Log for debugging - FOCUSED ON IMAGE URL AND PUBLIC ID
        console.log(`[Submit] Question ${index + 1} IMAGE DATA PROCESSING:`, {
          'RAW q.imageUrl': q.imageUrl,
          'RAW q.imagePublicId': q.imagePublicId,
          'RAW q.imageUrl type': typeof q.imageUrl,
          'RAW q.imagePublicId type': typeof q.imagePublicId,
          'NORMALIZED imageUrlValue': imageUrlValue || 'EMPTY',
          'NORMALIZED imagePublicIdValue': imagePublicIdValue || 'NULL',
          'imageUrlValue length': imageUrlValue.length,
          'imagePublicIdValue length': imagePublicIdValue ? imagePublicIdValue.length : 0,
          'Will send imageUrl': imageUrlValue ? 'YES' : 'NO',
          'Will send imagePublicId': imagePublicIdValue ? 'YES' : 'NO'
        });

        // Build optional image metadata from upload response (width, height, format, bytes)
        const imageWidth = typeof q.imageWidth === 'number' ? q.imageWidth : q.imageWidth || null;
        const imageHeight = typeof q.imageHeight === 'number' ? q.imageHeight : q.imageHeight || null;
        const imageFormat = q.imageFormat || null;
        const imageBytes = typeof q.imageBytes === 'number' ? q.imageBytes : q.imageBytes || null;

        // Normalize options - ensure they're strings and filter empty ones
        const validOptions = (q.options || [])
          .map(opt => String(opt).trim())
          .filter(opt => opt !== '');

        // Build the question object with all required fields
        question.questionText = String(q.questionText || '').trim();
        question.passage = (q.passage !== null && q.passage !== undefined) ? String(q.passage) : '';
        question.options = validOptions;
        question.answer = String(q.answer || '').trim();
        
        // CRITICAL: ALWAYS include imageUrl and imagePublicId in the question object
        // These MUST be included for backend to save them correctly
        // Backend expects these fields to be present for each question
        question.imageUrl = imageUrlValue || ''; // Always string (empty if none)
        question.imagePublicId = imagePublicIdValue || null; // Always null or string
        
        // Ensure these fields are explicitly set and not undefined
        if (question.imageUrl === undefined) question.imageUrl = '';
        if (question.imagePublicId === undefined) question.imagePublicId = null;
        
        // Final check - log what we're actually assigning to question object
        console.log(`[Submit] Question ${index + 1} FINAL ASSIGNMENT:`, {
          'question.imageUrl': question.imageUrl || 'EMPTY STRING',
          'question.imagePublicId': question.imagePublicId || 'NULL',
          'question.imageUrl type': typeof question.imageUrl,
          'question.imagePublicId type': typeof question.imagePublicId,
          'question.imageUrl length': question.imageUrl ? question.imageUrl.length : 0,
          'question.imagePublicId length': question.imagePublicId ? question.imagePublicId.length : 0
        });

        // Log AFTER assigning to question object
        console.log(`[Submit] Question ${index + 1} AFTER ASSIGNMENT:`, {
          'question.imageUrl': question.imageUrl || 'EMPTY',
          'question.imagePublicId': question.imagePublicId || 'NULL',
          'question object keys': Object.keys(question),
          'question object': JSON.stringify(question, null, 2)
        });

        // Attach image metadata so backend receives all uploadQuestionImage fields
        if (imageWidth !== null) question.imageWidth = imageWidth;
        if (imageHeight !== null) question.imageHeight = imageHeight;
        if (imageFormat) question.imageFormat = imageFormat;
        if (imageBytes !== null) question.imageBytes = imageBytes;

        question.marks = (q.marks && !isNaN(parseInt(q.marks))) ? parseInt(q.marks) : 1;

        return question;
      });

      // Prepare the update payload - send only changed fields to backend
      const updatePayload = {};

      const trimmedTitle = title.trim();
      const initialTitle = initialQuiz ? String(initialQuiz.title || '').trim() : null;
      if (!initialQuiz || trimmedTitle !== initialTitle) {
        updatePayload.title = trimmedTitle;
      }

      const durationNum = duration ? parseInt(duration) : undefined;
      const initialDurationNum = initialQuiz && initialQuiz.duration ? parseInt(initialQuiz.duration) : undefined;
      if (!initialQuiz || durationNum !== initialDurationNum) {
        if (durationNum !== undefined) {
          updatePayload.duration = durationNum;
        }
      }

      // Compare questions deeply; if changed (or initial unknown), send full questions array
      const initialQuestions = initialQuiz ? initialQuiz.questions || [] : [];
      const questionsChanged =
        !initialQuiz ||
        initialQuestions.length !== currentQuestions.length ||
        JSON.stringify(initialQuestions) !== JSON.stringify(currentQuestions);

      if (questionsChanged) {
        updatePayload.questions = normalizedQuestions;
      }
      
      // Final verification: Check imageUrl and imagePublicId in payload
      console.log('========== FINAL PAYLOAD VERIFICATION ==========');
      updatePayload.questions.forEach((q, idx) => {
        console.log(`Question ${idx + 1} FINAL PAYLOAD:`, {
          '_id': q._id || 'NEW',
          'imageUrl FIELD EXISTS': 'imageUrl' in q,
          'imageUrl VALUE': q.imageUrl || 'EMPTY',
          'imageUrl TYPE': typeof q.imageUrl,
          'imageUrl LENGTH': q.imageUrl ? q.imageUrl.length : 0,
          'imagePublicId FIELD EXISTS': 'imagePublicId' in q,
          'imagePublicId VALUE': q.imagePublicId || 'NULL',
          'imagePublicId TYPE': typeof q.imagePublicId,
          'imagePublicId LENGTH': q.imagePublicId ? q.imagePublicId.length : 0,
          'ALL FIELDS': Object.keys(q),
          'FULL QUESTION JSON': JSON.stringify(q, null, 2)
        });
      });
      
      // Extract just imageUrl and imagePublicId for quick verification
      const imageDataSummary = normalizedQuestions.map((q, idx) => ({
        question: idx + 1,
        _id: q._id || 'NEW',
        imageUrl: q.imageUrl || 'EMPTY',
        imagePublicId: q.imagePublicId || 'NULL'
      }));
      console.log('IMAGE DATA SUMMARY (what will be sent to backend):', JSON.stringify(imageDataSummary, null, 2));
      console.log('================================================');

      // Debug: Log image data for each question - FOCUSED ON IMAGE URL AND PUBLIC ID
      console.log('========== FINAL PAYLOAD - IMAGE URL & PUBLIC ID CHECK ==========');
      normalizedQuestions.forEach((q, idx) => {
        console.log(`Question ${idx + 1} FINAL CHECK:`, {
          '_id': q._id || 'NEW',
          'imageUrl EXISTS': 'imageUrl' in q,
          'imageUrl VALUE': q.imageUrl || 'EMPTY',
          'imageUrl TYPE': typeof q.imageUrl,
          'imageUrl LENGTH': q.imageUrl ? q.imageUrl.length : 0,
          'imagePublicId EXISTS': 'imagePublicId' in q,
          'imagePublicId VALUE': q.imagePublicId || 'NULL',
          'imagePublicId TYPE': typeof q.imagePublicId,
          'ALL KEYS': Object.keys(q),
          'FULL QUESTION': JSON.stringify(q, null, 2)
        });
      });
      
      // Extract just imageUrl and imagePublicId from all questions for quick check
      const imageDataCheck = normalizedQuestions.map((q, idx) => ({
        question: idx + 1,
        imageUrl: q.imageUrl,
        imagePublicId: q.imagePublicId
      }));
      console.log('IMAGE DATA SUMMARY:', JSON.stringify(imageDataCheck, null, 2));
      
      console.log('Full payload (first 2000 chars):', JSON.stringify(updatePayload, null, 2).substring(0, 2000));
      console.log('==========================================');

      const response = await axios.put(`${CONTENTMANAGER.UPDATE_QUIZ}/${id}`, updatePayload);
      
      console.log('Update response:', response.data);
      toast.success('Quiz updated successfully!');
      
      // Navigate after a short delay to allow toast to be visible
      setTimeout(() => {
        navigate('/content/quizzes');
      }, 1000);
    } catch (err) {
      console.error('Update error:', err);
      console.error('Error response:', err.response?.data);
      
      // Show detailed error message
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.details?.join?.('\n') || 
                          err.message || 
                          'Failed to update quiz. Please try again.';
      
      toast.error(typeof errorMessage === 'string' ? errorMessage : 'Failed to update quiz. Please check the console for details.');
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

            {/* Passage Section - Show button if no passage, show input if passage exists or button clicked */}
            {(!q.passage || q.passage.trim() === '') && !showPassageInput[i] ? (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => togglePassageInput(i)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium border border-slate-600/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Add Passage (Optional)
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Passage (Optional)
                    <span className="text-xs text-slate-400 font-normal ml-1">- For reading comprehension questions</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {q._id && (
                      <button
                        type="button"
                        onClick={() => handleSavePassage(i)}
                        disabled={savingPassage[i]}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {savingPassage[i] ? (
                          <>
                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Passage
                          </>
                        )}
                      </button>
                    )}
                    {(!q.passage || q.passage.trim() === '') && (
                      <button
                        type="button"
                        onClick={() => togglePassageInput(i)}
                        className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  rows={6}
                  placeholder="Enter passage text (e.g., reading comprehension passage, case study, etc.)... Press Enter for new paragraphs."
                  className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-y font-normal leading-relaxed"
                  value={q.passage || ''}
                  onChange={(e) => handleQuestionChange(i, 'passage', e.target.value)}
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                />
                {q.passage && q.passage.trim() !== '' && (
                  <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs border border-slate-600/30">
                    <div className="text-slate-400 mb-1">Preview:</div>
                    <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">{q.passage}</div>
                  </div>
                )}
              </div>
            )}

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
                    onChange={(e) => {
                      const newUrl = e.target.value;
                      // Update imageUrl - preserve imagePublicId if it exists
                      // Only clear imagePublicId if URL is completely cleared
                      if (!newUrl.trim()) {
                        // URL cleared - clear both
                        handleQuestionChange(i, 'imageUrl', '');
                        handleQuestionChange(i, 'imagePublicId', null);
                      } else {
                        // URL entered - update imageUrl but preserve imagePublicId if it exists
                        // (Don't clear imagePublicId - it might be from upload)
                        handleQuestionChange(i, 'imageUrl', newUrl);
                      }
                    }}
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
