// dto
import { ModelDto } from "src/models/model.dto";
import { RoomDto } from "src/room/dto/room.dto";
import { RoomAreaHasImageDto } from "./room-area-has-image.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";

export class RoomAreaDto extends ModelDto {
  name: string;
  room: RoomDto;
  status: RoomStatusDto;
  content: string;
  description: string;
  roomAreaHasImage: RoomAreaHasImageDto[];
  roomAreaHasImage360: RoomAreaHasImageDto[];
}
