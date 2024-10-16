import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomHasImage } from "./room-has-image.entity";

// dto
import { AddRoomHasImageDto } from "./dto/add-room-has-image.dto";
import { Photo } from "src/image/image.entity";

@Injectable()
export class RoomHasImageService {
  constructor(
    @InjectRepository(RoomHasImage) private roomHasImageService: Repository<RoomHasImage>,
    @InjectRepository(Photo) private imageService: Repository<Photo>,
  ) {}

  async create(room: AddRoomHasImageDto) {
    const newRoom = this.roomHasImageService.create(room);
    const saved = await this.roomHasImageService.save(newRoom);

    await this.imageService.update(newRoom.imageId, { alt: room.alt });

    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomHasImageService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
