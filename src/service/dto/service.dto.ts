// dto
import { BlobDto } from "src/image/dto/blob.dto";
import { ModelDto } from "src/models/model.dto";

export interface ServiceDto extends ModelDto {
  name: string;
  urlName: string;
  description: string;
  content: string;
  image: BlobDto;
}
