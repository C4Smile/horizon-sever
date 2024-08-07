// dto
import { BlobDto } from "src/image/dto/blob.dto";
import { ModelDto } from "src/models/dto/model.dto";

export interface PushNotificationDto extends ModelDto {
  title: string;
  description: string;
  action: string;
  image: BlobDto;
}
