import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import './App.css';
import Sidebar from "./layout/Sidebar";

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar/>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
