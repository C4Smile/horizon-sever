import { OnEvent } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

// entities
import { BuildingQueue } from "../playerBuilding/entities/building-queue.entity";

// dto
import { NotResourcesDto } from "../playerResource/dto/not-resources.dto";

/**
 * Pushes to the player what they did not ask for: a build that finished while
 * they were looking elsewhere, or one that could not be paid for. A client
 * says who it is with `identity` and is remembered by player id.
 */
@WebSocketGateway({ cors: { origin: "*" } })
export class WebsocketsGateway {
  clients: { [playerId: number]: Socket } = {};

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
    if (this.clients[payload.playerId]?.connected)
      this.clients[payload.playerId].emit("building.completed", payload.building.buildingId);
  }
}
