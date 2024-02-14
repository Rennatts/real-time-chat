import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSocket } from '../../../context/socketContext';
import Styles from './GenericChat.Styles'
import { Box, TextField } from '@mui/material';
import Button from '../../common/Button/Button';

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
        <Styles.Container>
            <Styles.ChatBody>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message.name}: {message.text}</li>
                    ))}
                </ul>
            </Styles.ChatBody>
            <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
            }}
            component="form" 
            onSubmit={sendMessageToRoom}>
                <TextField
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                />
                <Button text="Enviar" type="submit"></Button>
            </Box>
        </Styles.Container>
    );
}

export default GenericChat;
