export type UpdateModelDto = {
  id: number;
  lastUpdate: Date;
  deletedAt?: Date | null;
};

export type UpdateRelationshipDto = {
  id: number;
};
