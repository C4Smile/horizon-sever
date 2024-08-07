// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdatePushNotificationDto extends UpdateModelDto {
  title?: string;
  description?: string;
  action?: string;
  imageId?: number;
}
