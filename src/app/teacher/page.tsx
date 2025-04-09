'use client';


import { motion } from 'framer-motion';
import LessonDesignChatbox from '@/components/LessonDesignChatbox';
import TeacherMediaSearch from '@/components/TeacherMediaSearch'; // ✅ 使用 default 导入
import StudentAnalyticsSection from '@/components/StudentAnalyticsSection';
import Header from '@/components/Header';
import Image from 'next/image'; // 引入 Image 组件

export default function TeacherPage() {
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

      {/* 🐶 吉祥物 */}
  <div className="flex justify-center md:justify-end">
    <Image
      src="/mascot-teacher.png"  // 确保路径正确，应该放在 public 文件夹中
      alt="Mascot"
      width={250}
      height={250}
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

      {/* Recommended Resources */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-gray-50 rounded-xl p-6 shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">🔍 Media Search</h2>
        <TeacherMediaSearch />
      </motion.section>


      {/* Student Analytics */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gray-50 rounded-xl p-6 shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">📊 Student Analytics</h2>
        <ul className="space-y-2 text-sm text-gray-700">
        </ul>
        <p className="text-gray-400 mt-4 text-xs">* These numbers are simulated for now.</p>
        <StudentAnalyticsSection />
      </motion.section>

      {/* Teacher Growth */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gray-50 rounded-xl p-6 shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">🧑‍🏫 Teacher Growth & PD (Coming Soon)</h2>
      </motion.section>
    </main>
    </div>
  );
}
