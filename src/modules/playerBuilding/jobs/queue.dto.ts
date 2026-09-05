import { BuildingQueue } from "../entities/building-queue.entity";

/** what each player still has waiting, kept in memory */
export type Queue = {
  [playerId: number]: BuildingQueue[];
};
