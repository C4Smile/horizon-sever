// dto
import { ModelDto } from "src/models/model.dto";

export interface ActivityDto extends ModelDto {
  title: string;
  description: string;
  entity: string;
}
