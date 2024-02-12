import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from '../layout/Header'
import CreateChatRoom from '../components/CreateChatRoom/CreateChatRoom';
import { useNavigate } from 'react-router-dom';


const socket = io('http://localhost:4000');

function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chats, setChats] = useState<{roomId: string, name: string, description: string}[]>([]);
    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('roomJoined', (data: any) => {
        console.log('Data received:', data);
        if(data.roomId){
          navigate(`/chatroom/${data.roomId}`)
        }
      });
    
    
      return () => {
        socket.off('roomJoined');
      };
    }, []);
    

    console.log("chats", chats)

    const createChatRoom = (formData: { chatRoomName: string; chatRoomDescription: string }) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { name: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };


    const handleJoinChat = (roomId: any) => {
      console.log("--roomId--", roomId)
      socket.emit('joinRoom', { roomId: roomId });
    };
  

    return (
      <div>
        <Header onClick={handleOpenModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        ChatsPage
        <ul>
          {chats.map((chat, index) => (
            <li key={index} onClick={() => handleJoinChat(chat.roomId)}>
              {chat.name}: {chat.description}
            </li>
          ))}
        </ul>

        <CreateChatRoom isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={createChatRoom} />
      </div>
    )
}

export default ChatsPage