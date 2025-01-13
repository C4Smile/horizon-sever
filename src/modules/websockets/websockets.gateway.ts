import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Server, Socket } from "socket.io";

// entities
import { BuildingQueue } from "../building/entities/building-queue.entity";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketsGateway {
  constructor(private eventEmitter: EventEmitter2) {}

  clients = {};

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("events")
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: "events", data: item })));
  }

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number, @ConnectedSocket() client: Socket): Promise<number> {
    this.clients[data] = client
    return data;
  }

  @OnEvent("building.completed")
  async buildingCompleted(payload: BuildingQueue) {
    if (this.clients[payload.playerId])
      this.clients[payload.playerId].emit("building.completed", payload.buildingId);
  }
}
