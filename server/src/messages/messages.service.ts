import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ChatRoom } from './entities/chatRoom.entity';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { SendMessageToChatRoomDto } from './dto/send-message-chatRoom.dto';

@Injectable()
export class MessagesService {
  messages: Message[] = []
  clientToUser = {};
  rooms: ChatRoom[] = []
  private roomParticipants: { [roomId: string]: Set<string> } = {};
  private invitations: Invitation[] = [];
  private userToSocketMap = new Map<string, string>(); 



  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientByName(clientId: string){
    return this.clientToUser[clientId];
  }
  
  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto}
    this.messages.push(message)
    return message
  }

  findAll() {
    return this.messages
  }

  createRoom(createChatRoomDto: CreateChatRoomDto) {
    const roomId = Math.random().toString(36).substring(7); 
    const room: ChatRoom = {
        ...createChatRoomDto,
        roomId,
        messages: [] 
    };
    this.rooms.push(room);
    return room;
  }


  getRooms() {
    return this.rooms
  }

  joinRoom(roomId: string, clientId: string): ChatRoom | Error {
    const room = this.rooms.find(room => room.roomId === roomId);
    if (!room) {
        throw new Error('Room does not exist');
    }

    // Initialize the room in the roomParticipants object if it doesn't already exist
    if (!this.roomParticipants[roomId]) {
      this.roomParticipants[roomId] = new Set();
    }

    // Check if the client is already in the room
    if (this.roomParticipants[roomId].has(clientId)) {
      throw new Error('User is already in the room');
    }

    this.roomParticipants[roomId].add(clientId);

    return room;
  }

  leaveRoom(roomId: string, senderId: string): boolean {
    if (this.roomParticipants[roomId]) {
      this.roomParticipants[roomId].delete(senderId);
      return true
    }else {
      return false
    }
  }


  findRoomById(roomId: string): ChatRoom | undefined {
    return this.rooms.find(room => room.roomId === roomId);
  }  

  searchRooms(query: string) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.rooms.values()).filter(room =>
      room.name.toLowerCase().includes(lowercaseQuery) ||
      room.description.toLowerCase().includes(lowercaseQuery)
    );
  }


  sendMessageToRoom(sendMessageToChatRoomDto: SendMessageToChatRoomDto): Message {
    const room = this.rooms.find(room => room.roomId === sendMessageToChatRoomDto.roomId);
    if (!room) {
        throw new Error('Room does not exist');
    }
    const newMessage: Message = {
      senderId: sendMessageToChatRoomDto.senderId,
      senderName: sendMessageToChatRoomDto.senderName, 
      text: sendMessageToChatRoomDto.message,
      roomId: sendMessageToChatRoomDto.roomId
    };

    room.messages.push(newMessage);
    return newMessage; 
  }



  createInvitation(roomId: string, senderId: string, recipientId: string, senderName: string): Invitation {
    const invitation: Invitation = {
      invitationId: Math.random().toString(36).substring(7),
      roomId,
      roomName: this.rooms.find(room => room.roomId === roomId)?.name || 'Unknown Room',
      senderId,
      recipientId,
      senderName
    };
    this.invitations.push(invitation);

    return invitation;
  }


  getInvitation(invitationId: string): Invitation | undefined {
    return this.invitations.find(invite => invite.invitationId === invitationId);
  }

  mapUserToSocket(userId: string, socketId: string) {
    this.userToSocketMap.set(userId, socketId);
  }

  getSocketIdByUserId(userId: string): string | undefined {
    console.log("this.userToSocketMap.get(userId)",  this.userToSocketMap.get(userId))
    console.log("userId",  this.userToSocketMap.get(userId))
    console.log("-----",  this.userToSocketMap)
    return this.userToSocketMap.get(userId);
  }

}
