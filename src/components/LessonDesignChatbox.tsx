'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function LessonDesignChatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);

    const aiResponse = 'Sure! Here’s a lesson plan idea for you. 📚';
    setTypingResponse('');
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < aiResponse.length) {
        setTypingResponse((prev) => prev + aiResponse[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
        setTypingResponse('');
      }
    }, 30);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation(); // ✅ 加这一句防止跳动或聚焦滚动
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
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-xl border">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                : 'bg-gray-100 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.content}
          </motion.div>
        ))}

        {typingResponse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl text-sm max-w-xs self-start mr-auto"
          >
            {typingResponse}
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 输入栏 */}
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
