import React from 'react';
import axios from 'axios';

import './App.css'

import MainPage from './pages/MainPage';
import GraphPosSavePage from './pages/GraphPosSavePage';

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';


function App() {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL //import.meta.env.BASE_URL is from vite.config.js. It refers to the base variable it the defineConfig
  });

  //const padding = { Commented out for lint, but if someone intended to use this for something leaving here. Otherwise nuke away.
  //  padding: 5
  //}

  const basePath = import.meta.env.VITE_BASE_PATH || '/';

  return (
    <Router basename={basePath}>
      <Routes>
        <Route path={"kirjauduttu"} element={<GraphPosSavePage axiosInstance={axiosInstance}/>} />
        <Route path={"public"} element={<MainPage axiosInstance={axiosInstance} />} />
      </Routes>
    </Router>

  );
}

export default App;
