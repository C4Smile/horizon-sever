import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { RoomDto } from "src/room/dto/room.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";

export class ClientRoomAreaDto extends ModelDto {
  @AutoMap()
  number: string;

  @AutoMap()
  name: string;

  @AutoMap()
  room: RoomDto;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  @AutoMap()
  status: RoomStatusDto;

  roomAreaHasImage: string;
}
