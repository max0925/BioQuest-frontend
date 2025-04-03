'use client';

import { motion } from 'framer-motion';

type AccordionItem = {
  title: string;
  content: string;
};

export default function SmoothAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          layout
          className="overflow-hidden border border-blue-100 rounded-2xl shadow-sm"
        >
          <details className="group open:bg-blue-50 transition-all">
            <summary className="cursor-pointer px-6 py-4 text-lg font-semibold bg-blue-50 hover:bg-blue-100 transition">
              {item.title}
            </summary>
            <div className="px-6 py-4 text-gray-700">{item.content}</div>
          </details>
        </motion.div>
      ))}
    </div>
  );
}
