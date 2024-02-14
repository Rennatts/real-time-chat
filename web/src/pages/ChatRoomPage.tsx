import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GenericChat from '../components/chat/GenericChat';
import { useUserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';
import Button from '../components/common/Button/Button';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useFetchAllUsers } from '../hooks/useFetchAllUsers';
import { useChat } from '../context/chatContext';

function ChatRoomPage() {
    const socket = useSocket();
    const navigate = useNavigate();
    const { userData } = useUserContext();
    const location = useLocation();
    const { state } = location;
    const { users, loading, error } = useFetchAllUsers();
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const { addInvitation, invitations } = useChat(); 

    useEffect(() => {
        if (!socket || !state) return;

        const handleReceiveInvitation = (invitation: any) => {
            addInvitation(invitation);
        };

        socket.on('invitationReceived', handleReceiveInvitation);

        return () => {
            socket.off('invitationReceived', handleReceiveInvitation);
        };
    }, [socket, addInvitation]); 

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
    };


    return (
        <div>
            <GenericChat userData={userData} roomId={state.id!}/>
            <Button text="Leave Chat Room" onClick={handleLeaveChatRoom} />
            <Stack>
                <h1>Invite Users to the chat</h1>
                <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label="Search users" variant="outlined" />
                    )}
                    onChange={(event, value) => setSelectedUserId(value ? value.id : '')}
                />
                <Button text="Send Invite" onClick={handleSentInvite} />
            </Stack>
        </div>
    );
}

export default ChatRoomPage;
