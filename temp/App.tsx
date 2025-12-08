import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Research from './pages/Research';
import Members from './pages/Members';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Legal from './pages/Legal';
import Developer from './pages/Developer';
import CardGenerator from './pages/CardGenerator';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recherche" element={<Research />} />
          <Route path="membres" element={<Members />} />
          <Route path="evenements" element={<Events />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="mentions-legales" element={<Legal />} />
          <Route path="developpeur" element={<Developer />} />
          <Route path="card-generator" element={<CardGenerator />} />
          {/* Fallback for index.html/old links if necessary, redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;