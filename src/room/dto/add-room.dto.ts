// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddRoomDto extends AddModelDto {
  number: string;
  name: string;
  urlName: string;
  description: string;
  content: string;
  typeId: number;
  statusId: number;
}
