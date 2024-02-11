import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from '../layout/Header'
import CreateChatRoom from '../components/CreateChatRoom/CreateChatRoom';

const socket = io('http://localhost:4000');

function ChatsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChatRoom, setNewChatRoom] = useState<{chatRoomName: string, chatRoomDescription: string}[]>();
    const [chats, setChats] = useState<{name: string, description: string}[]>([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
      socket.on('connect', () => {
          console.log('Connected to server');
      });

      const handleNewChatRoom = (newChat: any) => {
        setChats((chats) => [...chats, newChat]);
      };

      socket.on('createRoom', handleNewChatRoom);

      return () => {
          socket.off('createRoom', handleNewChatRoom);
      };
    }, []);

    const createChatRoom = (formData: { chatRoomName: string; chatRoomDescription: string }) => {
      if(formData.chatRoomName && formData.chatRoomDescription){ 
        socket.emit('createRoom', { name: formData.chatRoomName, description: formData.chatRoomDescription }); 
      }
    };



    return (
      <div>
        <Header onClick={handleOpenModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        ChatsPage
        <ul>
            {chats.map((chat, index) => (
                <li key={index}>{chat.name}: {chat.description}</li>
            ))}
        </ul>
        <CreateChatRoom isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={createChatRoom} />
      </div>
    )
}

export default ChatsPage