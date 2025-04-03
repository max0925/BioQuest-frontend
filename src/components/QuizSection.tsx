// src/components/QuizSection.tsx
'use client';

import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    question: 'What does photosynthesis produce?',
    options: ['Oxygen', 'Carbon Dioxide', 'Water', 'Salt'],
    answer: 'Oxygen',
    explanation: 'Photosynthesis in plants converts carbon dioxide and water into glucose and oxygen.',
  },
  {
    question: 'Which part of the plant absorbs sunlight?',
    options: ['Roots', 'Stem', 'Leaves', 'Flowers'],
    answer: 'Leaves',
    explanation: 'Leaves contain chlorophyll and are the primary site of photosynthesis.',
  },
];

export default function QuizSection() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

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
      {mockQuestions.map((q, index) => (
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

      {!submitted && (
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
