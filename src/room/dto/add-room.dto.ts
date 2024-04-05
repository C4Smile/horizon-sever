// dto
import { AddModelDto } from "src/models/add-model.dto";
import { RoomStatus } from "../room.entity";

export interface AddRoomDto extends AddModelDto {
  number: string;
  name: string;
  status: RoomStatus;
}
