// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddPushNotificationDto extends AddModelDto {
  title: string;
  description: string;
  action: string;
  imageId: number;
}
