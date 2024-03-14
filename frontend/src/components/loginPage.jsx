import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';



const LoginPage = async ({axiosInstance}) => {

  return (
    <Router>
      <div>
        Checking login status
        {await axiosInstance.get("/api/kirjauduttu") ? <Redirect to="/" /> : <LoginPage />}
      </div>

    </Router>
  );
};

export default LoginPage;