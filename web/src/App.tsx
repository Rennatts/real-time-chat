import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
