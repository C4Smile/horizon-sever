import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateSkillDto extends UpdateModelDto {
  name: string;
  image: object;
  description: string;
}
