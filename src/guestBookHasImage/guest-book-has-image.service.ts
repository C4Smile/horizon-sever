import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { GuestBookHasImage } from "./guest-book-has-image.entity";

// dto
import { AddGuestBookHasImageDto } from "./dto/add-guest-book-has-image.dto";

@Injectable()
export class GuestBookHasImageService {
  constructor(
    @InjectRepository(GuestBookHasImage) private guestBookService: Repository<GuestBookHasImage>,
  ) {}

  async create(guestBook: AddGuestBookHasImageDto) {
    const newGuestBook = this.guestBookService.create(guestBook);
    const saved = await this.guestBookService.save(newGuestBook);
    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.guestBookService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("GuestBook Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
