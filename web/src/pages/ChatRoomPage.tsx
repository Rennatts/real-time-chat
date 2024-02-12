import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenericChat from '../components/chat/GenericChat';
import { useUserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';
import Button from '../components/common/Button/Button';


function ChatRoomPage() {
    const socket = useSocket(); 
    const navigate = useNavigate();
    const { userData } = useUserContext();
    let { roomId } = useParams();
    const [letChatRoom, setLeftChatRoom] = useState<boolean>(false);
    console.log("roomId", roomId)

    useEffect(() => {
        if (!socket || !roomId) return;

        const handleNavigateOutOfChatRoom = (data: any) => {
            setLeftChatRoom(data)
        };

        socket.on('leftRoom', handleNavigateOutOfChatRoom);
      
        if(letChatRoom) {
            navigate('/chats')
        }

        return () => {
          socket.off('leftRoom');
        };

    }, [socket, roomId, letChatRoom]); 

    const handleLeaveChatRoom = () => {
        if (socket == null) return; 

        if (roomId &&  userData.id) {
            socket.emit('leaveRoom',
                roomId
            );
        }
    }


    return (
        <div>ChatRoom number {roomId}
        <GenericChat userData={userData} roomId={roomId!}/>
        <Button text="Leave Chat Room" onClick={handleLeaveChatRoom}></Button>
        </div>
    )
}

export default ChatRoomPage