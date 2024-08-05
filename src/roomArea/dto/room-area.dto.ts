import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { RoomDto } from "src/room/dto/room.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";
import { RoomAreaHasImageDto } from "src/roomAreaHasImage/dto/room-area-has-image.dto";

export class RoomAreaDto extends ModelDto {
  @AutoMap()
  number: number;

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

  roomAreaHasImage: RoomAreaHasImageDto[];

  roomAreaHasImage360: RoomAreaHasImageDto[];
}
