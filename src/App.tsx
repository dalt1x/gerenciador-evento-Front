import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventoListPage from './pages/EventoListPage';
import EventoFormPage from './pages/EventoFormPage';
import EventoDetailPage from './pages/EventoDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventoListPage />} />
        <Route path="/eventos/novo" element={<EventoFormPage />} />
        <Route path="/eventos/:id" element={<EventoDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;