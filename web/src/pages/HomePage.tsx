import { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function HomePage() {
  const { accessToken, userData } = useUserContext();
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken){
      setUserLoggedIn(true)
    }

  },[accessToken]);

  //console.log("-----", accessToken, "-----")


  return (
    <div>
      HomePage
      {
        userLoggedIn ? (<p>hello {userData.name }</p>) : 
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
