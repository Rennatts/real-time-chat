import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsException } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { SendMessageToChatRoomDto } from './dto/send-message-chatRoom.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('authenticate')
  handleAuthentication(
    @MessageBody() data: { userId: string }, 
    @ConnectedSocket() client: Socket) {
    this.messagesService.mapUserToSocket(data.userId, client.id);
  }

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

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody('roomId') roomId: string, 
    @ConnectedSocket() client: Socket) {
      console.log("roomId", roomId)
    try {
        const result = await this.messagesService.joinRoom(roomId, client.id);

        client.join(roomId);

        this.server.to(client.id).emit('roomJoined', result);
        return result;
    } catch (error) {
        throw new WsException(error.message);
    }
  }


  @SubscribeMessage('sendMessageToRoom')
  async sendMessageToRoom(
    @MessageBody() sendMessageToChatRoomDto: SendMessageToChatRoomDto,
    @ConnectedSocket() client: Socket
  ) {
    //TODO: save the message to the database

    const message = await this.messagesService.sendMessageToRoom(sendMessageToChatRoomDto);

    if(message){
      this.server.to(sendMessageToChatRoomDto.roomId).emit('messageFromRoom', message);
    }
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


  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @MessageBody() roomId: string, 
    @ConnectedSocket() client: Socket) {
      const answer = this.messagesService.leaveRoom(roomId, client.id)
      this.server.to(roomId).emit('leftRoom', answer);
      return answer;
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


  @SubscribeMessage('sendInvitation')
  async sendInvitation(
    @MessageBody() data: { roomId: string, recipientId: string, senderName: string }, 
    @ConnectedSocket() client: Socket) {

    const recipientSocketId = this.messagesService.getSocketIdByUserId(data.recipientId);

    if (!recipientSocketId) {
      console.error('Recipient not connected');
      return;
    }
    const invitation = this.messagesService.createInvitation(data.roomId, client.id, recipientSocketId, data.senderName);

    this.server.to(recipientSocketId).emit('invitationReceived', invitation);
    return invitation;
  }

 
  @SubscribeMessage('acceptInvitation')
  async acceptInvitation(
    @MessageBody() invitationId: string, 
    @ConnectedSocket() client: Socket) {
    const invitation = this.messagesService.getInvitation(invitationId);

    if (!invitation) {
      throw new WsException('Invitation not found');
    }

    const result = await this.messagesService.joinRoom(invitation.roomId, client.id);
    console.log("result", result)
    this.server.to(invitation.roomId).emit('newMemberJoined', { roomId: result, userId: client.id });
  }
}
