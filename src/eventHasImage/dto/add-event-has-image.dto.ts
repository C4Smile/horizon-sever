// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddEventHasImageDto extends AddModelDto {
  eventId: number;
  imageId: number;
}