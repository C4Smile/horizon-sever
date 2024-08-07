// dto
import { ModelDto } from "src/models/dto/model.dto";

export interface ExternalLinkDto extends ModelDto {
  name: string;
  preview: string;
}
