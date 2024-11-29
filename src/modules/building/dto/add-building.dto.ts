import { BuildingTypeDto } from "src/modules/buildingType/dto/building-type.dto";
import { AddBlobDto } from "src/modules/image/dto/add-blob.dto";
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddBuildingDto extends AddModelDto {
  name: string;
  type: BuildingTypeDto;
  image: AddBlobDto;
  creationTime: number;
  description: string;
}
