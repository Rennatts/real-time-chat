import { createContext, useContext, useState, ReactNode } from 'react';
import { ChatRoom, Invitation } from './../interfaces/types';

interface ChatContextType {
  rooms: ChatRoom[];
  invitations: Invitation[];
  addRoom: (room: ChatRoom) => void;
  addInvitation: (invitation: Invitation) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const addRoom = (room: ChatRoom) => {
    setRooms(prevRooms => [...prevRooms, room]);
  };

  const addInvitation = (invitation: Invitation) => {
    setInvitations(prevInvitations => [...prevInvitations, invitation]);
  };

  return (
    <ChatContext.Provider value={{ rooms, invitations, addRoom, addInvitation }}>
      {children}
    </ChatContext.Provider>
  );
};
