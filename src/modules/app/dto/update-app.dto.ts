// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateAppDto extends UpdateModelDto {
  name?: string;
}
