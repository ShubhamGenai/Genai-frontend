import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(CONTENTMANAGER.GET_QUIZ); // Adjust endpoint if needed
      setQuizzes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setIsLoading(false);
    }
  };

  fetchQuizzes();
}, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter((q) => q._id !== id));
      alert('Quiz deleted successfully');
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Quizzes</h1>
          <p className="text-slate-400 text-base font-light">Manage your quizzes</p>
        </div>
          <Link
            to="/content/quizzes/add"
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Quiz
          </Link>
        </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="w-full px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Quiz List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-400 text-base">No quizzes found.</p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz._id} className="hover:bg-slate-700/40 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-base font-semibold text-white">{quiz.title}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-base font-medium text-slate-300">{quiz.duration} mins</td>
                  <td className="px-6 py-5 whitespace-nowrap text-base font-medium text-slate-300">{quiz.questions?.length || 0}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/content/quizzes/${quiz._id}`}
                        className="text-slate-300 hover:text-white transition-colors"
                        title="View quiz"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link to={`/quizzes/edit/${quiz._id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(quiz._id)} className="text-red-400 hover:text-red-300 transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
