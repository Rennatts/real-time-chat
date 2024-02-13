import { useEffect } from "react";
import { useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";


function InvitationsPage() {
    const socket = useSocket(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data: { invitationId: string, roomId: string, roomName: string, senderId: string, recipientId: string }) => {
            console.log("----DATA----", data)
        };

        socket.on('invitationReceived', handleNewMessage);
      
        return () => {
          socket.off('invitationReceived');
        };
    }, [socket]); 

    return (
        <div>Invitations</div>
    )
}

export default InvitationsPage