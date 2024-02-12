import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserData {
  name?: string;
  email?: string;
  id?: string;
}

interface UserContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("user", user)
      if (user) {
        setAccessToken(user.refreshToken);
  
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              name: data.name,
              email: data.email,
              id: user.uid,
            });
          }
          setIsLoading(false);
        }, {
          onlyOnce: true 
        });
      } else {
        setAccessToken(null);
        setUserData({});
        setIsLoading(false);
      }
    });
  }, []);
  

  return (
    <UserContext.Provider  
      value={{ 
        accessToken, 
        setAccessToken, 
        userData, 
        setUserData, 
        isLoading 
      }}>
      {children}
    </UserContext.Provider>
  );
};