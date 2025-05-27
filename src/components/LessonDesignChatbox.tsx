'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { API_BASE } from '@/lib/config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 省略号动画（小号灰色）
function TypingDots() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 450);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-gray-400 text-xl ml-2">{dots}</span>;
}

export default function LessonDesignChatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typingResponse, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput('');
    setIsThinking(true);

    const newMessage: Message = { role: 'user', content: input };
    const updatedHistory = [...messages, newMessage];
    setMessages(updatedHistory);
    setTypingResponse('');

    try {
      const res = await fetch(`${API_BASE}/teacher-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: updatedHistory.map((msg) => `${msg.role}: ${msg.content}`),
        }),
      });

      const data = await res.json();
      const reply = data.reply || '⚠️ No response';
      setIsThinking(false);

      // 打字机动画
      let index = 0;
      setTypingResponse('');
      const typingInterval = setInterval(() => {
        if (index < reply.length) {
          setTypingResponse((prev) => prev + reply[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: reply }
          ]);
          setTypingResponse('');
        }
      }, 18);
    } catch (err) {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Chat failed' }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[300px]">
      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-xl border">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'user' ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className="max-w-[85%] px-5 py-3 rounded-2xl text-base leading-relaxed bg-gray-100 text-gray-800"
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: msg.role === 'user' ? 'auto' : 0,
              marginRight: msg.role === 'assistant' ? 'auto' : 0,
            }}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </motion.div>
        ))}

        {/* BioBot is thinking... 动画 */}
        {isThinking && !typingResponse && (
          <div
            className="bg-gray-100 px-5 py-3 rounded-2xl text-base text-gray-500 flex items-center w-fit"
            style={{ alignSelf: 'flex-start' }}
          >
            <span>BioBot is thinking</span>
            <TypingDots />
          </div>
        )}

        {/* 打字动画中 */}
        {typingResponse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 px-5 py-3 rounded-2xl text-base text-gray-800 w-fit"
            style={{ alignSelf: 'flex-start' }}
          >
            <ReactMarkdown>{typingResponse}</ReactMarkdown>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 输入框 */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Ask BioBot to help you design a lesson..."
          className="flex-1 border rounded-full px-4 py-2 text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

