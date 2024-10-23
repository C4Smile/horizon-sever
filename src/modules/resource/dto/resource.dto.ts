import { ModelDto } from "src/modules/models/dto/model.dto";

export interface ResourceDto extends ModelDto {
  name: string;
  baseFactor: number;
  description: string;
}
