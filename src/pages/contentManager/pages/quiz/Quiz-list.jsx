import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockQuizzes = [
        {
          _id: 'q1',
          title: 'Basic JavaScript Quiz',
          duration: 20,
          questions: [
            { questionText: 'What is closure?', options: ['A', 'B'], answer: 'A' },
            { questionText: 'What is hoisting?', options: ['A', 'B'], answer: 'B' },
          ],
        },
        {
          _id: 'q2',
          title: 'React Fundamentals',
          duration: 30,
          questions: [
            { questionText: 'What is JSX?', options: ['A', 'B'], answer: 'A' },
          ],
        },
      ];
      setQuizzes(mockQuizzes);
      setIsLoading(false);
    }, 1000);
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
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-gray-600">Manage your quizzes</p>
        </div>
        <Link
          to="/content/quizzes/add"
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Quiz List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="text-center text-gray-500">No quizzes found.</div>
      ) : (
        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quiz.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.duration} mins</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.questions.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/quizzes/edit/${quiz._id}`} className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(quiz._id)} className="text-red-600 hover:text-red-900">
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
