// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateGuestBookDto extends UpdateModelDto {
  name?: string;
  urlName?: string;
  description?: string;
  content?: string;
}
