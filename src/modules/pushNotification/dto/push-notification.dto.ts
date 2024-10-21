import { AutoMap } from "@automapper/classes";

// dto
import { BlobDto } from "src/modules/image/dto/blob.dto";
import { ModelDto } from "src/modules/models/dto/model.dto";

export class PushNotificationDto extends ModelDto {
  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  action: string;

  @AutoMap()
  sentDate: Date;

  @AutoMap()
  imageId: BlobDto;
}
