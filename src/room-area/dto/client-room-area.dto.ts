import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { RoomDto } from "src/room/dto/room.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";

export class ClientRoomAreaDto extends ModelDto {
  @AutoMap()
  order: string;

  @AutoMap()
  name: string;

  @AutoMap()
  room: RoomDto;

  @AutoMap()
  content: string;

  @AutoMap()
  status: RoomStatusDto;

  image: string;
}
