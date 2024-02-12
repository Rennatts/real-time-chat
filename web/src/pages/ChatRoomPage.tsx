import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function ChatRoomPage() {
    let { roomId } = useParams();
    console.log("roomId", roomId)

    useEffect(() => {
        socket.on('messageFromRoom', (message) => {
          // Update your state or UI with the new message
          console.log("New message:", message);
        });

        return () => {
            socket.off('messageFromRoom');
        };
    }, []);

    const sendMessage = (message: any) => {
        socket.emit('sendMessageToRoom', { roomId: roomId, message });
    };

    return (
        <div>ChatRoom number {roomId}</div>
    )
}

export default ChatRoomPage