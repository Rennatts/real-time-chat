import { useEffect, useState } from 'react';
import Header from '../../layout/Header/Header'
import CreateChatRoom from '../../components/CreateChatRoom/CreateChatRoom';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socketContext';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import Styles from './ChartsPage.Styles'
import { Stack } from '@mui/material';
import { useChat } from '../../context/chatContext';
import Button from '../../components/common/Button/Button';

function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const socket = useSocket(); 
    const { rooms, addRoom } = useChat();
    const [buttonPressedIndex, setButtonPressedIndex] = useState<number | null>(null);
    const { addInvitation, invitations } = useChat();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
      if (!socket) return;

      const handleNewChatRoom = (newChat: any) => {
        addRoom(newChat); 
      };
    
      socket.on('newChatRoom', handleNewChatRoom);
    
      return () => {
        socket.off('newChatRoom', handleNewChatRoom);
      };
    }, [socket, addRoom]);

    useEffect(() => {
      if (socket == null) return; 
      
      socket.on('connect', () => {
        console.log('Connected to server');
      });



      socket.on('roomJoined', (data: any) => {
        if(data.roomId){
          navigate(`/chatroom/${data.roomId}`,  {state:{ ...data }});
        }
      });
    
    
      return () => {
        socket.off('roomJoined');
      };
    }, [socket, navigate]);

    const handleCreateChatRoom = (formData: any) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { roomName: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };

    const handleJoinChat = (roomId: string) => {
      if (!socket) return; 
      socket.emit('joinRoom', { roomId });
    };

    const handleJoinChatRoom = (invitation: any) => {
      if (!socket) {
          console.error("Socket não está conectado.");
          return;
      }

      socket.emit('acceptInvitation', invitation.invitationId);
      //socket.emit('joinRoom', { roomId });
  
      navigate(`/chatroom/${invitation.roomId}`, {state:{ ...invitation }});
    };

    const handleInvitationClick = (index: any) => {
        setButtonPressedIndex(index);
    };

    useEffect(() => {
      if (!socket) return;

      const handleEnterChatRoom = (data: any) => {
      };

      socket.on('newMemberJoined', handleEnterChatRoom);
    
      return () => {
        socket.off('newMemberJoined', handleEnterChatRoom);
      };
    }, [socket]); 

    useEffect(() => {
      if (!socket) return;

      const handleReceiveInvitation = (invitation: any) => {
          addInvitation(invitation);
      };

      socket.on('invitationReceived', handleReceiveInvitation);

      console.log("invitation", invitations)

      return () => {
          socket.off('invitationReceived', handleReceiveInvitation);
      };
    }, [socket, addInvitation]); 

    return (
      <div>
        <Header onClick={handleOpenModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        Chats
        <div>Invitations received
          {invitations.length > 0 ?
          (
          <ul>
              {invitations.map((invitation, index) => (
                  <div key={index}>
                      <li onClick={() => handleInvitationClick(index)}>
                          convite recebido para o chat {invitation.roomName}, convidado por {invitation.senderName}
                      </li>
                      {buttonPressedIndex === index && (
                          <Button text="Entrar?" onClick={() => handleJoinChatRoom(invitation)}></Button>
                      )}
                  </div>
              ))}
          </ul>
          )
          :
          (<></>)
          }
        </div>
        <Styles.ChatGrid>
          {rooms.map((chat: any, index: any) => ( // Use rooms from context
            <Stack direction="row" spacing={1} key={index} onClick={() => handleJoinChat(chat.roomId)}>
                <ChatRoom {...chat}></ChatRoom>
            </Stack>
          ))}
        </Styles.ChatGrid>

        <CreateChatRoom isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCreateChatRoom} />
      </div>
    )
}

export default ChatsPage
