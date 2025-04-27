'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AIChatbox from '@/components/AIChatbox';
import MediaRecommendation from '@/components/MediaRecommendation';
import QuizSection from '@/components/QuizSection';
import Image from 'next/image';
import Header from '@/components/Header';

export default function StudentPage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [mood, setMood] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString();
    setCheckedIn(true);
    setLastCheckIn(today);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header /> {/* ✅ 页眉放在最顶上 */}

      <main className="min-h-screen px-6 py-10 bg-white text-gray-900 space-y-12">
        {/* 欢迎 + 打卡区 */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* 欢迎词 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-center space-y-4"
          >
            <h1 className="text-4xl font-extrabold">🧒 Welcome, Student!</h1>
            <p className="text-lg text-gray-600">Ready for today&apos;s science adventure?</p>

            {/* 吉祥物插图 */}
            <div className="flex justify-end pr-10 mt-4">
              <Image
                src="/mascot.png" // 你可以用自己的图，比如 public/mascot.png
                alt="BioQuest Mascot"
                width={220}
                height={220}
                className="drop-shadow-md rounded-full"
              />
            </div>
          </motion.div>

          {/* 心情反馈打卡 */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4">📅 Daily Check-in</h2>
            {checkedIn ? (
              <p className="text-green-600 text-lg font-medium">
                ✅ You&apos;ve checked in today!
                <br />
                <span className="text-sm text-gray-500">Last check-in: {lastCheckIn}</span>
              </p>
            ) : (
              <>
                <p className="mb-3 text-gray-700 font-medium">How do you feel about today&apos;s learning?</p>
                <div className="flex justify-center gap-3 text-2xl mb-4">
                  {['😊', '😐', '😢', '😕'].map((emoji) => (
                    <button
                      key={emoji}
                      className={`text-3xl px-2 transition ${
                        mood === emoji ? 'scale-125' : 'opacity-50 hover:opacity-100'
                      }`}
                      onClick={() => setMood(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Leave your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl mb-3"
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-600">Keep this private</label>
                </div>
                <button
                  onClick={handleCheckIn}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  ✅ Submit Check-in
                </button>
              </>
            )}
          </div>
        </motion.section>

        {/* 👉 接下来预留位置：AI Chatbox、Media、Quiz、AR */}
        {/* AI Chatbox */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow border"
        >
          <h2 className="text-2xl font-semibold mb-4">🤖 Chat with BioBot</h2>
          <AIChatbox />
        </motion.section>

        <section className="bg-gray-50 rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">🎥 Media Recommendation</h2>
          <MediaRecommendation />
        </section>

        <section className="bg-gray-50 rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">🧠 AI-generated Quiz</h2>
          <QuizSection />
        </section>

        <section className="bg-gray-50 rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">🕶️ VR Experience</h2>
          <p className="text-gray-600 mb-4">Step into the 3D learning world:</p>

          <div className="aspect-video w-full overflow-hidden rounded-xl border">
            <iframe
              title="VR Space"
              src="https://framevr.io/venusflytrap"  // ✅ 你的FrameVR链接
              allow="autoplay; fullscreen; vr"
              className="w-full h-full"
            ></iframe>
          </div>

          <p className="text-sm text-right text-blue-600 mt-2">
            <a href="https://framevr.io/venusflytrap" target="_blank" rel="noopener noreferrer">
              🔗 Open in fullscreen
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

