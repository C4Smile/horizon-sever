import { BuildingTypeDto } from "src/modules/buildingType/dto/building-type.dto";
import { BlobDto } from "src/modules/image/dto/blob.dto";
import { ModelDto } from "src/modules/models/dto/model.dto";

export interface BuildingDto extends ModelDto {
  name: string;
  type: BuildingTypeDto;
  image: BlobDto;
  creationTime: number;
  description: string;
}
