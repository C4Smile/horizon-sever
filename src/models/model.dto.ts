import { AutoMap } from "@automapper/classes";

export class ModelDto {
  @AutoMap()
  id: number;

  @AutoMap()
  dateOfCreation?: Date;

  @AutoMap()
  lastUpdate?: Date;

  @AutoMap()
  deleted?: boolean;
}
