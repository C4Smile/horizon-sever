// dto
import { ModelDto } from "src/models/model.dto";

export interface AppTextDto extends ModelDto {
  title: string;
  urlName: string;
  content: string;
}
