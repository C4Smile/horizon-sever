// dto
import { ModelDto } from "src/models/model.dto";

export interface ExternalLinkDto extends ModelDto {
  name: string;
  preview: string;
}
