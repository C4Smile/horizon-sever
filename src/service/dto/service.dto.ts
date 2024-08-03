import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { BlobDto } from "src/image/dto/blob.dto";

export class ServiceDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  imageId: BlobDto;
}
