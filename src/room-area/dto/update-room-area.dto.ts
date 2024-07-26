// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateRoomAreaDto extends UpdateModelDto {
  name?: string;
  roomId?: number;
  description?: string;
  content?: string;
}
