import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface UserData {
    name?: string;
    email?: string;
    id?: string;
}

type ChatProps = {
    userData: UserData; 
};

function Chat({ userData }: ChatProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{name: string, text: string}[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    
        const handleNewMessage = (newMessage: any) => {
            setMessages((msgs) => [...msgs, newMessage]);
        };
    
        socket.on('message', handleNewMessage);
    
        return () => {
            socket.off('message', handleNewMessage);
        };
    }, []);

    const sendMessage = (event: any) => {
        event.preventDefault();
        if (message) {
            socket.emit('createMessage', { name: userData.name, text: message }); 
            setMessage('');
        }
    };

    const fetchMessages = () => {
        socket.emit('findAllMessages');
        socket.on('findAllMessages', (fetchedMessages) => {
            setMessages(fetchedMessages);
        });
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.name}: {message.text}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
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

export default Chat;