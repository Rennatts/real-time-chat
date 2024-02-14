import { useUserContext } from '../context/userContext';

import LoginPage from './LoginPage';
import ChatsPage from './ChatsPage/ChatsPage';

export default function HomePage() {
  const { accessToken, isLoading } = useUserContext();

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
