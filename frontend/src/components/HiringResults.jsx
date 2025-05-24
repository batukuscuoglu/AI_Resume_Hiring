import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

export default function HiringResults({ jobId, candidates, currentUser }) {
  const [openIdx, setOpenIdx] = useState(null);
  const storageKey = `notes_${jobId}`;

  // Load persisted notes
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  });

  // Persist notes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  const handleNoteChange = (filename, value) => {
    setNotes(prev => {
      const existing = prev[filename] || {};
      return {
        ...prev,
        [filename]: {
          text: value,
          author: currentUser || existing.author || 'Unknown',
          time:
            existing.text === value
              ? existing.time
              : new Date().toLocaleString(),
        },
      };
    });
  };

  if (!candidates?.length) return null;

  // Sort candidates by capped score (0 minimum)
  const sorted = [...candidates].sort((a, b) => {
    const scoreA = Math.max(0, a.score);
    const scoreB = Math.max(0, b.score);
    return scoreB - scoreA;
  });

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Screening Results</h2>
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Highlights</th>
            <th className="px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, idx) => {
            const note = notes[c.resume_name] || {};
            const isOpen = openIdx === idx;
            const displayScore = Math.max(0, c.score);
            return (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                {/* File */}
                <td className="px-4 py-2">
                  <a
                    href={`http://localhost:8000/resume/${jobId}/${encodeURIComponent(c.resume_name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {c.resume_name}
                  </a>
                </td>

                {/* Score */}
                <td className="px-4 py-2">{displayScore}</td>

                {/* Status */}
                <td className="px-4 py-2">{c.status}</td>

                {/* Highlights + Info Icon */}
                <td className="px-4 py-2 relative text-center">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="text-gray-400 hover:text-gray-200 focus:outline-none mx-auto block"
                    aria-label="Why this score?"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  {isOpen && c.highlights && (
                    <div className="absolute bg-gray-900 p-3 rounded-lg shadow-lg text-sm w-64 left-1/2 transform -translate-x-1/2 mt-2 z-10">
                      <strong>Top Matches:</strong>
                      <ul className="mt-2 list-disc list-inside space-y-1">
                        {c.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>

                {/* Notes */}
                <td className="px-4 py-2">
                  <textarea
                    rows={2}
                    className="w-full bg-gray-700 text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add note..."
                    value={note.text || ''}
                    onChange={e => handleNoteChange(c.resume_name, e.target.value)}
                  />
                  {note.text && (
                    <p className="text-xs text-gray-400 mt-1">
                      Added by{' '}
                      <span className="font-semibold text-gray-200">
                        {note.author}
                      </span>{' '}
                      at {note.time}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}