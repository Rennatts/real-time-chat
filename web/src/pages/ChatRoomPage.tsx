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
    const { users, loading, error } = useFetchAllUsers(); 
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [leftChatRoom, setLeftChatRoom] = useState<boolean>(false);

    console.log("selectedUserId", selectedUserId)

    useEffect(() => {
        if (!socket || !state) return;

        const handleNavigateOutOfChatRoom = (data: any) => {
            setLeftChatRoom(data)
        };

        socket.on('leftRoom', handleNavigateOutOfChatRoom);
      
        if(leftChatRoom) {
            navigate('/chats')
        }

        return () => {
          socket.off('leftRoom');
        };

    }, [socket, state, leftChatRoom]); 

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

    const handleSentInvite = () => {

        const roomId = state.roomId;
        if(roomId && selectedUserId){ 
            console.log("selectedUserId", selectedUserId)
            console.log("roomId", roomId)
            socket.emit('sendInvitation', { roomId: roomId, recipientId: selectedUserId }); 
        }
    };
    


    // useEffect(() => {
    //     if (!socket) return;

    //     const handleNewMessage = (data: { invitationId: string, roomId: string, roomName: string, senderId: string, recipientId: string }) => {
    //         console.log("----DATA----", data)
    //     };

    //     socket.on('invitationReceived', handleNewMessage);
      
    //     return () => {
    //       socket.off('invitationReceived');
    //     };
    // }, [socket]); 


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
                    if (value !== null) { 
                      setSelectedUserId(value.id);
                    }
                }}
                  
            />
            <Button text="Send Invite" onClick={handleSentInvite} />
        </Stack>

        </div>
    )
}

export default ChatRoomPage