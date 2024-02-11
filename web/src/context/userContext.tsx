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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccessToken(user.refreshToken);
  
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log("DDDDDDD", data, "DDDDD")
          if (data) {
            setUserData({
              name: data.name,
              email: data.email,
              id: user.uid,
            });
          }
        }, {
          onlyOnce: true 
        });
      } else {
        setAccessToken(null);
        setUserData({});
      }
    });
  }, []);
  

  return (
    <UserContext.Provider  value={{ accessToken, setAccessToken, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};