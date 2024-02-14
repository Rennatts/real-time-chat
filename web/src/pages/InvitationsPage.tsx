import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useChat } from "../context/chatContext";

function InvitationsPage() {
    const [buttonPressedIndex, setButtonPressedIndex] = useState<number | null>(null);
    const socket = useSocket(); 
    const navigate = useNavigate();
    const { invitations } = useChat();

    const handleJoinChatRoom = (invitation: any) => {
        if (!socket) {
            console.error("Socket não está conectado.");
            return;
        }
    
        socket.emit('acceptInvitation', invitation.invitationId, (response: { success: boolean, roomId?: string }) => {
            if (response.success) {
                console.log("Convite aceito com sucesso."); 
                navigate(`/chat/${response.roomId}`);
            } else {
                console.error("Não foi possível aceitar o convite.");
            }
        });
    };

    const handleInvitationClick = (index: any) => {
        setButtonPressedIndex(index);
    };


    useEffect(() => {
        if (!socket) return;

        const handleEnterChatRoom = (data: any) => {
            console.log("----OOOOO----", data);
        };

        socket.on('newMemberJoined', handleEnterChatRoom);
      
        return () => {
          socket.off('newMemberJoined', handleEnterChatRoom);
        };
    }, [socket]); 

    return (
        <div>Invitations received
            <ul>
                {invitations.map((invitation, index) => (
                    <div key={index}>
                        <li onClick={() => handleInvitationClick(index)}>
                            convite recebido para o chat {invitation.roomName}, convidado por {invitation.senderName}
                        </li>
                        {buttonPressedIndex === index && (
                            <Button onClick={() => handleJoinChatRoom(invitation)}>Entrar?</Button>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default InvitationsPage;
