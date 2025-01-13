import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

// entities
import { BuildingQueue } from "../building/entities/building-queue.entity";

// dto
import { NotResourcesDto } from "../resource/dto/not-resources.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketsGateway {
  constructor(private eventEmitter: EventEmitter2) {}

  clients: { [key: number]: Socket } = {};

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number, @ConnectedSocket() client: Socket): Promise<number> {
    this.clients[data] = client;
    return data;
  }

  @OnEvent("not.resources")
  async notResources(payload: NotResourcesDto) {
    if (this.clients[payload.playerId]?.connected)
      this.clients[payload.playerId].emit("not.resources", payload);
  }

  @OnEvent("building.completed")
  async buildingCompleted(payload: BuildingQueue) {
    if (this.clients[payload.playerId])
      this.clients[payload.playerId].emit("building.completed", payload.buildingId);
  }
}
