// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddRoomAreaDto extends AddModelDto {
  name: string;
  roomId: number;
  description: string;
  content: string;
}