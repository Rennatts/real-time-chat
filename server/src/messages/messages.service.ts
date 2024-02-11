import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ChatRoom } from './entities/chatRoom.entity';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Carla', text: 'Hi guys!!'}]
  clientToUser = {};
  rooms: ChatRoom[] = [{roomId: '00001', name: 'chat01', description: 'first group'}]
  private roomParticipants: { [roomId: string]: Set<string> } = {};


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
    const room = {...createChatRoomDto, roomId}
    console.log("room", room)
    this.rooms.push(room)
    return room;
  }

  getRooms() {
    return this.rooms
  }

  joinRoom(roomId: string, clientId: string): string {
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

    return roomId;
  }

  leaveRoom(roomId: string, clientId: string) {
    if (this.roomParticipants[roomId]) {
        this.roomParticipants[roomId].delete(clientId);
    }
  }



  // getRoomById(roomId: string) {
  //   return this.rooms.get(roomId);
  // }

  searchRooms(query: string) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.rooms.values()).filter(room =>
      room.name.toLowerCase().includes(lowercaseQuery) ||
      room.description.toLowerCase().includes(lowercaseQuery)
    );
  }

}
