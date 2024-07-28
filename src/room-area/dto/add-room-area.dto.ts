// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddRoomAreaDto extends AddModelDto {
  order: number;
  name: string;
  description: string;
  content: string;
  roomId: number;
  statusId: number;
}
