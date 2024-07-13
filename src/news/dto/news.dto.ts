// dto
import { BlobDto } from "src/image/dto/blob..dto";
import { ModelDto } from "src/models/model.dto";
import { TagDto } from "src/tags/dto/tag.dto";

export interface NewsDto extends ModelDto {
  title: string;
  urlName: string;
  description: string;
  content: string;
  subtitle: string;
  newsHasTag: TagDto[];
  newsHasImage: BlobDto[];
}
