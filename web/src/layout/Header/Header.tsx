
import Button from '@mui/material/Button';
import { useUserContext } from '../../context/userContext';
import { BiMessageRoundedAdd } from "react-icons/bi";
import Styled from './Header.Styles';

interface HeaderProps {
    isOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    invitationsNumber: number;
}

function Header( { isOpen, setIsModalOpen, invitationsNumber }: HeaderProps) {
  const { accessToken } = useUserContext();

  const userLoggedIn = !!accessToken;


  const openModal = () => {
    setIsModalOpen(!isOpen)
  }

  return (
    <Styled.Container>
        {userLoggedIn ? 
            (
              <>
                <div>
                  <p>Convites recebidos {invitationsNumber}</p>
                </div>
                <Styled.ButtonBox>
                  <Button onClick={openModal}>
                      <BiMessageRoundedAdd 
                      size={30} 
                      style={{ color: 'white' }}
                      />
                  </Button>
                    <p style={{fontSize: "12px"}}>Create chat room</p>
                </Styled.ButtonBox>

              </>
            ) 
            : 
            (<></>)
        }
    </Styled.Container>
  )
}

export default Header