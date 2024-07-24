import { AutoMap } from "@automapper/classes";

export class RoomGalleryDto {
  @AutoMap()
  name: string;

  @AutoMap()
  number: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  image: string;
}
