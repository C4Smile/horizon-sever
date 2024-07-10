// dto
import { ModelDto } from "src/models/model.dto";

export interface RoomDto extends ModelDto {
  number: string;
  name: string;
  urlName: string;
  description: string;
  content: string;
}
