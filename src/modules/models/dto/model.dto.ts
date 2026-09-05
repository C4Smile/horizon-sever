export class ModelDto {
  id: number;
  dateOfCreation: Date;
  lastUpdate: Date;
  deletedAt: Date | null;
}

export class RelationshipDto {
  id: number;
}
