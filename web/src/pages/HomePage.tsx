import { useUserContext } from '../context/userContext';

import Chat from '../components/chat/Chat';
import LoginPage from './LoginPage';

export default function HomePage() {
  const { accessToken, userData, isLoading } = useUserContext();

  const userLoggedIn = accessToken !== null


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
            <LoginPage/>
          </div>
        )
      }
    </div>
  )
}
