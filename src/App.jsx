import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiEdit } from "react-icons/fi";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await axios.post(
        `https://feedback-tracker-six.vercel.app/api/ask`,
        { question }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Ask Me Anything 🤖
        </h1>

        <div className="relative">
          <textarea
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
            rows="4"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {/* Icon position absolute */}
          <FiEdit className="absolute right-3 top-3 text-indigo-500 text-xl pointer-events-none" />
        </div>

        <button
          onClick={handleAsk}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Thinking..." : <>Ask <FiSend /></>}
        </button>

        {answer && (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Answer:</h2>
            <p className="text-gray-800 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
