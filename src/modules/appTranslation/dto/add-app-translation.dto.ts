// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddAppTranslationDto extends AddModelDto {
  name: string;
  appId: number;
}