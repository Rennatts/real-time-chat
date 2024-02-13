import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";


function InvitationsPage() {
    const [invitationsReceived, setInvitationsReceived] = useState<any[]>([])
    const socket = useSocket(); 
    const navigate = useNavigate();
    //{ invitationId: string, roomId: string, roomName: string, senderId: string, recipientId: string }

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data: any) => {
            console.log("----DATA----", data)
            setInvitationsReceived(data)
        };

        socket.on('invitationReceived', handleNewMessage);
      
        return () => {
          socket.off('invitationReceived');
        };
    }, [socket]); 

    console.log("invitationsReceived", invitationsReceived)

    return (
        <div>Invitations
            <ul>
            {invitationsReceived.map((invitation, index) => (
                <li>{invitation.roomName}</li>))
            }
            </ul>
        </div>
    )
}

export default InvitationsPage