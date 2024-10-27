import { ModelDto } from "src/modules/models/dto/model.dto";

export interface TechDto extends ModelDto {
  name: string;
  imageId: number;
  typeId: number;
  description: string;
  creationTime: number;
}
