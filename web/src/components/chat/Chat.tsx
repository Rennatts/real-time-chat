import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useSocket } from '../../context/socketContext';
import Styles from './Chat.Styles';
import Button from '../common/Button/Button';
import { Message } from '../../interfaces/types';

interface UserData {
    name?: string;
    email?: string;
    id?: string;
}

type ChatProps = {
    userData: UserData; 
    roomId?: string;
};

function Chat({ userData, roomId }: ChatProps) {
    const socket = useSocket(); 
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{name: string, text: string}[]>([]);


    useEffect(() => {
        if (!socket || !roomId) return;
    
        const handleNewMessage = (data: Message) => {
            if (data.roomId === roomId) {
                setMessages((msgs) => [...msgs, { name: data.senderName, text: data.text }]);
            }
        };
    
        socket.on('messageFromRoom', handleNewMessage);
       
        return () => {
          socket.off('messageFromRoom', handleNewMessage);
        };
    }, [socket, roomId]);
    

    const sendMessageToRoom = (event: React.FormEvent<HTMLFormElement>) => {
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
    }

    return (
        <Styles.Container>
            <Styles.ChatBody>
                <ul>
                    {messages.map((message, index) => (
                        <Styles.Message key={index}>{message.name}: {message.text}</Styles.Message>
                    ))}
                </ul>
            </Styles.ChatBody>
            <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center', 
                marginTop: '1%',
            }}
            component="form" 
            onSubmit={sendMessageToRoom}
            >
                <TextField
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                sx={{
                    flexGrow: 1,
                    height: 56, 
                    '& .MuiInputBase-root': {
                      height: '100%', 
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px', 
                    },
                }}
                />
                <Button text="Enviar" type="submit" sx={{ height: '56px' }}></Button>
            </Box>

        </Styles.Container>
    );
}

export default Chat;
