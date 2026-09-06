import { ModelDto } from "src/modules/models/dto/model.dto";

export interface NationDto extends ModelDto {
  name: string;
  imageId?: number;
  description: string;
  playable: boolean;
}
