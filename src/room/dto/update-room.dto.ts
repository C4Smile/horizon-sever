// dto
import { UpdateModelDto } from "src/models/update-model.dto";
import { RoomStatus } from "../room.entity";

export interface UpdateRoomDto extends UpdateModelDto {
  number?: string;
  name?: string;
  status?: RoomStatus;
}
