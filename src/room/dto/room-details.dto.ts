import { AutoMap } from "@automapper/classes";

// dto
import { NextRoomDto } from "./next-room.dto";
import { ModelDto } from "src/models/model.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";
import { RoomTypeDto } from "src/roomType/dto/room-type.dto";

export class RoomDetailsDto extends ModelDto {
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

  @AutoMap()
  status: RoomStatusDto;

  @AutoMap()
  type: RoomTypeDto;

  nextRoom: NextRoomDto;
}
