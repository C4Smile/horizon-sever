// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddServiceHasScheduleDto extends AddModelDto {
  eventId: number;
  linkId: number;
  url: string;
}
