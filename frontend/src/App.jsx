import React from 'react';
import axios from 'axios';

import './styles/App.css'

import GraphPosSavePage from './pages/GraphPosSavePage';
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';
import MissingPage from './pages/MissingPage';
import LoginPage from './pages/LoginPage';

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';

function App() {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL //import.meta.env.BASE_URL is from vite.config.js. It refers to the base variable it the defineConfig
  });

  //const padding = { Commented out for lint, but if someone intended to use this for something leaving here. Otherwise nuke away.
  //  padding: 5
  //}

  return (
    <Router>
      <Routes>
        <Route path={import.meta.env.BASE_URL + "/"} element={<GraphPosSavePage axiosInstance={axiosInstance}/>} />
        <Route path={import.meta.env.BASE_URL + "/start"} element={<StartPage axiosInstance={axiosInstance} />} />
        <Route path={import.meta.env.BASE_URL + "/login"} element={<LoginPage axiosInstance={axiosInstance}/>} />
        <Route path={import.meta.env.BASE_URL + "/public"} element={<MainPage axiosInstance={axiosInstance} />} />
        <Route path={import.meta.env.BASE_URL + "*"} element={<MissingPage axiosInstance={axiosInstance} />} />
      </Routes>
    </Router>

  );
}

export default App;
