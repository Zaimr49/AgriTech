// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Authentication/Authentication.jsx';
import Portal from "./components/Portal/Portal.jsx";

function App() {
  
  return (
    <>
    <Routes> 
        <Route path="/" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </>
  );
}

export default App;
