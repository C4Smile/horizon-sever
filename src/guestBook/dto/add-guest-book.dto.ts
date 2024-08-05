// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddGuestBookDto extends AddModelDto {
  name: string;
  urlName: string;
  date: Date;
}
