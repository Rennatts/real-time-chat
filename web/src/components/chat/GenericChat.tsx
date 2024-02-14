import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSocket } from '../../context/socketContext';

const socket = io('http://localhost:4000');

interface UserData {
    name?: string;
    email?: string;
    id?: string;
}

type ChatProps = {
    userData: UserData; 
    roomId?: string;
};

function GenericChat({ userData, roomId }: ChatProps) {
    const socket = useSocket(); 
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{name: string, text: string}[]>([]);

    useEffect(() => {
        if (!socket || !roomId) return;

        const handleNewMessage = (data: any) => {
            console.log("AQUI", data)
            if (data.roomId === roomId) {
                setMessages((msgs) => [...msgs, { name: data.senderName, text: data.text }]);
            }
        };

        socket.on('messageFromRoom', handleNewMessage);
      
        return () => {
          socket.off('messageFromRoom');
        };
    }, [socket, roomId]); 

    const sendMessageToRoom = (event: any) => {
        event.preventDefault();
        
        if (socket == null) return; 
        if (roomId && message && userData.id) {
            socket.emit('sendMessageToRoom', { 
                roomId, 
                message, 
                senderId: userData.id, 
                senderName: userData.name 
            });
            setMessage('');
        }
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.name}: {message.text}</li>
                ))}
            </ul>
            <form onSubmit={sendMessageToRoom}>
                <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default GenericChat;
