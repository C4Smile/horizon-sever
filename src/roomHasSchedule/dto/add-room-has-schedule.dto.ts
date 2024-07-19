// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddRoomHasScheduleDto extends AddModelDto {
  roomId: number;
  linkId: number;
  url: string;
}
