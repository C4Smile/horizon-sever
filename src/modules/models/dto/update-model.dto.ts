export type UpdateModelDto = {
  id: number;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type UpdateRelationshipDto = {
  id: number;
};
