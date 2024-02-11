import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useUserContext } from '../context/userContext';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export const useSignUpUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAccessToken } = useUserContext();
  const navigate = useNavigate();

  async function signUpUser(email: string, password: string, name: string) {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        name: name,
        email: email,
      });
  
      const token = await user.getIdToken();
      setAccessToken(token);
  
      navigate('/');
      setLoading(false); 
    } catch (error) {
      console.error("Error signing up:", error);
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  }
  

  return { signUpUser, loading, error };
};
