import { ModelDto } from "src/modules/models/dto/model.dto";

export interface SkillDto extends ModelDto {
  name: string;
  image: object;
  description: string;
}
