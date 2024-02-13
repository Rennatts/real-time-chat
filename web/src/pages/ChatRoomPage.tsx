import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GenericChat from '../components/chat/GenericChat';
import { useUserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';
import Button from '../components/common/Button/Button';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useFetchAllUsers } from '../hooks/useFetchAllUsers';

function ChatRoomPage() {
    const socket = useSocket(); 
    const navigate = useNavigate();
    const { userData } = useUserContext();
    const location = useLocation();
    const { state } = location;
    const [letChatRoom, setLeftChatRoom] = useState<boolean>(false);
    const { users, loading, error } = useFetchAllUsers(); 
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    console.log("selectedUserId", selectedUserId)

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

    useEffect(() => {
        console.log("users", users)

    },[users])

    const handleSentInvite = ( roomId: string, receiptId: string ) => {
        if(roomId && receiptId){ 
            socket.emit('createRoom', { roomId: roomId, receiptId: selectedUserId }); 
            setSelectedUserId(null);
        }
    };


    return (
        <div>ChatRoom {state.name}
        <GenericChat userData={userData} roomId={state.id!}/>
        <Button text="Leave Chat Room" onClick={handleLeaveChatRoom}></Button>
        <Stack>
            <h1>Invite Users to the chat</h1>
            <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search users" 
                    variant="outlined" 
                    />
                )}
                onChange={(event, value) => {
                    setSelectedUserId(value ? value.id : null);
                }}
            />
            <Button text="Send Invite" onSubmit={handleSentInvite}></Button>
        </Stack>

        </div>
    )
}

export default ChatRoomPage