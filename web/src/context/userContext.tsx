import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, onValue, ref } from 'firebase/database';
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
  const [_accessToken, _setAccessToken] = useState<string | null>(null);
  const [_userData, _setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(true); 


  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }

    _setAccessToken(token);
  };
  
  const setUserData = (data: UserData | {}) => {
    if (data && Object.keys(data).length) {
      localStorage.setItem('userData', JSON.stringify(data));
    } else {
      localStorage.removeItem('userData');
    }

    _setUserData(data);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const accessTokenValue = user.refreshToken;
        setAccessToken(accessTokenValue); 
  
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              name: data.name,
              email: data.email,
              id: user.uid,
            });
          }
          setIsLoading(false);
        });
      } else {
        setAccessToken(null);
        setUserData({});
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');
  
    if (storedAccessToken) {
      _setAccessToken(storedAccessToken); 
    }
  
    if (storedUserData) {
      _setUserData(JSON.parse(storedUserData)); 
    }
  
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider  
      value={{ 
        accessToken: _accessToken, 
        setAccessToken, 
        userData: _userData, 
        setUserData, 
        isLoading 
      }}>
      {children}
    </UserContext.Provider>
  );
};
