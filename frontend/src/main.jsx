import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';       // ← this activates Tailwind!
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import HiringPage from './components/HiringPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hiring" element={<HiringPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
