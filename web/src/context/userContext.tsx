import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  userName: string | null; 
  setUserName: (name: string | null) => void; 
  userEmail: string | null; 
  setUserEmail: (email: string | null) => void; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); 
  const [userEmail, setUserEmail] = useState<string | null>(null); 

  return (
    <UserContext.Provider value={{ 
      accessToken, 
      setAccessToken, 
      userName, 
      setUserName, 
      userEmail, 
      setUserEmail 
      }}>
      {children}
    </UserContext.Provider>
  );
};
