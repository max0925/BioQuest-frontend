'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './LoginModal'; // 确保路径对！

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <header className="w-full px-6 py-4 border-b bg-white flex justify-between items-center sticky top-0 z-50">
        {/* 左侧 Logo */}
        <Link href="/" className="text-2xl font-bold text-black hover:text-blue-600 transition">
          BIOQUEST
        </Link>

        {/* 右侧导航 */}
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/student">Student</Link>
          <Link href="/teacher">Teacher</Link>
          <Link href="/faq">FAQ</Link>

          {!loggedIn ? (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="border px-3 py-1 rounded-full hover:bg-gray-100"
            >
              Login
            </button>
          ) : (
            <span className="text-green-600 font-semibold">🎉 {userEmail}</span>
          )}
        </nav>
      </header>

      {/* Login 弹窗 */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess} // ⬅️ 自定义事件
      />
    </>
  );
}
