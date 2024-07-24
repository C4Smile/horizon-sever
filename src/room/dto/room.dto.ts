import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { RoomHasImageDto } from "./room-has-image.dto";
import { RoomStatusDto } from "src/roomStatus/dto/room-status.dto";
import { RoomTypeDto } from "src/roomType/dto/room-type.dto";

export class RoomDto extends ModelDto {
  @AutoMap()
  number: string;

  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  @AutoMap()
  status: RoomStatusDto;

  @AutoMap()
  type: RoomTypeDto;

  roomHasImage: RoomHasImageDto[];

  roomHasImage360: RoomHasImageDto[];
}
