import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GenericChat from '../../components/chat/GenericChat/GenericChat';
import { useUserContext } from '../../context/userContext';
import { useSocket } from '../../context/socketContext';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { useFetchAllUsers } from '../../hooks/useFetchAllUsers';


import Styles from './ChatRoomPage.Styles';

function ChatRoomPage() {
    const socket = useSocket();
    const { userData } = useUserContext();
    const location = useLocation();
    const { state } = location;
    const { users} = useFetchAllUsers();
    const navigate = useNavigate();
    const [selectedUserId, setSelectedUserId] = useState<string>('');


    const handleSentInvite = () => {
        const roomId = state.roomId;
        if (roomId && selectedUserId) {
            socket.emit('sendInvitation', {
                roomId: roomId,
                recipientId: selectedUserId,
                senderName: userData.name
            });
        }
    };

    const handleLeaveChatRoom = () => {
        if (!socket || !state || !userData.id) return;
        socket.emit('leaveRoom', state.id);
        navigate('/');
    };

    return (
        <Styles.Container>
            <Styles.Header>
                <h2>Chat {state.roomName}</h2>
                <Button onClick={handleLeaveChatRoom}>Leave Chat Room</Button>
            </Styles.Header>
            <Styles.ChatContainer>
                <GenericChat userData={userData} roomId={state.roomId!}/>
            </Styles.ChatContainer>
            <Styles.InviteBox>
                <Typography variant="h6" component="h2">
                    Invite Users to the chat
                </Typography>
                <Autocomplete
                    sx={{ width: '70%' }} 
                    options={users}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField 
                        {...params} 
                        label="Search users" 
                        variant="outlined" />
                    )}
                    onChange={(event, value) => setSelectedUserId(value ? value.id : '')}
                />
                <Button onClick={handleSentInvite}>Send Invite</Button>
            </Styles.InviteBox>
        </Styles.Container>
    );
}

export default ChatRoomPage;
