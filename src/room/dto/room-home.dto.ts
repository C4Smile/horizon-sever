import { AutoMap } from "@automapper/classes";

export class RoomHomeDto {
  @AutoMap()
  urlName: string;

  @AutoMap()
  image: string;
}
