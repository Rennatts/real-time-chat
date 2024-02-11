import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string, 
    @ConnectedSocket() client: Socket){
      return this.messagesService.identify(name, client.id)
  }


  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() createChatRoomDto: CreateChatRoomDto, 
    @ConnectedSocket() client: Socket) {
      const room = this.messagesService.createRoom(createChatRoomDto);
      this.server.emit('newChatRoom', room);
      return room;
  }


  @SubscribeMessage('findAllChatRooms')
  getRooms() {
    return this.messagesService.getRooms();
  }

  // @SubscribeMessage('joinRoom')
  // joinRoom(
  //   @MessageBody() roomName: string, 
  //   @ConnectedSocket() client: Socket) {
  //     client.join(roomName);
  //     return `Joined room ${roomName}`;
  // }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @MessageBody() roomName: string, 
    @ConnectedSocket() client: Socket) {
      client.leave(roomName);
      return `Left room ${roomName}`;
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean, 
    @ConnectedSocket() client: Socket) {
      const name = await this.messagesService.getClientByName(client.id)

      client.broadcast.emit('typing', { name, isTyping })
  }

  @SubscribeMessage('searchRooms')
  searchRooms(@MessageBody() query: string) {
    return this.messagesService.searchRooms(query);
  }
}
