import { Message } from "./message.entity";

export class ChatRoom {
    roomId: string;
    name: string;
    description: string
    messages: Message[]; 
}
