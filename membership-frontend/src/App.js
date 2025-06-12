import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </Router>
    <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
