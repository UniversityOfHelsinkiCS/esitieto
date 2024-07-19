import React from 'react';
import axios from 'axios';

import './styles/App.css'

import MainPage from './pages/MainPage';
import GraphPosSavePage from './pages/GraphPosSavePage';

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import MissingPage from './pages/MissingPage';


function App() {
  const baseURL = process.env.VITE_BASE_URL || 'http://localhost:3000/';
  const axiosInstance = axios.create({
    baseURL: baseURL
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphPosSavePage axiosInstance={axiosInstance} />} />
        <Route path="public" element={<MainPage axiosInstance={axiosInstance} />} />
        <Route path="*" element={<MissingPage axiosInstance={axiosInstance} />} />
      </Routes>
    </Router>
  );
}

export default App;

