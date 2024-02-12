import { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


import Button from '../components/common/Button';
import Chat from '../components/chat/Chat';

export default function HomePage() {
  const { accessToken, userData, isLoading } = useUserContext();
  const navigate = useNavigate();

  const userLoggedIn = accessToken !== null

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      HomePage
      {
        userLoggedIn ? 
        (
          <div>
              <p>hello {userData.name }</p>
              <Chat userData={userData}></Chat>
          </div>
        )
        : 
        (
          <div>
            <div>
              <p>Already have an account?, login please
                <Button 
                text="Login" 
                onClick={()=> navigate('/login')}/>
              </p>
            </div>
            <div>
              <p>Do not have an account?, signup please
              <Button 
                text="Signup" 
                onClick={()=> navigate('/signup')}/>
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}
