import { AutoMap } from "@automapper/classes";

export class RoomHomeDto {
  @AutoMap()
  urlName: string;

  @AutoMap()
  number: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  image: string;
}
