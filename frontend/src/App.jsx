import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import LoginPage from './components/loginPage';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import MainPage from './components/MainPage';


function App() {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL //import.meta.env.BASE_URL is from vite.config.js. It refers to the base variable it the defineConfig
  });

  const padding = {
    padding: 5
  }

  return (
    <Router forceRefresh={true}>
      <Routes>
        <Route path="/kirjautuminen" element={<LoginPage axiosInstance={axiosInstance}/>} />
        <Route path="/" element={<MainPage axiosInstance={axiosInstance} />} />
      </Routes>
    </Router>

  );
};

export default App;
