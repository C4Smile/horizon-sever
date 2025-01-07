import { BuildingQueue } from "../entities/building-queue.entity";

export type Queue = {
  [key: number]: BuildingQueue[];
};
