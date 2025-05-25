import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { BookOpen, Eye } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  hover: { scale: 1.03, transition: { duration: 0.2 } }
};

export default function TransparencyPage() {
  const features = [
  'Interactive “Why This Score?” popovers showing top‐matched sentences',
  'Consent modal with “I Agree” / “Withdraw Consent” and header enforcement',
  'Anonymized, PII-stripped resume ingestion pipeline',
  'Streaming endpoint to securely view original PDFs on demand',
];


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <motion.div
        className="max-w-4xl mx-auto p-8 space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.section variants={itemVariants} className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Transparency</h1>
          <p className="mt-2 text-teal-400 text-lg">We open the black box so you see every step.</p>
        </motion.section>

        {/* Principle Overview */}
        <motion.section variants={itemVariants} className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold flex items-center">
            <BookOpen className="w-6 h-6 text-yellow-300 mr-2 animate-pulse" />
            What Transparency Is
          </h2>
          <p className="mt-3 text-gray-300 leading-relaxed">
            <span className="font-medium text-teal-200">Transparency</span> means exposing how our AI arrives at decisions—through
            interactive explanations, open docs, and clear logs—so recruiters never feel left in the dark.
          </p>
        </motion.section>

        {/* Our Transparency Features */}
        <motion.section variants={itemVariants} className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold flex items-center">
            <Eye className="w-6 h-6 text-green-400 mr-2 animate-bounce" />
            Key Transparency Features
          </h2>
          <motion.ul
            className="mt-4 list-none space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((text, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                whileHover="hover"
                className="flex items-center bg-gray-700 p-3 rounded-lg"
              >
                <Eye className="w-5 h-5 text-pink-400 mr-3" />
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Back Link */}
        <motion.section variants={itemVariants} className="flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-2xl transition transform hover:scale-105"
          >
            Back to Main Page
          </Link>
        </motion.section>
      </motion.div>
      <Footer />
    </div>
  );
}
