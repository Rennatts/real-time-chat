import { useEffect, useState } from 'react';
import Header from '../../layout/Header/Header'
import CreateChatRoom from '../../components/CreateChatRoom/CreateChatRoom';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socketContext';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import Styles from './ChartsPage.Styles'
import { Stack } from '@mui/material';


function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chats, setChats] = useState<{roomId: string, name: string, description: string}[]>([]);
    const navigate = useNavigate();
    const socket = useSocket(); 

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
      if (socket == null) return; 

      socket.on('connect', () => {
          console.log('Connected to server');
      });

      const handleNewChatRoom = (newChat: any) => {
        setChats((chats) => [...chats, newChat]);
      };
    
      socket.on('newChatRoom', handleNewChatRoom);
    
      return () => {
        socket.off('newChatRoom', handleNewChatRoom);
      };
    }, [socket]);

    useEffect(() => {
      if (socket == null) return; 
      
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('roomJoined', (data: any) => {
        console.log('Data received:', data);
        if(data.roomId){
          navigate(`/chatroom/${data.roomId}`,  {state:{ ...data }});
        }
      });
    
    
      return () => {
        socket.off('roomJoined');
      };
    }, [socket, navigate]);
    

    console.log("chats", chats)

    const handleCreateChatRoom = (formData: { chatRoomName: string; chatRoomDescription: string }) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { name: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };


    const handleJoinChat = (roomId: string) => {
      if (socket == null) return; 
      socket.emit('joinRoom', { roomId: roomId });
    };
  

    return (
      <div>
        <Header onClick={handleOpenModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        Chats
        <Styles.ChatGrid>
          {chats.map((chat, index) => (
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