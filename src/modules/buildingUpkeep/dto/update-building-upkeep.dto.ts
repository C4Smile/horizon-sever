export type UpdateBuildingUpkeepDto = {
  id: number;
  buildingId: number;
  resourceId: number;
  factor: number;
  baseUpkeep: number;
};
