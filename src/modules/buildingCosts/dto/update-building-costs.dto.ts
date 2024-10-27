export interface UpdateBuildingCostsDto {
  id: number;
  buildingId: number;
  resourceId: number;
  factor: number;
  baseCost: number;
}
