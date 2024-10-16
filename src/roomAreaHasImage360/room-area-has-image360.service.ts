import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomAreaHasImage360 } from "./room-area-has-image360.entity";

// dto
import { Photo } from "src/image/image.entity";
import { AddRoomAreaHasImage360Dto } from "./dto/add-room-area-has-image360.dto";

@Injectable()
export class RoomAreaHasImage360Service {
  constructor(
    @InjectRepository(RoomAreaHasImage360) private roomAreaService: Repository<RoomAreaHasImage360>,
    @InjectRepository(Photo) private imageService: Repository<Photo>,
  ) {}

  async create(roomArea: AddRoomAreaHasImage360Dto) {
    const imageId = roomArea.imageId;

    const parsedRoomArea = { ...roomArea, image360Id: imageId };
    delete parsedRoomArea.imageId;

    const newRoomArea = this.roomAreaService.create(parsedRoomArea);
    const saved = await this.roomAreaService.save(newRoomArea);

    await this.imageService.update(imageId, { alt: roomArea.alt });

    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.roomAreaService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Area Has Image360 not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
