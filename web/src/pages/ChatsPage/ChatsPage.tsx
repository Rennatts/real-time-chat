import { useEffect, useState } from 'react';
import Header from '../../layout/Header/Header'
import CreateChatRoom from '../../components/CreateChatRoom/CreateChatRoom';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socketContext';
import ChatRoomCard from '../../components/ChatRoom/ChatRoomCard';
import Styles from './ChartsPage.Styles'
import { Stack } from '@mui/material';
import { useChat } from '../../context/chatContext';
import InvitationCard from '../../components/InvitationCard/InvitationCard';

type Invitation = {
  invitationId: string;
  recipientId:  string;
  roomId:  string;
  roomName:  string;
  senderId:  string;
  senderName:  string;
}

function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const socket = useSocket(); 
    const { rooms, addRoom } = useChat();
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

    console.log("rooms", rooms)

    useEffect(() => {
      if (socket == null) return; 
      
      socket.on('connect', () => {
        console.log('Connected to server');
      });



      socket.on('roomJoined', (data: any) => {
        console.log("--data--", data)
        if(data.roomId){
          navigate(`/chatroom/${data.roomId}`,  {state:{ roomId: data.roomId, roomName: data.roomName }});
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

    const handleJoinChatRoom = (invitation: Invitation) => {
      console.log("invitation", invitation)
      if (!socket) {
          console.error("Socket não está conectado.");
          return;
      }

      socket.emit('joinRoom', { roomId: invitation.roomId });
  
      navigate(`/chatroom/${invitation.roomId}`, {state:{ roomId: invitation.roomId, roomName: invitation.roomName }});
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

    console.log("rooms", rooms)

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
    }, [socket, addInvitation, invitations]); 

    return (
      <div>
        <Header invitationsNumber={invitations.length} onClick={handleOpenModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <div>
          {invitations.length > 0 ? (
            <Styles.InvitationsList>
              {invitations.map((invitation, index) => (
              <InvitationCard 
                key={index}
                roomName={invitation.roomName}
                senderName={invitation.senderName}
                onAccept={() => handleJoinChatRoom(invitation)}
                invitationId={invitation.invitationId}
                roomId={invitation.roomId}
                senderId={invitation.senderId}
                recipientId={invitation.recipientId}
              />
              ))}
            </Styles.InvitationsList>
          ) : (
            <></>
          )}
        </div>
        <div>
          <Styles.Header>
            <h3>Todos os chats</h3>
          </Styles.Header>
          <Styles.ChatGrid>
            {rooms.map((chat: any, index: any) => (
              <Stack direction="row" spacing={1} key={index} onClick={() => handleJoinChat(chat.roomId)}>
                  <ChatRoomCard {...chat}></ChatRoomCard>
              </Stack>
            ))}
          </Styles.ChatGrid>

          <CreateChatRoom isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCreateChatRoom} />
        </div>
      </div>
    )
}

export default ChatsPage
