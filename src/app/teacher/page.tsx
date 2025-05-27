'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LessonDesignChatbox from '@/components/LessonDesignChatbox';
import TeacherMediaSearch from '@/components/TeacherMediaSearch';
import StudentAnalyticsSection from '@/components/StudentAnalyticsSection';
import Header from '@/components/Header';
import QuizSection from '@/components/QuizSection';
import Image from 'next/image';

export default function TeacherPage() {
  // 默认VR课程，可以用useState动态添加
  const [vrWorkshops, setVrWorkshops] = useState([
    {
      title: "Venus Flytrap: Complex Systems",
      description: "Explore how the Venus flytrap demonstrates characteristics of complex systems, such as emergence and adaptation.",
      url: "https://framevr.io/venusflytrap",
      coverImage: "/venus-vr.jpg",
    },
    {
      title: "DNA Mutation: Explore Genetic Change",
      description: "Enter an immersive VR world to observe how mutations occur in DNA and how they affect organisms.",
      url: "https://framevr.io/capstone123",
      coverImage: "/dna-vr.jpg",
    }
  ]);

  // 控制添加课程弹窗
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    description: '',
    url: '',
    coverImage: '',
  });

  const handleAddWorkshop = () => {
    setVrWorkshops(prev => [...prev, newWorkshop]);
    setNewWorkshop({ title: '', description: '', url: '', coverImage: '' });
    setShowAddModal(false);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <main className="min-h-screen px-6 py-10 bg-white text-gray-900 space-y-12">
        {/* 欢迎词 */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 items-center gap-6"
        >
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold">👩‍🏫 Welcome, Teacher!</h1>
            <p className="text-lg text-gray-600">Design engaging, research-based lessons with BioQuest AI.</p>
          </div>
          {/* 吉祥物（用Image组件） */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/mascot-teacher.png"
              alt="Teacher Mascot"
              width={250}
              height={250}
              className="rounded-xl"
            />
          </div>
        </motion.section>

        {/* AI Lesson Designer Chatbox */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow border"
        >
          <h2 className="text-2xl font-semibold mb-4">🤖 AI Lesson Designer</h2>
          <LessonDesignChatbox />
        </motion.section>

        {/* Media Recommendation */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-gray-50 rounded-xl p-6 shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">🎥 Media Recommendation</h2>
          <TeacherMediaSearch />
        </motion.section>

        {/* AI-generated Quiz */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6 shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Generate Quiz for Your Class</h2>
          <QuizSection />
        </motion.section>

        {/* VR Workshop Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow space-y-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">🕶️ VR Workshop (Build & Share Your Courses)</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              + Add New Workshop
            </button>
          </div>
          <p className="text-gray-600 mb-3">Create, manage, and share immersive VR learning experiences for your students.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {vrWorkshops.map((course, idx) => (
              <a
                key={idx}
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-xl cursor-pointer shadow transition hover:shadow-md hover:border-blue-400 hover:bg-white"
              >
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  width={500}
                  height={280}
                  className="rounded-lg mb-3 object-cover"
                />
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Modal for adding workshop */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
              <h3 className="text-xl font-bold mb-3">Add New VR Workshop</h3>
              <input
                type="text"
                className="w-full mb-3 p-2 border rounded"
                placeholder="Title"
                value={newWorkshop.title}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
              />
              <input
                type="text"
                className="w-full mb-3 p-2 border rounded"
                placeholder="Description"
                value={newWorkshop.description}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
              />
              <input
                type="text"
                className="w-full mb-3 p-2 border rounded"
                placeholder="VR Link (e.g. https://framevr.io/your-course)"
                value={newWorkshop.url}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, url: e.target.value })}
              />
              <input
                type="text"
                className="w-full mb-3 p-2 border rounded"
                placeholder="Cover Image (e.g. /venus-vr.jpg)"
                value={newWorkshop.coverImage}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, coverImage: e.target.value })}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >Cancel</button>
                <button
                  onClick={handleAddWorkshop}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={
                    !newWorkshop.title || !newWorkshop.description || !newWorkshop.url || !newWorkshop.coverImage
                  }
                >Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Student Analytics */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-xl p-6 shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">📊 Student Analytics</h2>
          <p className="text-gray-400 mt-4 text-xs">* These numbers are simulated for now.</p>
          <StudentAnalyticsSection />
        </motion.section>

        {/* Teacher Growth */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">🧑‍🏫 Teacher Growth & PD (Coming Soon)</h2>
        </motion.section>
      </main>
    </div>
  );
}
