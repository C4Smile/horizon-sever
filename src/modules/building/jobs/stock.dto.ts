import { Resource } from "../entities/building.entity";

export type Stock = {
  [key: number]: Resource[];
};
