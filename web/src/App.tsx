import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import Sidebar from "./layout/Sidebar";
import ChatsPage from './pages/ChatsPage';

import './App.css';
import ChatRoomPage from './pages/ChatRoomPage';
import { SocketProvider } from "./context/socketContext";

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <Router>
          <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar/>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/chatroom/:roomId" element={<ChatRoomPage/>}></Route>
              </Routes>
            </div>
          </div>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
