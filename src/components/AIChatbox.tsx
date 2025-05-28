'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { API_BASE } from '@/lib/config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function TypingDots() {
  // 简单的省略号动画
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 450);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-gray-400 ml-1">{dots}</span>;
}

export default function AIChatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setInput(''); // ⬅️ 立刻清空输入框
    const newMessage: Message = { role: 'user', content: input };
    const updatedHistory = [...messages, newMessage];
    setMessages(updatedHistory);
    setTypingResponse('');
    setIsThinking(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: updatedHistory,
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
      console.error(err);
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typingResponse, isThinking]);

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
            {msg.content}
          </motion.div>
        ))}

        {/* AI正在思考的动画 */}
        {isThinking && !typingResponse && (
          <div className="bg-gray-100 px-5 py-3 rounded-2xl text-base text-gray-500 w-fit">
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
            {typingResponse}
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 输入框 */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Ask something..."
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
