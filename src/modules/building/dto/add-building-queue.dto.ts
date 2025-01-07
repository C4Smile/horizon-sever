import { BuildingQueueActions, BuildingQueueState } from "../entities/building-queue.entity";

export type AddBuildingQueueDto = {
  playerId: number;
  buildingId: number;
  action: BuildingQueueActions;
  startedAt: Date;
  endsAt: Date;
  state: BuildingQueueState;
};
