import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomHasImage360 } from "./room-has-image360.entity";

// dto
import { AddRoomHasImage360Dto } from "./dto/add-room-has-image360.dto";

@Injectable()
export class RoomHasImage360Service {
  constructor(
    @InjectRepository(RoomHasImage360) private roomHasImage360Service: Repository<RoomHasImage360>,
  ) {}

  async create(room: AddRoomHasImage360Dto) {
    const newRoom = this.roomHasImage360Service.create(room);
    return this.roomHasImage360Service.save(newRoom);
  }

  async remove(imageId: number) {
    const result = await this.roomHasImage360Service.delete({ imageId });
    if (result.affected === 0)
      throw new HttpException("Room has image not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
