import { useUserContext } from '../context/userContext';

import Chat from '../components/chat/Chat';
import LoginPage from './LoginPage';
import ChatsPage from './ChatsPage/ChatsPage';

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
              {/* <Chat userData={userData}></Chat> */}
              <ChatsPage></ChatsPage>
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
