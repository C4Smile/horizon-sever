// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateEventDto extends UpdateModelDto {
  title?: string;
}
