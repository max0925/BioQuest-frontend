'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess, // ✅ 新增
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void; // ✅ 加上这个！
}) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'student' | 'teacher' | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode} as ${role} →`, email, password);
    if (role) {
      onLoginSuccess(email);
      router.push(`/${role}`);
      onClose(); // 关闭弹窗
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative"
      >
        <button
          className="absolute top-2 right-4 text-gray-400 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Login to BioQuest' : 'Create a BioQuest Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${
                role === 'student'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-green-100'
              }`}
            >
              I’m a Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${
                role === 'teacher'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-blue-100'
              }`}
            >
              I’m a Teacher
            </button>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={!role}
            className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-600 underline hover:text-blue-800"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
