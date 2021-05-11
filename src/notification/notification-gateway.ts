import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
// import { Socket } from 'node:dgram';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('MessageGateway');
  @SubscribeMessage('test')
  handleEvent(): string {
    this.logger.log('Event received');
    return 'Hello';
  }
  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('++++++++');
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  public handleConnection(client: any): void {
    // console.log(client);
    this.logger.log(`Client connected: `);
  }
}
