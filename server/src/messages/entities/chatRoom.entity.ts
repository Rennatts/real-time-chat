import { Message } from "./message.entity";

export class ChatRoom {
    roomId: string;
    roomName: string;
    description: string
    messages: Message[]; 
}
