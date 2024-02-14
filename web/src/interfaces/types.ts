export interface ChatRoom {
    roomId: string;
    name: string;
    description: string;
    messages: Message[];
}
  
export interface Invitation {
    invitationId: string;
    roomId: string;
    roomName: string;
    senderId: string;
    senderName: string;
    recipientId: string;
}

export interface Message {
    senderId: string;
    senderName: string;
    text: string;
    roomId: string;
}