// dto
import { AddModelDto } from "src/models/add-model.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";
import { RoomTypeDto } from "src/roomType/dto/room-type.dto";

export interface AddRoomDto extends AddModelDto {
  number: string;
  name: string;
  urlName: string;
  description: string;
  content: string;
  type: number;
  status: number;
}
