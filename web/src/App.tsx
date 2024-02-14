import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import Sidebar from "./layout/Sidebar/Sidebar";
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './App.css';
import ChatRoomPage from './pages/ChatRoomPage';
import { SocketProvider } from "./context/socketContext";
import InvitationsPage from "./pages/InvitationsPage";
import WebSocketAuthHandler from "./context/webSocketAuthHandler";
import { ChatProvider } from "./context/chatContext";

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <ChatProvider>
          <WebSocketAuthHandler/>
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
                  <Route path="/invitations" element={<InvitationsPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ChatProvider>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
