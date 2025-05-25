import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import HiringPage from './components/HiringPage.jsx';
import FairnessPage from './components/Fairness.jsx';
import TransparencyPage from './components/Transparency.jsx';
import PrivacyPage from './components/Privacy.jsx';
import AccountabilityPage from './components/Accountability.jsx';
import RobustnessPage from './components/Robustness.jsx';
import HumanOversightPage from './components/HumanOversight.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/fairness" element={<FairnessPage />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/accountability" element={<AccountabilityPage />} />
        <Route path="/robustness" element={<RobustnessPage />} />
        <Route path="/human-oversight" element={<HumanOversightPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
