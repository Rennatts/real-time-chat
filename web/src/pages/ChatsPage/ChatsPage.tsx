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
import { ChatRoom, CreateChatRoo, Invitation } from '../../interfaces/types';


function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const socket = useSocket(); 
    const { rooms, addRoom } = useChat();
    const { addInvitation, invitations } = useChat();

    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
      if (!socket) return;

      const handleNewChatRoom = (newChatRoom: ChatRoom) => {
        addRoom(newChatRoom); 
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



      socket.on('roomJoined', (chatRoom: ChatRoom) => {
        if(chatRoom.roomId){
          navigate(`/chatroom/${chatRoom.roomId}`,  {state:{ roomId: chatRoom.roomId, roomName: chatRoom.roomName }});
        }
      });
    
    
      return () => {
        socket.off('roomJoined');
      };
    }, [socket, navigate]);

    const handleCreateChatRoom = (formData: CreateChatRoo) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { roomName: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };

    const handleJoinChat = (roomId: string) => {
      if (!socket) return; 
      socket.emit('joinRoom', { roomId });
    };

    const handleJoinChatRoom = (invitation: Invitation) => {
      if (!socket) {
          console.error("Socket não está conectado.");
          return;
      }

      socket.emit('joinRoom', { roomId: invitation.roomId });
  
      navigate(`/chatroom/${invitation.roomId}`, {state:{ roomId: invitation.roomId, roomName: invitation.roomName }});
    };


    useEffect(() => {
      if (!socket) return;

      const handleReceiveInvitation = (invitation: Invitation) => {
          addInvitation(invitation);
      };

      socket.on('invitationReceived', handleReceiveInvitation);

      return () => {
          socket.off('invitationReceived', handleReceiveInvitation);
      };
    }, [socket, addInvitation, invitations]); 

    return (
      <div>
        <Header invitationsNumber={invitations.length} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
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
            {rooms.map((chat: ChatRoom, index: number) => (
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
