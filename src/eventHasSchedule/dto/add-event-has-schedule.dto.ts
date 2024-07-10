// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddEventHasLinkDto extends AddModelDto {
  eventId: number;
  linkId: number;
  url: string;
}
