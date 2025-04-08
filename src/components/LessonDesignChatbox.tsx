'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { API_BASE } from '@/lib/config'; // ✅ 引入后端路径

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function LessonDesignChatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    const updatedHistory = [...messages, newMessage];
    setMessages(updatedHistory);
    setTypingResponse('');

    try {
      const res = await fetch(`${API_BASE}/teacher-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: updatedHistory,
        }),
      });

      const data = await res.json();
      const reply = data.reply || '⚠️ No response';

      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < reply.length) {
          setTypingResponse((prev) => prev + reply[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
          setTypingResponse('');
        }
      }, 20);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Chat failed' }]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  useEffect(() => {
    if (messages.length > 0 || typingResponse) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, typingResponse]);

  return (
    <div className="flex flex-col h-[300px]">
      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-xl border">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                : 'bg-gray-100 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.content}
          </motion.div>
        ))}

        {/* 打字动画 */}
        {typingResponse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl text-sm leading-relaxed max-w-[75%] self-start mr-auto"
          >
            {typingResponse}
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 输入框 */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Ask BioBot to help you design a lesson..."
          className="flex-1 border rounded-full px-4 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
