import React, { useState } from 'react';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there! How can I help you with your GenAI learning today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response (you'll replace this with actual API calls)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: 'That\'s a great question! Let me check my resources for you...', sender: 'ai' },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold">GenAI Chat Assistant</h1>
        {/* Add any other header elements like settings, history, etc. here */}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                {/* AI Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9.75 9.75m0 0l-4.72 2.21m4.72-2.21l-2.21 4.72m2.21-4.72l4.72 2.21m-4.72-2.21l2.21 4.72M9.75 9.75l-4.72 2.21m4.72-2.21l-2.21 4.72m2.21-4.72l4.72 2.21m-4.72-2.21l2.21 4.72m-4.72-2.21l-4.72 2.21m4.72-2.21l-2.21 4.72m2.21-4.72l4.72 2.21m-4.72-2.21l2.21 4.72m-4.72-2.21l-4.72 2.21m4.72-2.21l-2.21 4.72m2.21-4.72l4.72 2.21m-4.72-2.21l2.21 4.72M12 21a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow'}`}
            >
              {message.text}
            </div>
            {message.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2">
                {/* User Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="bg-white p-4 border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChatPage;
