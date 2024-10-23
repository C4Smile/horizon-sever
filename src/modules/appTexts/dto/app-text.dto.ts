// dto
import { ModelDto } from "src/modules/models/dto/model.dto";

export interface AppTextDto extends ModelDto {
  title: string;
  urlName: string;
  content: string;
}
