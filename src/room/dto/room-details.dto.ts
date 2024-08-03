import { AutoMap } from "@automapper/classes";

// dto
import { NextRoomDto } from "./next-room.dto";

export class RoomDetailsDto {
  @AutoMap()
  id: number;

  @AutoMap()
  number: string;

  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  images: string[];

  images360: string[];

  nextRoom: NextRoomDto;
}
