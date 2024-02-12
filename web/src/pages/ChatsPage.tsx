import { useEffect, useState } from 'react';
import Header from '../layout/Header'
import CreateChatRoom from '../components/CreateChatRoom/CreateChatRoom';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/socketContext';


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
          navigate(`/chatroom/${data.roomId}`)
        }
      });
    
    
      return () => {
        socket.off('roomJoined');
      };
    }, [socket, navigate]);
    

    console.log("chats", chats)

    const createChatRoom = (formData: { chatRoomName: string; chatRoomDescription: string }) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { name: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };


    const handleJoinChat = (roomId: any) => {
      if (socket == null) return; 
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