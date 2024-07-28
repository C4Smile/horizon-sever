// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateRoomAreaDto extends UpdateModelDto {
  number?: number;
  name?: string;
  roomId?: number;
  description?: string;
  content?: string;
  statusId?: number;
}
