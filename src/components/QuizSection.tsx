'use client';

import { useState, useEffect } from 'react';


interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function QuizSection() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('10-12');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('bioquest-age-group');
    if (saved) {
      setSelectedAgeGroup(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bioquest-age-group', selectedAgeGroup);
  }, [selectedAgeGroup]);

  const fetchQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSubmitted(false);
    setError('');
    try {
      const res = await fetch('https://max0925-bioquest.hf.space/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          age_group: selectedAgeGroup, // ✅ Send age group to backend
        }),
      });
  
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
        setAnswers(Array(data.questions.length).fill(null));
      } else {
        throw new Error(data.error || 'Unexpected response format');
      }
    } catch (err) {
      console.error('Quiz fetch error:', err);
      setError('❌ Failed to generate quiz. Please try again.');
      setQuestions([]);
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleOptionSelect = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Input field and generate button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a quiz topic (e.g. DNA, cells)"
          className="flex-1 px-4 py-2 border rounded-xl text-sm"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={fetchQuiz}
          className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700"
        >
          Generate
        </button>
      </div>

      {/* Age group selector */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select your age group:</label>
        <select
          value={selectedAgeGroup}
          onChange={(e) => setSelectedAgeGroup(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm"
        >
          <option value="7-9">Ages 7–9 (Elementary Lower)</option>
          <option value="10-12">Ages 10–12 (Elementary Upper)</option>
          <option value="13-15">Ages 13–15 (Middle School)</option>
          <option value="16-18">Ages 16–18 (High School)</option>
          <option value="18+">Ages 18+ (Adult Learners)</option>
        </select>
      </div>

      {/* Loading and error messages */}
      {loading && <p className="text-sm text-gray-500">🔄 Generating quiz...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Quiz questions display */}
      {questions.map((q, index) => (
        <div key={index} className="border p-4 rounded-xl bg-white shadow">
          <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option, i) => {
              const isSelected = answers[index] === option;
              const isCorrect = submitted && option === q.answer;
              const isWrong = submitted && isSelected && option !== q.answer;

              return (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full border transition text-sm
                    ${isSelected ? 'border-blue-600' : 'border-gray-300'}
                    ${submitted && isCorrect ? 'bg-green-100 border-green-500' : ''}
                    ${submitted && isWrong ? 'bg-red-100 border-red-500' : ''}
                  `}
                  onClick={() => handleOptionSelect(index, option)}
                  disabled={submitted}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Answer explanation */}
          {submitted && (
            <div className="mt-2 text-sm text-gray-600">
              <p>
                ✅ Correct Answer: <span className="font-semibold">{q.answer}</span>
              </p>
              <p className="italic">🧠 {q.explanation}</p>
            </div>
          )}
        </div>
      ))}

      {/* Submit button */}
      {!submitted && questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
