import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Carla', text: 'Hi guys!!'}]
  clientToUser = {};
  rooms = new Map<string, { name: string, description: string }>();

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

  createRoom(name: string, description: string) {
    const roomId = Math.random().toString(36).substring(7); 
    const room = { name, description };
    this.rooms.set(roomId, room);
    return room;
  }

  getRooms() {
    return Array.from(this.rooms.values());
  }

  getRoomById(roomId: string) {
    return this.rooms.get(roomId);
  }

  searchRooms(query: string) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.rooms.values()).filter(room =>
      room.name.toLowerCase().includes(lowercaseQuery) ||
      room.description.toLowerCase().includes(lowercaseQuery)
    );
  }

}
