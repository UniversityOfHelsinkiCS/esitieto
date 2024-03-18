import React from 'react';
import axios from 'axios';

import './App.css'

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';


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
        <Route path={import.meta.env.BASE_URL + "/kirjautuminen"} element={<LoginPage axiosInstance={axiosInstance}/>} />
        <Route path={import.meta.env.BASE_URL} element={<MainPage axiosInstance={axiosInstance} />} />
      </Routes>
    </Router>

  );
};

export default App;
