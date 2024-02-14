
import Button from '@mui/material/Button';
import { useUserContext } from '../../context/userContext';
import { useLogoutUser } from '../../hooks/useLogoutUser'
import { BiMessageRoundedAdd } from "react-icons/bi";
import Styled from './Header.Styles';

interface HeaderProps {
    onClick: () => void;
    isOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

function Header( { onClick, isOpen, setIsModalOpen }: HeaderProps) {
  const { accessToken, userData } = useUserContext();
  const logoutUser = useLogoutUser();

  const userLoggedIn = !!accessToken;


  const openModal = () => {
    setIsModalOpen(!isOpen)
  }

  return (
    <Styled.Container>
        {userLoggedIn ? 
            (
              <Styled.ButtonBox>
                <Button onClick={openModal}>
                    <BiMessageRoundedAdd 
                    size={30} 
                    style={{ color: 'white' }}
                    />
                </Button>
                  <p style={{fontSize: "12px"}}>Create chat room</p>
              </Styled.ButtonBox>
            ) 
            : 
            (<></>)
        }
    </Styled.Container>
  )
}

export default Header