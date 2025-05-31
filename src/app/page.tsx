/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginModal from '@/components/LoginModal';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function FadeInSection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
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

  const { ref: metricsRef, inView: metricsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-start px-6 md:px-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero"
            fill
            className="object-cover scale-110 blur-md brightness-75"
            priority
          />
        </div>

        <motion.div
          className="relative z-10 text-left max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Master STEM<br />Through AI & AR
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
            Let students explore complex science<br />
            with simple conversations, visuals, and immersive activities.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/student"
              className="bg-white/30 backdrop-blur text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Try as Student
            </Link>
            <Link
              href="/teacher"
              className="bg-white/30 backdrop-blur text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Try as Teacher
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <FadeInSection>
        <section className="bg-white py-24 px-6 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How BioQuest Helps You Teach & Learn Science</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">          {/* Feature Cards */}
          {[{
            title: 'AI Chatbot',
            desc: 'Simplifies complex terms into child-friendly explanations',
            src: '/AIchatbot.png',
            size: 'h-[62px]'
          }, {
            title: 'Interactive Quiz',
            desc: 'Auto-generated questions tailored to the concept and age',
            src: '/quiz.png',
            size: 'h-[48px]'
          }, {
            title: 'AR Learning Room',
            desc: 'Step into biology, see how systems work from the inside',
            src: '/ARcourse.png',
            size: 'h-[48px]'
          }].map(({ title, desc, src, size }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center items-center h-20 mb-4">
                <img src={src} alt={title} className={`${size} w-auto object-contain`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm min-h-[48px]">{desc}</p>
            </motion.div>
          ))}
        </div>
        </section>
      </FadeInSection>

      {/* Metrics Summary */}
      <FadeInSection>
        <section ref={metricsRef} className="bg-[#0F2C3F] py-20 px-6 md:px-10">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Used. Tested. <span className="text-[#00DDB3]">Loved.</span>
            </h2>
            <p className="text-white text-md md:text-lg max-w-xl mx-auto mb-11 opacity-80">
              Proven to improve engagement and systems thinking in real classrooms.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {[{ end: 100, suffix: '+', label: 'Students Engaged' },
                { end: 5, suffix: '', label: 'Pilot Schools' },
                { end: 2, suffix: '', label: 'Research Collaborations' },
                { end: 45, suffix: '%', label: 'Increase in Systems Thinking' }
              ].map(({ end, suffix, label }) => (
                <div key={label}>
                  <div className="text-5xl font-bold text-[#00DDB3]">
                    {metricsInView && <CountUp end={end} duration={2} />} {suffix}
                  </div>
                  <p className="text-base md:text-lg mt-3 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Showcase Section */}
      <FadeInSection>
        <section className="relative w-full h-[540px] overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center animate-fade-in" style={{ backgroundImage: "url('/classroom.jpg')", backgroundPosition: 'right center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="relative z-20 h-full flex items-center px-6 md:px-20">
            <div className="max-w-xl animate-fade-in delay-300">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
                Used in <span className="text-[#00B287]">Real Classrooms</span>
              </h2>
              <p className="text-xl text-gray-800 mb-4 font-light">
                <span className="text-[#00B287] text-2xl font-bold mr-2">❝</span>
                I finally understood how Venus flytraps work!
              </p>
              <p className="text-xl text-gray-800 mb-6 font-light">
                <span className="text-[#00B287] text-2xl font-bold mr-2">❝</span>
                Students asked <span className="font-semibold italic">why</span>, not just <span className="italic">what</span>.
              </p>
              <button className="bg-[#00B287] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#009c6f] transition">
                View Real Classrooms
              </button>
            </div>
          </div>
          <img src="/computer.png" alt="AR demo" className="absolute right-[7%] bottom-[-9%] w-[340px] z-30 animate-fade-in delay-500" />
        </section>
      </FadeInSection>

      {/* Principles Section */}
      <FadeInSection>
        <section className="bg-[#FDFDF6] px-6 md:px-20 py-20 grid md:grid-cols-2 gap-14 items-start">
          <div className="z-10">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
              Grounded in <span className="text-[#00B287]">Research</span>,<br />
              Designed for <span className="text-[#00B287]">Young Learners</span>
            </h3>
            <p className="text-gray-600 text-lg max-w-md leading-relaxed">
              Our learning principles guide how we simplify STEM<br />
              concepts with clarity, emotion, and exploration.
            </p>
          </div>
          <div className="space-y-4 w-full">
            {accordionItems.map((item, i) => (
              <details key={i} className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:ring-[#00B287] transition">
                <summary className="flex justify-between items-center cursor-pointer list-none px-5 py-4 font-semibold text-lg text-gray-900 group-open:text-[#00B287] transition">
                  <span className="transition">{item.title}</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-base leading-relaxed">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </section>
      </FadeInSection>

    {/* Founder Story */}
    <FadeInSection>
  <section className="bg-[#0F2C3F] py-20 px-6 md:px-20">
    <div className="relative mx-auto flex items-center justify-center max-w-6xl">

      {/* 图片部分 */}
      <div className="w-[400px] h-[450px] rounded-2xl overflow-hidden shadow-2xl z-20 relative">
        <img
          src="/founder.jpg"
          alt="Founder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 白色卡片 */}
      <div className="ml-[-80px] bg-white rounded-2xl shadow-xl px-10 py-8 z-10 relative max-w-2xl">
        <div className="ml-24">
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Founder Story</h4>
          <h5 className="text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
            “As a liberal arts student, I used to struggle with science...”
          </h5>
          <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            I struggled with STEM because I never had the right resources to help me connect with science early on.
            The teaching I received was mostly rote memorization from textbooks. As the concepts became more complex,
            I lost confidence and interest. This experience inspired me to create BioQuest — a tool that explains
            science simply, visually, and interactively.
          </p>
          <div className="flex justify-end">
            <button className="bg-white text-[#00DDB3] font-semibold px-6 py-2 rounded-full border border-[#00DDB3] hover:bg-[#00DDB3] hover:text-white transition">
              Learn more →
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</FadeInSection>



      {/* Footer */}
        <footer className="bg-white text-gray-700 px-6 py-10 border-t border-gray-200">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm items-start">
            <div className="flex flex-col items-start">
              <img src="/bio.png" alt="BioQuest Logo" className="w-28 h-auto mb-4" />
              <p className="text-gray-500 leading-relaxed text-sm">
                Helping students master STEM through <br className="hidden md:block" />
                simple conversations, visuals, and immersive AR.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Explore</h3>
              <ul className="space-y-1 text-gray-600">
                <li><a href="#features" className="hover:text-black transition">Features</a></li>
                <li><a href="#principles" className="hover:text-black transition">Learning Principles</a></li>
                <li><a href="#about" className="hover:text-black transition">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-gray-600 mb-3">bianzh@upenn.edu</p>
              <a href="www.linkedin.com/in/zheng-bian-9aa289325" target="_blank" rel="noopener noreferrer">
                <img src="/footer.png" alt="Social Links" className="w-16 h-auto hover:opacity-80 transition" />
              </a>
            </div>
          </div>
          <div className="mt-10 text-center text-xs text-gray-400">
            © 2025 BioQuest · All rights reserved.
          </div>
        </footer>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => console.log('Login success!', email)}
      />
    </main>
  );
}
