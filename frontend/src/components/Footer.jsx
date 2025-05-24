import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="text-center text-gray-400 mt-16 space-y-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      <div className="flex justify-center space-x-6">
        <a aria-label="GitHub" href="#"><Github className="w-6 h-6 hover:text-gray-300" /></a>
        <a aria-label="LinkedIn" href="#"><Linkedin className="w-6 h-6 hover:text-gray-300" /></a>
        <a aria-label="Twitter" href="#"><Twitter className="w-6 h-6 hover:text-gray-300" /></a>
      </div>
    </motion.footer>
  );
}
