import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Photo } from "src/image/image.entity";
import { RoomAreaHasImage } from "./room-area-has-image.entity";

// dto
import { AddRoomAreaHasImageDto } from "./dto/add-room-area-has-image.dto";

@Injectable()
export class RoomAreaHasImageService {
  constructor(
    @InjectRepository(RoomAreaHasImage) private roomAreaService: Repository<RoomAreaHasImage>,
    @InjectRepository(Photo) private imageService: Repository<Photo>,
  ) {}

  async create(roomArea: AddRoomAreaHasImageDto) {
    const newRoomArea = this.roomAreaService.create(roomArea);
    const saved = await this.roomAreaService.save(newRoomArea);

    await this.imageService.update(newRoomArea.imageId, { alt: roomArea.alt });

    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomAreaService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("RoomArea Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
