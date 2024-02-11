import { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { UserContext, useUserContext } from './../context/userContext';
import { useNavigate } from 'react-router-dom';



export const useLogoutUser = () => {
    const { setAccessToken, setUserData } = useUserContext(); 
    const navigate = useNavigate();
    
    const logoutUser = async () => {
        const auth = getAuth();

        try {
        await signOut(auth);
        setAccessToken(null);
        setUserData({});
        navigate('/');
        } catch (error) {
        console.error("Error logging out: ", error);
        }
    };

    return logoutUser;
};
