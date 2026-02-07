import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import QuestionImageUpload from "../../../../component/contentManagerComponents/QuestionImageUpload";
import AlertPopup from "../../../../component/common/AlertPopup";
import { Edit2, Image as ImageIcon, X, Check, Save, Plus, Trash2 } from "lucide-react";

const QuizBulkUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [parseStats, setParseStats] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [imageUploadModal, setImageUploadModal] = useState({ isOpen: false, quizIndex: null, questionIndex: null });
  const [alertPopup, setAlertPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setQuizzes([]);
    setSummary(null);
    setError(null);
    setParseStats(null);
  };

  // Proper CSV parser that handles quoted fields with commas
  const parseCsvRow = (line) => {
    const result = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    
    return result;
  };

  const parseCsvText = (text) => {
    // Split by newlines but preserve quoted multi-line fields
    const lines = [];
    let currentLine = '';
    let insideQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentLine += '"';
          i++; // Skip next quote
        } else {
          insideQuotes = !insideQuotes;
          currentLine += char;
        }
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        // End of line (only if not inside quotes)
        if (currentLine.trim().length > 0) {
          lines.push(currentLine.trim());
        }
        currentLine = '';
        // Skip \r\n combination
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentLine += char;
      }
    }
    
    // Add the last line if any
    if (currentLine.trim().length > 0) {
      lines.push(currentLine.trim());
    }

    if (lines.length <= 1) {
      throw new Error("No data rows found in file.");
    }

    // Parse header
    const header = parseCsvRow(lines[0]);
    const requiredHeaders = [
      "quizTitle",
      "quizDuration",
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "answer",
    ];

    for (const h of requiredHeaders) {
      if (!header.includes(h)) {
        throw new Error(
          `Missing required column '${h}'. Please download and use the template.`
        );
      }
    }

    const idx = (name) => header.indexOf(name);
    const quizMap = new Map();
    const parseErrors = [];
    let totalRowsProcessed = 0;
    let skippedRows = 0;
    let totalQuestions = 0;

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row || row.trim().length === 0) continue;

      totalRowsProcessed++;
      
      try {
        const cols = parseCsvRow(row);
        
        // Ensure we have enough columns (at least match header length)
        if (cols.length < header.length) {
          // Pad with empty strings if needed
          while (cols.length < header.length) {
            cols.push('');
          }
        }

        const quizTitle = cols[idx("quizTitle")] || '';
        const quizDuration = cols[idx("quizDuration")] || '';
        const questionText = cols[idx("questionText")] || '';
        const option1 = cols[idx("option1")] || '';
        const option2 = cols[idx("option2")] || '';
        const option3 = cols[idx("option3")] || '';
        const option4 = cols[idx("option4")] || '';
        const answer = cols[idx("answer")] || '';

        // Remove quotes from values if present
        const cleanValue = (val) => {
          if (!val) return '';
          val = val.trim();
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          }
          return val.replace(/""/g, '"'); // Replace escaped quotes
        };

        const cleanQuizTitle = cleanValue(quizTitle);
        const cleanQuizDuration = cleanValue(quizDuration);
        const cleanQuestionText = cleanValue(questionText);
        const cleanOption1 = cleanValue(option1);
        const cleanOption2 = cleanValue(option2);
        const cleanOption3 = cleanValue(option3);
        const cleanOption4 = cleanValue(option4);
        const cleanAnswer = cleanValue(answer);

        if (!cleanQuizTitle || !cleanQuestionText) {
          skippedRows++;
          continue;
        }

        const key = `${cleanQuizTitle}__${cleanQuizDuration || ""}`;
        if (!quizMap.has(key)) {
          quizMap.set(key, {
            title: cleanQuizTitle,
            duration: cleanQuizDuration ? Number(cleanQuizDuration) : undefined,
            questions: [],
          });
        }

        const quiz = quizMap.get(key);
        quiz.questions.push({
          questionText: cleanQuestionText,
          passage: '', // Initialize passage as empty (can be added during edit)
          options: [cleanOption1, cleanOption2, cleanOption3, cleanOption4].filter((o) => o && o.trim() !== ''),
          answer: cleanAnswer,
        });
        totalQuestions++;
      } catch (err) {
        skippedRows++;
        parseErrors.push(`Row ${i + 1}: ${err.message}`);
        console.warn(`Error parsing row ${i + 1}:`, err);
      }
    }

    const quizzes = Array.from(quizMap.values());
    
    // Calculate total questions
    const finalTotalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0);
    
    // Log parsing summary
    console.log(`CSV Parsing Summary:
      - Total rows processed: ${totalRowsProcessed}
      - Rows skipped: ${skippedRows}
      - Quizzes created: ${quizzes.length}
      - Total questions: ${finalTotalQuestions}
      - Parse errors: ${parseErrors.length}`);

    if (parseErrors.length > 0) {
      console.warn('Parse errors:', parseErrors);
    }

    if (quizzes.length === 0) {
      throw new Error("No valid quiz rows found in file. Please check your CSV format.");
    }

    // Return quizzes with stats
    quizzes._parseStats = {
      totalRows: totalRowsProcessed,
      skippedRows: skippedRows,
      totalQuizzes: quizzes.length,
      totalQuestions: finalTotalQuestions,
      errors: parseErrors
    };

    return quizzes;
  };

  const handleParse = () => {
    if (!file) {
      setAlertPopup({
        isOpen: true,
        title: 'No File Selected',
        message: 'Please select a CSV file first.',
        type: 'error'
      });
      return;
    }

    setIsParsing(true);
    setError(null);
    setQuizzes([]);
    setSummary(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let text = e.target?.result || "";
        
        // Remove BOM (Byte Order Mark) if present
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.slice(1);
        }
        
        // Remove any leading/trailing whitespace
        text = text.trim();
        
        if (!text) {
          throw new Error("File appears to be empty.");
        }
        
        const parsedQuizzes = parseCsvText(text);
        if (parsedQuizzes.length === 0) {
          throw new Error("No valid quiz rows found in file.");
        }
        // Initialize imageUrl and passage for all questions
        const quizzesWithImages = parsedQuizzes.map(quiz => ({
          ...quiz,
          questions: quiz.questions.map(q => ({
            ...q,
            imageUrl: q.imageUrl || '',
            passage: q.passage || ''
          }))
        }));
        setQuizzes(quizzesWithImages);
        // Store parse stats
        if (parsedQuizzes._parseStats) {
          setParseStats(parsedQuizzes._parseStats);
        }
        // Show review screen after parsing
        setShowReview(true);
      } catch (err) {
        console.error("Parse error:", err);
        setAlertPopup({
          isOpen: true,
          title: 'Parse Error',
          message: err.message || "Failed to parse CSV file.",
          type: 'error'
        });
        setError(err.message || "Failed to parse CSV file.");
      } finally {
        setIsParsing(false);
      }
    };
    reader.onerror = () => {
      setIsParsing(false);
      setAlertPopup({
        isOpen: true,
        title: 'File Read Error',
        message: 'Failed to read file. Please try again.',
        type: 'error'
      });
      setError("Failed to read file.");
    };
    // Read as UTF-8 text
    reader.readAsText(file, 'UTF-8');
  };

  const handleUpload = async () => {
    if (!quizzes.length) {
      setAlertPopup({
        isOpen: true,
        title: 'No Quizzes',
        message: 'No quizzes parsed. Please parse the file first.',
        type: 'error'
      });
      return;
    }

    setIsUploading(true);
    setError(null);
    setSummary(null);

    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (let i = 0; i < quizzes.length; i++) {
      const quizData = quizzes[i];
      
      // Debug: Log raw quiz data from state before formatting
      console.log(`[Bulk Upload] Raw quiz data from state for "${quizData.title}":`, {
        questionsCount: quizData.questions?.length || 0,
        questions: quizData.questions?.map((q, idx) => ({
          index: idx + 1,
          hasPassage: 'passage' in q,
          passageType: typeof q.passage,
          passageValue: q.passage,
          passageLength: q.passage ? String(q.passage).length : 0
        })) || []
      });
      
      // Format and validate quiz data before sending
      try {
        // Validate quiz title and duration first
        const quizTitle = quizData.title?.trim() || '';
        const quizDuration = quizData.duration ? parseInt(quizData.duration) : undefined;
        
        if (!quizTitle) {
          throw new Error('Quiz title is required');
        }
        
        if (!quizDuration || isNaN(quizDuration)) {
          throw new Error('Valid duration is required');
        }
        
        // Validate and format questions
        if (!quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
          throw new Error('At least one question is required');
        }
        
        const formattedQuestions = quizData.questions.map((q, qIdx) => {
          // Debug: Log raw question data before formatting
          console.log(`[Bulk Upload] Raw question ${qIdx + 1} data:`, {
            hasPassage: 'passage' in q,
            passageType: typeof q.passage,
            passageValue: q.passage,
            passageLength: q.passage ? String(q.passage).length : 0
          });
          
          // Filter out empty options and trim all options
          const validOptions = (q.options || [])
            .map(opt => String(opt).trim())
            .filter(opt => opt !== '');
          
          // Ensure at least 2 options
          if (validOptions.length < 2) {
            throw new Error(`Question ${qIdx + 1}: At least 2 options are required`);
          }
          
          // Trim question text
          const questionText = String(q.questionText || '').trim();
          if (!questionText) {
            throw new Error(`Question ${qIdx + 1}: Question text is required`);
          }
          
          // Trim answer
          const trimmedAnswer = String(q.answer || '').trim();
          
          // Check if answer matches one of the valid options
          if (!trimmedAnswer) {
            throw new Error(`Question ${qIdx + 1}: Answer is required`);
          }
          
          if (!validOptions.includes(trimmedAnswer)) {
            throw new Error(`Question ${qIdx + 1}: Answer "${trimmedAnswer}" must match one of the options: ${validOptions.join(', ')}`);
          }
          
          // Handle passage - ensure it's always included as a string
          // Check for passage in multiple ways to ensure we catch it
          let passageValue = '';
          if (q.hasOwnProperty('passage')) {
            // Passage property exists, use it (even if empty string)
            passageValue = (q.passage !== null && q.passage !== undefined) ? String(q.passage) : '';
          } else {
            // Passage property doesn't exist, default to empty string
            passageValue = '';
          }
          
          const formattedQuestion = {
            questionText: questionText,
            passage: passageValue, // Preserve passage formatting (line breaks, paragraphs) - don't trim
            options: validOptions,
            answer: trimmedAnswer,
            imageUrl: (q.imageUrl && String(q.imageUrl).trim()) ? String(q.imageUrl).trim() : '',
            marks: q.marks && !isNaN(parseInt(q.marks)) ? parseInt(q.marks) : 1
          };
          
          // Debug: Log passage for each question
          console.log(`[Bulk Upload] Formatted question ${qIdx + 1}:`, {
            hasPassage: !!passageValue,
            passageLength: passageValue.length,
            passagePreview: passageValue ? passageValue.substring(0, 50) + '...' : 'empty',
            fullPassage: passageValue
          });
          
          return formattedQuestion;
        });
        
        const formattedQuiz = {
          title: quizTitle,
          duration: quizDuration,
          questions: formattedQuestions
        };
        
        // Debug: Log passage data being sent
        console.log(`[Bulk Upload] Sending quiz "${quizTitle}" with ${formattedQuestions.length} questions`);
        formattedQuestions.forEach((q, idx) => {
          if (q.passage && q.passage.trim() !== '') {
            console.log(`[Bulk Upload] Question ${idx + 1} has passage (${q.passage.length} chars):`, q.passage.substring(0, 50) + '...');
          } else {
            console.log(`[Bulk Upload] Question ${idx + 1} has no passage`);
          }
        });
        
        // Log full quiz data structure to verify passage is included
        console.log('[Bulk Upload] Full quiz data being sent:', JSON.stringify(formattedQuiz, null, 2));
        // Send to backend
        await axios.post(CONTENTMANAGER.ADD_QUIZ, formattedQuiz);
        successCount++;
      } catch (err) {
        failCount++;
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Unknown error";
        errors.push({ quizTitle: quizData.title || 'Untitled', error: msg });
        console.error(`Error uploading quiz "${quizData.title || 'Untitled'}":`, err.response?.data || err.message);
      }
    }

    setIsUploading(false);
    setSummary({ total: quizzes.length, success: successCount, failed: failCount, errors });

    // Show success message and navigate if all quizzes uploaded successfully
    if (failCount === 0 && successCount > 0) {
      setAlertPopup({
        isOpen: true,
        title: 'Success',
        message: `Successfully uploaded ${successCount} quiz${successCount > 1 ? 'zes' : ''}!`,
        type: 'success',
        onConfirm: () => {
          navigate('/content/quizzes');
        }
      });
    } else if (failCount > 0) {
      // Show error popup with details
      const errorMessages = errors.map(e => `• ${e.quizTitle}: ${e.error}`).join('\n');
      setAlertPopup({
        isOpen: true,
        title: 'Upload Completed with Errors',
        message: `Successfully uploaded: ${successCount}\nFailed: ${failCount}\n\nErrors:\n${errorMessages}`,
        type: 'warning'
      });
    } else {
      // All failed
      setAlertPopup({
        isOpen: true,
        title: 'Upload Failed',
        message: `Failed to upload all ${quizzes.length} quiz${quizzes.length > 1 ? 'zes' : ''}. Please check the errors and try again.`,
        type: 'error'
      });
    }
  };

  const handleDownloadTemplate = () => {
    const headerRow = [
      "quizTitle",
      "quizDuration",
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "answer",
    ];

    const sampleRow = [
      "Sample Quiz",
      "30",
      "What is 2 + 2?",
      "3",
      "4",
      "5",
      "6",
      "4",
    ];

    const csvContent = [headerRow.join(","), sampleRow.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "quizzes-bulk-upload-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetState = () => {
    setFile(null);
    setQuizzes([]);
    setSummary(null);
    setError(null);
    setParseStats(null);
    setIsParsing(false);
    setIsUploading(false);
    setShowReview(false);
    setEditingQuestion(null);
    setImageUploadModal({ isOpen: false, quizIndex: null, questionIndex: null });
  };

  const handleEditQuestion = (quizIndex, questionIndex) => {
    setEditingQuestion({ quizIndex, questionIndex });
  };

  const handleDeleteQuestion = (quizIndex, questionIndex) => {
    const updatedQuizzes = quizzes.map((quiz, idx) => ({
      ...quiz,
      questions: idx === quizIndex ? quiz.questions.filter((_, qIdx) => qIdx !== questionIndex) : quiz.questions,
    }));

    setQuizzes(updatedQuizzes);

    // Clear editing state if the deleted question was being edited
    if (
      editingQuestion &&
      editingQuestion.quizIndex === quizIndex &&
      editingQuestion.questionIndex === questionIndex
    ) {
      setEditingQuestion(null);
    }
  };

  const handleSaveQuestion = (quizIndex, questionIndex, updatedQuestion) => {
    console.log(`[Bulk Upload] handleSaveQuestion called for quiz ${quizIndex + 1}, question ${questionIndex + 1}`);
    console.log(`[Bulk Upload] updatedQuestion received:`, {
      hasPassage: 'passage' in updatedQuestion,
      passageType: typeof updatedQuestion.passage,
      passageValue: updatedQuestion.passage,
      passageLength: updatedQuestion.passage ? String(updatedQuestion.passage).length : 0
    });
    
    const updatedQuizzes = quizzes.map((quiz, qIdx) => {
      if (qIdx === quizIndex) {
        return {
          ...quiz,
          questions: quiz.questions.map((q, qIndex) => {
            if (qIndex === questionIndex) {
              // Ensure passage is explicitly included and properly formatted
              let passageValue = '';
              if (updatedQuestion.hasOwnProperty('passage')) {
                // Passage property exists, use it (preserve even empty strings)
                passageValue = (updatedQuestion.passage !== null && updatedQuestion.passage !== undefined) ? String(updatedQuestion.passage) : '';
              } else {
                // Passage property doesn't exist, check if original question has it
                passageValue = (q.passage !== null && q.passage !== undefined) ? String(q.passage) : '';
              }
              
              const savedQuestion = {
                questionText: updatedQuestion.questionText || q.questionText,
                passage: passageValue, // Preserve passage formatting - explicitly set
                options: updatedQuestion.options || q.options,
                answer: updatedQuestion.answer || q.answer,
                imageUrl: updatedQuestion.imageUrl || q.imageUrl || '',
                marks: updatedQuestion.marks || q.marks || 1
              };
              // Debug: Log saved passage
              console.log(`[Bulk Upload] Saved question ${questionIndex + 1} in quiz ${quizIndex + 1}:`, {
                hasPassage: !!passageValue,
                passageLength: passageValue.length,
                passagePreview: passageValue ? passageValue.substring(0, 50) + '...' : 'empty',
                fullSavedQuestion: savedQuestion
              });
              return savedQuestion;
            }
            return q;
          })
        };
      }
      return quiz;
    });
    
    // Debug: Verify the updated state
    console.log(`[Bulk Upload] Updated quizzes state - question ${questionIndex + 1} in quiz ${quizIndex + 1}:`, {
      passage: updatedQuizzes[quizIndex].questions[questionIndex].passage,
      passageLength: updatedQuizzes[quizIndex].questions[questionIndex].passage ? String(updatedQuizzes[quizIndex].questions[questionIndex].passage).length : 0
    });
    
    setQuizzes(updatedQuizzes);
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleImageUploaded = (imageUrl) => {
    if (imageUploadModal.quizIndex !== null && imageUploadModal.questionIndex !== null && imageUrl) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes[imageUploadModal.quizIndex].questions[imageUploadModal.questionIndex].imageUrl = imageUrl;
      setQuizzes(updatedQuizzes);
      setImageUploadModal({ isOpen: false, quizIndex: null, questionIndex: null });
    }
  };

  const handleRemoveImage = (quizIndex, questionIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions[questionIndex].imageUrl = '';
    setQuizzes(updatedQuizzes);
  };

  const handleOpenImageUpload = (quizIndex, questionIndex) => {
    setImageUploadModal({ isOpen: true, quizIndex, questionIndex });
  };

  const handleCloseImageUpload = () => {
    setImageUploadModal({ isOpen: false, quizIndex: null, questionIndex: null });
  };

  // Review Screen Component
  const ReviewScreen = () => {
    if (!showReview || quizzes.length === 0) return null;

    return (
      <div className="w-full min-h-full pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Review & Edit Questions
            </h1>
            <p className="text-slate-400 text-base font-light">
              Review all questions, add images, and make edits before uploading.
            </p>
          </div>
          <button
            onClick={() => setShowReview(false)}
            className="px-4 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-700/70 transition-colors"
          >
            Back to Upload
          </button>
        </div>

        <div className="space-y-6">
          {quizzes.map((quiz, quizIndex) => (
            <div
              key={quizIndex}
              className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6"
            >
              <div className="mb-4 pb-4 border-b border-slate-600/30">
                <h2 className="text-xl font-semibold text-white mb-2">{quiz.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <span>Duration: {quiz.duration || 'N/A'} minutes</span>
                  <span>Questions: {quiz.questions.length}</span>
                </div>
              </div>

              <div className="space-y-4">
                {quiz.questions.map((question, questionIndex) => {
                  const isEditing = editingQuestion?.quizIndex === quizIndex && editingQuestion?.questionIndex === questionIndex;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-slate-400">
                          Question {questionIndex + 1}
                        </span>
                        {!isEditing && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditQuestion(quizIndex, questionIndex)}
                              className="p-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
                              title="Edit question"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(quizIndex, questionIndex)}
                              className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                              title="Delete question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <EditQuestionForm
                          question={question}
                          quizIndex={quizIndex}
                          questionIndex={questionIndex}
                          onSave={handleSaveQuestion}
                          onCancel={handleCancelEdit}
                          onImageUpload={() => handleOpenImageUpload(quizIndex, questionIndex)}
                          onRemoveImage={() => handleRemoveImage(quizIndex, questionIndex)}
                        />
                      ) : (
                        <QuestionDisplay
                          question={question}
                          onImageUpload={() => handleOpenImageUpload(quizIndex, questionIndex)}
                          onRemoveImage={() => handleRemoveImage(quizIndex, questionIndex)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setShowReview(false)}
            className="px-6 py-2.5 bg-slate-700/40 border border-slate-600/30 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-700/70 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl text-sm font-semibold text-white transition-all"
          >
            {isUploading ? "Uploading..." : "Upload All Quizzes"}
          </button>
        </div>
      </div>
    );
  };

  // Question Display Component
  const QuestionDisplay = ({ question, onImageUpload, onRemoveImage }) => (
    <div className="space-y-3">
      <div>
        {question.passage && question.passage.trim() !== '' && (
          <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">Passage:</p>
            <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {question.passage}
            </div>
          </div>
        )}
        <p className="text-white font-medium mb-2">{question.questionText}</p>
        {question.imageUrl && (
          <div className="relative mb-3 inline-block">
            <img
              src={question.imageUrl}
              alt="Question"
              className="max-w-full max-h-64 rounded-lg border border-slate-600/30"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-1">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              option === question.answer
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200'
                : 'bg-slate-700/40 border border-slate-600/30 text-slate-300'
            }`}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
            {option}
            {option === question.answer && (
              <span className="ml-2 text-xs">✓ Correct</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onImageUpload}
        className="mt-2 px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/70 transition-colors flex items-center gap-2"
      >
        <ImageIcon className="w-3 h-3" />
        {question.imageUrl ? 'Change Image' : 'Add Image'}
      </button>
    </div>
  );

  // Edit Question Form Component
  const EditQuestionForm = ({ question, quizIndex, questionIndex, onSave, onCancel, onImageUpload, onRemoveImage }) => {
    // Ensure passage is always initialized as a string
    const initialPassage = (question.passage !== null && question.passage !== undefined) ? String(question.passage) : '';
    const [editedQuestion, setEditedQuestion] = useState({ 
      ...question, 
      passage: initialPassage 
    });
    const [editError, setEditError] = useState(null);
    const [showPassageInput, setShowPassageInput] = useState(!!(initialPassage && initialPassage.trim() !== ''));

    const handleAddOption = () => {
      const newOptions = [...editedQuestion.options, ''];
      setEditedQuestion({ ...editedQuestion, options: newOptions });
      setEditError(null);
    };

    const handleRemoveOption = (indexToRemove) => {
      const validOptions = editedQuestion.options.filter(o => o && o.trim());
      if (validOptions.length <= 2) {
        setEditError("At least 2 options are required");
        return;
      }
      
      const removedOption = editedQuestion.options[indexToRemove];
      const newOptions = editedQuestion.options.filter((_, idx) => idx !== indexToRemove);
      
      // If the removed option was the answer, clear the answer
      let newAnswer = editedQuestion.answer;
      if (removedOption === editedQuestion.answer) {
        newAnswer = '';
      }
      
      setEditedQuestion({ 
        ...editedQuestion, 
        options: newOptions,
        answer: newAnswer
      });
      setEditError(null);
    };

    const handleSave = () => {
      setEditError(null);
      if (!editedQuestion.questionText.trim()) {
        setEditError("Question text is required");
        return;
      }
      const validOptions = editedQuestion.options.filter(o => o && o.trim());
      if (validOptions.length < 2) {
        setEditError("At least 2 options are required");
        return;
      }
      if (!editedQuestion.answer.trim()) {
        setEditError("Answer is required");
        return;
      }
      // Ensure answer matches one of the valid options
      if (!validOptions.includes(editedQuestion.answer)) {
        setEditError("Answer must match one of the options");
        return;
      }
      // Filter out empty options before saving, ensure passage is included
      // Get passage value - check if it exists in editedQuestion, even if empty string
      let passageValue = '';
      if (editedQuestion.hasOwnProperty('passage')) {
        // Passage property exists, use it (preserve even empty strings)
        passageValue = (editedQuestion.passage !== null && editedQuestion.passage !== undefined) ? String(editedQuestion.passage) : '';
      } else {
        // Passage property doesn't exist, default to empty
        passageValue = '';
      }
      
      const cleanedQuestion = {
        questionText: editedQuestion.questionText.trim(),
        passage: passageValue, // Preserve passage formatting (line breaks, paragraphs) - don't trim
        options: validOptions,
        answer: editedQuestion.answer.trim(),
        imageUrl: editedQuestion.imageUrl || '',
        marks: editedQuestion.marks || 1
      };
      
      // Debug: Log passage before saving - show full details
      console.log(`[Bulk Upload] Saving question ${questionIndex + 1} in quiz ${quizIndex + 1}:`, {
        editedQuestionPassage: editedQuestion.passage,
        passageType: typeof editedQuestion.passage,
        hasPassageProperty: editedQuestion.hasOwnProperty('passage'),
        passageValue: passageValue,
        passageLength: passageValue.length,
        passagePreview: passageValue ? passageValue.substring(0, 100) + '...' : 'empty',
        questionText: cleanedQuestion.questionText.substring(0, 50) + '...',
        fullCleanedQuestion: cleanedQuestion
      });
      onSave(quizIndex, questionIndex, cleanedQuestion);
    };

    return (
      <div className="space-y-3">
        {editError && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/40 px-3 py-2 text-xs text-red-200">
            {editError}
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Question Text</label>
          <textarea
            value={editedQuestion.questionText}
            onChange={(e) => {
              setEditedQuestion({ ...editedQuestion, questionText: e.target.value });
              setEditError(null);
            }}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        {/* Passage Section - Show button if no passage, show input if passage exists or button clicked */}
        {(!editedQuestion.passage || editedQuestion.passage.trim() === '') && !showPassageInput ? (
          <div>
            <button
              type="button"
              onClick={() => setShowPassageInput(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-xs font-medium border border-slate-600/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Add Passage (Optional)
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-300">
                Passage (Optional)
                <span className="text-xs text-slate-400 font-normal ml-1">- For reading comprehension questions</span>
              </label>
              {(!editedQuestion.passage || editedQuestion.passage.trim() === '') && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPassageInput(false);
                    setEditedQuestion({ ...editedQuestion, passage: '' });
                  }}
                  className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <textarea
              rows={4}
              placeholder="Enter passage text (e.g., reading comprehension passage, case study, etc.)... Press Enter for new paragraphs."
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y font-normal leading-relaxed"
              value={editedQuestion.passage || ''}
              onChange={(e) => {
                setEditedQuestion({ ...editedQuestion, passage: e.target.value });
                setEditError(null);
              }}
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            />
            {editedQuestion.passage && editedQuestion.passage.trim() !== '' && (
              <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs border border-slate-600/30">
                <div className="text-slate-400 mb-1">Preview:</div>
                <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">{editedQuestion.passage}</div>
              </div>
            )}
          </div>
        )}

        {editedQuestion.imageUrl && (
          <div className="relative inline-block">
            <img
              src={editedQuestion.imageUrl}
              alt="Question"
              className="max-w-full max-h-48 rounded-lg border border-slate-600/30"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-slate-300">Options</label>
            <button
              type="button"
              onClick={handleAddOption}
              className="px-2 py-1 bg-indigo-600/80 hover:bg-indigo-600 rounded-lg text-xs font-medium text-white transition-colors flex items-center gap-1"
              title="Add new option"
            >
              <Plus className="w-3 h-3" />
              Add Option
            </button>
          </div>
          {editedQuestion.options.map((option, idx) => {
            const validOptionsCount = editedQuestion.options.filter(o => o && o.trim()).length;
            const canRemove = validOptionsCount > 2;
            
            return (
              <div key={idx} className="mb-2 flex items-center gap-2">
                <span className="text-xs text-slate-400 w-6">{String.fromCharCode(65 + idx)}.</span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...editedQuestion.options];
                    newOptions[idx] = e.target.value;
                    setEditedQuestion({ ...editedQuestion, options: newOptions });
                    setEditError(null);
                  }}
                  className="flex-1 px-3 py-1.5 bg-slate-800/50 border border-slate-600/30 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
                  disabled={!canRemove}
                  className="p-1.5 text-slate-400 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title={canRemove ? "Remove option" : "At least 2 options required"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Correct Answer</label>
          <select
            value={editedQuestion.answer}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, answer: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select answer</option>
            {editedQuestion.options
              .filter(opt => opt.trim())
              .map((option, idx) => (
                <option key={idx} value={option}>
                  {String.fromCharCode(65 + idx)}. {option}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onImageUpload}
            className="px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/70 transition-colors flex items-center gap-2"
          >
            <ImageIcon className="w-3 h-3" />
            {editedQuestion.imageUrl ? 'Change Image' : 'Add Image'}
          </button>
          <div className="flex-1" />
          <button
            onClick={onCancel}
            className="px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-700/70 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-medium text-white transition-colors flex items-center gap-2"
          >
            <Save className="w-3 h-3" />
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-full pb-8">
      {showReview ? (
        <ReviewScreen />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Bulk Upload Quizzes
            </h1>
            <p className="text-slate-400 text-base font-light max-w-2xl">
              Upload a CSV file to create multiple quizzes at once. Each row
              represents a question; rows with the same quiz title are grouped into
              a single quiz and sent to the backend{" "}
              <code className="text-xs bg-slate-800 px-1 rounded">
                /content/add-quiz
              </code>{" "}
              endpoint.
            </p>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Actions */}
        <div className="lg:col-span-2 bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            1. Upload & Parse CSV
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select CSV file
              </label>
              <div
                className="border-2 border-dashed border-slate-600/60 rounded-xl p-6 bg-slate-800/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-800/70 transition-colors"
                onClick={() => document.getElementById("quiz-bulk-file")?.click()}
              >
                <input
                  id="quiz-bulk-file"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-300">
                    ⬆
                  </span>
                </div>
                <p className="text-slate-200 font-medium">
                  {file ? file.name : "Click to browse CSV file"}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Accepted format: .csv (quoted fields with commas are supported)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleParse}
                disabled={!file || isParsing}
                className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {isParsing ? "Parsing..." : "Parse File"}
              </button>
              {showReview && (
                <button
                  type="button"
                  onClick={() => setShowReview(true)}
                  disabled={!quizzes.length}
                  className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                  Review & Edit Questions
                </button>
              )}
              {showReview && (
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!quizzes.length || isUploading}
                  className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-all"
                >
                  {isUploading ? "Uploading..." : "Upload Quizzes"}
                </button>
              )}
              <button
                type="button"
                onClick={resetState}
                disabled={isParsing || isUploading}
                className="inline-flex items-center justify-center py-2.5 px-5 border border-slate-600/40 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-700/60 transition-all"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {quizzes.length > 0 && (
              <div className="rounded-lg bg-slate-800/50 border border-slate-600/40 px-4 py-3 text-sm text-slate-200">
                <p className="font-semibold mb-1">
                  Parsed {quizzes.length} quiz
                  {quizzes.length > 1 ? "zes" : ""} with{" "}
                  {quizzes.reduce((sum, q) => sum + q.questions.length, 0)} total questions from file.
                </p>
                {parseStats && (
                  <p className="text-xs text-slate-400 mb-2">
                    Processed {parseStats.totalRows} rows
                    {parseStats.skippedRows > 0 && `, skipped ${parseStats.skippedRows} invalid rows`}
                  </p>
                )}
                <ul className="list-disc list-inside text-xs space-y-1 max-h-40 overflow-y-auto">
                  {quizzes.map((q, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{q.title}</span> —{" "}
                      {q.questions.length} question{q.questions.length !== 1 ? "s" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 px-4 py-3 text-sm text-emerald-200 space-y-1">
                <p className="font-semibold">Upload summary</p>
                <p>
                  Total quizzes: {summary.total} | Successful: {summary.success} | Failed:{" "}
                  {summary.failed}
                </p>
                {summary.errors?.length > 0 && (
                  <div className="mt-2 text-xs text-emerald-100 max-h-32 overflow-y-auto">
                    <p className="font-semibold mb-1">Errors:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {summary.errors.map((e, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{e.quizTitle}:</span> {e.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Template & Instructions */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              2. Template & Guidelines
            </h2>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
            >
              Download template
            </button>
          </div>

          <p className="text-slate-300 text-sm mb-3">
            Your CSV should contain these columns:
          </p>
          <ul className="text-slate-200 text-xs space-y-1 mb-4 list-disc list-inside">
            <li>
              <strong>quizTitle</strong> – name of the quiz (rows with same title are
              grouped)
            </li>
            <li>
              <strong>quizDuration</strong> – duration in minutes (same for all rows of a
              quiz)
            </li>
            <li>
              <strong>questionText</strong> – the question text
            </li>
            <li>
              <strong>option1..option4</strong> – up to four options (can leave some
              empty)
            </li>
            <li>
              <strong>answer</strong> – correct answer text (should match one of the
              options)
            </li>
          </ul>

          <p className="text-slate-400 text-xs">
            For each distinct quiz (same title & duration), the system builds a payload
            like{" "}
            <code className="bg-slate-800 px-1 rounded">
              &#123; title, duration, questions: [&#123; questionText, options, answer
              &#125;...] &#125;
            </code>{" "}
            and sends it to the backend <code>/content/add-quiz</code> endpoint.
          </p>
        </div>
      </div>
        </>
      )}

      {/* Image Upload Modal */}
      {imageUploadModal.isOpen && (
        <QuestionImageUpload
          questionId={`quiz-${imageUploadModal.quizIndex}-question-${imageUploadModal.questionIndex}`}
          onImageUploaded={handleImageUploaded}
          onClose={handleCloseImageUpload}
          existingImageUrl={
            quizzes[imageUploadModal.quizIndex]?.questions[imageUploadModal.questionIndex]?.imageUrl || ''
          }
        />
      )}

      {/* Alert Popup */}
      <AlertPopup
        isOpen={alertPopup.isOpen}
        onClose={() => setAlertPopup({ ...alertPopup, isOpen: false })}
        onConfirm={alertPopup.onConfirm || (() => setAlertPopup({ ...alertPopup, isOpen: false }))}
        title={alertPopup.title}
        message={alertPopup.message}
        type={alertPopup.type}
        showCancel={alertPopup.type === 'error' && !alertPopup.onConfirm}
      />
    </div>
  );
};

export default QuizBulkUpload;


