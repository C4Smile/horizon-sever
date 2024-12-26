export interface ResourceDto {
  resourceId: number;
  inStock: number;
  maxCapacity: number;
  currentFactor: number;
}

export type GameResourceDto = {
  id: number;
  name: string;
  image: string;
  baseFactor: number;
  description: string;
};
