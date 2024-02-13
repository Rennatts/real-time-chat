import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GenericChat from '../components/chat/GenericChat';
import { useUserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';
import Button from '../components/common/Button/Button';


function ChatRoomPage() {
    const socket = useSocket(); 
    const navigate = useNavigate();
    const { userData } = useUserContext();
    const location = useLocation();
    const { state } = location;
    // let { roomId } = useParams();
    const [letChatRoom, setLeftChatRoom] = useState<boolean>(false);
    console.log("state", state)

    useEffect(() => {
        if (!socket || !state) return;

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

    }, [socket, state, letChatRoom]); 

    const handleLeaveChatRoom = () => {
        if (socket == null) return; 

        if (state &&  userData.id) {
            socket.emit('leaveRoom',
              state.id
            );
        }
    }


    return (
        <div>ChatRoom {state.name}
        <GenericChat userData={userData} roomId={state.id!}/>
        <Button text="Leave Chat Room" onClick={handleLeaveChatRoom}></Button>
        </div>
    )
}

export default ChatRoomPage