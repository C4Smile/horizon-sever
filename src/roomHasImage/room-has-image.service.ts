import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomHasImage } from "./room-has-image.entity";

// dto
import { AddRoomHasImageDto } from "./dto/add-room-has-image.dto";

@Injectable()
export class RoomHasImageService {
  constructor(@InjectRepository(RoomHasImage) private roomService: Repository<RoomHasImage>) {}

  async create(room: AddRoomHasImageDto) {
    const newRoom = this.roomService.create(room);
    const saved = await this.roomService.save(newRoom);
    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
