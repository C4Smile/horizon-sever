// dto
import { ModelDto } from "src/models/model.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";
import { RoomTypeDto } from "src/roomType/dto/room-type.dto";

export class RoomDto extends ModelDto {
  number: string;
  name: string;
  urlName: string;
  description: string;
  content: string;
  status: RoomStatusDto;
  type: RoomTypeDto;
}
