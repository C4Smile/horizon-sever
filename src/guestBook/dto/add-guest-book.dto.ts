// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddGuestBookDto extends AddModelDto {
  name: string;
  urlName: string;
  date: Date;
}
