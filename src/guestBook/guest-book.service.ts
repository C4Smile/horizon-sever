import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { GuestBook } from "./guest-book.entity";

// dto
import { AddGuestBookDto } from "./dto/add-guest-book.dto";
import { UpdateGuestBookDto } from "./dto/update-guest-book.dto";
import { ClientGuestBookDto } from "./dto/client-guest-book.dto";

@Injectable()
export class GuestBookService extends CrudService<GuestBook, AddGuestBookDto, UpdateGuestBookDto> {
  constructor(
    @InjectRepository(GuestBook) serviceGuestBook: Repository<GuestBook>,
    @InjectMapper() mapper: Mapper,
    relationships: string[] = ["guestBookHasImage"],
  ) {
    super(serviceGuestBook, mapper, relationships);
  }

  async clientGet({ sort, order, page, count }) {
    const list = await this.entityService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: this.relationships,
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(list, GuestBook, ClientGuestBookDto);
  }
}
