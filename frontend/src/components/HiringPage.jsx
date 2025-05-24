import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import HiringResults from './HiringResults';

// Helper functions for API calls
async function fetchJobDescription(url) {
  const res = await fetch('http://localhost:8000/fetch-job/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { job_id, description }
}

async function screenResumesAPI({ description, files, consent }) {
  const form = new FormData();
  form.append('description', description);
  files.forEach(file => form.append('files', file));

  const res = await fetch('http://localhost:8000/screen-resumes/', {
    method: 'POST',
    headers: { 'X-User-Consent': consent.toString() },
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { job_id, results }
}

async function fetchSavedResults(jobId) {
  const res = await fetch(`http://localhost:8000/results/${jobId}`);
  if (!res.ok) throw new Error('No saved results');
  return res.json(); // { job_id, results }
}

export default function HiringPage() {
  const navigate = useNavigate();

  // Consent state
  const [hasConsented, setHasConsented] = useState(
    () => localStorage.getItem('consentGiven') === 'true'
  );
  // App state
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState(() => localStorage.getItem('lastDescription') || '');
  const [linkedinUrl, setLinkedinUrl] = useState(() => localStorage.getItem('lastLinkedinUrl') || '');
  const [mode, setMode] = useState(() => localStorage.getItem('lastMode') || 'manual');
  const [jobId, setJobId] = useState(() => localStorage.getItem('lastJobId') || '');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Rehydrate results
  useEffect(() => {
    if (!jobId) return;
    fetchSavedResults(jobId)
      .then(({ results }) => setCandidates(results))
      .catch(() => setCandidates([]));
  }, [jobId]);

  // Persist inputs
  useEffect(() => { localStorage.setItem('lastDescription', description); }, [description]);
  useEffect(() => { localStorage.setItem('lastLinkedinUrl', linkedinUrl); }, [linkedinUrl]);
  useEffect(() => { localStorage.setItem('lastMode', mode); }, [mode]);

  const handleFileChange = e => setFiles(Array.from(e.target.files));

  const handleScreen = async () => {
    try {
      setError('');
      setLoading(true);
      setCandidates([]);

      let descToUse = description;
      if (mode === 'linkedin') {
        if (!linkedinUrl) throw new Error('Please enter a LinkedIn URL');
        const { job_id, description: fetchedDesc } = await fetchJobDescription(linkedinUrl);
        descToUse = fetchedDesc;
        setDescription(fetchedDesc);
        setJobId(job_id);
      }

      const { job_id, results } = await screenResumesAPI({
        description: descToUse,
        files,
        consent: hasConsented
      });

      setJobId(job_id);
      setCandidates(results);
      localStorage.setItem('lastJobId', job_id);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const giveConsent = () => {
    setHasConsented(true);
    localStorage.setItem('consentGiven', 'true');
  };

  const withdrawConsent = () => {
    setHasConsented(false);
    localStorage.removeItem('consentGiven');
    setCandidates([]);
    navigate('/');
  };

  const handleReset = () => {
    const old = jobId;
    setFiles([]);
    setDescription('');
    setLinkedinUrl('');
    setMode('manual');
    setJobId('');
    setCandidates([]);
    setLoading(false);
    setError('');
    setHasConsented(false);
    localStorage.removeItem('lastDescription');
    localStorage.removeItem('lastLinkedinUrl');
    localStorage.removeItem('lastMode');
    localStorage.removeItem('lastJobId');
    localStorage.removeItem('consentGiven');
    if (old) localStorage.removeItem(`notes_${old}`);
  };

  const currentUser = 'HRUser';

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      {/* Consent Modal */}
      {!hasConsented && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md text-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Data Use & Privacy Notice</h2>
            <p className="mb-4">
              By uploading your resume, you consent to the extraction of its content, the computation of semantic embeddings, and the encrypted, temporary storage of the PDF file for a period of up to 30 days. You may withdraw your consent at any time.
            </p>
            <button onClick={giveConsent} className="bg-indigo-600 px-4 py-2 rounded mr-2">I Agree</button>
            <button onClick={withdrawConsent} className="pl-4 text-red-500 underline">Withdraw Consent</button>
          </div>
        </div>
      )}

      <motion.div className="max-w-4xl mx-auto p-8 space-y-12" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}>

        {/* Header & Reset */}
        <motion.section className="flex justify-between items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div>
            <h1 className="text-5xl font-extrabold">AI Resume Screening</h1>
            <p className="mt-2 text-gray-400">
              {mode === 'manual' ? 'Enter or write the role description.' : 'Paste the LinkedIn job URL and click "Screen Resumes".'}
            </p>
          </div>
          <button onClick={handleReset} className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-xl transition transform hover:scale-105">
            Reset
          </button>
        </motion.section>

        {/* Mode Toggle */}
        <motion.section className="flex justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="relative bg-gray-700 rounded-full h-10 w-48">
            <motion.div className="absolute bg-indigo-600 h-8 w-1/2 rounded-full shadow-lg" style={{ top: '4px' }} animate={{ left: mode==='manual'? '0%':'50%' }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
            <div className="relative flex items-center h-full text-sm font-semibold">
              <span onClick={()=>setMode('manual')} className={`w-1/2 text-center cursor-pointer transition-colors duration-200 ${mode==='manual'?'text-white':'text-gray-400'}`}>Manual</span>
              <span onClick={()=>setMode('linkedin')} className={`w-1/2 text-center cursor-pointer transition-colors duration-200 ${mode==='linkedin'?'text-white':'text-gray-400'}`}>LinkedIn</span>
            </div>
          </div>
        </motion.section>

        {/* Input & Files */}
        <motion.section className="bg-gray-800 p-6 rounded-2xl shadow-xl" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {mode==='manual'
            ? <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Job description..." className="w-full bg-gray-700 text-gray-100 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={4} />
            : <input type="url" value={linkedinUrl} onChange={e=>setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/jobs/..." className="w-full bg-gray-700 text-gray-100 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />}

          <label className="block text-gray-200 mb-2">Upload Resumes (PDF)</label>
          {hasConsented ? (
            <input type="file" accept="application/pdf" multiple onChange={handleFileChange} className="block w-full text-gray-100 mb-6" />
          ) : (
            <p className="text-yellow-400 mb-6">Please agree to the Data Use policy to upload resumes.</p>
          )}

          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button onClick={handleScreen} disabled={!hasConsented || loading || (mode==='manual'&&description.trim()==='')||files.length===0} className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-2xl transition transform hover:scale-105 disabled:opacity-50">
            {loading?'Processing...':'Screen Resumes'}
          </button>
        </motion.section>

        {/* Results */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <HiringResults jobId={jobId} candidates={candidates} currentUser={currentUser} />
        </motion.section>

        {/* Back */}
        <motion.section className="flex justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-2xl transition transform hover:scale-105">
            Back to Home
          </Link>
        </motion.section>
      </motion.div>
      <Footer />
    </div>
  );
}