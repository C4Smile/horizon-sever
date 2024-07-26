// dto
import { ModelDto } from "src/models/model.dto";
import { RoomDto } from "src/room/dto/room.dto";
import { RoomAreaHasImageDto } from "./room-area-has-image.dto";

export class RoomAreaDto extends ModelDto {
  name: string;
  room: RoomDto;
  description: string;
  content: string;
  roomAreaHasImage: RoomAreaHasImageDto[];
  roomAreaHasImage360: RoomAreaHasImageDto[];
}
