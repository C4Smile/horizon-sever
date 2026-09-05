import { BuildingQueueActions } from "../entities/building-queue.entity";

export type EnqueueDto = {
  playerId: number;
  buildingId: number;
  action: BuildingQueueActions;
};
