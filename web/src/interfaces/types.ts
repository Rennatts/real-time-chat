export interface ChatRoom {
    roomId: string;
    roomName: string;
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

export interface CreateChatRoo {
    chatRoomDescription: string;
    chatRoomName: string
}

export interface Invitation {
    invitationId: string;
    recipientId:  string;
    roomId:  string; 
    roomName:  string;
    senderId:  string;
    senderName:  string;
}