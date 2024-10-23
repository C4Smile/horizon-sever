// dto
import { BlobDto } from "src/modules/image/dto/blob.dto";
import { ModelDto } from "src/modules/models/dto/model.dto";

export class PushNotificationDto extends ModelDto {
  title: string;
  description: string;
  action: string;
  sentDate: Date;
  imageId: BlobDto;
}
