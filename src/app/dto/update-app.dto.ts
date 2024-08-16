// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateAppDto extends UpdateModelDto {
  name?: string;
}
