'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AIChatbox from '@/components/AIChatbox';
import MediaRecommendation from '@/components/MediaRecommendation';
import QuizSection from '@/components/QuizSection';
import Image from 'next/image';
import Header from '@/components/Header';


export default function StudentPage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString();
    setCheckedIn(true);
    setLastCheckIn(today);
  };

  const handleMoodSubmit = () => {
    console.log('Mood:', selectedMood);
    console.log('Feedback:', feedback);
    console.log('Private:', isPrivate);
    // 模拟提交逻辑
    setSelectedMood(null);
    setFeedback('');
    setIsPrivate(false);
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-white text-gray-900 space-y-12">
      {/* 欢迎区 + Mood Check-in 横向并排 */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-start md:justify-between gap-10"
      >
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">🧒 Welcome, Student!</h1>
          <p className="text-lg text-gray-600">This is your personalized BioQuest journey.</p>
        </div>

        <div className="md:w-1/2 bg-pink-50 border border-pink-200 rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">🌈 How do you feel about today&apos;s learning?</h2>
          <div className="flex gap-4 mb-4">
            {["😊", "😐", "😢", "😕"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedMood(emoji)}
                className={`text-3xl p-2 border rounded-full hover:bg-pink-100 transition ${selectedMood === emoji ? 'bg-pink-200' : ''}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Share your thoughts..."
            className="w-full border border-pink-300 rounded-xl p-3 text-sm mb-2"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <label className="text-sm flex items-center gap-2 text-gray-600 mb-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            Keep this private from teachers
          </label>
          <button
            onClick={handleMoodSubmit}
            className="w-full mt-2 bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700"
          >
            Submit Mood
          </button>
        </div>
      </motion.section>

      {/* 每日打卡 */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">📅 Daily Check-in</h2>
        {checkedIn ? (
          <p className="text-green-600 text-lg font-medium">
            ✅ You&apos;ve checked in today!
            <br />
            <span className="text-sm text-gray-500">Last check-in: {lastCheckIn}</span>
          </p>
        ) : (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleCheckIn}
          >
            ✅ Mark Today
          </button>
        )}
      </motion.section>

      {/* AI Chatbox */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow border"
      >
        <h2 className="text-2xl font-semibold mb-4">🤖 Chat with BioBot</h2>
        <div className="h-[500px] overflow-y-auto bg-gray-50 rounded-xl p-4 border space-y-4">
          <AIChatbox />
        </div>
      </motion.section>

      <section className="bg-gray-50 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">🎥 Media Recommendation</h2>
        <MediaRecommendation />
      </section>

      <section className="bg-gray-50 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">🧠 AI-generated Quiz (Coming Soon)</h2>
        <QuizSection />
      </section>

      <section className="bg-gray-50 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">🕶️ AR Zone (Coming Soon)</h2>
      </section>
    </main>
  );
}

