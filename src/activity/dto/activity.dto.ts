import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";
import { BlobDto } from "src/image/dto/blob.dto";

export class ActivityDto extends ModelDto {
  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  entity: string;

  imageId: BlobDto;
}
