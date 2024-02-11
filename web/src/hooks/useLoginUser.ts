import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useUserContext } from '../context/userContext';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAccessToken, setUserData } = useUserContext();
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setUserData({
            name: userData.name,
            email: userData.email,
            id: user.uid,
          });
        }
      }, {
        onlyOnce: true
      });

      const token = await user.getIdToken();
      setAccessToken(token);

      setLoading(false);
      navigate('/');
      
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unknown error occurred");
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
