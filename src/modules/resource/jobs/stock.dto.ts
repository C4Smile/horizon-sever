import { Resource } from "../entities/resource.entity";

export type Stock = {
  [key: number]: Resource[];
};
