import { BuildingTypeDto } from "src/modules/buildingType/dto/building-type.dto";
import { AddBlobDto } from "src/modules/image/dto/add-blob.dto";
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateBuildingDto extends UpdateModelDto {
  name: string;
  type: BuildingTypeDto;
  image: AddBlobDto;
  creationTime: number;
  description: string;
}
