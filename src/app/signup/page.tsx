// File: src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AIChatbox from '@/components/AIChatbox';


export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher' | ''>('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save info locally (can be replaced with real auth later)
    if (role === 'student' && grade) {
      localStorage.setItem('bioquest-role', 'student');
      localStorage.setItem('bioquest-grade', grade);
      router.push('/student');
    } else if (role === 'teacher') {
      localStorage.setItem('bioquest-role', 'teacher');
      router.push('/teacher');
    } else {
      alert('Please complete all required fields.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up for BioQuest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`px-3 py-1 rounded border ${role === 'student' ? 'bg-green-200' : 'bg-gray-100'}`}
          >
            I’m a Student
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`px-3 py-1 rounded border ${role === 'teacher' ? 'bg-blue-200' : 'bg-gray-100'}`}
          >
            I’m a Teacher
          </button>
        </div>

        {role === 'student' && (
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300"
            required
          >
            <option value="">Select your grade</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                Grade {i + 1}
              </option>
            ))}
          </select>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
