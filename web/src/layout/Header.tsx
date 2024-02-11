
import Button from '@mui/material/Button';
import { useUserContext } from '../context/userContext';
import { useLogoutUser } from '../hooks/useLogoutUser'
import { BiMessageRoundedAdd } from "react-icons/bi";
import Styled from './Header.Styles';

function Header() {
  const { accessToken, userData } = useUserContext();
  const logoutUser = useLogoutUser();

  const userLoggedIn = !!accessToken;

  return (
    <Styled.Container>
        {userLoggedIn ? 
            (<Button>
                <BiMessageRoundedAdd size={30} style={{ color: 'white' }}/>
            </Button>) 
            : 
            (<></>)
        }
    </Styled.Container>
  )
}

export default Header