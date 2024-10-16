import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Photo } from "src/image/image.entity";
import { RoomHasImage360 } from "./room-has-image360.entity";

// dto
import { AddRoomHasImage360Dto } from "./dto/add-room-has-image360.dto";

@Injectable()
export class RoomHasImage360Service {
  constructor(
    @InjectRepository(RoomHasImage360) private roomHasImage360Service: Repository<RoomHasImage360>,
    @InjectRepository(Photo) private imageService: Repository<Photo>,
  ) {}

  async create(room: AddRoomHasImage360Dto) {
    const imageId = room.imageId;

    const parsedRoom = { ...room, image360Id: imageId };
    delete parsedRoom.imageId;

    const newRoom = this.roomHasImage360Service.create(parsedRoom);
    const saved = await this.roomHasImage360Service.save(newRoom);

    await this.imageService.update(imageId, { alt: room.alt });

    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomHasImage360Service.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Has Image360 not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
