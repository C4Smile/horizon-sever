// dto
import { ModelDto } from "src/models/model.dto";
import { RoomStatus } from "../room.entity";

export interface RoomDto extends ModelDto {
  number: string;
  name: string;
  description: string;
  status: RoomStatus;
}
