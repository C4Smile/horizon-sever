// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateRoomDto extends UpdateModelDto {
  number?: string;
  name?: string;
  urlName?: string;
  description?: string;
  content?: string;
  typeId?: number;
  statusId?: number;
}
