// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateEventDto extends UpdateModelDto {
  title?: string;
}
