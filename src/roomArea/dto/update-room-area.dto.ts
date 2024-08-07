// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateRoomAreaDto extends UpdateModelDto {
  number?: number;
  name?: string;
  roomId?: number;
  description?: string;
  content?: string;
  statusId?: number;
}
