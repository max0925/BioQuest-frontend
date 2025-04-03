'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SmoothAccordion from '@/components/SmoothAccordion';
import LoginModal from '@/components/LoginModal';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const accordionItems = [
    {
      title: 'Learn with Pictures & Play',
      content:
        'We use the Multimedia Principle and playful interactions to explain science through visuals, animations, and mini games that help children understand abstract STEM concepts naturally.',
    },
    {
      title: 'Step-by-Step Guidance',
      content:
        'Our scaffolding strategy and 7E instructional model break down knowledge into achievable steps, enabling learners to construct their understanding gradually with confidence.',
    },
    {
      title: 'Make Science Make Sense',
      content:
        'The SANSE Model helps learners experience immersive, intuitive exploration of science topics with embedded storytelling, spatial memory, and emotional connection.',
    },
  ];
  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-2 px-10 border-b shadow-sm sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight">BIOQUEST</h1>
        </div>
        <div className="flex gap-6 font-medium">
          <Link href="#">Home</Link>
          <Link href="#">Learning</Link>
          <Link href="#">About</Link>
          <Link href="#">FAQ</Link>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="border border-black text-black text-sm px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/bio.png"
            alt="BioQuest Logo"
            width={350}
            height={350}
            className="drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          >
          <h2 className="text-6xl font-extrabold leading-tight mb-4">
            Learn biology,<br />make discoveries
          </h2>
        </motion.div>
      </section>

      {/* Try as Student/Teacher Section */}
      <section className="flex justify-center items-center px-10 mb-16">
        <motion.div
          className="flex flex-col md:flex-row gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/student"
            className="px-6 py-3 rounded-full border border-neutral-800 text-neutral-800 font-semibold hover:bg-neutral-900 hover:text-white transition duration-300 shadow-md"
          >
            👩‍🎓 Try as Student
          </Link>
          <Link
            href="/teacher"
            className="px-6 py-3 rounded-full border border-neutral-800 text-neutral-800 font-semibold hover:bg-neutral-900 hover:text-white transition duration-300 shadow-md"
          >
            🧑‍🏫 Try as Teacher
          </Link>
        </motion.div>
      </section>


      {/* Principles Section */}
      <section className="px-10 py-10 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-6xl font-bold mb-4">Our learning principles</h3>
          <p className="text-gray-600 text-lg max-w-md">
            Grounded in educational research, our principles shape how we teach biology with impact.
          </p>
        </div>

        <SmoothAccordion items={accordionItems} />
      </section>

      {/* Slogan moved here */}
      <div className="mt-12 ml-6 md:ml-10">
        <p className="text-2xl text-black italic font-medium">
          Inspiring a passion for science
        </p>
      </div>  

      {/* Founder Story */}
      <section className="relative mt-20"> {/* ⬅️ 增加 margin-top */}
  <motion.img
    src="/05abfc8d-d10e-4707-acb9-146321045f66.png"
    alt="Mascot"
    className="absolute -top-14 left-0 w-36 md:w-60 z-30"
    style={{ transform: 'rotate(-5deg)' }}
    whileHover={{
      rotate: [-5, -2, -6, -3, -5],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
    }}
  />

  <div className="relative z-20 bg-yellow-50 p-8 pl-20 rounded-3xl shadow-md max-w-4xl mx-auto mt-8">
    <h4 className="text-3xl font-semibold mb-2">🧠 Founder Story</h4>
    <h5 className="text-2xl font-bold mb-2">
      “As a liberal arts student, I used to struggle with science...”
    </h5>
    <p className="text-gray-700">
    I struggled with STEM because I never had the right resources to help me connect with science early on.
      The teaching I received was mostly rote memorization from textbooks. As the concepts became more complex,
      I lost confidence and interest. This experience inspired me to create BioQuest — a tool that explains
      science simply, visually, and interactively.
    </p>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center text-gray-500 text-sm">
        © 2025 BioQuest · contact@bioquest.app · All rights reserved.
      </footer>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => {
          console.log('Login success!', email);
    // 你可以添加逻辑，比如 router.push('/student')，或者设置全局状态等
        }}
      />
    </main>
  );
}
