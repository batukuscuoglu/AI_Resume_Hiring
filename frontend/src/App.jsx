import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react';
import './index.css';
import Footer from './components/Footer';

export default function App() {
  const [openSection, setOpenSection] = useState(null);
  const [moduleCategory, setModuleCategory] = useState('Screening');

const projects = [
  {
    title: 'Fairness',
    desc: 'Minimize bias by validating on diverse data and ensuring equitable treatment for all candidates.',
    url: '/fairness'
  },
  {
    title: 'Transparency',
    desc: 'Explain scores with “Why This Score?” highlights and clear documentation of the AI process.',
    url: '/transparency'
  },
  {
    title: 'Privacy & Data Protection',
    desc: 'Require consent, anonymize PII on upload, store raw PDFs encrypted and delete them post-processing.',
    url: '/privacy'
  },
  {
    title: 'Accountability',
    desc: 'Keep immutable audit logs and allow human overrides to maintain responsibility over decisions.',
    url: '/accountability'
  },
  {
    title: 'Robustness & Safety',
    desc: 'Handle malformed inputs gracefully and guard against adversarial or harmful content.',
    url: '/robustness'
  },
  {
    title: 'Human Oversight',
    desc: 'Maintain HR in the loop with note-taking and the ability to override AI recommendations.',
    url: '/human-oversight'
  },
];


  const highlights = [
    { text: 'AI-Powered Resume Screening', anim: { x: -50, y: 0 } },
    { text: 'Anonymous, PII-Stripped Uploads', anim: { x: 0,   y: 50 } },
    { text: '“Why This Score?” Explanations', anim: { x: 50,  y: 0 } },
    { text: 'Secure Consent-Driven Data',   anim: { x: 0,   y: -50 } },
  ];


  const artistic = [
    { emoji: '⚡', label: 'Efficient' },
    { emoji: '⚖️', label: 'Fair'   },
    { emoji: '🔍', label: 'Transparent' },
  ];

  const funFacts = [
    { label: 'Cups of ☕ Consumed',    value: '50+'    },
    { label: 'Resumes Screened',      value: '1K+'      },
    { label: 'Lines of Code',         value: '2K+'      },
    { label: 'Happy HR Users',        value: '100+' },
  ];



  const toggleSection = (id) =>
    setOpenSection(openSection === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      <motion.div
        className="max-w-5xl mx-auto p-8 space-y-32"
        initial="hidden"
        animate="visible"
        variants={{
          hidden:  { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {/* Header */}
        <motion.section
          className="text-center space-y-4 min-h-[60vh] flex flex-col justify-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold">AI Hiring Platform</h1>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="flex justify-around items-center flex-wrap gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {artistic.map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 text-xl p-6 rounded-full shadow-lg flex flex-col items-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: i * 0.2 }}
            >
              <span className="text-4xl mb-2">{item.emoji}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* Highlights Cards */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-6 rounded-lg shadow-2xl text-center"
              initial={{ x: h.anim.x, y: h.anim.y, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              {h.text}
            </motion.div>
          ))}
        </motion.section>

        {/* Navigate to Hiring Page */}
        <motion.section
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="/hiring"
            className="
              bg-gradient-to-r
              from-yellow-400 via-orange-500 to-red-500
              hover:from-yellow-500 hover:via-orange-600 hover:to-red-600
              text-white font-bold
              text-2xl
              px-16 py-6
              rounded-full
              shadow-2xl
              inline-block
              transform
            "
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
          >
            Go To AI Hiring Page
          </motion.a>
        </motion.section>




        {/* Principles */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center">Principles</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                className="relative p-6 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{proj.desc}</p>
                <a href={proj.url} className="text-blue-300 hover:underline">
                  Learn More →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Metrics */}
        <motion.section
          className="grid gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg p-6 shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12, delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold mb-2">{fact.value}</h3>
              <p className="uppercase tracking-wide">{fact.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Contact */}
        <motion.section
          className="border border-gray-700 rounded-lg p-8 bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
          <form className="space-y-4 max-w-md mx-auto relative">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white bg-opacity-20 border border-gray-600 text-white rounded pl-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-white bg-opacity-20 border border-gray-600 text-white rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg shadow-lg"
            >
              Send Message
            </motion.button>
          </form>
        </motion.section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
