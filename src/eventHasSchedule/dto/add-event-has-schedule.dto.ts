// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddEventHasScheduleDto extends AddModelDto {
  eventId: number;
  linkId: number;
  url: string;
}
