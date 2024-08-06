import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomAreaHasImage360 } from "./room-area-has-image360.entity";

// dto
import { AddRoomAreaHasImage360Dto } from "./dto/add-room-area-has-image360.dto";

@Injectable()
export class RoomAreaHasImage360Service {
  constructor(
    @InjectRepository(RoomAreaHasImage360) private roomAreaService: Repository<RoomAreaHasImage360>,
  ) {}

  async create(room: AddRoomAreaHasImage360Dto) {
    const parsedRoom = { ...room, image360Id: room.imageId };
    delete parsedRoom.imageId;
    console.log(parsedRoom);
    const newRoom = this.roomAreaService.create(parsedRoom);
    const saved = await this.roomAreaService.save(newRoom);
    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomAreaService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Area Has Image360 not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
