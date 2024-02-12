import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';
import GenericChat from '../components/chat/GenericChat';
import { useUserContext } from '../context/userContext';


function ChatRoomPage() {
    const { userData } = useUserContext();
    let { roomId } = useParams();
    console.log("roomId", roomId)

      

    return (
        <div>ChatRoom number {roomId}
        <GenericChat userData={userData} roomId={roomId!}/>
        </div>
    )
}

export default ChatRoomPage