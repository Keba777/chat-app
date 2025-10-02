import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from './ws-jwt.guard'; 
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() { room }: { room: string }, @ConnectedSocket() client: Socket) {
    client.join(room);
    this.server.to(room).emit('message', { content: `${client.data.user.username} joined ${room}` });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() { room, content }: { room: string; content: string }, @ConnectedSocket() client: Socket) {
    const message = await this.chatService.saveMessage(client.data.user.id, room, content);
    this.server.to(room).emit('message', message);
  }
}