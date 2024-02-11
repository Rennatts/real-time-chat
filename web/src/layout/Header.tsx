import { useEffect, useState } from 'react';
import Button from '../components/common/Button'
import { useUserContext } from '../context/userContext';
import { useLogoutUser } from '../hooks/useLogoutUser'

function Header() {
  const { accessToken, userData } = useUserContext();
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const logoutUser = useLogoutUser();

  useEffect(() => {
    if(accessToken){
      setUserLoggedIn(true)
    }

  },[accessToken]);

  console.log("userData", userData)

  return (
    <div>Header
      {userLoggedIn ? 
      (<Button text="logout" onClick={logoutUser}></Button>) 
      : 
      (<></>)}
    </div>
  )
}

export default Header