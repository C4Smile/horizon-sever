import { AutoMap } from "@automapper/classes";

// dto
import { BlobDto } from "src/image/dto/blob.dto";
import { ModelDto } from "src/models/dto/model.dto";

type PushNotificationHasImageDto = {
  imageId: BlobDto;
};

export class PushNotificationDto extends ModelDto {
  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  action: string;

  @AutoMap()
  image: PushNotificationHasImageDto;
}
